import { TIMING } from "./0-config";
//.......................................................................
//DEFINITIONS............................................................
export const mainWrapper = document.querySelector(".main-wrapper");
export const blackout = document.querySelector(".blackout");
export const allSections = [...document.querySelectorAll(".section")];
export const allVidCodes = document.querySelectorAll(".vid-code");
export const allVids = document.querySelectorAll(".vid");
export const navMenu = document.querySelector(".nav_menu");
export const allNavMenuLinks = document.querySelectorAll(".nav_menu_link");
export const navBtn = document.querySelector(".nav_button");
export const _state = {
  activeSection: null,
  activeSectionName: null,
  activeVid: null,
  webflowBreakpoint: null,
  startTime: 0,
  endTime: 0,
  pauseFlag: false,
};
//.......................................................................
//GLOBAL FUNCTIONS.......................................................
//The 'Strict' Selector
export const query = function (selector, context = document) {
  const el = context.querySelector(selector);
  if (!el) {
    throw new Error(
      `CRITICAL UI ERROR: "${selector}" is missing from the DOM.`,
    );
  }
  return el;
};
//The 'Strict' Mult-Selector
export const queryAll = function (selector, context = document) {
  const elements = context.querySelectorAll(selector);
  if (elements.length === 0) {
    throw new Error(
      `CRITICAL UI ERROR: No elements matching "${selector}" found.`,
    );
  }
  return elements;
};
export const getVidType = function (video) {
  return video.closest(".section").classList[1];
};
export const flashBlackout = function () {
  blackout.classList.add("active");
  setTimeout(function () {
    blackout.classList.remove("active");
  }, TIMING.UI.BLACKOUT_TIMER);
};
export const enableNavLinksAndNavBtn = function () {
  navMenu.style.pointerEvents = "auto";
  navBtn.style.pointerEvents = "auto";
};
export const activateCurrentNavLink = function (clicked) {
  deactivateCurrentNavLinks();
  clicked.classList.add("current");
};
export const deactivateCurrentNavLinks = function () {
  allNavMenuLinks.forEach(function (el) {
    el.classList.remove("current");
  });
};
export const setActiveSection = function (sectionName, index) {
  deactivateAllSections();
  _state.activeSectionName = sectionName;
  if (!index) index = 0;
  const matches = allSections.filter(
    (el) => el.dataset.section === sectionName,
  );
  const target = matches[index];
  if (target) {
    target.classList.add("active");
    _state.activeSection = target;
  }
};
export const deactivateAllSections = function () {
  allSections.forEach(function (el) {
    el.classList.remove("active");
  });
};
export const getActiveVid = function () {
  return _state.activeVid;
};
export const setActiveVid = function (activeVidWrap, activeSequenceStep) {
  if (_state.activeVid) {
    _state.activeVid.pause();
    _state.activeVid.src = "";
  }
  if (activeVidWrap && activeSequenceStep === null) {
    activeVidWrap.querySelectorAll(".vid-code").forEach((el) => {
      if (el.querySelector(".vid").offsetParent !== null) {
        _state.activeVid = el.querySelector(".vid");
      }
    });
  } else if (activeVidWrap && activeSequenceStep) {
    _state.activeVid = activeSequenceStep;
  } else {
    allVidCodes.forEach((el) => {
      if (el.querySelector(".vid").offsetParent !== null) {
        _state.activeVid = el.querySelector(".vid");
      }
    });
  }
};
export const getWebflowBreakpoint = function () {
  return _state.webflowBreakpoint;
};
export const setWebflowBreakpoint = function () {
  const width = window.innerWidth;
  if (width < 480) _state.webflowBreakpoint = "mobilePortrait";
  if (width >= 480) _state.webflowBreakpoint = "mobileLandscape";
  if (width >= 768) _state.webflowBreakpoint = "tablet";
  if (width >= 992) _state.webflowBreakpoint = "desktop";
};
export const setStartTime = function (newValue) {
  _state.startTime = newValue;
};
export const setEndTime = function (newValue) {
  _state.endTime = newValue;
};
export const clearSectionVidSrc = function () {
  _state.activeSection.querySelectorAll(".vid").forEach(function (el) {
    el.src = "";
    el.load();
  });
};
export const resetAllSectionVids = function () {
  _state.activeSection.querySelectorAll(".vid").forEach(function (el) {
    el.currentTime = 0;
    el.pause();
  });
};
export const playRange = function (videoCurrentTime) {
  if (!_state.activeVid) return;
  const vidCode = _state.activeVid.parentElement;
  const targetStart = videoCurrentTime || _state.startTime;
  // CLEANUP: Kill any previous monitor before starting a new one
  if (_state.activeVid._currentMonitor) {
    _state.activeVid.removeEventListener(
      "timeupdate",
      _state.activeVid._currentMonitor,
    );
  }
  // 1. HIDDEN STATE: Instant hide to reveal vid-wrap background image
  if (vidCode) vidCode.style.opacity = "0";
  // Clear any existing timeupdate monitors
  _state.activeVid.removeEventListener(
    "timeupdate",
    _state.activeVid._currentMonitor,
  );
  const monitorTime = () => {
    if (_state.activeVid.currentTime >= _state.endTime - 0.15) {
      _state.activeVid.removeEventListener("timeupdate", monitorTime);
      _state.activeVid.pause();
      _state.activeVid.currentTime = _state.endTime;
      _state.activeVid.dispatchEvent(new Event("ended"));
    }
  };
  _state.activeVid._currentMonitor = monitorTime;
  // Source handling
  const source = _state.activeVid.querySelector("source");
  const dataSrc = source ? source.getAttribute("data-src") : null;
  if (dataSrc && _state.activeVid.src !== dataSrc) {
    _state.activeVid.pause();
    _state.activeVid.src = dataSrc;
    _state.activeVid.load();
  }
  const startPlaybackSequence = async () => {
    try {
      _state.activeVid.currentTime = targetStart;
      // 2. THE FAIL-SAFE REVEAL
      // We poll for physical playhead movement. Once it moves,
      // the "black buffer" is guaranteed to be gone.
      const pollForFrame = () => {
        if (_state.activeVid.currentTime > targetStart) {
          // Double RAF is the final guard for the GPU paint cycle
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (vidCode) vidCode.style.opacity = "1";
              if (typeof blackout !== "undefined")
                blackout.classList.remove("active");
            });
          });
        } else if (!_state.activeVid.paused) {
          // If still at targetStart but playing, check again next frame
          requestAnimationFrame(pollForFrame);
        }
      };
      // 3. START
      _state.activeVid.addEventListener("timeupdate", monitorTime);
      await _state.activeVid.play();
      pollForFrame(); // Start checking for the first real frame
    } catch (e) {
      console.warn("Playback failed:", e);
      // Fallback: show video anyway if play() fails (e.g. autplay blocked)
      if (vidCode) vidCode.style.opacity = "1";
    }
  };
  // Wait for data (readyState 3 is HAVE_FUTURE_DATA)
  if (_state.activeVid.readyState >= 3) {
    startPlaybackSequence();
  } else {
    _state.activeVid.addEventListener("canplay", startPlaybackSequence, {
      once: true,
    });
  }
};
export const disablePause = function () {
  _state.pauseFlag = false;
  _state.activeSection.querySelector(".pause-wrap").style.pointerEvents =
    "none";
};
export const enablePause = function () {
  _state.activeSection.querySelector(".pause-wrap").style.pointerEvents =
    "auto";
};
export const togglePause = function () {
  if (_state.pauseFlag) {
    _state.pauseFlag = false;
    _state.activeVid.play();
  } else {
    _state.pauseFlag = true;
    _state.activeVid.pause();
  }
};
export const enableSectionCtrlBtnEvents = function () {
  _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents =
    "auto";
};
export const disableSectionCtrlBtnEvents = function () {
  _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents =
    "none";
};
export const setActiveCtrlBtnWrapper = function (btnWrapperIndex) {
  deactivateAllCtrlBtnWrappers();
  _state.activeSection
    .querySelectorAll(".section-wrap-btns")
    .forEach(function (el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
};
export const deactivateAllCtrlBtnWrappers = function () {
  _state.activeSection
    .querySelectorAll(".section-wrap-btns")
    .forEach(function (el) {
      el.classList.remove("active");
    });
};
export const toggleBtnHoverClass = function (btn) {
  if (_state.activeVid && _state.webflowBreakpoint === "desktop")
    btn.classList.toggle("hovered");
};
export const activateCurrentBtn = function (btn) {
  deactivateCurrentBtns();
  setTimeout(() => {
    btn.classList.add("current");
  }, 50);
};
export const deactivateCurrentBtns = function (section) {
  if (!section) section = _state.activeSection;
  section.querySelectorAll(".ctrl-btn").forEach(function (el) {
    el.classList.remove("current");
  });
};
export const getLocalIndex = function (btn, btnClass, allBtnsWrapper) {
  let localIndex;
  const allBtns = btn
    .closest(`.${allBtnsWrapper}`)
    .querySelectorAll(`.${btnClass}`);
  allBtns.forEach(function (el, index) {
    if (el === btn) localIndex = index;
  });
  return localIndex;
};
