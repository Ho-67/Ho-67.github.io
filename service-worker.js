const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = [
  // 核心檔案
  "/",
  "/index.html",
  "/manifest.json",

  // 樣式
  "/css/styles.css",
  "/css/vendor.css",

  // 腳本
  "/js/main.js",
  "/js/plugins.js",
  "/js/canvas-animation.js",
  "/js/register-sw.js",

  // 主要圖片
  "/images/HO-67.png",
  "/images/scrolldown-circle-text.svg",

  // 作品集圖片
  "/images/gallery/Color Picker.png",
  "/images/gallery/CuteClock.png",
  "/images/gallery/NovelSpotlight.png",
  "/images/gallery/Office Blackjack.png",
  "/images/gallery/Pomodoro-Timer-2025.png",
  "/images/gallery/SANVIA.png",

  // App 圖示
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/apple-touch-icons/apple-touch-icon-120x120.png",
  "/images/apple-touch-icons/apple-touch-icon-152x152.png",
  "/images/apple-touch-icons/apple-touch-icon-167x167.png",
  "/images/apple-touch-icons/apple-touch-icon-180x180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
