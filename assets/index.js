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

const gaEanbled = window.config.ga && window.location.hostname !== "localhost";
const consent = window.localStorage["ga:consent"];
if (gaEanbled) {
  GAnalytics(config.ga, { consent });
}

// consent form
let consentRadioButton;
if (consent) {
  consentRadioButton = document.querySelector("#agree");
} else {
  consentRadioButton = document.querySelector("#disagree");
}
if (consentRadioButton) consentRadioButton.checked = true;
document.querySelectorAll("[name=consent]").forEach(x =>
  x.addEventListener(
    "change",
    e => {
      if (e.target.id === "agree") {
        window.localStorage["ga:consent"] = true;
      } else {
        window.localStorage.clear();
      }
    },
    false
  )
);
