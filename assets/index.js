import "./css/styles.css";
import "./css/code.css";
import "./css/social.css";

import "./js/nojs.js";
import "lazysizes";
import quicklink from "quicklink/dist/quicklink.mjs";
import GAnalytics from "@stereobooster/ganalytics";
quicklink();

// Hotkeys
window.addEventListener(
  "keydown",
  e => {
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

if (window.config.ga && window.location.hostname !== "localhost") {
  // https://dev.to/corbindavenport/how-to-correctly-check-for-do-not-track-with-javascript-135d
  if (
    window.doNotTrack ||
    navigator.doNotTrack ||
    navigator.msDoNotTrack ||
    "msTrackingProtectionEnabled" in window.external
  ) {
    if (
      window.doNotTrack == "1" ||
      navigator.doNotTrack == "yes" ||
      navigator.doNotTrack == "1" ||
      navigator.msDoNotTrack == "1" ||
      window.external.msTrackingProtectionEnabled()
    ) {
      // Do Not Track is enabled!
    } else {
      GAnalytics(config.ga);
    }
  } else {
    GAnalytics(config.ga);
  }
}

// TODO: implement cookie consent
