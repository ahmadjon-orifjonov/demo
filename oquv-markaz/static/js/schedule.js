/* Namuna — jadval (K10): legenda bo'yicha ajratish va hozirgi vaqt chizig'ini daqiqagacha aniqlash.
 * JS bo'lmasa ham sahifa to'liq ishlaydi (chiziq 15 daqiqa aniqlikda turadi, legenda shunchaki belgi).
 * CSP: inline handler yo'q; uslub faqat CSS o'zgaruvchisi orqali (CSSOM). */
(function () {
  "use strict";

  function initLegend(root) {
    const box = root.querySelector("[data-sched-legend]");
    if (!box || box.dataset.init) return;
    box.dataset.init = "1";
    const items = () => root.querySelectorAll(".c-cal__ev[data-cat], .day-ev[data-cat]");
    box.addEventListener("click", (e) => {
      const chip = e.target.closest ? e.target.closest(".sched-chip[data-cat]") : null;
      if (!chip) return;
      const on = chip.getAttribute("aria-pressed") !== "true";
      box.querySelectorAll(".sched-chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      const cat = chip.dataset.cat;
      items().forEach((el) => el.classList.toggle("is-dim", on && el.dataset.cat !== cat));
    });
  }

  function placeNow(root) {
    // server chiziqni 15 daqiqalik qatorning boshiga qo'yadi; qolgan daqiqalarni shu yerda qo'shamiz
    const slot = 15;
    root.querySelectorAll(".dv").forEach((dv) => {
      const lbl = dv.querySelector(".dv__nowlbl");
      if (!lbl) return;
      const m = /(\d\d):(\d\d)/.exec(lbl.textContent || "");
      if (!m) return;
      const rem = parseInt(m[2], 10) % slot;
      const px = parseFloat(getComputedStyle(dv).getPropertyValue("--slot")) || 15;
      const off = (rem * px / slot).toFixed(1) + "px";
      dv.querySelectorAll(".dv__now, .dv__nowlbl").forEach((el) => el.style.setProperty("--off", off));
    });
  }

  function init(root) { initLegend(root); placeNow(root); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init(document)); else init(document);
  document.addEventListener("htmx:afterSettle", () => init(document));
})();
