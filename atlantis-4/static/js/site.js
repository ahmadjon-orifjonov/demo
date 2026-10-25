/* Ochiq sayt: kichik yaxshilashlar (CSP-xavfsiz: inline handler yo'q, eval yo'q). JS o'chiq bo'lsa ham sayt to'liq ishlaydi.
 *  1) Scroll'da paydo bo'lish (.rv): avval ekrandagilar ko'rsatiladi, keyin <html> ga .js qo'yiladi — JS'siz hech narsa yashirilmaydi.
 *  2) Sarlavha paneli scroll'da soya oladi.
 *  3) Kurslar: yo'nalish chiplari sahifani qayta yuklamasdan filtrlaydi (JS'siz — ?kat= havola, server filtrlaydi).
 *  4) Mobil menyu: havola bosilganda / tashqariga bosilganda / Esc — yopiladi.
 *  5) K11: «Yana N ta kurs» — avval 8 ta karta (CSS), tugma bosilganda qolganlari ketma-ket ochiladi; yo'nalish chipi bosilsa hammasi ochiladi.
 */
(function () {
  "use strict";
  var root = document.documentElement;
  if (!document.body || !document.body.classList.contains("site")) return;

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
  if (bar && grid) {
    bar.addEventListener("click", function (ev) {
      var chip = ev.target.closest("a[data-kat]");
      if (!chip || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      ev.preventDefault();
      var kat = chip.getAttribute("data-kat");
      openAll(false);   // filtrdan keyin «8 ta» chegarasi ma'nosiz — hammasi ochiq
      Array.prototype.forEach.call(bar.querySelectorAll("a[data-kat]"), function (a) {
        var on = a === chip;
        a.classList.toggle("is-on", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
      Array.prototype.forEach.call(grid.querySelectorAll("[data-kat]"), function (card) {
        card.hidden = !!kat && card.getAttribute("data-kat") !== kat;
        if (!card.hidden) card.classList.add("in");
      });
      try {
        var u = new URL(window.location.href);
        if (kat) u.searchParams.set("kat", kat); else u.searchParams.delete("kat");
        u.hash = "kurslar";
        window.history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) { /* eski brauzer — URL o'zgarmaydi, filtr baribir ishlaydi */ }
    });
  }

  // ---------- 4) mobil menyu
  var menu = document.querySelector("[data-site-menu]");
  if (menu) {
    menu.addEventListener("click", function (ev) { if (ev.target.closest(".site-menu__panel a")) menu.open = false; });
    document.addEventListener("click", function (ev) { if (menu.open && !menu.contains(ev.target)) menu.open = false; });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary").focus(); } });
  }
})();
