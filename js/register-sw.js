// Small helper to register the service worker at site root
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (reg) {
        console.log("Service worker registered with scope:", reg.scope);
      })
      .catch(function (err) {
        console.warn("Service worker registration failed:", err);
      });
  });
}
