/* Imtihonlar: tez baho kiritish sahifasi (templates/exams/grade.html).
 *  - Enter → keyingi o'quvchining maydoni (oxirgisida — "Saqlash" tugmasi), formani tasodifan yubormaydi
 *  - "Kelmadi" belgilansa — ball maydoni o'chadi va tozalanadi
 *  - "Kiritildi: N / M" hisoblagichi
 *  - "E'lon qilish" o'chiq bo'lsa — "xabar yuborish" ham o'chiq
 */
(function () {
  "use strict";

  function scores(form) { return Array.prototype.slice.call(form.querySelectorAll("input[data-score]")); }

  function count(form) {
    var out = form.querySelector("[data-grade-count]");
    if (!out) return;
    var all = scores(form), n = 0;
    all.forEach(function (i) {
      var absent = form.querySelector("#a" + i.id.slice(1));
      if ((absent && absent.checked) || i.value.trim() !== "") n += 1;
    });
    var tpl = out.getAttribute("data-tpl") || "Kiritildi: {n} / {all}";
    out.textContent = tpl.replace("{n}", n).replace("{all}", all.length);
  }

  function syncNotify(form) {
    var pub = form.querySelector("[data-publish]");
    var note = form.querySelector("input[name=notify]");
    if (pub && note) {
      note.disabled = !pub.checked;
      note.closest("label").classList.toggle("muted", !pub.checked);
    }
  }

  function nextField(form, current) {
    var all = scores(form).filter(function (i) { return !i.disabled; });
    var k = all.indexOf(current);
    return k >= 0 && k < all.length - 1 ? all[k + 1] : null;
  }

  function init(form) {
    if (form.dataset.init) return;
    form.dataset.init = "1";

    form.addEventListener("keydown", function (e) {
      var t = e.target;
      if (e.key !== "Enter" || !t.matches("input[data-score]")) return;
      e.preventDefault();
      var nx = nextField(form, t);
      if (nx) { nx.focus(); nx.select(); }
      else { var save = form.querySelector("[data-grade-save]"); if (save) save.focus(); }
    });

    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.matches("input[data-absent]")) {
        var inp = form.querySelector("#s" + t.id.slice(1));
        if (inp) {
          inp.disabled = t.checked;
          if (t.checked) inp.value = "";
          else inp.focus();
        }
      }
      if (t.matches("[data-publish]")) syncNotify(form);
      count(form);
    });
    form.addEventListener("input", function () { count(form); });

    count(form);
    syncNotify(form);
    var first = form.querySelector("[aria-invalid=true]") || scores(form).filter(function (i) { return !i.disabled && !i.value; })[0];
    if (first && window.matchMedia("(min-width: 901px)").matches) first.focus();
  }

  function initAll() {
    Array.prototype.forEach.call(document.querySelectorAll("form[data-grade-form]"), init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
})();
