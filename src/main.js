import { TIMING } from "./0-config";
import * as global from "./0-global";
import NavbarClass from "./0-navbar";
import FeaturesClass from "./1-features";
import DataClass from "./2-data";
import SequenceClass from "./3-sequence";
//.......................................................................
//init call (function at bottom).........................................
document.addEventListener("DOMContentLoaded", () => {
  init();
});
//.......................................................................
//DEFINITIONS............................................................
const navContainer = global.query(".nav_component", document);
const featuresContainer = global.query(".section.features", document);
const dataContainer = global.query(".section.data", document);
const sequenceContainer = global.query(".section.sequence", document);
const navbar = new NavbarClass(global, navContainer);
const features = new FeaturesClass(global, featuresContainer);
const data = new DataClass(global, dataContainer);
const sequence = new SequenceClass(global, sequenceContainer);
const SECTIONS = {
  navbar: navbar,
  features: features,
  data: data,
  sequence: sequence,
};
//.......................................................................
//EVENT DELEGATION-NAV...................................................
navContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest("[data-click-action]");
  if (!clicked) return;
  const activeSection = clicked.dataset.navSection;
  const targetModule = SECTIONS[activeSection];
  const action = clicked.dataset.clickAction;
  //1. Generic cleanup
  if ("isDropdownIcon" in clicked.dataset) {
    // Polymorphic call only - just toggling dropdown
    targetModule.handleEvent(clicked, action);
    return;
  }
  //dont flash if only clicking dropdown
  global.blackout.classList.add("active");
  //2. State update
  global.setActiveSection(activeSection);
  //3. Polymorphic call
  targetModule.handleEvent(clicked, action);
});
navContainer.addEventListener("mouseover", function (e) {
  const hovered = e.target.closest("[data-mouseover-action]");
  if (!hovered) return;
  if (this.currentHover === hovered) return; // Exit if we are already hovering it
  this.currentHover = hovered;
  const action = hovered.dataset.mouseoverAction;
  navbar.handleEvent(hovered, action);
});
navContainer.addEventListener("mouseout", function (e) {
  const hovered = e.target.closest("[data-mouseout-action]");
  if (!hovered) return;
  // If the mouse moved to a child of the same button, don't trigger the "Exit"
  if (hovered.contains(e.relatedTarget)) return;
  this.currentHover = null;
  const action = hovered.dataset.mouseoutAction;
  navbar.handleEvent(hovered, action);
});
//Custom event: nav dropdown icon clicked
window.addEventListener("dropdownIconClicked", function (e) {
  const clicked = e.detail;
  if (!clicked) return;
  navbar.toggleNavDropdown(clicked);
});
//Custom event: nav dropdown opt clicked
window.addEventListener("dropdownOptClicked", function (e) {
  const clicked = e.detail;
  if (!clicked) return;
  navbar.closeNavDropdown(clicked);
  navbar.closeMobileNavMenu();
});
//.......................................................................
//EVENT DELEGATION-MAIN BODY.............................................
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest("[data-click-action]");
  if (!clicked) return;
  const activeSection = clicked.closest(".section").dataset.section;
  const targetModule = SECTIONS[activeSection];
  const action = clicked.dataset.clickAction;
  targetModule.handleEvent(clicked, action);
});
global.mainWrapper.addEventListener("mouseover", function (e) {
  const hovered = e.target.closest("[data-mouseover-action]");
  if (!hovered) return;
  if (this.currentHover === hovered) return; // Exit if we are already hovering it
  this.currentHover = hovered;
  const activeSection = hovered.closest(".section").dataset.section;
  const targetModule = SECTIONS[activeSection];
  const action = hovered.dataset.mouseoverAction;
  targetModule.handleEvent(hovered, action);
});
global.mainWrapper.addEventListener("mouseout", function (e) {
  const hovered = e.target.closest("[data-mouseout-action]");
  if (!hovered) return;
  // If the mouse moved to a child of the same button, don't trigger the "Exit"
  if (hovered.contains(e.relatedTarget)) return;
  this.currentHover = null;
  const activeSection = hovered.closest(".section").dataset.section;
  const targetModule = SECTIONS[activeSection];
  const action = hovered.dataset.mouseoutAction;
  targetModule.handleEvent(hovered, action);
});
//.......................................................................
//EVENT DELEGATION-VIDS..................................................
//vid ended
global.allVids.forEach(function (el) {
  el.addEventListener("ended", function (e) {
    const endedVid = e.target.closest(".vid");
    if (!endedVid) return;
    const vidSection = endedVid.closest(".section").dataset.section;
    const targetModule = SECTIONS[vidSection];
    targetModule.vidEnd();
  });
});
//.......................................................................
//FUNCTIONS..............................................................
//init
const init = function () {
  setupLazyLoading();
  global.setWebflowBreakpoint();
  global.blackout.classList.add("active");
  navContainer.classList.remove("active");
  navbar.allNavDropdowns.forEach(function (el) {
    el.classList.remove("active");
  });
  global.setActiveSection("features");
  global.setActiveVid();
  global.blackout.classList.remove("active");
  features.playFeaturesIntro();
  //.......................................................................
  //.......................................................................
  setTimeout(() => {
    navContainer.classList.add("active");
    features.initSection(null, (isIntro = true));
  }, TIMING.UI.START_UI_REVEAL);
  //.......................................................................
  //.......................................................................
};
const setupLazyLoading = function () {
  const allLazyVids = document.querySelectorAll(".vid");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const sources = video.querySelectorAll("source");
      if (entry.isIntersecting) {
        // --- LOAD LOGIC ---
        sources.forEach((source) => {
          // Use data-src if available, otherwise keep current src
          const dataSrc = source.getAttribute("data-src") || source.src;
          if (dataSrc) {
            source.src = dataSrc;
            // Keep data-src attribute so we can find the URL again later
            source.setAttribute("data-src", dataSrc);
          }
        });
        video.load();
      } else {
        // --- UNLOAD LOGIC ---
        // Clears the internal logs for user interactions and resource loads
        performance.clearMeasures();
        performance.clearResourceTimings();
        performance.clearMarks();
        ResetSection(video.closest(".section"));
        video.pause();
        sources.forEach((source) => {
          // Move src back to data-src and empty the current src
          const currentSrc = source.src;
          if (currentSrc) {
            source.setAttribute("data-src", currentSrc);
            source.src = ""; // This stops the video from buffering
            source.removeAttribute("src"); // Fully clear attribute
          }
        });
        // Force the browser to dump the video data from memory
        video.load();
      }
    });
  }, observerOptions);
  allLazyVids.forEach((vid) => videoObserver.observe(vid));
  //.......................................................................
  //RESET VIDS AFTER UNLOADING.............................................
  const ResetSection = function (section) {
    if (!section) return; //helps prevent crashes
    section.querySelectorAll(".vid").forEach(function (el) {
      el.currentTime = 0;
      el.pause();
    });
    global.deactivateCurrentBtns(section);
  };
};
