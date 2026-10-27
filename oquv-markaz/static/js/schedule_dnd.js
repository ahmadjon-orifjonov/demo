/* Namuna — jadval: darsni sudrab boshqa kun/xonaga ko'chirish (faqat katta ekran, "lesson:edit" ruxsati bilan).
 * Ko'chirish mantig'i serverda: tashlanganda MAVJUD ko'chirish oynasi (academics:lesson_move) sana/xona bilan
 * oldindan to'ldirilib ochiladi — ziddiyat tekshiruvi, bo'sh xona taklifi, tasdiq va audit o'sha yerda.
 * Klaviatura/telefon muqobili: dars sahifasidagi «Boshqa kunga ko'chirish» menyusi.
 * CSP: inline handler yo'q, faqat addEventListener. */
(function () {
  "use strict";

  function init(grid) {
    if (grid.dataset.dndInit) return;
    grid.dataset.dndInit = "1";
    const by = grid.dataset.by || "room";
    const today = grid.dataset.today || "";
    let drag = null;   // {el, url, row, date}

    const cellOf = (t) => (t && t.closest ? t.closest("[data-drop-date]") : null);
    const allowed = (cell) => {
      if (!cell || !drag || !grid.contains(cell)) return false;
      const d = cell.dataset.dropDate;
      if (today && d < today) return false;                                     // o'tgan kunga — yo'q
      if (by !== "room" && cell.dataset.dropRow !== drag.row) return false;      // o'qituvchi ko'rinishi: faqat o'z qatori
      return !(d === drag.date && cell.dataset.dropRow === drag.row);           // o'sha katak — o'zgarish yo'q
    };
    const clear = () => {
      grid.classList.remove("is-dnd-active");
      grid.querySelectorAll(".is-over, .is-drop-ok").forEach((x) => x.classList.remove("is-over", "is-drop-ok"));
      if (drag) drag.el.classList.remove("is-dragging");
    };

    grid.addEventListener("dragstart", (e) => {
      const ev = e.target.closest ? e.target.closest("[data-move-url]") : null;
      const cell = cellOf(ev);
      if (!ev || !cell) { if (e.target.closest && e.target.closest(".c-cal__ev")) e.preventDefault(); return; }
      drag = { el: ev, url: ev.dataset.moveUrl, row: cell.dataset.dropRow, date: cell.dataset.dropDate };
      ev.classList.add("is-dragging");
      grid.classList.add("is-dnd-active");
      grid.querySelectorAll("[data-drop-date]").forEach((c) => { if (allowed(c)) c.classList.add("is-drop-ok"); });
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", ev.textContent.trim()); } catch (_) { /* eski brauzer */ }
    });
    grid.addEventListener("dragend", () => { clear(); drag = null; });
    grid.addEventListener("dragover", (e) => {
      const cell = cellOf(e.target);
      if (!allowed(cell)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      cell.classList.add("is-over");
    });
    grid.addEventListener("dragleave", (e) => {
      const cell = cellOf(e.target);
      if (cell && !cell.contains(e.relatedTarget)) cell.classList.remove("is-over");
    });
    grid.addEventListener("drop", (e) => {
      const cell = cellOf(e.target);
      if (!allowed(cell)) return;
      e.preventDefault();
      const p = new URLSearchParams();
      p.set("date", cell.dataset.dropDate);
      if (by === "room") p.set("room", cell.dataset.dropRow || "0");
      p.set("from", "schedule");
      p.set("back", location.pathname + location.search);
      const url = drag.url + (drag.url.indexOf("?") < 0 ? "?" : "&") + p.toString();
      clear();
      drag = null;
      if (window.htmx) window.htmx.ajax("GET", url, { target: "#modal-root", swap: "beforeend" });
      else location.href = url;
    });
  }

  function initAll() { document.querySelectorAll("[data-sched-dnd]").forEach(init); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll); else initAll();
  document.addEventListener("htmx:afterSettle", initAll);
})();
