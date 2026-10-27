/* Ochiq sayt: kichik yaxshilashlar (CSP-xavfsiz: inline handler yo'q, eval yo'q). JS o'chiq bo'lsa ham sayt to'liq ishlaydi.
 *  1) Scroll'da paydo bo'lish (.rv): avval ekrandagilar ko'rsatiladi, keyin <html> ga .js qo'yiladi — JS'siz hech narsa yashirilmaydi.
 *  2) Sarlavha paneli scroll'da soya oladi.
 *  3) Kurslar: yo'nalish chiplari sahifani qayta yuklamasdan filtrlaydi (JS'siz — ?kat= havola, server filtrlaydi). ?kat= bilan ochilsa — darhol qo'llanadi.
 *  4) Mobil menyu: havola bosilganda / tashqariga bosilganda / Esc — yopiladi.
 *  5) K11: «Yana N ta kurs» — avval 8 ta karta (CSS), tugma bosilganda qolganlari ketma-ket ochiladi; yo'nalish chipi bosilsa hammasi ochiladi.
 *  6) MAX: «Qulay vaqt» va «Darajani aniqlash» — serverga bormasdan, sahifadagi ma'lumot (data-days/data-slot, data-daraja) bo'yicha
 *     darhol ko'rsatiladi (statik ko'rish nusxasida ham ishlaydi). JS'siz — oddiy GET forma, server javob beradi.
 *  7) MAX: ?kurs=<slug>, ?vaqt=, ?daraja= bilan ochilganda forma/natija oldindan to'ldiriladi (kurs kartasidan «Yozilish» → ariza).
 */
(function () {
  "use strict";
  var root = document.documentElement;
  if (!document.body || !document.body.classList.contains("site")) return;
  var params;
  try { params = new URLSearchParams(window.location.search); } catch (e) { params = null; }
  var q = function (k) { return params ? (params.get(k) || "") : ""; };
  var esc = function (v) { return String(v).replace(/["\\]/g, ""); };

  // ---------- 1) paydo bo'lish
  var items = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  var calm = (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || navigator.webdriver;
  var io = null;
  var vh = window.innerHeight || root.clientHeight;
  items.forEach(function (el) { if (el.getBoundingClientRect().top < vh) el.classList.add("in"); });
  if (calm) root.classList.add("rv-off");   // reduced-motion / webdriver: kirish animatsiyasisiz, darhol ko'rinadi
  if (calm || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { if (!el.classList.contains("in")) io.observe(el); });
  }
  root.classList.add("js");

  // ---------- 2) sarlavha soyasi
  var hd = document.querySelector("[data-site-header]");
  if (hd) {
    var onScroll = function () { hd.classList.toggle("is-solid", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setUrl(fn) {
    try {
      var u = new URL(window.location.href);
      fn(u);
      window.history.replaceState(null, "", u.pathname + u.search + u.hash);
    } catch (e) { /* eski brauzer — URL o'zgarmaydi, filtr baribir ishlaydi */ }
  }

  // ---------- 3) yo'nalish filtri
  var bar = document.querySelector("[data-kbar]");
  var grid = document.querySelector("[data-kgrid]");
  var more = document.querySelector("[data-kmore]");
  // ---------- 5) «Yana N ta kurs»: yashirin kartalar ketma-ket (45 ms qadam) paydo bo'ladi
  function openAll(animate) {
    if (!grid || grid.classList.contains("is-open")) return;
    var hidden = Array.prototype.slice.call(grid.querySelectorAll(".site-kk")).filter(function (c) { return !c.classList.contains("in") || getComputedStyle(c).display === "none"; });
    grid.classList.add("is-open");
    hidden.forEach(function (c, i) {
      if (io) io.unobserve(c);
      if (animate && !calm) {
        c.style.setProperty("animation-delay", (i % 12) * 45 + "ms");   // CSSOM — CSP ruxsat beradi (inline atribut emas)
        c.addEventListener("animationend", function () { c.style.removeProperty("animation-delay"); }, { once: true });
      }
      c.classList.add("in");
    });
  }
  if (more && grid) {
    more.addEventListener("click", function () {
      var first = grid.querySelector(".site-kk:nth-child(9)");
      openAll(true);
      if (first && first.focus) { first.querySelector("a") && first.querySelector("a").focus({ preventScroll: true }); }
    });
  }
  function applyKat(chip, pushUrl) {
    var kat = chip.getAttribute("data-kat");
    if (kat) openAll(false);   // filtrdan keyin «8 ta» chegarasi ma'nosiz — hammasi ochiq
    Array.prototype.forEach.call(bar.querySelectorAll("a[data-kat]"), function (a) {
      var on = a === chip;
      a.classList.toggle("is-on", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-kat]"));
    // FLIP: qolgan kartalar eski joyidan yangi joyiga «suzadi», yangi chiqqanlari pastdan kiradi (transform/opacity — reflow yo'q)
    var first = calm ? null : cards.map(function (c) { return c.hidden ? null : c.getBoundingClientRect(); });
    cards.forEach(function (card, i) {
      var was = !card.hidden;
      card.hidden = !!kat && card.getAttribute("data-kat") !== kat;
      if (!card.hidden) card.classList.add("in");
      card.classList.toggle("is-enter", !calm && !card.hidden && !was);
    });
    if (first) {
      cards.forEach(function (c, i) {
        var f = first[i];
        if (!f || c.hidden) return;
        var l = c.getBoundingClientRect(), dx = f.left - l.left, dy = f.top - l.top;
        if (!dx && !dy) return;
        c.classList.add("is-flip");
        c.style.setProperty("transform", "translate(" + dx + "px," + dy + "px)");
        requestAnimationFrame(function () {
          c.classList.remove("is-flip");
          c.style.removeProperty("transform");
        });
      });
    }
    if (pushUrl) setUrl(function (u) { if (kat) u.searchParams.set("kat", kat); else u.searchParams.delete("kat"); u.hash = "kurslar"; });
  }
  if (bar && grid) {
    bar.addEventListener("click", function (ev) {
      var chip = ev.target.closest("a[data-kat]");
      if (!chip || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      ev.preventDefault();
      applyKat(chip, true);
    });
    // statik nusxa / to'g'ridan-to'g'ri ?kat= havola: server filtrlamagan bo'lsa ham chip bo'yicha ko'rsatiladi
    var wantKat = q("kat");
    if (wantKat) {
      var chipOn = bar.querySelector('a[data-kat="' + esc(wantKat) + '"]');
      if (chipOn && !chipOn.classList.contains("is-on")) applyKat(chipOn, false);
    }
  }

  // ---------- 4) mobil menyu
  var menu = document.querySelector("[data-site-menu]");
  function closeMenu(focusBack) {
    if (!menu || !menu.open) return;
    var p = menu.querySelector(".site-menu__panel");
    var done = function () { p.classList.remove("is-closing"); menu.open = false; if (focusBack) menu.querySelector("summary").focus(); };
    if (calm || !p) { done(); return; }
    p.classList.add("is-closing");
    p.addEventListener("animationend", done, { once: true });
  }
  if (menu) {
    menu.addEventListener("click", function (ev) { if (ev.target.closest(".site-menu__panel a")) closeMenu(false); });
    document.addEventListener("click", function (ev) { if (menu.open && !menu.contains(ev.target)) closeMenu(false); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && menu.open) closeMenu(true); });
  }

  // ---------- 10b) ochiladigan bloklar (til, ustoz tajribasi): tashqariga bosilganda / Esc da yopiladi
  var dds = Array.prototype.slice.call(document.querySelectorAll("details[data-close-outside]"));
  if (dds.length) {
    document.addEventListener("click", function (ev) { dds.forEach(function (d) { if (d.open && !d.contains(ev.target)) d.open = false; }); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") dds.forEach(function (d) { if (d.open) { d.open = false; d.querySelector("summary").focus(); } }); });
  }

  // ---------- 11) menyu: qaysi bo'limdasiz — pastki chiziq (scrollspy)
  var navLinks = {};
  Array.prototype.forEach.call(document.querySelectorAll(".site-nav a[href*='#']"), function (a) {
    var h = a.getAttribute("href").split("#")[1];
    if (h) navLinks[h] = a;
  });
  if ("IntersectionObserver" in window && Object.keys(navLinks).length) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("is-active"); });
        var a = navLinks[e.target.id];
        if (a) a.classList.add("is-active");   // menyuda yo'q bo'lim (natijalar, nega biz) — hech biri yonmaydi
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Array.prototype.forEach.call(document.querySelectorAll("main section[id]"), function (sec) { spy.observe(sec); });
  }

  // ---------- 12) ariza formasi: yuborishda tugma «yuklanmoqda» (ikki marta bosilmaydi); maydonlar bo'sh bo'lsa — to'xtatiladi
  Array.prototype.forEach.call(document.querySelectorAll("form.site-form"), function (f) {
    f.addEventListener("submit", function (ev) {
      var bad = Array.prototype.filter.call(f.querySelectorAll("input[required], select[required]"), function (i) {
        var b = i.type === "checkbox" ? !i.checked : !String(i.value || "").trim();
        i.classList.toggle("is-invalid", b);
        return b;
      });
      if (bad.length) { ev.preventDefault(); bad[0].focus(); if (bad[0].reportValidity) bad[0].reportValidity(); return; }
      var b = f.querySelector("[data-submit]");
      if (b) { b.classList.add("is-loading"); b.setAttribute("aria-busy", "true"); setTimeout(function () { b.classList.remove("is-loading"); b.removeAttribute("aria-busy"); }, 8000); }
    });
    Array.prototype.forEach.call(f.querySelectorAll("input, select"), function (i) {
      i.addEventListener("input", function () { i.classList.remove("is-invalid"); });
      i.addEventListener("change", function () { i.classList.remove("is-invalid"); });
    });
  });

  // ---------- 13) kurs kartasi -> kurs sahifasi: bosilgan muqova «kattalashib» sahifaga aylanadi (View Transitions bor brauzerda)
  if (grid && document.startViewTransition) {
    grid.addEventListener("click", function (ev) {
      var card = ev.target.closest(".site-kk");
      if (!card || !ev.target.closest("a")) return;
      Array.prototype.forEach.call(grid.querySelectorAll(".site-kk.is-vt"), function (c) { c.classList.remove("is-vt"); });
      card.classList.add("is-vt");
    });
  }

  // ---------- 6a) «Qulay vaqt» — mahalliy filtr
  var jf = document.querySelector("form[data-finder]");
  var out = document.getElementById("vaqt-natija");
  function runFinder(pushUrl) {
    var days = Array.prototype.map.call(jf.querySelectorAll('input[name="kun"]:checked'), function (i) { return i.value; });
    var slotEl = jf.querySelector('input[name="vaqt"]:checked');
    var slot = slotEl ? slotEl.value : "";
    var searched = days.length > 0 || !!slot;
    var fits = function (el) {
      var d = (el.getAttribute("data-days") || "").split(",").filter(Boolean);
      if (days.length && !d.some(function (x) { return days.indexOf(x) >= 0; })) return false;
      if (slot && el.getAttribute("data-slot") !== slot) return false;
      return true;
    };
    var n = 0;
    Array.prototype.forEach.call(out.querySelectorAll(".site-gc[data-days]"), function (el) { el.classList.toggle("is-dim", !fits(el)); });
    Array.prototype.forEach.call(out.querySelectorAll(".site-jcard[data-days]"), function (el) { var ok = fits(el); el.hidden = !ok; if (ok) n++; });
    var jl = out.querySelector("[data-jl]");
    if (jl) jl.textContent = !searched ? jl.getAttribute("data-jl-all") : (n === 1 ? jl.getAttribute("data-jl-one") : jl.getAttribute("data-jl-many").replace("%N", String(n)));
    var jad = out.querySelector(".site-jad"), jlist = out.querySelector(".site-jlist"), empty = out.querySelector("[data-finder-empty]");
    if (jad) jad.hidden = n === 0;
    if (jlist) jlist.hidden = n === 0;
    if (empty) empty.hidden = n !== 0;
    var ap = out.querySelector("[data-finder-apply]");
    if (ap) { try { var au = new URL(ap.getAttribute("href"), window.location.href); if (slot) au.searchParams.set("vaqt", slot); else au.searchParams.delete("vaqt"); ap.setAttribute("href", au.pathname + au.search); } catch (e) { /* eski brauzer */ } }
    Array.prototype.forEach.call(out.querySelectorAll(".site-jt__h[data-day]"), function (h) { h.classList.toggle("is-on", days.indexOf(h.getAttribute("data-day")) >= 0); });
    if (pushUrl) setUrl(function (u) {
      u.searchParams.delete("kun"); u.searchParams.delete("vaqt");
      days.forEach(function (d) { u.searchParams.append("kun", d); });
      if (slot) u.searchParams.set("vaqt", slot);
      u.hash = "vaqt";
    });
  }
  if (jf && out) {
    jf.addEventListener("change", function () { runFinder(true); });
    jf.addEventListener("submit", function (ev) { ev.preventDefault(); runFinder(true); });
    // ?vaqt=/?kun= bilan kelganda (statik nusxada server filtrlamagan) — darhol qo'llanadi
    if (params && (params.has("kun") || params.has("vaqt"))) {
      params.getAll("kun").forEach(function (d) { var i = jf.querySelector('input[name="kun"][value="' + esc(d) + '"]'); if (i) i.checked = true; });
      var sv = q("vaqt"), sr = sv && jf.querySelector('input[name="vaqt"][value="' + esc(sv) + '"]');
      if (sr) sr.checked = true;
      runFinder(false);
    }
  }

  // ---------- 6b) «Darajani aniqlash» — natija sahifada tayyor, faqat ko'rsatiladi
  var lf = document.querySelector("form[data-level]");
  var lout = document.getElementById("daraja-natija");
  function showLevel(val) {
    var any = false;
    Array.prototype.forEach.call(lout.querySelectorAll("[data-daraja]"), function (el) {
      var on = el.getAttribute("data-daraja") === val;
      if (on && el.hidden) { el.hidden = false; el.classList.remove("is-again"); void el.offsetWidth; el.classList.add("is-again"); }
      else if (!on) el.hidden = true;
      if (on) any = true;
    });
    var d1 = lout.querySelector('[data-daraja-note="done"]'), d0 = lout.querySelector('[data-daraja-note="empty"]');
    if (d1) d1.hidden = !any;
    if (d0) d0.hidden = any;
  }
  if (lf && lout) {
    lf.addEventListener("change", function (ev) {
      var r = ev.target.closest('input[name="daraja"]');
      if (!r) return;
      showLevel(r.value);
      setUrl(function (u) { u.searchParams.set("daraja", r.value); u.hash = "daraja"; });
    });
    lf.addEventListener("submit", function (ev) { ev.preventDefault(); var r = lf.querySelector('input[name="daraja"]:checked'); if (r) showLevel(r.value); });
    var wantLv = q("daraja");
    if (wantLv) { var lr = lf.querySelector('input[name="daraja"][value="' + esc(wantLv) + '"]'); if (lr) { lr.checked = true; showLevel(wantLv); } }
  }

  // ---------- 8) telefon maskasi (+998 90 123 45 67) — app.js dagi bilan bir xil qoida; sayt app.js yuklamaydi
  function fmtPhone(v) {
    var d = String(v).replace(/\D/g, "");
    if (d.indexOf("998") === 0) d = d.slice(3);
    d = d.slice(0, 9);
    var p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
    return p.length ? "+998 " + p.join(" ") : "";
  }
  Array.prototype.forEach.call(document.querySelectorAll("input[data-phone]:not([data-init])"), function (el) {
    el.dataset.init = "1";
    if (el.value) el.value = fmtPhone(el.value);
    el.addEventListener("focus", function () { if (!el.value) el.value = "+998 "; });
    el.addEventListener("input", function () { el.value = fmtPhone(el.value); });
    el.addEventListener("blur", function () { if (el.value.trim() === "+998") el.value = ""; });
  });

  // ---------- 9) raqamlar sanalishi (hero statistikasi) — faqat butun sonlar, narx emas; reduced-motion/webdriver da yo'q
  if (!calm && document.visibilityState !== "hidden") {   // yashirin tabda rAF to'xtaydi — animatsiyasiz, raqam o'zgarmaydi
    Array.prototype.forEach.call(document.querySelectorAll(".site-qad li:not(.site-qad__price) b.num, .site-jonli b.num, .site-stat b.num"), function (el) {
      var node = Array.prototype.filter.call(el.childNodes, function (n) { return n.nodeType === 3 && /\d/.test(n.nodeValue); })[0];
      if (!node) return;
      var original = node.nodeValue;
      var m = /^(\s*)(\d[\d\s ]*?)(\s*\D.*)?$/.exec(original);
      if (!m) return;
      var target = parseInt(m[2].replace(/\D/g, ""), 10);
      if (!isFinite(target) || target <= 0 || target > 99999) return;
      var rest = m[3] || "";
      var dur = 900, t0 = null;
      node.nodeValue = m[1] + "0" + rest;
      var done = false;
      var step = function (now) {
        if (done) return;
        if (t0 === null) t0 = now;
        var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        if (p < 1) { node.nodeValue = m[1] + String(Math.round(target * e)) + rest; requestAnimationFrame(step); } else { done = true; node.nodeValue = original; }
      };
      requestAnimationFrame(step);
      setTimeout(function () { done = true; node.nodeValue = original; }, dur + 400);   // kafolat: rAF kechiksa ham asl raqam qaytadi
    });
  }

  // ---------- 10) xabar (toast) avtomatik yopilishi — base.html dagi messages (app.js saytda yo'q)
  Array.prototype.forEach.call(document.querySelectorAll(".c-toast[data-autohide]"), function (t) {
    setTimeout(function () { t.classList.add("is-hide"); setTimeout(function () { t.remove(); }, 400); }, 5000);
  });

  // ---------- 7) ariza formasi: ?kurs=<slug> va ?vaqt= oldindan tanlanadi (server initial bergan bo'lsa — tegilmaydi)
  var slug = q("kurs");
  if (slug) {
    Array.prototype.forEach.call(document.querySelectorAll("form.site-form select"), function (sel) {
      if (sel.value) return;
      var opt = sel.querySelector('option[data-slug="' + esc(slug) + '"]');
      if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event("change", { bubbles: true })); }
    });
  }
  var slotMap = { ertalab: "Ertalab", kunduzi: "Tushdan keyin", kechqurun: "Kechqurun" };
  var pv = slotMap[q("vaqt")];
  if (pv) {
    Array.prototype.forEach.call(document.querySelectorAll('form.site-form input[name="preferred_time"]'), function (r) { if (r.value === pv) r.checked = true; });
  }
})();
