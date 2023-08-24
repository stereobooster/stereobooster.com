import "./css/base.css";
import "./css/code.css";
import "./css/social.css";

import "./js/nojs.js";
import quicklink from "quicklink/dist/quicklink.mjs";

// https://github.com/GoogleChromeLabs/quicklink#custom-ignore-patterns
const ignoreRe = /\.(xml|js|css|json)($|\?|#)/gi;
quicklink({
  ignores: [
    (uri, elem) => {
      if (elem.hasAttribute("noprefetch")) return true;
      const currentHref = window.location.hash
        ? window.location.href.replace(window.location.hash, "")
        : window.location.href;
      if (currentHref === uri) return true;
      if (ignoreRe.test(uri)) return true;
      return false;
    },
  ],
});

// Hotkeys
window.addEventListener(
  "keydown",
  (e) => {
    if (e.altKey || e.ctrlKey) {
      if (e.code == "ArrowRight") {
        document.querySelector(".next").click();
      } else if (e.code == "ArrowLeft") {
        document.querySelector(".prev").click();
      }
    }
  },
  { passive: true, capture: false }
);
