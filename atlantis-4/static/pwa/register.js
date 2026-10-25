/* Kabinet: service worker'ni ro'yxatdan o'tkazish (manzillar <script data-sw data-scope> dan). */
(function () {
  "use strict";
  var me = document.currentScript;
  if (!me || !("serviceWorker" in navigator) || !window.isSecureContext) return;
  var sw = me.getAttribute("data-sw");
  var scope = me.getAttribute("data-scope");
  if (!sw) return;
  window.addEventListener("load", function () {
    navigator.serviceWorker.register(sw, { scope: scope || undefined }).catch(function () { /* ixtiyoriy */ });
  });
})();
