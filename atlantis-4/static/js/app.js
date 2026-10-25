/* ATLANTIS 4 — yagona JS (CSP: inline skript yo'q, eval yo'q).
 * HTMX SHARTNOMASI:
 *  1) CSRF — <meta name="csrf-token"> dan, har o'zgartiruvchi so'rovga X-CSRFToken.
 *  2) Xato protokoli — 4xx/5xx: server fragment qaytarsa ko'rsatiladi, aks holda toast.
 *  3) Har swap'dan keyin initAll(root) — barcha modullar qayta ulanadi (idempotent).
 *  4) Server toast: HX-Trigger {"toast": {"text": "...", "kind": "success"}}.
 *  5) Modal: [data-modal-url] havola → server <dialog data-server-modal> qaytaradi → ochiladi.
 */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const csrf = () => ($('meta[name="csrf-token"]') || {}).content || "";
  const calm = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------------- til: JS matnlari (<html lang> ga qarab; server matnlari Django orqali tarjima qilinadi) ---------------- */
  const RU = {
    "Bekor qilish": "Отмена",
    "Bu amal sizga ochiq emas": "Это действие вам недоступно",
    "Topilmadi yoki o'chirilgan": "Не найдено или удалено",
    "Ma'lumot o'zgargan — sahifani yangilang": "Данные изменились — обновите страницу",
    "Texnik xato. Qayta urinib ko'ring.": "Техническая ошибка. Попробуйте ещё раз.",
    "Internet aloqasi yo'q — qayta urinib ko'ring": "Нет подключения к интернету — попробуйте ещё раз",
    "Server javob bermadi — qayta urinib ko'ring": "Сервер не ответил — попробуйте ещё раз",
    "Bajarildi": "Готово",
    "Keldi": "Был",
    "Kelmadi": "Не был",
    "Sababli": "Уважительная",
  };
  const CYRL = {  // o'zbek kirill (<html lang="uz-Cyrl">)
    "Bekor qilish": "Бекор қилиш",
    "Bu amal sizga ochiq emas": "Бу амал сизга очиқ эмас",
    "Topilmadi yoki o'chirilgan": "Топилмади ёки ўчирилган",
    "Ma'lumot o'zgargan — sahifani yangilang": "Маълумот ўзгарган — саҳифани янгиланг",
    "Texnik xato. Qayta urinib ko'ring.": "Техник хато. Қайта уриниб кўринг.",
    "Internet aloqasi yo'q — qayta urinib ko'ring": "Интернет алоқаси йўқ — қайта уриниб кўринг",
    "Server javob bermadi — qayta urinib ko'ring": "Сервер жавоб бермади — қайта уриниб кўринг",
    "Bajarildi": "Бажарилди",
    "Keldi": "Келди",
    "Kelmadi": "Келмади",
    "Sababli": "Сабабли",
  };
  const isRu = () => (document.documentElement.lang || "").slice(0, 2) === "ru";
  const isCyrl = () => (document.documentElement.lang || "").toLowerCase() === "uz-cyrl";
  const tr = (s) => (isRu() && RU[s]) || (isCyrl() && CYRL[s]) || s;

  /* ---------------- toast ---------------- */
  const ICONS = { success: "circle-check", danger: "circle-x", error: "circle-x", info: "info", warning: "alert-triangle" };
  function iconSvg(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", ((document.querySelector('meta[name="icons"]') || {}).content || "/static/icons.svg") + "#i-" + name);
    svg.appendChild(use);
    return svg;
  }
  function toast(text, kind = "success", undo) {
    const box = $("#toasts");
    if (!box) return;
    const el = document.createElement("div");
    el.className = "c-toast c-toast--" + kind;
    el.appendChild(iconSvg(ICONS[kind] || "info"));
    const t = document.createElement("div");
    t.className = "c-toast__text";
    t.textContent = text;
    el.appendChild(t);
    if (undo && undo.url) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "c-toast__action";
      b.textContent = undo.label || tr("Bekor qilish");
      b.addEventListener("click", () => {
        htmx.ajax("POST", undo.url, { swap: "none" }).then(() => location.reload());
        el.remove();
      });
      el.appendChild(b);
    }
    box.appendChild(el);
    setTimeout(() => hideToast(el), undo ? 8000 : 4500);
  }
  // toast chiqishi: o'ngga sirg'alib so'nadi (.is-leaving → animationend → remove); reduced-motion — darhol
  function hideToast(el) {
    if (!el || !el.isConnected) return;
    if (calm()) { el.remove(); return; }
    let done = false;
    const fin = () => { if (done) return; done = true; el.remove(); };
    el.classList.add("is-leaving");
    el.addEventListener("animationend", fin, { once: true });
    setTimeout(fin, 300);
  }
  window.atlToast = toast;

  /* ---------------- modal / dialog ---------------- */
  function openDialog(d, opener) {
    if (!d) return;
    d._opener = opener || document.activeElement;
    if (!d._cancelBound) {   // Esc: brauzer yopishidan oldin chiqish animatsiyasi
      d._cancelBound = true;
      d.addEventListener("cancel", (e) => { if (d.open && !d._closing) { e.preventDefault(); closeDialog(d); } });
    }
    if (!d.open) d.showModal();
    const f = d.querySelector("[autofocus], input:not([type=hidden]):not([disabled]), select, textarea, button:not([data-modal-close])");
    if (f) setTimeout(() => f.focus(), 30);
  }
  // yopilish: .is-closing (pop-out / mobil sheet pastga) → animationend → close(); reduced-motion — darhol
  function closeDialog(d) {
    if (!d || !d.open || d._closing) return;
    const fin = () => {
      d._closing = false;
      d.classList.remove("is-closing");
      if (d.open) d.close();
      if (d.hasAttribute("data-server-modal")) d.remove();
      if (d._opener && d._opener.focus) d._opener.focus();
    };
    if (calm()) { fin(); return; }
    d._closing = true;
    d.classList.add("is-closing");
    let done = false;
    const once = (e) => { if (e && e.target !== d) return; if (done) return; done = true; fin(); };
    d.addEventListener("animationend", once, { once: true });
    setTimeout(() => once(), 360);
  }
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-modal-open]");
    if (openBtn) { e.preventDefault(); openDialog(document.getElementById(openBtn.dataset.modalOpen), openBtn); return; }
    const closeBtn = e.target.closest("[data-modal-close]");
    if (closeBtn) { e.preventDefault(); closeDialog(closeBtn.closest("dialog")); return; }
    const modalLink = e.target.closest("a[data-modal-url]");
    if (modalLink && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      closePopovers();
      htmx.ajax("GET", modalLink.href, { target: "#modal-root", swap: "beforeend" });
      return;
    }
    // dialog tashqarisiga bosilsa yopiladi
    if (e.target.tagName === "DIALOG" && e.target.open) {
      const r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(e.target);
    }
  });
  document.addEventListener("close", (e) => {
    if (e.target.matches && e.target.matches("dialog[data-server-modal]")) setTimeout(() => e.target.remove(), 200);
  }, true);

  /* ---------------- popover (menyu) ---------------- */
  function closePopovers(except) {
    $$("[data-popover]").forEach((p) => {
      if (p === except) return;
      const m = p.querySelector(".c-menu");
      const b = p.querySelector("[data-popover-toggle]");
      if (m) m.hidden = true;
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  document.addEventListener("click", (e) => {
    const tog = e.target.closest("[data-popover-toggle]");
    if (tog) {
      const p = tog.closest("[data-popover]");
      const m = p.querySelector(".c-menu");
      const willOpen = m.hidden;
      closePopovers(p);
      m.hidden = !willOpen;
      tog.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) { const first = m.querySelector(".c-menu__item"); if (first) first.focus(); }
      return;
    }
    if (!e.target.closest(".c-menu")) closePopovers();
  });

  /* ---------------- chop etish ---------------- */
  document.addEventListener("click", (e) => { if (e.target.closest("[data-print]")) { e.preventDefault(); window.print(); } });

  /* ---------------- mavzu ---------------- */
  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-theme-toggle]")) return;
    const r = document.documentElement;
    const dark = r.dataset.theme !== "dark";
    if (dark) r.dataset.theme = "dark"; else delete r.dataset.theme;
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (_) {}
    fetch("/hisob/mavzu/", { method: "POST", headers: { "X-CSRFToken": csrf(), "Content-Type": "application/x-www-form-urlencoded" }, body: "theme=" + (dark ? "dark" : "light") });
  });

  /* ---------------- buyruq palitrasi (Ctrl+K) ---------------- */
  function openPalette() {
    const d = $("#palette");
    if (!d) return;
    openDialog(d);
    const i = d.querySelector("[data-palette-input]");
    if (i) { i.value = ""; i.focus(); htmx.trigger(i, "input"); }
  }
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); openPalette(); }
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
    if (e.key === "Escape") closePopovers();
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-palette-open]")) openPalette(); });
  document.addEventListener("keydown", (e) => {
    const d = $("#palette");
    if (!d || !d.open) return;
    const items = $$(".c-palette__item", d);
    if (!items.length) return;
    let i = items.findIndex((x) => x.getAttribute("aria-selected") === "true");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      i = e.key === "ArrowDown" ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
      items.forEach((x, k) => x.setAttribute("aria-selected", String(k === i)));
      items[i].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && i >= 0) {
      e.preventDefault();
      items[i].click();
    }
  });

  /* ---------------- maydon yordamchilari ---------------- */
  function fmtMoney(v) { const d = String(v).replace(/\D/g, "").slice(0, 12); return d.replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function fmtPhone(v) {
    let d = String(v).replace(/\D/g, "");
    if (d.startsWith("998")) d = d.slice(3);
    d = d.slice(0, 9);
    const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
    return p.length ? "+998 " + p.join(" ") : "";
  }
  function initFields(root) {
    $$("input[data-money]:not([data-init])", root).forEach((el) => {
      el.dataset.init = "1";
      el.value = fmtMoney(el.value);
      el.addEventListener("input", () => { el.value = fmtMoney(el.value); });
    });
    $$("input[data-phone]:not([data-init])", root).forEach((el) => {
      el.dataset.init = "1";
      if (el.value) el.value = fmtPhone(el.value);
      el.addEventListener("focus", () => { if (!el.value) el.value = "+998 "; });
      el.addEventListener("input", () => { el.value = fmtPhone(el.value); });
      el.addEventListener("blur", () => { if (el.value.trim() === "+998") el.value = ""; });
    });
    // summa tugmalari: [data-fill-target][data-fill-value]
    $$("[data-fill-target]:not([data-init])", root).forEach((b) => {
      b.dataset.init = "1";
      b.addEventListener("click", () => {
        const t = document.getElementById(b.dataset.fillTarget);
        if (t) { t.value = fmtMoney(b.dataset.fillValue); t.dispatchEvent(new Event("input")); t.focus(); }
      });
    });
    // avto-yashiriladigan toastlar
    $$(".c-toast[data-autohide]:not([data-init])", root).forEach((t) => { t.dataset.init = "1"; setTimeout(() => hideToast(t), 4500); });
    // server modali
    $$("dialog[data-server-modal]:not([data-init])", root).forEach((d) => { d.dataset.init = "1"; openDialog(d); });
    // davomat: "Hammasi keldi"
    $$("[data-att-all]:not([data-init])", root).forEach((b) => {
      b.dataset.init = "1";
      b.addEventListener("click", () => {
        $$('input[type=radio][value="present"]', b.closest("form")).forEach((r) => { r.checked = true; });
        updateAttCount(b.closest("form"));
      });
    });
    $$("form[data-att-form]:not([data-init])", root).forEach((f) => {
      f.dataset.init = "1";
      f.addEventListener("change", () => updateAttCount(f));
      updateAttCount(f);
    });
    // bosiladigan qator
    $$("tr[data-href]:not([data-init])", root).forEach((tr) => {
      tr.dataset.init = "1";
      tr.addEventListener("click", (e) => { if (!e.target.closest("a,button,input,label,select")) location.href = tr.dataset.href; });
    });
    // tasdiqlash: [data-confirm-type] — nom yozib tasdiqlash
    $$("[data-confirm-word]:not([data-init])", root).forEach((inp) => {
      inp.dataset.init = "1";
      const btn = document.getElementById(inp.dataset.confirmTarget);
      const check = () => { if (btn) btn.disabled = inp.value.trim().toLowerCase() !== inp.dataset.confirmWord.toLowerCase(); };
      inp.addEventListener("input", check);
      check();
    });
    // avto-submit (filtr select)
    $$("[data-autosubmit]:not([data-init])", root).forEach((el) => {
      el.dataset.init = "1";
      el.addEventListener("change", () => el.form && el.form.requestSubmit());
    });
    initKanban(root);
  }
  function updateAttCount(f) {
    if (!f) return;
    const c = { present: 0, absent: 0, excused: 0 };
    $$("input[type=radio]:checked", f).forEach((r) => { c[r.value] = (c[r.value] || 0) + 1; });
    const out = f.querySelector("[data-att-count]");
    if (out) out.textContent = `${tr("Keldi")}: ${c.present} · ${tr("Kelmadi")}: ${c.absent} · ${tr("Sababli")}: ${c.excused}`;
  }

  /* ---------------- kanban (drag & drop + klaviatura muqobili: kartadagi menyu) ---------------- */
  function initKanban(root) {
    $$("[data-kanban]:not([data-init])", root).forEach((board) => {
      board.dataset.init = "1";
      let dragged = null;
      board.addEventListener("dragstart", (e) => {
        const c = e.target.closest("[data-card]");
        if (!c) return;
        dragged = c;
        c.classList.add("is-dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      board.addEventListener("dragend", () => { if (dragged) dragged.classList.remove("is-dragging"); dragged = null; $$(".is-over", board).forEach((x) => x.classList.remove("is-over")); });
      board.addEventListener("dragover", (e) => { const col = e.target.closest("[data-stage]"); if (col && dragged) { e.preventDefault(); col.classList.add("is-over"); } });
      board.addEventListener("dragleave", (e) => { const col = e.target.closest("[data-stage]"); if (col && !col.contains(e.relatedTarget)) col.classList.remove("is-over"); });
      board.addEventListener("drop", (e) => {
        const col = e.target.closest("[data-stage]");
        if (!col || !dragged) return;
        e.preventDefault();
        col.classList.remove("is-over");
        const stage = col.dataset.stage;
        if (stage === dragged.closest("[data-stage]").dataset.stage) return;
        if (stage === "lost" || stage === "won") { htmx.ajax("GET", dragged.dataset.moveUrl + "?stage=" + stage, { target: "#modal-root", swap: "beforeend" }); return; }
        htmx.ajax("POST", dragged.dataset.moveUrl, { values: { stage }, target: "#lead-board", swap: "outerHTML" });
      });
    });
  }

  function initAll(root) { initFields(root || document); }

  /* ---------------- K11: raqamlar sanalishi (KPI va sayt statistikasi) ----------------
   * Faqat sahifa yuklanganda, bir marta; HTMX almashuvida emas. Matn formati saqlanadi (minglik bo'sh joy, kasr vergul, «mln so'm»).
   * reduced-motion yoki webdriver (ekran tekshiruvi) — o'tkazib yuboriladi. Oxirida asl matn qaytariladi. */
  function countUp() {
    if (calm() || navigator.webdriver) return;
    $$(".c-stat__value, .site-qad b.num, .site-jonli b.num").forEach((el) => {
      if (el.dataset.count) return;
      el.dataset.count = "1";
      const node = Array.from(el.childNodes).find((n) => n.nodeType === 3 && /\d/.test(n.nodeValue));
      if (!node) return;
      const original = node.nodeValue;
      const m = /^(\s*[+\-\u2212]?)(\d[\d\s\u00a0\u202f]*)(?:([.,])(\d+))?/.exec(original);
      if (!m) return;
      let intRaw = m[2];
      const tail = /[\s\u00a0\u202f]+$/.exec(intRaw);
      if (tail) intRaw = intRaw.slice(0, -tail[0].length);
      const sepM = /[\s\u00a0\u202f]/.exec(intRaw);
      const sep = sepM ? sepM[0] : "";
      const dec = m[4] || "";
      const target = parseFloat(intRaw.replace(/[\s\u00a0\u202f]/g, "") + (dec ? "." + dec : ""));
      if (!isFinite(target) || target <= 0) return;
      const rest = (tail ? tail[0] : "") + original.slice(m[0].length);
      const group = (s) => (sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s);
      const fmt = (v) => { const f = v.toFixed(dec.length); const parts = f.split("."); return m[1] + group(parts[0]) + (parts[1] ? m[3] + parts[1] : "") + rest; };
      const dur = 900, t0 = performance.now();
      node.nodeValue = fmt(0);
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        if (p < 1) { node.nodeValue = fmt(target * e); requestAnimationFrame(step); } else node.nodeValue = original;
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------------- HTMX ulanishi ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initAll(document);
    countUp();
  });
  document.addEventListener("htmx:configRequest", (e) => {
    const m = (e.detail.verb || "get").toUpperCase();
    if (m !== "GET") e.detail.headers["X-CSRFToken"] = csrf();
  });
  document.addEventListener("htmx:afterSwap", () => initAll(document));   // outerHTML almashtirishda ham (idempotent)
  document.addEventListener("htmx:afterSettle", () => initAll(document));
  // K11: HTMX almashuvidan keyin yangilangan blok yumshoq «yonadi» (.is-fresh → animationend) — foydalanuvchi nima o'zgarganini ko'radi
  document.addEventListener("htmx:afterSettle", (e) => {
    let t = e.detail && e.detail.target;
    if (t && !t.isConnected && t.id) t = document.getElementById(t.id);   // outerHTML almashuvida eski element — yangisini id bo'yicha topamiz
    if (!t || !t.classList || !t.isConnected || t === document.body || t.id === "modal-root" || calm()) return;
    t.classList.remove("is-fresh");
    void t.offsetWidth;   // qayta boshlash
    t.classList.add("is-fresh");
    t.addEventListener("animationend", (ev) => { if (ev.target === t) t.classList.remove("is-fresh"); }, { once: true });
  });
  document.addEventListener("htmx:beforeSwap", (e) => {
    const s = e.detail.xhr.status;
    if (s === 422 || s === 400) { e.detail.shouldSwap = true; e.detail.isError = false; }   // forma xatolari — fragment
    else if (s === 403) { e.detail.shouldSwap = false; toast(tr("Bu amal sizga ochiq emas"), "danger"); }
    else if (s === 404) { e.detail.shouldSwap = false; toast(tr("Topilmadi yoki o'chirilgan"), "danger"); }
    else if (s === 409) { e.detail.shouldSwap = false; toast(e.detail.xhr.responseText || tr("Ma'lumot o'zgargan — sahifani yangilang"), "warning"); }
    else if (s >= 500) { e.detail.shouldSwap = false; toast(tr("Texnik xato. Qayta urinib ko'ring."), "danger"); }
  });
  document.addEventListener("htmx:sendError", () => toast(tr("Internet aloqasi yo'q — qayta urinib ko'ring"), "danger"));
  document.addEventListener("htmx:timeout", () => toast(tr("Server javob bermadi — qayta urinib ko'ring"), "danger"));
  document.addEventListener("toast", (e) => { const d = e.detail || {}; toast(d.text || d.value || tr("Bajarildi"), d.kind || "success", d.undo); });
  document.addEventListener("closeModal", () => $$("dialog[open]").forEach(closeDialog));
  document.addEventListener("htmx:beforeRequest", (e) => {
    const b = e.detail.elt.matches("form") ? e.detail.elt.querySelector("[type=submit]") : (e.detail.elt.matches("button") ? e.detail.elt : null);
    if (b) { b.classList.add("is-loading"); b.setAttribute("aria-busy", "true"); }
  });
  document.addEventListener("htmx:afterRequest", (e) => {
    const b = e.detail.elt.matches("form") ? e.detail.elt.querySelector("[type=submit]") : (e.detail.elt.matches("button") ? e.detail.elt : null);
    if (b) { b.classList.remove("is-loading"); b.removeAttribute("aria-busy"); }
  });
  // oddiy (HTMX'siz) forma: ikki marta yuborishni oldini olish
  document.addEventListener("submit", (e) => {
    const f = e.target;
    if (f.hasAttribute("hx-post") || f.hasAttribute("hx-get")) return;
    const b = f.querySelector("[type=submit]");
    if (f.dataset.sent) { e.preventDefault(); return; }
    f.dataset.sent = "1";
    if (b) b.classList.add("is-loading");
    setTimeout(() => { delete f.dataset.sent; if (b) b.classList.remove("is-loading"); }, 8000);
  });
})();

/* --- K5 (UI): faol tab ko'rinadigan joyga aylantiriladi -------------------------------
   .c-tabs telefonda gorizontal aylanadi (scrollbar yashirin); faol tab o'ng chetda kesilib qolmasin.
   Faqat tab-panelning o'zi aylantiriladi (sahifa siljimaydi). HTMX almashtirgandan keyin ham. */
(() => {
  const centerActive = (root) => {
    (root || document).querySelectorAll(".c-tabs").forEach((t) => {
      if (t.scrollWidth <= t.clientWidth) return;
      const a = t.querySelector('[aria-current="page"],[aria-selected="true"],.is-active');
      if (!a) return;
      const tr = t.getBoundingClientRect(), ar = a.getBoundingClientRect();
      t.scrollLeft += (ar.left - tr.left) - (t.clientWidth - ar.width) / 2;
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => centerActive());
  else centerActive();
  document.addEventListener("htmx:afterSettle", (e) => centerActive(e.detail && e.detail.elt && e.detail.elt.parentElement));
})();

/* ===================== K5: internet yo'qligi (offline) banneri =====================
 * navigator.onLine=false yoki HTMX so'rovi tarmoq xatosi (htmx:sendError) bilan tugasa:
 *  - doimiy banner: "o'zgarishlar SAQLANMADI" (yuqoridagi toast ham qoladi);
 *  - method=post / hx-post formalarning yuborish tugmalari o'chiriladi, yuborish to'xtatiladi;
 *  - ochiq modal ichida ham ogohlantirish (dialog top-layer'da banner ko'rinmaydi).
 * Internet qaytganda (online hodisasi yoki /panel/healthz/ javob bersa) hammasi tiklanadi. */
(function () {
  "use strict";
  const T = {
    uz: { msg: "Internet aloqasi yo'q — o'zgarishlar SAQLANMADI, qayta urinib ko'ring", btn: "Qayta tekshirish" },
    ru: { msg: "Нет подключения к интернету — изменения НЕ СОХРАНЕНЫ, попробуйте ещё раз", btn: "Проверить снова" },
    cyrl: { msg: "Интернет алоқаси йўқ — ўзгаришлар САҚЛАНМАДИ, қайта уриниб кўринг", btn: "Қайта текшириш" },
  };
  const t = (k) => {
    const l = (document.documentElement.lang || "").toLowerCase();
    return (l === "uz-cyrl" ? T.cyrl : l.slice(0, 2) === "ru" ? T.ru : T.uz)[k];
  };
  const PING = "/panel/healthz/";
  let offline = false;
  let timer = null;

  const isPostForm = (f) => (f.getAttribute("method") || "").toLowerCase() === "post" || f.hasAttribute("hx-post");

  function banner() {
    let b = document.getElementById("net-banner");
    if (b) return b;
    b = document.createElement("div");
    b.id = "net-banner";
    b.className = "net-banner";
    b.setAttribute("role", "alert");
    b.hidden = true;
    const s = document.createElement("span");
    s.textContent = t("msg");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "c-btn c-btn--secondary c-btn--sm";
    btn.textContent = t("btn");
    btn.addEventListener("click", ping);
    b.appendChild(s);
    b.appendChild(btn);
    document.body.insertBefore(b, document.body.firstChild);
    return b;
  }

  function apply(root) {
    (root || document).querySelectorAll("form").forEach((f) => {
      if (!isPostForm(f)) return;
      f.classList.toggle("is-offline", offline);
      f.querySelectorAll("button:not([type]), button[type=submit], input[type=submit]").forEach((btn) => {
        if (offline && !btn.disabled) { btn.disabled = true; btn.dataset.netOff = "1"; }
        else if (!offline && btn.dataset.netOff) { btn.disabled = false; delete btn.dataset.netOff; }
      });
    });
    document.querySelectorAll("dialog[open] .c-modal__body").forEach((body) => {
      const a = body.querySelector("[data-net-alert]");
      if (offline && !a) {
        const d = document.createElement("div");
        d.className = "c-alert c-alert--danger";
        d.setAttribute("role", "alert");
        d.dataset.netAlert = "1";
        const x = document.createElement("div");
        x.className = "c-alert__body";
        x.textContent = t("msg");
        d.appendChild(x);
        body.insertBefore(d, body.firstChild);
      } else if (!offline && a) a.remove();
    });
  }

  function set(state) {
    if (offline === state) { if (state) apply(); return; }
    offline = state;
    document.documentElement.classList.toggle("is-offline", state);
    banner().hidden = !state;
    apply();
    clearInterval(timer);
    timer = state ? setInterval(ping, 8000) : null;
  }

  function ping() {
    if (navigator.onLine === false) { set(true); return; }
    fetch(PING, { cache: "no-store", credentials: "same-origin" })
      .then(() => set(false))   // server javob berdi (hatto 503 bo'lsa ham) — tarmoq bor
      .catch(() => set(true));
  }

  document.addEventListener("htmx:sendError", () => set(true));
  window.addEventListener("offline", () => set(true));
  window.addEventListener("online", ping);
  document.addEventListener("htmx:afterSettle", () => { if (offline) apply(); });
  document.addEventListener("htmx:afterRequest", (e) => { if (offline && e.detail && e.detail.xhr && e.detail.xhr.status > 0) set(false); });
  // offline paytida yuborishni to'xtatish (Enter bilan ham)
  document.addEventListener("submit", (e) => { if (offline && isPostForm(e.target)) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  document.addEventListener("htmx:beforeRequest", (e) => {
    const v = ((e.detail.requestConfig && e.detail.requestConfig.verb) || "get").toLowerCase();
    if (!offline || v === "get") return;
    e.preventDefault();
    const el = e.detail.elt;
    const b = el && el.matches && (el.matches("form") ? el.querySelector("[type=submit]") : (el.matches("button") ? el : null));
    if (b) { b.classList.remove("is-loading"); b.removeAttribute("aria-busy"); }
  });
  const start = () => { if (navigator.onLine === false) set(true); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

/* ---------------------------------------------------------------- grafik tooltip (K8): [data-chart] ichidagi [data-tip] guruhlar.
   Sichqoncha, barmoq va klaviatura (Tab) bilan ishlaydi; CSP-xavfsiz (inline handler yo'q). */
(function () {
  let tip = null;
  function el() {
    if (!tip) { tip = document.createElement("div"); tip.className = "vchart-tip"; tip.setAttribute("role", "status"); tip.hidden = true; document.body.appendChild(tip); }
    return tip;
  }
  function show(g, x, y) {
    const t = el();
    t.textContent = g.getAttribute("data-tip").replace(/ · /g, "\n");
    t.style.whiteSpace = "pre-line";
    t.hidden = false;
    const r = t.getBoundingClientRect();
    let left = x + 14, top = y - r.height - 12;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top < 8) top = y + 16;
    t.style.left = Math.max(8, left) + "px";
    t.style.top = top + "px";
  }
  function hide() { if (tip) tip.hidden = true; }
  document.addEventListener("pointermove", (e) => {
    const g = e.target.closest && e.target.closest("[data-chart] [data-tip]");
    if (g) show(g, e.clientX, e.clientY); else hide();
  });
  document.addEventListener("focusin", (e) => {
    const g = e.target.closest && e.target.closest("[data-chart] [data-tip]");
    if (g) { const b = g.getBoundingClientRect(); show(g, b.left + b.width / 2, b.top + 20); }
  });
  document.addEventListener("focusout", hide);
  window.addEventListener("scroll", hide, { passive: true });
})();
