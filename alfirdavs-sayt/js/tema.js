/* ALFIRDAVS TM — panel: qorong'u rejim tanlovini sahifa chizilishidan OLDIN qo'yadi (oq chaqnash bo'lmasin).
   <head> ichida, oddiy (defer'siz) ulanadi. Tanlov saytniki bilan bitta kalitda: brauzer xotirasidagi `alf_tema` = 'tun'.
   Unda maxfiy narsa yo'q; xotira yopiq bo'lsa (maxfiy oyna) — shunchaki yorug' rejim. */
(function () {
  try {
    if (window.localStorage.getItem('alf_tema') === 'tun') {
      document.documentElement.setAttribute('data-tema', 'tun');
      var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', '#171312');
    }
  } catch (e) {}
})();
