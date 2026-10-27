// Atlantis 4 — ko'rish nusxasi (statik). Saqlash/yuborish o'chirilgan; kirish sahifasidagi demo tugmalar rol sahifalariga olib boradi.
(function () {
  "use strict";
  var CFG = window.DEMO_CFG || {};
  var MSG = "Bu ko'rish uchun nusxa: ma'lumot kiritish va saqlash faqat haqiqiy tizimda ishlaydi.";
  var OFF_TITLE = "Ko'rish nusxasida ochilmaydi";

  // POST/PUT/PATCH/DELETE fetch (mavzu tugmasi va h.k.) — GitHub Pages 405 bermasin: jim 204
  var _fetch = window.fetch;
  if (_fetch) {
    window.fetch = function (u, o) {
      var m = (o && o.method) || (u && typeof u === "object" && u.method) || "get";
      if (/^(post|put|patch|delete)$/i.test(m)) return Promise.resolve(new Response("", { status: 204 }));
      return _fetch.apply(this, arguments);
    };
  }

  // uslub — statik nusxada JS yaratadi (brend tokenlari, fallback bilan)
  var css = document.createElement("style");
  css.textContent =
    ".is-demo-off{opacity:.55!important;cursor:not-allowed!important}" +
    "#demo-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;max-width:min(92vw,460px);padding:12px 16px;" +
    "border-radius:var(--r-lg,12px);background:var(--site-pan,var(--surface-inverse,#0f172a));color:var(--brand-contrast,#fff);" +
    "font:500 var(--fs-14,14px)/1.4 var(--font,system-ui,sans-serif);box-shadow:var(--shadow-lg,0 10px 30px rgba(0,0,0,.25));opacity:0;transition:opacity .2s;pointer-events:none}" +
    "#demo-badge{position:fixed;right:12px;bottom:12px;z-index:9998;padding:6px 10px;border-radius:999px;background:var(--site-pan,#0f172a);opacity:.86;" +
    "color:var(--brand-contrast,#fff);font:500 12px/1.2 var(--font,system-ui,sans-serif);text-decoration:none;backdrop-filter:blur(4px)}" +
    "#demo-badge:hover{opacity:1}";
  (document.head || document.documentElement).appendChild(css);

  function toast(text) {
    text = text || MSG;
    if (typeof window.atlToast === "function") { try { window.atlToast(text); return; } catch (_) {} }   // panel: o'z toast'i
    var t = document.getElementById("demo-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "demo-toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.style.opacity = "1";
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.style.opacity = "0"; }, 3200);
  }

  // yig'ilmagan havolalar — ko'rinishi ham bosilmaydigan bo'lsin
  function markOff(root) {
    var list = (root || document).querySelectorAll("[data-demo-off]:not(.is-demo-off)");
    Array.prototype.forEach.call(list, function (el) {
      el.classList.add("is-demo-off");
      if (!el.title) el.title = OFF_TITLE;
    });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-demo-off]");
    if (!a) return;
    if (a.hasAttribute("data-kat")) return;   // yo'nalish chiplari — site.js sahifaning o'zida filtrlaydi
    e.preventDefault(); e.stopImmediatePropagation();
    toast("Bu sahifa ko'rish nusxasiga kiritilmagan.");
  }, true);

  document.addEventListener("submit", function (e) {
    var f = e.target;
    var uid = f.querySelector("input[name=uid]");
    var phone = f.querySelector("input[name=phone][type=hidden]");
    // saytdagi «Qulay vaqt» / «Daraja» formalari — site.js sahifaning o'zida hal qiladi
    if (f.hasAttribute("data-finder") || f.hasAttribute("data-level")) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (uid && CFG.uids && CFG.uids[uid.value]) { location.href = CFG.uids[uid.value]; return; }
    if (phone && CFG.parent) { location.href = CFG.parent; return; }
    if (f.querySelector("[name=language]")) { toast("Til haqiqiy tizimda almashadi (saytda — yuqoridagi UZ/ЎЗ/RU)."); return; }
    // sayt arizasi: maydonlar to'ldirilgan bo'lsa — «Rahmat» sahifasi (haqiqiy tizimda lid yaratiladi)
    if (f.classList.contains("site-form") && CFG.thanks) {
      var ok = true;
      Array.prototype.forEach.call(f.querySelectorAll("input[required], select[required], textarea[required]"), function (i) {
        var bad = i.type === "checkbox" ? !i.checked : !i.value.trim();
        var wrap = i.closest(".c-field") || i;
        wrap.classList.toggle("is-invalid", bad);
        if (bad) i.setAttribute("aria-invalid", "true"); else i.removeAttribute("aria-invalid");
        if (bad && ok) { ok = false; i.focus(); }
      });
      if (ok) { location.href = CFG.thanks; return; }
      toast("Iltimos, yulduzchali maydonlarni to'ldiring.");
      return;
    }
    if ((f.method || "get").toLowerCase() === "get" && f.getAttribute("action") && f.getAttribute("action") !== "#") {
      // qidiruv/filtr formalari — natija sahifasi yig'ilmagan bo'lishi mumkin
      toast("Qidiruv va filtrlar haqiqiy tizimda ishlaydi.");
      return;
    }
    toast(document.querySelector("input[name=uid]") ? "Pastdagi namunaviy xodim tugmalaridan birini bosing." : MSG);
  }, true);

  document.addEventListener("htmx:beforeRequest", function (e) {
    var v = ((e.detail.requestConfig && e.detail.requestConfig.verb) || "get").toLowerCase();
    if (v !== "get") { e.preventDefault(); toast(); }
  });
  // statik faylda xato bo'lsa jim o'tamiz (oflayn tasmasini ham ko'rsatmaymiz)
  document.addEventListener("htmx:responseError", function (e) { e.stopImmediatePropagation(); }, true);
  document.addEventListener("htmx:sendError", function (e) { e.stopImmediatePropagation(); }, true);
  document.addEventListener("htmx:afterSettle", function (e) { markOff(e.target && e.target.querySelectorAll ? e.target : null); });

  // chiqish tugmasi -> kirish sahifasi
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("form[action*='chiqish'] button, a[href*='chiqish']");
    if (b && CFG.login) { e.preventDefault(); e.stopImmediatePropagation(); location.href = CFG.login; }
  }, true);

  // kichik «Ko'rish nusxasi» belgisi
  document.addEventListener("DOMContentLoaded", function () {
    markOff();
    var p = document.createElement("a");
    p.id = "demo-badge";
    p.href = CFG.login || "#";
    p.textContent = "Ko'rish nusxasi · rolni almashtirish";
    // telefonda sayt pastki paneli (.site-mob) yoki panel pastki bari (.tabbar) bilan ustma-ust tushmasin
    var bar = document.querySelector(".site-mob, .tabbar");
    var place = function () { p.style.bottom = (bar && getComputedStyle(bar).display !== "none") ? (bar.offsetHeight + 8) + "px" : "12px"; };
    place();
    window.addEventListener("resize", place);
    if (!document.querySelector("input[name=uid]")) document.body.appendChild(p);
  });
})();
