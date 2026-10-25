// Atlantis 4 — ko'rish nusxasi (statik). Saqlash/yuborish o'chirilgan; kirish sahifasidagi demo tugmalar rol sahifalariga olib boradi.
(function () {
  "use strict";
  var CFG = window.DEMO_CFG || {};
  var MSG = "Bu ko'rish uchun nusxa: ma'lumot kiritish va saqlash faqat haqiqiy tizimda ishlaydi.";

  function toast(text) {
    var t = document.getElementById("demo-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "demo-toast";
      t.setAttribute("role", "status");
      t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;max-width:min(92vw,460px);padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;font:500 14px/1.4 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.25);transition:opacity .2s";
      document.body.appendChild(t);
    }
    t.textContent = text || MSG;
    t.style.opacity = "1";
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.style.opacity = "0"; }, 3200);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-demo-off]");
    if (a) { e.preventDefault(); e.stopImmediatePropagation(); toast("Bu sahifa ko'rish nusxasiga kiritilmagan."); }
  }, true);

  document.addEventListener("submit", function (e) {
    var f = e.target;
    var uid = f.querySelector("input[name=uid]");
    var phone = f.querySelector("input[name=phone][type=hidden]");
    e.preventDefault();
    e.stopImmediatePropagation();
    if (uid && CFG.uids && CFG.uids[uid.value]) { location.href = CFG.uids[uid.value]; return; }
    if (phone && CFG.parent) { location.href = CFG.parent; return; }
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

  // chiqish tugmasi -> kirish sahifasi
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("form[action*='chiqish'] button, a[href*='chiqish']");
    if (b && CFG.login) { e.preventDefault(); e.stopImmediatePropagation(); location.href = CFG.login; }
  }, true);

  // kichik «Ko'rish nusxasi» belgisi
  document.addEventListener("DOMContentLoaded", function () {
    var p = document.createElement("a");
    p.href = CFG.login || "#";
    p.textContent = "Ko'rish nusxasi · rolni almashtirish";
    p.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:9998;padding:6px 10px;border-radius:999px;background:rgba(15,23,42,.78);color:#fff;font:500 12px/1.2 system-ui,sans-serif;text-decoration:none;backdrop-filter:blur(4px)";
    if (!document.querySelector("input[name=uid]")) document.body.appendChild(p);
  });
})();
