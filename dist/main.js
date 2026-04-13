(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/0-config.js
  var TIMING = Object.freeze({
    UI: {
      START_UI_REVEAL: 1500,
      BLACKOUT_TIMER: 200,
      BLACKOUT_WAIT_TO_REVEAL: 50
    },
    VIDEO: {
      VID_END_TIMER: 1500
    }
  });
  var ASSETS = Object.freeze({
    "view-1": {
      desktop: "https://cdn.prod.website-files.com/61e77b1e3ddfc76b6fe81446/69dc14060009e236c0c0f119_Components-View-A.webp",
      mobile: "https://cdn.prod.website-files.com/61e77b1e3ddfc76b6fe81446/69dc140698d66fcc5992f6a1_Components-View-A-Mobile-P.webp"
    },
    "view-2": {
      desktop: "https://cdn.prod.website-files.com/61e77b1e3ddfc76b6fe81446/69dc140642f49cf016b02faf_Components-View-B.webp",
      mobile: "https://cdn.prod.website-files.com/61e77b1e3ddfc76b6fe81446/69dc14063b5a21520e44a7b9_Components-View-B-Mobile-P.webp"
    }
  });
  var VIEW_START_END = Object.freeze({
    "view-1": {
      startTime: 0,
      endTime: 3.2
    },
    "view-2": {
      startTime: 3.64,
      endTime: 6.9
    }
  });
  var LOOP_SEQUENCE_VIDS = true;

  // src/0-global.js
  var global_exports = {};
  __export(global_exports, {
    _state: () => _state,
    activateCurrentBtn: () => activateCurrentBtn,
    activateCurrentNavLink: () => activateCurrentNavLink,
    allNavMenuLinks: () => allNavMenuLinks,
    allSections: () => allSections,
    allVidCodes: () => allVidCodes,
    allVids: () => allVids,
    blackout: () => blackout,
    clearSectionVidSrc: () => clearSectionVidSrc,
    deactivateAllCtrlBtnWrappers: () => deactivateAllCtrlBtnWrappers,
    deactivateAllSections: () => deactivateAllSections,
    deactivateCurrentBtns: () => deactivateCurrentBtns,
    deactivateCurrentNavLinks: () => deactivateCurrentNavLinks,
    disablePause: () => disablePause,
    disableSectionCtrlBtnEvents: () => disableSectionCtrlBtnEvents,
    enableNavLinksAndNavBtn: () => enableNavLinksAndNavBtn,
    enablePause: () => enablePause,
    enableSectionCtrlBtnEvents: () => enableSectionCtrlBtnEvents,
    flashBlackout: () => flashBlackout,
    getActiveVid: () => getActiveVid,
    getLocalIndex: () => getLocalIndex,
    getVidType: () => getVidType,
    getWebflowBreakpoint: () => getWebflowBreakpoint,
    mainWrapper: () => mainWrapper,
    navBtn: () => navBtn,
    navMenu: () => navMenu,
    playRange: () => playRange,
    query: () => query,
    queryAll: () => queryAll,
    resetAllSectionVids: () => resetAllSectionVids,
    setActiveCtrlBtnWrapper: () => setActiveCtrlBtnWrapper,
    setActiveSection: () => setActiveSection,
    setActiveVid: () => setActiveVid,
    setEndTime: () => setEndTime,
    setStartTime: () => setStartTime,
    setWebflowBreakpoint: () => setWebflowBreakpoint,
    toggleBtnHoverClass: () => toggleBtnHoverClass,
    togglePause: () => togglePause
  });
  var mainWrapper = document.querySelector(".main-wrapper");
  var blackout = document.querySelector(".blackout");
  var allSections = [...document.querySelectorAll(".section")];
  var allVidCodes = document.querySelectorAll(".vid-code");
  var allVids = document.querySelectorAll(".vid");
  var navMenu = document.querySelector(".nav_menu");
  var allNavMenuLinks = document.querySelectorAll(".nav_menu_link");
  var navBtn = document.querySelector(".nav_button");
  var _state = {
    activeSection: null,
    activeSectionName: null,
    activeVid: null,
    webflowBreakpoint: null,
    startTime: 0,
    endTime: 0,
    pauseFlag: false
  };
  var query = function(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el) {
      throw new Error(
        `CRITICAL UI ERROR: "${selector}" is missing from the DOM.`
      );
    }
    return el;
  };
  var queryAll = function(selector, context = document) {
    const elements = context.querySelectorAll(selector);
    if (elements.length === 0) {
      throw new Error(
        `CRITICAL UI ERROR: No elements matching "${selector}" found.`
      );
    }
    return elements;
  };
  var getVidType = function(video) {
    return video.closest(".section").classList[1];
  };
  var flashBlackout = function() {
    blackout.classList.add("active");
    setTimeout(function() {
      blackout.classList.remove("active");
    }, TIMING.UI.BLACKOUT_TIMER);
  };
  var enableNavLinksAndNavBtn = function() {
    navMenu.style.pointerEvents = "auto";
    navBtn.style.pointerEvents = "auto";
  };
  var activateCurrentNavLink = function(clicked) {
    deactivateCurrentNavLinks();
    clicked.classList.add("current");
  };
  var deactivateCurrentNavLinks = function() {
    allNavMenuLinks.forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var setActiveSection = function(sectionName, index) {
    deactivateAllSections();
    _state.activeSectionName = sectionName;
    if (!index) index = 0;
    const matches = allSections.filter(
      (el) => el.dataset.section === sectionName
    );
    const target = matches[index];
    if (target) {
      target.classList.add("active");
      _state.activeSection = target;
    }
  };
  var deactivateAllSections = function() {
    allSections.forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var getActiveVid = function() {
    return _state.activeVid;
  };
  var setActiveVid = function(activeVidWrap, activeSequenceStep) {
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
  var getWebflowBreakpoint = function() {
    return _state.webflowBreakpoint;
  };
  var setWebflowBreakpoint = function() {
    const width = window.innerWidth;
    if (width < 480) _state.webflowBreakpoint = "mobilePortrait";
    if (width >= 480) _state.webflowBreakpoint = "mobileLandscape";
    if (width >= 768) _state.webflowBreakpoint = "tablet";
    if (width >= 992) _state.webflowBreakpoint = "desktop";
  };
  var setStartTime = function(newValue) {
    _state.startTime = newValue;
  };
  var setEndTime = function(newValue) {
    _state.endTime = newValue;
  };
  var clearSectionVidSrc = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.src = "";
      el.load();
    });
  };
  var resetAllSectionVids = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.currentTime = 0;
      el.pause();
    });
  };
  var playRange = function(videoCurrentTime) {
    if (!_state.activeVid) return;
    const vidCode = _state.activeVid.parentElement;
    const targetStart = videoCurrentTime || _state.startTime;
    if (_state.activeVid._currentMonitor) {
      _state.activeVid.removeEventListener(
        "timeupdate",
        _state.activeVid._currentMonitor
      );
    }
    if (vidCode) vidCode.style.opacity = "0";
    _state.activeVid.removeEventListener(
      "timeupdate",
      _state.activeVid._currentMonitor
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
        const pollForFrame = () => {
          if (_state.activeVid.currentTime > targetStart) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (vidCode) vidCode.style.opacity = "1";
                if (typeof blackout !== "undefined")
                  blackout.classList.remove("active");
              });
            });
          } else if (!_state.activeVid.paused) {
            requestAnimationFrame(pollForFrame);
          }
        };
        _state.activeVid.addEventListener("timeupdate", monitorTime);
        await _state.activeVid.play();
        pollForFrame();
      } catch (e) {
        console.warn("Playback failed:", e);
        if (vidCode) vidCode.style.opacity = "1";
      }
    };
    if (_state.activeVid.readyState >= 3) {
      startPlaybackSequence();
    } else {
      _state.activeVid.addEventListener("canplay", startPlaybackSequence, {
        once: true
      });
    }
  };
  var disablePause = function() {
    _state.pauseFlag = false;
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "none";
  };
  var enablePause = function() {
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "auto";
  };
  var togglePause = function() {
    if (_state.pauseFlag) {
      _state.pauseFlag = false;
      _state.activeVid.play();
    } else {
      _state.pauseFlag = true;
      _state.activeVid.pause();
    }
  };
  var enableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "auto";
  };
  var disableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "none";
  };
  var setActiveCtrlBtnWrapper = function(btnWrapperIndex) {
    deactivateAllCtrlBtnWrappers();
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
  };
  var deactivateAllCtrlBtnWrappers = function() {
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var toggleBtnHoverClass = function(btn) {
    if (_state.activeVid && _state.webflowBreakpoint === "desktop")
      btn.classList.toggle("hovered");
  };
  var activateCurrentBtn = function(btn) {
    deactivateCurrentBtns();
    setTimeout(() => {
      btn.classList.add("current");
    }, 50);
  };
  var deactivateCurrentBtns = function(section) {
    if (!section) section = _state.activeSection;
    section.querySelectorAll(".ctrl-btn").forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var getLocalIndex = function(btn, btnClass, allBtnsWrapper) {
    let localIndex;
    const allBtns = btn.closest(`.${allBtnsWrapper}`).querySelectorAll(`.${btnClass}`);
    allBtns.forEach(function(el, index) {
      if (el === btn) localIndex = index;
    });
    return localIndex;
  };

  // src/0-navbar.js
  var Navbar = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.navMenu = this.global.query(".nav_menu", this.container);
      this.navBtn = this.global.query(".nav_button", this.container);
      this.allNavLinks = this.global.queryAll(".nav_menu_link", this.container);
      this.allNavLinksWithDropdown = [
        ...this.global.queryAll('[data-nav-section="sequence"]', this.container)
      ];
      this.allNavDropdowns = [
        ...this.global.queryAll(".nav_menu_dropdown", this.container)
      ];
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-nav-dropdown", this.openNavDropdown],
        ["close-nav-dropdown", this.closeNavDropdown],
        ["toggle-nav-dropdown", this.toggleNavDropdown]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    handleEvent = function(trigger, eventAction) {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    closeNavMenu = function() {
      this.allNavDropdowns.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    closeMobileNavMenu = function() {
      if ("navMenuOpen" in this.navMenu.dataset) this.navBtn.click();
      this.navMenu.querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    openNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.add("active");
    };
    closeNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    toggleNavDropdown = function(trigger) {
      this.global.activateCurrentNavLink(trigger);
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.toggle("active");
    };
  };
  var navbar_default = Navbar;

  // src/1-features.js
  var Features = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.featuresBlackout = this.global.query(".blackout", this.container);
      this.featuresAllText = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.featuresAllVidWraps = [
        ...this.global.queryAll(".vid-wrap", this.container)
      ];
      this.featuresIntroVidDiv = this.global.query(
        ".vid-wrap.intro",
        this.container
      );
      this.featuresVidDiv = this.global.query(
        ".vid-wrap.features",
        this.container
      );
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.featuresCtrlBtns = this.global.query(
        ".section-wrap-btns",
        this.container
      );
      this.activeFeature = null;
      this.activeVidWrap = null;
      this.featuresTimer = null;
      this.featuresEndisCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-features", this.initSection],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked, isIntro2) => {
      this.global.blackout.classList.remove("active");
      this.featuresBlackout.classList.remove("active");
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      if (clicked) {
        this.global.activateCurrentNavLink(clicked);
        this.global.flashBlackout();
      }
      this.global.enableSectionCtrlBtnEvents();
      this.hideAllText();
      this.showIntroText();
      this.featuresCtrlBtns.classList.add("active");
      if (isIntro2) return;
      this.playFeaturesIntro();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    hideAllText = () => {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showIntroText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === "intro").classList.add("active");
    };
    showFeatureText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === this.activeFeature).classList.add("active");
    };
    showFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.add("active");
    };
    hideFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.remove("active");
    };
    showFeaturesVidDiv = (feature) => {
      this.featuresAllVidWraps.forEach((el) => {
        if (el.classList.contains("intro")) return;
        el.classList.remove("active");
        if (el.dataset.feature === feature) {
          this.acitveVidWrap = el;
          this.acitveVidWrap.classList.add("active");
        }
      });
    };
    hideFeaturesVidDiv = () => {
      this.featuresAllVidWraps.forEach((el) => {
        if (el.classList.contains("intro")) return;
        el.classList.remove("active");
      });
    };
    playFeaturesIntro = () => {
      this.featuresBlackout.classList.remove("active");
      this.showFeaturesIntroVidDiv();
      this.hideFeaturesVidDiv();
      const allIntros = this.featuresIntroVidDiv.querySelectorAll(".vid-code-intro");
      allIntros.forEach((el) => {
        if (el.offsetParent !== null) {
          const vid = el.querySelector(".vid-intro");
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }
        }
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearFeaturesTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.hideFeaturesIntroVidDiv();
      this.showFeaturesVidDiv(clickedCtrlBtn.dataset.feature);
      this.activeFeature = clickedCtrlBtn.dataset.feature;
      this.featuresEndisCancelled = false;
      this.hideAllText();
      this.showFeatureText();
      this.global.setActiveVid(this.acitveVidWrap, null);
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.featuresEndisCancelled === false) {
        this.global.disableSectionCtrlBtnEvents();
        this.global.disablePause();
        this.pauseWrapper.classList.remove("active");
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout.classList.add("active");
          setTimeout(() => {
            this.hideAllText();
            this.showIntroText();
            this.global.resetAllSectionVids();
            this.global.deactivateCurrentBtns();
            this.global.enableNavLinksAndNavBtn();
            this.global.enableSectionCtrlBtnEvents();
            this.playFeaturesIntro();
          }, TIMING.UI.BLACKOUT_WAIT_TO_REVEAL);
        }, TIMING.VIDEO.VID_END_TIMER);
      }
    };
    clearFeaturesTimers = () => {
      this.featuresEndisCancelled = true;
      clearTimeout(this.featuresTimer);
      this.featuresTimer = null;
    };
  };
  var features_default = Features;

  // src/2-data.js
  var HOME_VIEW = "view-1";
  var Data = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.introText = this.global.query(".section-wrap-txt", this.container);
      this.viewOptsBtn = this.global.query(".opts-menu-btn", this.container);
      this.viewOptsMenu = this.global.query(".opts-dropdown", this.container);
      this.allViewOptBtns = [
        ...this.global.queryAll(".opts-menu-link", this.container)
      ];
      this.dimmer = this.global.query(".dimmer", this.container);
      this.txtImgBtn = this.global.query(".txt-img-btn", this.container);
      this.activeDataWrapper = this.global.query(
        ".section-wrap-comp-data",
        this.container
      );
      this.allDataWrappers = [
        ...this.global.queryAll(".section-wrap-comp-data", this.container)
      ];
      this.allData = [...this.global.queryAll(".comp-data-wrap", this.container)];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.activeViewBtn = null;
      this.activeView = "view-1";
      this.lastActiveView = { view: "view-1", startTime: 0, endTime: 0 };
      this.viewVidFlag = false;
      this.viewChainFlag = false;
      this.txtOrImg = "image";
      this.activeDataSheet = null;
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
      this.startTime = 0;
      this.endTime = 0;
      this.activeCtrlBtn = null;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-data", this.initSection],
        ["play-ctrl-vid", this.setAndPlayCtrlBtnVid],
        ["play-view-vid", this.setAndPlayViewVid],
        ["back-to-view", this.backToViewFromComp],
        ["open-view-opts-menu", this.showViewOptsMenu],
        ["close-view-opts-menu", this.hideViewOptsMenu],
        ["toggle-img-txt", this.showCompImageOrText],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
      this.assetsMap = /* @__PURE__ */ new Map([
        ["view-1", ASSETS["view-1"].desktop],
        ["view-1-mp", ASSETS["view-1"].mobile],
        ["view-2", ASSETS["view-2"].desktop],
        ["view-2-mp", ASSETS["view-2"].mobile]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.dimmer.classList.remove("active");
      this.txtOrImg = "image";
      this.txtImgBtn.textContent = "image";
      this.hideAllBackBtns();
      this.hideAllData();
      this.resetAllDataSheets();
      this.introText.classList.add("active");
      this.showCtrlBtnWrapper();
      this.global.activateCurrentNavLink(clicked);
      this.global.clearSectionVidSrc();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    showViewOptsMenu = () => {
      this.viewOptsMenu.classList.add("active");
    };
    hideViewOptsMenu = () => {
      this.viewOptsMenu.classList.remove("active");
    };
    showCompImageOrText = () => {
      if (this.txtOrImg === "image") {
        this.txtOrImg = "text";
        this.dimmer.classList.remove("active");
        this.activeDataSheet.classList.remove("active");
      } else {
        this.txtOrImg = "image";
        this.dimmer.classList.add("active");
        this.activeDataSheet.classList.add("active");
      }
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = this.txtOrImg;
    };
    hideAllData = () => {
      this.deactivateAllDataWrappers();
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showData = () => {
      this.activeDataWrapper.classList.add("active");
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach((el) => {
        if (el.dataset.comp === this.activeCtrlBtn.dataset.comp)
          this.activeDataSheet = el;
      });
      this.activeDataSheet.classList.add("active");
    };
    hideAllBackBtns = () => {
      this.allCtrlBtnWrappers.forEach((el) => {
        el.querySelector(".ctrl-btn-back").classList.remove("active");
      });
    };
    showBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach(function(el) {
        el.classList.remove("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.add("active");
    };
    resetAllDataSheets = () => {
      this.allData.forEach(function(el) {
        el.parentElement.classList.add("active");
        el.querySelector(".comp-data-body-wrap").scroll(0, 0);
        el.parentElement.classList.remove("active");
      });
    };
    setLastActiveView = (newValue) => {
      if (!newValue) {
        this.lastActiveView.view = this.activeView;
      } else {
        this.lastActiveView.view = newValue;
      }
    };
    setActiveView = () => {
      this.activeView = this.activeViewBtn.dataset.view;
    };
    viewBackToStart = () => {
      this.startTime = VIEW_START_END[this.lastActiveView.view].startTime;
      this.endTime = VIEW_START_END[this.lastActiveView.view].endTime;
    };
    setViewVidStartAndEnd = () => {
      this.viewVidFlag = true;
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView === HOME_VIEW) {
        this.viewBackToStart();
        return;
      }
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView !== HOME_VIEW) {
        this.viewChainFlag = true;
        this.viewBackToStart();
        return;
      }
      this.startTime = this.activeViewBtn.dataset.startTime;
      this.endTime = this.activeViewBtn.dataset.endTime;
    };
    setDataVidStartAndEnd = () => {
      this.viewVidFlag = false;
      this.hideAllData();
      this.startTime = this.activeCtrlBtn.dataset.startTime;
      this.endTime = this.activeCtrlBtn.dataset.endTime;
    };
    setDataVidPoster = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      let mapKey = this.activeView;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVid.setAttribute("poster", asset);
    };
    setDataVidBackgroundImg = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      const activeVidWrap = activeVid.closest(".vid-wrap");
      let mapKey = this.lastActiveView.view;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVidWrap.style.backgroundImage = `url("${asset}")`;
    };
    deactivateAllDataWrappers = () => {
      this.allDataWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = (clickedViewOptsBtn) => {
      if (clickedViewOptsBtn.dataset.view === this.activeView) return;
      this.viewOptsMenu.classList.remove("active");
      this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
      this.activeDataWrapper = this.allDataWrappers.find(
        (el) => el.dataset.view === clickedViewOptsBtn.dataset.view
      );
      this.activeViewBtn = clickedViewOptsBtn;
      this.global.setActiveVid();
      this.setDataVidBackgroundImg();
      this.setActiveView();
      this.setActiveCtrlBtnWrapper();
      this.setViewVidStartAndEnd();
      this.playDataVid();
    };
    setAndPlayCtrlBtnVid = (clickedCtrlBtn) => {
      this.global.setActiveVid();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
      this.hideActiveCtrlBtnWrapper();
      this.activeCtrlBtn = clickedCtrlBtn;
      this.setDataVidStartAndEnd(this.activeCtrlBtn);
      this.playDataVid();
    };
    playDataVid = () => {
      this.introText.classList.remove("active");
      this.activeCtrlBtnWrapper.classList.remove("active");
      this.global.setStartTime(this.startTime);
      this.global.setEndTime(this.endTime);
      this.global.playRange();
    };
    vidEnd = () => {
      if (this.viewVidFlag && !this.viewChainFlag) {
        this.setLastActiveView();
        this.setDataVidBackgroundImg();
        this.setDataVidPoster();
        this.showActiveCtrlBtnWrapper();
        this.introText.classList.add("active");
        this.global.enableNavLinksAndNavBtn();
      } else if (this.viewChainFlag) {
        this.viewChainFlag = false;
        this.setLastActiveView(HOME_VIEW);
        this.setDataVidBackgroundImg();
        this.setViewVidStartAndEnd();
        this.playDataVid();
      } else {
        this.dimmer.classList.add("active");
        this.activeDataWrapper.querySelector(".txt-img-btn").classList.add("active");
        this.showData();
        this.showBackBtn();
        const activeVidWrap = this.global.getActiveVid().closest(".vid-wrap");
        if (activeVidWrap) {
          activeVidWrap.style.backgroundImage = "none";
          activeVidWrap.style.backgroundColor = "black";
        }
      }
    };
    backToViewFromComp = () => {
      this.global.flashBlackout();
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
      this.txtOrImg = "image";
      this.activeDataWrapper.querySelector(".txt-img-btn").classList.remove("active");
      this.hideAllData();
      this.resetAllDataSheets();
      this.dimmer.classList.remove("active");
      this.introText.classList.add("active");
      this.hideAllBackBtns();
      this.showCtrlBtnWrapper();
      this.setDataVidBackgroundImg();
      this.global.clearSectionVidSrc();
    };
    hideActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.remove("active");
    };
    showActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    showCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach((el) => {
        el.classList.add("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    setActiveCtrlBtnWrapper = () => {
      this.global.deactivateAllCtrlBtnWrappers();
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.view === this.activeView
      );
    };
    deactivateAllCtrlBtnWrappers = () => {
      this.allCtrlBtnWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
  };
  var data_default = Data;

  // src/3-sequence.js
  var Sequence = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.allTxtWrappers = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.allIntroTxt = [
        ...this.global.queryAll(".intro-txt-wrap", this.container)
      ];
      this.allActionHeadings = [
        ...this.global.queryAll(".action-heading", this.container)
      ];
      this.allVidWrappers = [
        ...this.global.queryAll(".vid-wrap", this.container)
      ];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.isDropdown = false;
      this.activeSequence = null;
      this.activeSectionTxt = null;
      this.activeVidWrapper = null;
      this.activeSequenceStep = null;
      this.allActiveSequenceSteps = null;
      this.activeCtrlBtnWrapper = null;
      this.sequenceTimer = null;
      this.sequenceEndIsCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-sequence", this.initSection],
        ["open-sequence-index", this.setActiveSequenceDropdown],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.activeSequence = clicked.dataset.sequence;
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.setAndShowActiveTxtWrapper();
      this.setAndShowActiveVidWrapper();
      this.allActiveSequenceSteps = /* @__PURE__ */ new Set();
      const steps = this.activeVidWrapper.querySelectorAll(".vid-code");
      steps.forEach((el) => {
        this.allActiveSequenceSteps.add(el.dataset.step);
      });
      this.setAndShowActiveCtrlBtnWrapper();
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.add("active");
      if (!this.isDropdown) {
        this.global.activateCurrentNavLink(clicked);
      } else {
        this.global.activateCurrentNavLink(
          clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
        );
        window.dispatchEvent(
          new CustomEvent("dropdownOptClicked", { detail: clicked })
        );
        this.isDropdown = false;
      }
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    setActiveSequenceDropdown = (clicked) => {
      if ("isDropdownIcon" in clicked.dataset) {
        window.dispatchEvent(
          new CustomEvent("dropdownIconClicked", { detail: clicked })
        );
      } else {
        this.isDropdown = true;
        this.initSection(clicked);
      }
    };
    setAndShowActiveTxtWrapper = () => {
      this.allTxtWrappers.forEach((el) => el.classList.remove("active"));
      this.activeTxtWrapper = this.allTxtWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeTxtWrapper.classList.add("active");
    };
    setAndShowActiveVidWrapper = () => {
      this.allVidWrappers.forEach(function(el) {
        el.classList.remove("active");
        el.querySelectorAll(".vid-code").forEach(function(el2) {
          el2.classList.remove("active");
        });
      });
      this.activeVidWrapper = this.allVidWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeVidWrapper.classList.add("active");
    };
    setActiveSequenceStep = (sequenceStepData) => {
      this.activeVidWrapper.querySelectorAll(".vid-code").forEach((el) => {
        if (el.dataset.step === sequenceStepData) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
        if (el.classList.contains("active") && el.offsetParent !== null)
          this.activeSequenceStep = el.querySelector(".vid");
      });
    };
    setAndShowActiveCtrlBtnWrapper = () => {
      this.allCtrlBtnWrappers.forEach((el) => el.classList.remove("active"));
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    hideAllIntroText = () => {
      this.allIntroTxt.forEach((el) => {
        el.classList.remove("active");
      });
    };
    hideAllActionHeadings = () => {
      this.allActionHeadings.forEach((el) => {
        el.classList.remove("active");
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearSequenceTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.remove("active");
      this.activeTxtWrapper.querySelector(".action-heading").classList.add("active");
      this.sequenceEndIsCancelled = false;
      this.setActiveSequenceStep(clickedCtrlBtn.dataset.step);
      this.global.setActiveVid(this.activeVidWrapper, this.activeSequenceStep);
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.sequenceEndIsCancelled === false) {
        this.pauseWrapper.classList.remove("active");
        this.global.disablePause(this.pauseWrapper);
        this.global.deactivateCurrentBtns();
        if (LOOP_SEQUENCE_VIDS) {
          let activeStepIndex = [...this.allActiveSequenceSteps].indexOf(
            this.activeSequenceStep.parentElement.dataset.step
          );
          if (activeStepIndex === this.allActiveSequenceSteps.size - 1)
            activeStepIndex = 0;
          else {
            activeStepIndex += 1;
          }
          const nextStepBtn = [
            ...this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn")
          ].find(
            (el) => el.dataset.step === [...this.allActiveSequenceSteps][activeStepIndex]
          );
          setTimeout(() => {
            this.playCtrlBtnVid(nextStepBtn);
          }, 200);
        }
      }
    };
    clearSequenceTimers = () => {
      this.sequenceEndIsCancelled = true;
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    };
  };
  var sequence_default = Sequence;

  // src/main.js
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  var navContainer = query(".nav_component", document);
  var featuresContainer = query(".section.features", document);
  var dataContainer = query(".section.data", document);
  var sequenceContainer = query(".section.sequence", document);
  var navbar = new navbar_default(global_exports, navContainer);
  var features = new features_default(global_exports, featuresContainer);
  var data = new data_default(global_exports, dataContainer);
  var sequence = new sequence_default(global_exports, sequenceContainer);
  var SECTIONS = {
    navbar,
    features,
    data,
    sequence
  };
  navContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    if ("isDropdownIcon" in clicked.dataset) {
      targetModule.handleEvent(clicked, action);
      return;
    }
    blackout.classList.add("active");
    setActiveSection(activeSection);
    targetModule.handleEvent(clicked, action);
  });
  navContainer.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const action = hovered.dataset.mouseoverAction;
    navbar.handleEvent(hovered, action);
  });
  navContainer.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const action = hovered.dataset.mouseoutAction;
    navbar.handleEvent(hovered, action);
  });
  window.addEventListener("dropdownIconClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.toggleNavDropdown(clicked);
  });
  window.addEventListener("dropdownOptClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.closeNavDropdown(clicked);
    navbar.closeMobileNavMenu();
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection = clicked.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    targetModule.handleEvent(clicked, action);
  });
  mainWrapper.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoverAction;
    targetModule.handleEvent(hovered, action);
  });
  mainWrapper.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoutAction;
    targetModule.handleEvent(hovered, action);
  });
  allVids.forEach(function(el) {
    el.addEventListener("ended", function(e) {
      const endedVid = e.target.closest(".vid");
      if (!endedVid) return;
      const vidSection = endedVid.closest(".section").dataset.section;
      const targetModule = SECTIONS[vidSection];
      targetModule.vidEnd();
    });
  });
  var init = function() {
    setupLazyLoading();
    setWebflowBreakpoint();
    blackout.classList.add("active");
    navContainer.classList.remove("active");
    navbar.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    blackout.classList.remove("active");
    features.playFeaturesIntro();
    setTimeout(() => {
      navContainer.classList.add("active");
      features.initSection(null, isIntro = true);
    }, TIMING.UI.START_UI_REVEAL);
  };
  var setupLazyLoading = function() {
    const allLazyVids = document.querySelectorAll(".vid");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const sources = video.querySelectorAll("source");
        if (entry.isIntersecting) {
          sources.forEach((source) => {
            const dataSrc = source.getAttribute("data-src") || source.src;
            if (dataSrc) {
              source.src = dataSrc;
              source.setAttribute("data-src", dataSrc);
            }
          });
          video.load();
        } else {
          performance.clearMeasures();
          performance.clearResourceTimings();
          performance.clearMarks();
          ResetSection(video.closest(".section"));
          video.pause();
          sources.forEach((source) => {
            const currentSrc = source.src;
            if (currentSrc) {
              source.setAttribute("data-src", currentSrc);
              source.src = "";
              source.removeAttribute("src");
            }
          });
          video.load();
        }
      });
    }, observerOptions);
    allLazyVids.forEach((vid) => videoObserver.observe(vid));
    const ResetSection = function(section) {
      if (!section) return;
      section.querySelectorAll(".vid").forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
      deactivateCurrentBtns(section);
    };
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjFlNzdiMWUzZGRmYzc2YjZmZTgxNDQ2LzY5ZGMxNDA2MDAwOWUyMzZjMGMwZjExOV9Db21wb25lbnRzLVZpZXctQS53ZWJwXCIsXHJcbiAgICBtb2JpbGU6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82MWU3N2IxZTNkZGZjNzZiNmZlODE0NDYvNjlkYzE0MDY5OGQ2NmZjYzU5OTJmNmExX0NvbXBvbmVudHMtVmlldy1BLU1vYmlsZS1QLndlYnBcIixcclxuICB9LFxyXG4gIFwidmlldy0yXCI6IHtcclxuICAgIGRlc2t0b3A6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82MWU3N2IxZTNkZGZjNzZiNmZlODE0NDYvNjlkYzE0MDY0MmY0OWNmMDE2YjAyZmFmX0NvbXBvbmVudHMtVmlldy1CLndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzYxZTc3YjFlM2RkZmM3NmI2ZmU4MTQ0Ni82OWRjMTQwNjNiNWEyMTUyMGU0NGE3YjlfQ29tcG9uZW50cy1WaWV3LUItTW9iaWxlLVAud2VicFwiLFxyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgVklFV19TVEFSVF9FTkQgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDAsXHJcbiAgICBlbmRUaW1lOiAzLjIsXHJcbiAgfSxcclxuICBcInZpZXctMlwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDMuNjQsXHJcbiAgICBlbmRUaW1lOiA2LjksXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBMT09QX1NFUVVFTkNFX1ZJRFMgPSB0cnVlO1xyXG4iLCAiaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmV4cG9ydCBjb25zdCBtYWluV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi13cmFwcGVyXCIpO1xyXG5leHBvcnQgY29uc3QgYmxhY2tvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJsYWNrb3V0XCIpO1xyXG5leHBvcnQgY29uc3QgYWxsU2VjdGlvbnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uXCIpXTtcclxuZXhwb3J0IGNvbnN0IGFsbFZpZENvZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuZXhwb3J0IGNvbnN0IG5hdk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpO1xyXG5leHBvcnQgY29uc3QgYWxsTmF2TWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rXCIpO1xyXG5leHBvcnQgY29uc3QgbmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG5leHBvcnQgY29uc3QgX3N0YXRlID0ge1xyXG4gIGFjdGl2ZVNlY3Rpb246IG51bGwsXHJcbiAgYWN0aXZlU2VjdGlvbk5hbWU6IG51bGwsXHJcbiAgYWN0aXZlVmlkOiBudWxsLFxyXG4gIHdlYmZsb3dCcmVha3BvaW50OiBudWxsLFxyXG4gIHN0YXJ0VGltZTogMCxcclxuICBlbmRUaW1lOiAwLFxyXG4gIHBhdXNlRmxhZzogZmFsc2UsXHJcbn07XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9HTE9CQUwgRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL1RoZSAnU3RyaWN0JyBTZWxlY3RvclxyXG5leHBvcnQgY29uc3QgcXVlcnkgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xyXG4gIGNvbnN0IGVsID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICBpZiAoIWVsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBDUklUSUNBTCBVSSBFUlJPUjogXCIke3NlbGVjdG9yfVwiIGlzIG1pc3NpbmcgZnJvbSB0aGUgRE9NLmAsXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gZWw7XHJcbn07XHJcbi8vVGhlICdTdHJpY3QnIE11bHQtU2VsZWN0b3JcclxuZXhwb3J0IGNvbnN0IHF1ZXJ5QWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpIHtcclxuICBjb25zdCBlbGVtZW50cyA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgQ1JJVElDQUwgVUkgRVJST1I6IE5vIGVsZW1lbnRzIG1hdGNoaW5nIFwiJHtzZWxlY3Rvcn1cIiBmb3VuZC5gLFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGVsZW1lbnRzO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0VmlkVHlwZSA9IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gIHJldHVybiB2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikuY2xhc3NMaXN0WzFdO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZmxhc2hCbGFja291dCA9IGZ1bmN0aW9uICgpIHtcclxuICBibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9LCBUSU1JTkcuVUkuQkxBQ0tPVVRfVElNRVIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlTmF2TGlua3NBbmROYXZCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgbmF2TWVudS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgbmF2QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudE5hdkxpbmsgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MoKTtcclxuICBjbGlja2VkLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUN1cnJlbnROYXZMaW5rcyA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxOYXZNZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlU2VjdGlvbiA9IGZ1bmN0aW9uIChzZWN0aW9uTmFtZSwgaW5kZXgpIHtcclxuICBkZWFjdGl2YXRlQWxsU2VjdGlvbnMoKTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbk5hbWUgPSBzZWN0aW9uTmFtZTtcclxuICBpZiAoIWluZGV4KSBpbmRleCA9IDA7XHJcbiAgY29uc3QgbWF0Y2hlcyA9IGFsbFNlY3Rpb25zLmZpbHRlcihcclxuICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZWN0aW9uID09PSBzZWN0aW9uTmFtZSxcclxuICApO1xyXG4gIGNvbnN0IHRhcmdldCA9IG1hdGNoZXNbaW5kZXhdO1xyXG4gIGlmICh0YXJnZXQpIHtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24gPSB0YXJnZXQ7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbFNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0QWN0aXZlVmlkID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBfc3RhdGUuYWN0aXZlVmlkO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlVmlkID0gZnVuY3Rpb24gKGFjdGl2ZVZpZFdyYXAsIGFjdGl2ZVNlcXVlbmNlU3RlcCkge1xyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IFwiXCI7XHJcbiAgfVxyXG4gIGlmIChhY3RpdmVWaWRXcmFwICYmIGFjdGl2ZVNlcXVlbmNlU3RlcCA9PT0gbnVsbCkge1xyXG4gICAgYWN0aXZlVmlkV3JhcC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKS5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoYWN0aXZlVmlkV3JhcCAmJiBhY3RpdmVTZXF1ZW5jZVN0ZXApIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQgPSBhY3RpdmVTZXF1ZW5jZVN0ZXA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsbFZpZENvZGVzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKS5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGdldFdlYmZsb3dCcmVha3BvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQ7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRXZWJmbG93QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gIGlmICh3aWR0aCA8IDQ4MCkgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJtb2JpbGVQb3J0cmFpdFwiO1xyXG4gIGlmICh3aWR0aCA+PSA0ODApIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwibW9iaWxlTGFuZHNjYXBlXCI7XHJcbiAgaWYgKHdpZHRoID49IDc2OCkgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJ0YWJsZXRcIjtcclxuICBpZiAod2lkdGggPj0gOTkyKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcImRlc2t0b3BcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldFN0YXJ0VGltZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gIF9zdGF0ZS5zdGFydFRpbWUgPSBuZXdWYWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEVuZFRpbWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICBfc3RhdGUuZW5kVGltZSA9IG5ld1ZhbHVlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgY2xlYXJTZWN0aW9uVmlkU3JjID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5zcmMgPSBcIlwiO1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRBbGxTZWN0aW9uVmlkcyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgZWwucGF1c2UoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHBsYXlSYW5nZSA9IGZ1bmN0aW9uICh2aWRlb0N1cnJlbnRUaW1lKSB7XHJcbiAgaWYgKCFfc3RhdGUuYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgY29uc3QgdmlkQ29kZSA9IF9zdGF0ZS5hY3RpdmVWaWQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0YXJnZXRTdGFydCA9IHZpZGVvQ3VycmVudFRpbWUgfHwgX3N0YXRlLnN0YXJ0VGltZTtcclxuICAvLyBDTEVBTlVQOiBLaWxsIGFueSBwcmV2aW91cyBtb25pdG9yIGJlZm9yZSBzdGFydGluZyBhIG5ldyBvbmVcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IpIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yLFxyXG4gICAgKTtcclxuICB9XHJcbiAgLy8gMS4gSElEREVOIFNUQVRFOiBJbnN0YW50IGhpZGUgdG8gcmV2ZWFsIHZpZC13cmFwIGJhY2tncm91bmQgaW1hZ2VcclxuICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgLy8gQ2xlYXIgYW55IGV4aXN0aW5nIHRpbWV1cGRhdGUgbW9uaXRvcnNcclxuICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICBcInRpbWV1cGRhdGVcIixcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yLFxyXG4gICk7XHJcbiAgY29uc3QgbW9uaXRvclRpbWUgPSAoKSA9PiB7XHJcbiAgICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA+PSBfc3RhdGUuZW5kVGltZSAtIDAuMTUpIHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IF9zdGF0ZS5lbmRUaW1lO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiZW5kZWRcIikpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IgPSBtb25pdG9yVGltZTtcclxuICAvLyBTb3VyY2UgaGFuZGxpbmdcclxuICBjb25zdCBzb3VyY2UgPSBfc3RhdGUuYWN0aXZlVmlkLnF1ZXJ5U2VsZWN0b3IoXCJzb3VyY2VcIik7XHJcbiAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZSA/IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSA6IG51bGw7XHJcbiAgaWYgKGRhdGFTcmMgJiYgX3N0YXRlLmFjdGl2ZVZpZC5zcmMgIT09IGRhdGFTcmMpIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuc3JjID0gZGF0YVNyYztcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQubG9hZCgpO1xyXG4gIH1cclxuICBjb25zdCBzdGFydFBsYXliYWNrU2VxdWVuY2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID0gdGFyZ2V0U3RhcnQ7XHJcbiAgICAgIC8vIDIuIFRIRSBGQUlMLVNBRkUgUkVWRUFMXHJcbiAgICAgIC8vIFdlIHBvbGwgZm9yIHBoeXNpY2FsIHBsYXloZWFkIG1vdmVtZW50LiBPbmNlIGl0IG1vdmVzLFxyXG4gICAgICAvLyB0aGUgXCJibGFjayBidWZmZXJcIiBpcyBndWFyYW50ZWVkIHRvIGJlIGdvbmUuXHJcbiAgICAgIGNvbnN0IHBvbGxGb3JGcmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA+IHRhcmdldFN0YXJ0KSB7XHJcbiAgICAgICAgICAvLyBEb3VibGUgUkFGIGlzIHRoZSBmaW5hbCBndWFyZCBmb3IgdGhlIEdQVSBwYWludCBjeWNsZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibGFja291dCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZWQpIHtcclxuICAgICAgICAgIC8vIElmIHN0aWxsIGF0IHRhcmdldFN0YXJ0IGJ1dCBwbGF5aW5nLCBjaGVjayBhZ2FpbiBuZXh0IGZyYW1lXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocG9sbEZvckZyYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIDMuIFNUQVJUXHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBhd2FpdCBfc3RhdGUuYWN0aXZlVmlkLnBsYXkoKTtcclxuICAgICAgcG9sbEZvckZyYW1lKCk7IC8vIFN0YXJ0IGNoZWNraW5nIGZvciB0aGUgZmlyc3QgcmVhbCBmcmFtZVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJQbGF5YmFjayBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAvLyBGYWxsYmFjazogc2hvdyB2aWRlbyBhbnl3YXkgaWYgcGxheSgpIGZhaWxzIChlLmcuIGF1dHBsYXkgYmxvY2tlZClcclxuICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgLy8gV2FpdCBmb3IgZGF0YSAocmVhZHlTdGF0ZSAzIGlzIEhBVkVfRlVUVVJFX0RBVEEpXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQucmVhZHlTdGF0ZSA+PSAzKSB7XHJcbiAgICBzdGFydFBsYXliYWNrU2VxdWVuY2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBzdGFydFBsYXliYWNrU2VxdWVuY2UsIHtcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUucGF1c2VGbGFnID0gZmFsc2U7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmIChfc3RhdGUucGF1c2VGbGFnKSB7XHJcbiAgICBfc3RhdGUucGF1c2VGbGFnID0gZmFsc2U7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBsYXkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgX3N0YXRlLnBhdXNlRmxhZyA9IHRydWU7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gZnVuY3Rpb24gKGJ0bldyYXBwZXJJbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvblxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIilcclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgICAgaWYgKGluZGV4ID09PSBidG5XcmFwcGVySW5kZXgpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlQnRuSG92ZXJDbGFzcyA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZCAmJiBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPT09IFwiZGVza3RvcFwiKVxyXG4gICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoXCJob3ZlcmVkXCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50QnRuID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG4gIH0sIDUwKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50QnRucyA9IGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcbiAgaWYgKCFzZWN0aW9uKSBzZWN0aW9uID0gX3N0YXRlLmFjdGl2ZVNlY3Rpb247XHJcbiAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldExvY2FsSW5kZXggPSBmdW5jdGlvbiAoYnRuLCBidG5DbGFzcywgYWxsQnRuc1dyYXBwZXIpIHtcclxuICBsZXQgbG9jYWxJbmRleDtcclxuICBjb25zdCBhbGxCdG5zID0gYnRuXHJcbiAgICAuY2xvc2VzdChgLiR7YWxsQnRuc1dyYXBwZXJ9YClcclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtidG5DbGFzc31gKTtcclxuICBhbGxCdG5zLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgaWYgKGVsID09PSBidG4pIGxvY2FsSW5kZXggPSBpbmRleDtcclxuICB9KTtcclxuICByZXR1cm4gbG9jYWxJbmRleDtcclxufTtcclxuIiwgImNsYXNzIE5hdmJhciB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMubmF2TWVudSA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm5hdl9tZW51XCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMubmF2QnRuID0gdGhpcy5nbG9iYWwucXVlcnkoXCIubmF2X2J1dHRvblwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmFsbE5hdkxpbmtzID0gdGhpcy5nbG9iYWwucXVlcnlBbGwoXCIubmF2X21lbnVfbGlua1wiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmFsbE5hdkxpbmtzV2l0aERyb3Bkb3duID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbCgnW2RhdGEtbmF2LXNlY3Rpb249XCJzZXF1ZW5jZVwiXScsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIubmF2X21lbnVfZHJvcGRvd25cIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1uYXYtZHJvcGRvd25cIiwgdGhpcy5vcGVuTmF2RHJvcGRvd25dLFxyXG4gICAgICBbXCJjbG9zZS1uYXYtZHJvcGRvd25cIiwgdGhpcy5jbG9zZU5hdkRyb3Bkb3duXSxcclxuICAgICAgW1widG9nZ2xlLW5hdi1kcm9wZG93blwiLCB0aGlzLnRvZ2dsZU5hdkRyb3Bkb3duXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNsb3NlTmF2TWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGNsb3NlTW9iaWxlTmF2TWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChcIm5hdk1lbnVPcGVuXCIgaW4gdGhpcy5uYXZNZW51LmRhdGFzZXQpIHRoaXMubmF2QnRuLmNsaWNrKCk7XHJcbiAgICB0aGlzLm5hdk1lbnUucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgb3Blbk5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgY2xvc2VOYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHRvZ2dsZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsodHJpZ2dlcik7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcblxyXG5jbGFzcyBGZWF0dXJlcyB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dCA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLmJsYWNrb3V0XCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0ID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi50eHQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFZpZFdyYXBzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi52aWQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2ID0gdGhpcy5nbG9iYWwucXVlcnkoXHJcbiAgICAgIFwiLnZpZC13cmFwLmludHJvXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIudmlkLXdyYXAuZmVhdHVyZXNcIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5wYXVzZS13cmFwXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucyA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi5zZWN0aW9uLXdyYXAtYnRuc1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZUZlYXR1cmUgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwID0gbnVsbDtcclxuICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1mZWF0dXJlc1wiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWRdLFxyXG4gICAgICBbXCJidG4taG92ZXJlZFwiLCB0aGlzLmdsb2JhbC50b2dnbGVCdG5Ib3ZlckNsYXNzLmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSAoY2xpY2tlZCwgaXNJbnRybykgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgaWYgKGNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBpZiAoaXNJbnRybykgcmV0dXJuO1xyXG4gICAgdGhpcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGlkZUFsbFRleHQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzaG93SW50cm9UZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHRcclxuICAgICAgLmZpbmQoKGVsKSA9PiBlbC5kYXRhc2V0LnRleHRDb250ZW50ID09PSBcImludHJvXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVUZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHRcclxuICAgICAgLmZpbmQoKGVsKSA9PiBlbC5kYXRhc2V0LnRleHRDb250ZW50ID09PSB0aGlzLmFjdGl2ZUZlYXR1cmUpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc0ludHJvVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZXNWaWREaXYgPSAoZmVhdHVyZSkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFZpZFdyYXBzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnRyb1wiKSkgcmV0dXJuO1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBpZiAoZWwuZGF0YXNldC5mZWF0dXJlID09PSBmZWF0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5hY2l0dmVWaWRXcmFwID0gZWw7XHJcbiAgICAgICAgdGhpcy5hY2l0dmVWaWRXcmFwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgaGlkZUZlYXR1cmVzVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFZpZFdyYXBzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnRyb1wiKSkgcmV0dXJuO1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5RmVhdHVyZXNJbnRybyA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNWaWREaXYoKTtcclxuICAgIC8vIExvZ2ljOiBGaW5kIHRoZSBvbmUgdGhhdCBpc24ndCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpXHJcbiAgICBjb25zdCBhbGxJbnRyb3MgPVxyXG4gICAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZS1pbnRyb1wiKTtcclxuICAgIGFsbEludHJvcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAvLyBvZmZzZXRQYXJlbnQgaXMgbnVsbCBpZiB0aGUgZWxlbWVudCBpcyBkaXNwbGF5OiBub25lXHJcbiAgICAgIGlmIChlbC5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCB2aWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZC1pbnRyb1wiKTtcclxuICAgICAgICBpZiAodmlkKSB7XHJcbiAgICAgICAgICB2aWQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgdmlkLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSAoY2xpY2tlZEN0cmxCdG4pID0+IHtcclxuICAgIHRoaXMuY2xlYXJGZWF0dXJlc1RpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzVmlkRGl2KGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZmVhdHVyZSk7XHJcbiAgICB0aGlzLmFjdGl2ZUZlYXR1cmUgPSBjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmZlYXR1cmU7XHJcbiAgICB0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVUZXh0KCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQodGhpcy5hY2l0dmVWaWRXcmFwLCBudWxsKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnRCdG4oY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgcGF1c2VDdHJsVmlkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwudG9nZ2xlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5zaG93SW50cm9UZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5yZXNldEFsbFNlY3Rpb25WaWRzKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgICAgICAgdGhpcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gICAgICAgIH0sIFRJTUlORy5VSS5CTEFDS09VVF9XQUlUX1RPX1JFVkVBTCk7XHJcbiAgICAgIH0sIFRJTUlORy5WSURFTy5WSURfRU5EX1RJTUVSKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNsZWFyRmVhdHVyZXNUaW1lcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmVhdHVyZXNUaW1lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRmVhdHVyZXM7XHJcbiIsICJpbXBvcnQgeyBBU1NFVFMsIFZJRVdfU1RBUlRfRU5EIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuY29uc3QgSE9NRV9WSUVXID0gXCJ2aWV3LTFcIjtcclxuY2xhc3MgRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuaW50cm9UZXh0ID0gdGhpcy5nbG9iYWwucXVlcnkoXCIuc2VjdGlvbi13cmFwLXR4dFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuID0gdGhpcy5nbG9iYWwucXVlcnkoXCIub3B0cy1tZW51LWJ0blwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudSA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm9wdHMtZHJvcGRvd25cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxWaWV3T3B0QnRucyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIub3B0cy1tZW51LWxpbmtcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZGltbWVyID0gdGhpcy5nbG9iYWwucXVlcnkoXCIuZGltbWVyXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMudHh0SW1nQnRuID0gdGhpcy5nbG9iYWwucXVlcnkoXCIudHh0LWltZy1idG5cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWxsRGF0YVdyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbERhdGEgPSBbLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuY29tcC1kYXRhLXdyYXBcIiwgdGhpcy5jb250YWluZXIpXTtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3QnRuID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IFwidmlldy0xXCI7XHJcbiAgICB0aGlzLmxhc3RBY3RpdmVWaWV3ID0geyB2aWV3OiBcInZpZXctMVwiLCBzdGFydFRpbWU6IDAsIGVuZFRpbWU6IDAgfTtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1swXTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gMDtcclxuICAgIHRoaXMuZW5kVGltZSA9IDA7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG4gPSBudWxsO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLWRhdGFcIiwgdGhpcy5pbml0U2VjdGlvbl0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5zZXRBbmRQbGF5Q3RybEJ0blZpZF0sXHJcbiAgICAgIFtcInBsYXktdmlldy12aWRcIiwgdGhpcy5zZXRBbmRQbGF5Vmlld1ZpZF0sXHJcbiAgICAgIFtcImJhY2stdG8tdmlld1wiLCB0aGlzLmJhY2tUb1ZpZXdGcm9tQ29tcF0sXHJcbiAgICAgIFtcIm9wZW4tdmlldy1vcHRzLW1lbnVcIiwgdGhpcy5zaG93Vmlld09wdHNNZW51XSxcclxuICAgICAgW1wiY2xvc2Utdmlldy1vcHRzLW1lbnVcIiwgdGhpcy5oaWRlVmlld09wdHNNZW51XSxcclxuICAgICAgW1widG9nZ2xlLWltZy10eHRcIiwgdGhpcy5zaG93Q29tcEltYWdlT3JUZXh0XSxcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gICAgdGhpcy5hc3NldHNNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1widmlldy0xXCIsIEFTU0VUU1tcInZpZXctMVwiXS5kZXNrdG9wXSxcclxuICAgICAgW1widmlldy0xLW1wXCIsIEFTU0VUU1tcInZpZXctMVwiXS5tb2JpbGVdLFxyXG4gICAgICBbXCJ2aWV3LTJcIiwgQVNTRVRTW1widmlldy0yXCJdLmRlc2t0b3BdLFxyXG4gICAgICBbXCJ2aWV3LTItbXBcIiwgQVNTRVRTW1widmlldy0yXCJdLm1vYmlsZV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0SW1nQnRuLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5oaWRlQWxsQmFja0J0bnMoKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgYmNrZ3JuZCBpbWdcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNob3dWaWV3T3B0c01lbnUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZVZpZXdPcHRzTWVudSA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q29tcEltYWdlT3JUZXh0ID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMudHh0T3JJbWcgPT09IFwiaW1hZ2VcIikge1xyXG4gICAgICB0aGlzLnR4dE9ySW1nID0gXCJ0ZXh0XCI7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eHRPckltZztcclxuICB9O1xyXG4gIGhpZGVBbGxEYXRhID0gKCkgPT4ge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcC1kYXRhLXdyYXBcIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuY29tcCA9PT0gdGhpcy5hY3RpdmVDdHJsQnRuLmRhdGFzZXQuY29tcClcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IGVsO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUFsbEJhY2tCdG5zID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNob3dCYWNrQnRuID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHJlc2V0QWxsRGF0YVNoZWV0cyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1kYXRhLWJvZHktd3JhcFwiKS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0TGFzdEFjdGl2ZVZpZXcgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gdGhpcy5hY3RpdmVWaWV3QnRuLmRhdGFzZXQudmlldztcclxuICB9O1xyXG4gIHZpZXdCYWNrVG9TdGFydCA9ICgpID0+IHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gVklFV19TVEFSVF9FTkRbdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3XS5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXRWaWV3VmlkU3RhcnRBbmRFbmQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ICE9PSBIT01FX1ZJRVcgJiZcclxuICAgICAgdGhpcy5hY3RpdmVWaWV3ID09PSBIT01FX1ZJRVdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnZpZXdCYWNrVG9TdGFydCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gSE9NRV9WSUVXICYmXHJcbiAgICAgIHRoaXMuYWN0aXZlVmlldyAhPT0gSE9NRV9WSUVXXHJcbiAgICApIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpO1xyXG4gICAgaWYgKCFhY3RpdmVWaWQpIHJldHVybjtcclxuICAgIGxldCBtYXBLZXkgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIG1hcEtleSArPSBcIi1tcFwiO1xyXG4gICAgY29uc3QgYXNzZXQgPSB0aGlzLmFzc2V0c01hcC5nZXQobWFwS2V5KTtcclxuICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgYXNzZXQpO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCBhY3RpdmVWaWRXcmFwID0gYWN0aXZlVmlkLmNsb3Nlc3QoXCIudmlkLXdyYXBcIik7XHJcbiAgICBsZXQgbWFwS2V5ID0gdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3O1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSBtYXBLZXkgKz0gXCItbXBcIjtcclxuICAgIGNvbnN0IGFzc2V0ID0gdGhpcy5hc3NldHNNYXAuZ2V0KG1hcEtleSk7XHJcbiAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke2Fzc2V0fVwiKWA7XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheVZpZXdWaWQgPSAoY2xpY2tlZFZpZXdPcHRzQnRuKSA9PiB7XHJcbiAgICAvL3JldHVybiBpZiBjbGlja2VkIHZpZXcgc2FtZSBhcyBjdXJyZW50IHZpZXdcclxuICAgIGlmIChjbGlja2VkVmlld09wdHNCdG4uZGF0YXNldC52aWV3ID09PSB0aGlzLmFjdGl2ZVZpZXcpIHJldHVybjtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuLnRleHRDb250ZW50ID0gY2xpY2tlZFZpZXdPcHRzQnRuLnRleHRDb250ZW50O1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuYWxsRGF0YVdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC52aWV3ID09PSBjbGlja2VkVmlld09wdHNCdG4uZGF0YXNldC52aWV3LFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IGNsaWNrZWRWaWV3T3B0c0J0bjtcclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIHBvc3RlclxyXG4gICAgdGhpcy5zZXRBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgLy9wbGF5IHZpZFxyXG4gICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICB9O1xyXG4gIHNldEFuZFBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG4gPSBjbGlja2VkQ3RybEJ0bjtcclxuICAgIC8vcGxheVxyXG4gICAgdGhpcy5zZXREYXRhVmlkU3RhcnRBbmRFbmQodGhpcy5hY3RpdmVDdHJsQnRuKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTsgLy9yZW1vdmVzIGJsYWNrb3V0IGluIGdsb2JhbC5wbGF5UmFuZ2VcclxuICB9O1xyXG4gIHBsYXlEYXRhVmlkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZSh0aGlzLnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKHRoaXMuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnZpZXdWaWRGbGFnICYmICF0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZFBvc3RlcigpOyAvL2RvbmUgaGVyZSBzbyBwb3N0ZXIgZG9lc24ndCBhcHBlYXIgZWFybGllclxyXG4gICAgICB0aGlzLnNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoSE9NRV9WSUVXKTtcclxuICAgICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgICB0aGlzLnBsYXlEYXRhVmlkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgICB0aGlzLnNob3dCYWNrQnRuKCk7XHJcbiAgICAgIC8vc2V0IGJja2dybmQgaW1nIHRvIGJsYWNrIHRvIHByZXZlbnQgZmxhc2ggb2YgaW1hZ2Ugd2hlbiBjaGFuZ2luZyBuYXZcclxuICAgICAgY29uc3QgYWN0aXZlVmlkV3JhcCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBcIik7XHJcbiAgICAgIGlmIChhY3RpdmVWaWRXcmFwKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIm5vbmVcIjtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgYmFja1RvVmlld0Zyb21Db21wID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVBbGxCYWNrQnRucygpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICB9O1xyXG4gIGhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQudmlldyA9PT0gdGhpcy5hY3RpdmVWaWV3LFxyXG4gICAgKTtcclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBEYXRhO1xyXG4iLCAiaW1wb3J0IHsgTE9PUF9TRVFVRU5DRV9WSURTIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuXHJcbmNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5wYXVzZS13cmFwXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVHh0V3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnR4dC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEludHJvVHh0ID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5pbnRyby10eHQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuYWN0aW9uLWhlYWRpbmdcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnZpZC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuaXNEcm9wZG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVNlY3Rpb25UeHQgPSBudWxsO1xyXG4gICAgLy8gdGhpcy5jdXJyZW50VmlkV3JhcHBlciA9IFwic2VxdWVuY2UtMVwiO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwID0gbnVsbDtcclxuICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcyA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZVwiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZS1pbmRleFwiLCB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlRHJvcGRvd25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gY2xpY2tlZC5kYXRhc2V0LnNlcXVlbmNlO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5oaWRlQWxsSW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmhpZGVBbGxBY3Rpb25IZWFkaW5ncygpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVHh0V3JhcHBlcigpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVmlkV3JhcHBlcigpO1xyXG4gICAgdGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzID0gbmV3IFNldCgpO1xyXG4gICAgY29uc3Qgc3RlcHMgPSB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuICAgIHN0ZXBzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcy5hZGQoZWwuZGF0YXNldC5zdGVwKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5pbnRyby10eHQtd3JhcFwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKFxyXG4gICAgICAgIGNsaWNrZWQuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIikucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9saW5rXCIpLFxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgeyBkZXRhaWw6IGNsaWNrZWQgfSksXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuaXNEcm9wZG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VEcm9wZG93biA9IChjbGlja2VkKSA9PiB7XHJcbiAgICBpZiAoXCJpc0Ryb3Bkb3duSWNvblwiIGluIGNsaWNrZWQuZGF0YXNldCkge1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bkljb25DbGlja2VkXCIsIHsgZGV0YWlsOiBjbGlja2VkIH0pLFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0Ryb3Bkb3duID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pbml0U2VjdGlvbihjbGlja2VkKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVUeHRXcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxUeHRXcmFwcGVycy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXIgPSB0aGlzLmFsbFR4dFdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZXF1ZW5jZSA9PT0gdGhpcy5hY3RpdmVTZXF1ZW5jZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVWaWRXcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsMikge1xyXG4gICAgICAgIGVsMi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyID0gdGhpcy5hbGxWaWRXcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVTZXF1ZW5jZVN0ZXAgPSAoc2VxdWVuY2VTdGVwRGF0YSkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuc3RlcCA9PT0gc2VxdWVuY2VTdGVwRGF0YSkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpICYmIGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbClcclxuICAgICAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlU3RlcCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRTaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlcXVlbmNlID09PSB0aGlzLmFjdGl2ZVNlcXVlbmNlLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVBbGxJbnRyb1RleHQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEludHJvVHh0LmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxBY3Rpb25IZWFkaW5ncyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSAoY2xpY2tlZEN0cmxCdG4pID0+IHtcclxuICAgIHRoaXMuY2xlYXJTZXF1ZW5jZVRpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5pbnRyby10eHQtd3JhcFwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hY3Rpb24taGVhZGluZ1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVTZXF1ZW5jZVN0ZXAoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGVwKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCh0aGlzLmFjdGl2ZVZpZFdyYXBwZXIsIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnRCdG4oY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgcGF1c2VDdHJsVmlkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwudG9nZ2xlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UodGhpcy5wYXVzZVdyYXBwZXIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICAgICAgaWYgKExPT1BfU0VRVUVOQ0VfVklEUykge1xyXG4gICAgICAgIGxldCBhY3RpdmVTdGVwSW5kZXggPSBbLi4udGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzXS5pbmRleE9mKFxyXG4gICAgICAgICAgdGhpcy5hY3RpdmVTZXF1ZW5jZVN0ZXAucGFyZW50RWxlbWVudC5kYXRhc2V0LnN0ZXAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoYWN0aXZlU3RlcEluZGV4ID09PSB0aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHMuc2l6ZSAtIDEpXHJcbiAgICAgICAgICBhY3RpdmVTdGVwSW5kZXggPSAwO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgYWN0aXZlU3RlcEluZGV4ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5leHRTdGVwQnRuID0gW1xyXG4gICAgICAgICAgLi4udGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLFxyXG4gICAgICAgIF0uZmluZChcclxuICAgICAgICAgIChlbCkgPT5cclxuICAgICAgICAgICAgZWwuZGF0YXNldC5zdGVwID09PVxyXG4gICAgICAgICAgICBbLi4udGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzXVthY3RpdmVTdGVwSW5kZXhdLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsYXlDdHJsQnRuVmlkKG5leHRTdGVwQnRuKTtcclxuICAgICAgICB9LCAyMDApOyAvL2RlbGF5IHRvIHN0YWJpbGl6ZSBlbGVtZW50cyBiZWZvcmUgcGxheVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbGVhclNlcXVlbmNlVGltZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnNlcXVlbmNlVGltZXIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZVRpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFNlcXVlbmNlO1xyXG4iLCAiaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuaW1wb3J0ICogYXMgZ2xvYmFsIGZyb20gXCIuLzAtZ2xvYmFsXCI7XHJcbmltcG9ydCBOYXZiYXJDbGFzcyBmcm9tIFwiLi8wLW5hdmJhclwiO1xyXG5pbXBvcnQgRmVhdHVyZXNDbGFzcyBmcm9tIFwiLi8xLWZlYXR1cmVzXCI7XHJcbmltcG9ydCBEYXRhQ2xhc3MgZnJvbSBcIi4vMi1kYXRhXCI7XHJcbmltcG9ydCBTZXF1ZW5jZUNsYXNzIGZyb20gXCIuLzMtc2VxdWVuY2VcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXQgY2FsbCAoZnVuY3Rpb24gYXQgYm90dG9tKS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBpbml0KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuY29uc3QgbmF2Q29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLm5hdl9jb21wb25lbnRcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBmZWF0dXJlc0NvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLmZlYXR1cmVzXCIsIGRvY3VtZW50KTtcclxuY29uc3QgZGF0YUNvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLmRhdGFcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBzZXF1ZW5jZUNvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLnNlcXVlbmNlXCIsIGRvY3VtZW50KTtcclxuY29uc3QgbmF2YmFyID0gbmV3IE5hdmJhckNsYXNzKGdsb2JhbCwgbmF2Q29udGFpbmVyKTtcclxuY29uc3QgZmVhdHVyZXMgPSBuZXcgRmVhdHVyZXNDbGFzcyhnbG9iYWwsIGZlYXR1cmVzQ29udGFpbmVyKTtcclxuY29uc3QgZGF0YSA9IG5ldyBEYXRhQ2xhc3MoZ2xvYmFsLCBkYXRhQ29udGFpbmVyKTtcclxuY29uc3Qgc2VxdWVuY2UgPSBuZXcgU2VxdWVuY2VDbGFzcyhnbG9iYWwsIHNlcXVlbmNlQ29udGFpbmVyKTtcclxuY29uc3QgU0VDVElPTlMgPSB7XHJcbiAgbmF2YmFyOiBuYXZiYXIsXHJcbiAgZmVhdHVyZXM6IGZlYXR1cmVzLFxyXG4gIGRhdGE6IGRhdGEsXHJcbiAgc2VxdWVuY2U6IHNlcXVlbmNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1OQVYuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0Lm5hdlNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIC8vMS4gR2VuZXJpYyBjbGVhbnVwXHJcbiAgaWYgKFwiaXNEcm9wZG93bkljb25cIiBpbiBjbGlja2VkLmRhdGFzZXQpIHtcclxuICAgIC8vIFBvbHltb3JwaGljIGNhbGwgb25seSAtIGp1c3QgdG9nZ2xpbmcgZHJvcGRvd25cclxuICAgIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChjbGlja2VkLCBhY3Rpb24pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICAvL2RvbnQgZmxhc2ggaWYgb25seSBjbGlja2luZyBkcm9wZG93blxyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIC8vMi4gU3RhdGUgdXBkYXRlXHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oYWN0aXZlU2VjdGlvbik7XHJcbiAgLy8zLiBQb2x5bW9ycGhpYyBjYWxsXHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICBuYXZiYXIuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IG5hdiBkcm9wZG93biBpY29uIGNsaWNrZWRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wZG93bkljb25DbGlja2VkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUuZGV0YWlsO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIG5hdmJhci50b2dnbGVOYXZEcm9wZG93bihjbGlja2VkKTtcclxufSk7XHJcbi8vQ3VzdG9tIGV2ZW50OiBuYXYgZHJvcGRvd24gb3B0IGNsaWNrZWRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS5kZXRhaWw7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgbmF2YmFyLmNsb3NlTmF2RHJvcGRvd24oY2xpY2tlZCk7XHJcbiAgbmF2YmFyLmNsb3NlTW9iaWxlTmF2TWVudSgpO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTUFJTiBCT0RZLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW91dEFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLVZJRFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL3ZpZCBlbmRlZFxyXG5nbG9iYWwuYWxsVmlkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgZW5kZWRWaWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnZpZFwiKTtcclxuICAgIGlmICghZW5kZWRWaWQpIHJldHVybjtcclxuICAgIGNvbnN0IHZpZFNlY3Rpb24gPSBlbmRlZFZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gICAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbdmlkU2VjdGlvbl07XHJcbiAgICB0YXJnZXRNb2R1bGUudmlkRW5kKCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9pbml0XHJcbmNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgc2V0dXBMYXp5TG9hZGluZygpO1xyXG4gIGdsb2JhbC5zZXRXZWJmbG93QnJlYWtwb2ludCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIG5hdmJhci5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oXCJmZWF0dXJlc1wiKTtcclxuICBnbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgZmVhdHVyZXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBmZWF0dXJlcy5pbml0U2VjdGlvbihudWxsLCAoaXNJbnRybyA9IHRydWUpKTtcclxuICB9LCBUSU1JTkcuVUkuU1RBUlRfVUlfUkVWRUFMKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG59O1xyXG5jb25zdCBzZXR1cExhenlMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGFsbExhenlWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbiAgY29uc3Qgb2JzZXJ2ZXJPcHRpb25zID0ge1xyXG4gICAgcm9vdDogbnVsbCxcclxuICAgIHJvb3RNYXJnaW46IFwiMHB4XCIsXHJcbiAgICB0aHJlc2hvbGQ6IDAuMSxcclxuICB9O1xyXG4gIGNvbnN0IHZpZGVvT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgdmlkZW8gPSBlbnRyeS50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSB2aWRlby5xdWVyeVNlbGVjdG9yQWxsKFwic291cmNlXCIpO1xyXG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAvLyAtLS0gTE9BRCBMT0dJQyAtLS1cclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gVXNlIGRhdGEtc3JjIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGtlZXAgY3VycmVudCBzcmNcclxuICAgICAgICAgIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgfHwgc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChkYXRhU3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBkYXRhU3JjO1xyXG4gICAgICAgICAgICAvLyBLZWVwIGRhdGEtc3JjIGF0dHJpYnV0ZSBzbyB3ZSBjYW4gZmluZCB0aGUgVVJMIGFnYWluIGxhdGVyXHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBkYXRhU3JjKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gLS0tIFVOTE9BRCBMT0dJQyAtLS1cclxuICAgICAgICAvLyBDbGVhcnMgdGhlIGludGVybmFsIGxvZ3MgZm9yIHVzZXIgaW50ZXJhY3Rpb25zIGFuZCByZXNvdXJjZSBsb2Fkc1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyTWVhc3VyZXMoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhclJlc291cmNlVGltaW5ncygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyTWFya3MoKTtcclxuICAgICAgICBSZXNldFNlY3Rpb24odmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpKTtcclxuICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBNb3ZlIHNyYyBiYWNrIHRvIGRhdGEtc3JjIGFuZCBlbXB0eSB0aGUgY3VycmVudCBzcmNcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTcmMgPSBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnRTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGN1cnJlbnRTcmMpO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gXCJcIjsgLy8gVGhpcyBzdG9wcyB0aGUgdmlkZW8gZnJvbSBidWZmZXJpbmdcclxuICAgICAgICAgICAgc291cmNlLnJlbW92ZUF0dHJpYnV0ZShcInNyY1wiKTsgLy8gRnVsbHkgY2xlYXIgYXR0cmlidXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIGJyb3dzZXIgdG8gZHVtcCB0aGUgdmlkZW8gZGF0YSBmcm9tIG1lbW9yeVxyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgb2JzZXJ2ZXJPcHRpb25zKTtcclxuICBhbGxMYXp5Vmlkcy5mb3JFYWNoKCh2aWQpID0+IHZpZGVvT2JzZXJ2ZXIub2JzZXJ2ZSh2aWQpKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9SRVNFVCBWSURTIEFGVEVSIFVOTE9BRElORy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGNvbnN0IFJlc2V0U2VjdGlvbiA9IGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcbiAgICBpZiAoIXNlY3Rpb24pIHJldHVybjsgLy9oZWxwcyBwcmV2ZW50IGNyYXNoZXNcclxuICAgIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICBlbC5wYXVzZSgpO1xyXG4gICAgfSk7XHJcbiAgICBnbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKHNlY3Rpb24pO1xyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQU8sTUFBTSxTQUFTLE9BQU8sT0FBTztBQUFBLElBQ2xDLElBQUk7QUFBQSxNQUNGLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsSUFDakI7QUFBQSxFQUNGLENBQUM7QUFDTSxNQUFNLFNBQVMsT0FBTyxPQUFPO0FBQUEsSUFDbEMsVUFBVTtBQUFBLE1BQ1IsU0FDRTtBQUFBLE1BQ0YsUUFDRTtBQUFBLElBQ0o7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQ0U7QUFBQSxNQUNGLFFBQ0U7QUFBQSxJQUNKO0FBQUEsRUFDRixDQUFDO0FBQ00sTUFBTSxpQkFBaUIsT0FBTyxPQUFPO0FBQUEsSUFDMUMsVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRixDQUFDO0FBQ00sTUFBTSxxQkFBcUI7OztBQ2xDbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLE1BQU0sY0FBYyxTQUFTLGNBQWMsZUFBZTtBQUMxRCxNQUFNLFdBQVcsU0FBUyxjQUFjLFdBQVc7QUFDbkQsTUFBTSxjQUFjLENBQUMsR0FBRyxTQUFTLGlCQUFpQixVQUFVLENBQUM7QUFDN0QsTUFBTSxjQUFjLFNBQVMsaUJBQWlCLFdBQVc7QUFDekQsTUFBTSxVQUFVLFNBQVMsaUJBQWlCLE1BQU07QUFDaEQsTUFBTSxVQUFVLFNBQVMsY0FBYyxXQUFXO0FBQ2xELE1BQU0sa0JBQWtCLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUNsRSxNQUFNLFNBQVMsU0FBUyxjQUFjLGFBQWE7QUFDbkQsTUFBTSxTQUFTO0FBQUEsSUFDcEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIsV0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsSUFDbkIsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLEVBQ2I7QUFJTyxNQUFNLFFBQVEsU0FBVSxVQUFVLFVBQVUsVUFBVTtBQUMzRCxVQUFNLEtBQUssUUFBUSxjQUFjLFFBQVE7QUFDekMsUUFBSSxDQUFDLElBQUk7QUFDUCxZQUFNLElBQUk7QUFBQSxRQUNSLHVCQUF1QixRQUFRO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFTyxNQUFNLFdBQVcsU0FBVSxVQUFVLFVBQVUsVUFBVTtBQUM5RCxVQUFNLFdBQVcsUUFBUSxpQkFBaUIsUUFBUTtBQUNsRCxRQUFJLFNBQVMsV0FBVyxHQUFHO0FBQ3pCLFlBQU0sSUFBSTtBQUFBLFFBQ1IsNENBQTRDLFFBQVE7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNPLE1BQU0sYUFBYSxTQUFVLE9BQU87QUFDekMsV0FBTyxNQUFNLFFBQVEsVUFBVSxFQUFFLFVBQVUsQ0FBQztBQUFBLEVBQzlDO0FBQ08sTUFBTSxnQkFBZ0IsV0FBWTtBQUN2QyxhQUFTLFVBQVUsSUFBSSxRQUFRO0FBQy9CLGVBQVcsV0FBWTtBQUNyQixlQUFTLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDcEMsR0FBRyxPQUFPLEdBQUcsY0FBYztBQUFBLEVBQzdCO0FBQ08sTUFBTSwwQkFBMEIsV0FBWTtBQUNqRCxZQUFRLE1BQU0sZ0JBQWdCO0FBQzlCLFdBQU8sTUFBTSxnQkFBZ0I7QUFBQSxFQUMvQjtBQUNPLE1BQU0seUJBQXlCLFNBQVUsU0FBUztBQUN2RCw4QkFBMEI7QUFDMUIsWUFBUSxVQUFVLElBQUksU0FBUztBQUFBLEVBQ2pDO0FBQ08sTUFBTSw0QkFBNEIsV0FBWTtBQUNuRCxvQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDcEMsU0FBRyxVQUFVLE9BQU8sU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxtQkFBbUIsU0FBVSxhQUFhLE9BQU87QUFDNUQsMEJBQXNCO0FBQ3RCLFdBQU8sb0JBQW9CO0FBQzNCLFFBQUksQ0FBQyxNQUFPLFNBQVE7QUFDcEIsVUFBTSxVQUFVLFlBQVk7QUFBQSxNQUMxQixDQUFDLE9BQU8sR0FBRyxRQUFRLFlBQVk7QUFBQSxJQUNqQztBQUNBLFVBQU0sU0FBUyxRQUFRLEtBQUs7QUFDNUIsUUFBSSxRQUFRO0FBQ1YsYUFBTyxVQUFVLElBQUksUUFBUTtBQUM3QixhQUFPLGdCQUFnQjtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUNPLE1BQU0sd0JBQXdCLFdBQVk7QUFDL0MsZ0JBQVksUUFBUSxTQUFVLElBQUk7QUFDaEMsU0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzlCLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxlQUFlLFdBQVk7QUFDdEMsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFDTyxNQUFNLGVBQWUsU0FBVSxlQUFlLG9CQUFvQjtBQUN2RSxRQUFJLE9BQU8sV0FBVztBQUNwQixhQUFPLFVBQVUsTUFBTTtBQUN2QixhQUFPLFVBQVUsTUFBTTtBQUFBLElBQ3pCO0FBQ0EsUUFBSSxpQkFBaUIsdUJBQXVCLE1BQU07QUFDaEQsb0JBQWMsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTztBQUMxRCxZQUFJLEdBQUcsY0FBYyxNQUFNLEVBQUUsaUJBQWlCLE1BQU07QUFDbEQsaUJBQU8sWUFBWSxHQUFHLGNBQWMsTUFBTTtBQUFBLFFBQzVDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxXQUFXLGlCQUFpQixvQkFBb0I7QUFDOUMsYUFBTyxZQUFZO0FBQUEsSUFDckIsT0FBTztBQUNMLGtCQUFZLFFBQVEsQ0FBQyxPQUFPO0FBQzFCLFlBQUksR0FBRyxjQUFjLE1BQU0sRUFBRSxpQkFBaUIsTUFBTTtBQUNsRCxpQkFBTyxZQUFZLEdBQUcsY0FBYyxNQUFNO0FBQUEsUUFDNUM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNPLE1BQU0sdUJBQXVCLFdBQVk7QUFDOUMsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFDTyxNQUFNLHVCQUF1QixXQUFZO0FBQzlDLFVBQU0sUUFBUSxPQUFPO0FBQ3JCLFFBQUksUUFBUSxJQUFLLFFBQU8sb0JBQW9CO0FBQzVDLFFBQUksU0FBUyxJQUFLLFFBQU8sb0JBQW9CO0FBQzdDLFFBQUksU0FBUyxJQUFLLFFBQU8sb0JBQW9CO0FBQzdDLFFBQUksU0FBUyxJQUFLLFFBQU8sb0JBQW9CO0FBQUEsRUFDL0M7QUFDTyxNQUFNLGVBQWUsU0FBVSxVQUFVO0FBQzlDLFdBQU8sWUFBWTtBQUFBLEVBQ3JCO0FBQ08sTUFBTSxhQUFhLFNBQVUsVUFBVTtBQUM1QyxXQUFPLFVBQVU7QUFBQSxFQUNuQjtBQUNPLE1BQU0scUJBQXFCLFdBQVk7QUFDNUMsV0FBTyxjQUFjLGlCQUFpQixNQUFNLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDbEUsU0FBRyxNQUFNO0FBQ1QsU0FBRyxLQUFLO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUNPLE1BQU0sc0JBQXNCLFdBQVk7QUFDN0MsV0FBTyxjQUFjLGlCQUFpQixNQUFNLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDbEUsU0FBRyxjQUFjO0FBQ2pCLFNBQUcsTUFBTTtBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFDTyxNQUFNLFlBQVksU0FBVSxrQkFBa0I7QUFDbkQsUUFBSSxDQUFDLE9BQU8sVUFBVztBQUN2QixVQUFNLFVBQVUsT0FBTyxVQUFVO0FBQ2pDLFVBQU0sY0FBYyxvQkFBb0IsT0FBTztBQUUvQyxRQUFJLE9BQU8sVUFBVSxpQkFBaUI7QUFDcEMsYUFBTyxVQUFVO0FBQUEsUUFDZjtBQUFBLFFBQ0EsT0FBTyxVQUFVO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUEsUUFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBRXJDLFdBQU8sVUFBVTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLE9BQU8sVUFBVTtBQUFBLElBQ25CO0FBQ0EsVUFBTSxjQUFjLE1BQU07QUFDeEIsVUFBSSxPQUFPLFVBQVUsZUFBZSxPQUFPLFVBQVUsTUFBTTtBQUN6RCxlQUFPLFVBQVUsb0JBQW9CLGNBQWMsV0FBVztBQUM5RCxlQUFPLFVBQVUsTUFBTTtBQUN2QixlQUFPLFVBQVUsY0FBYyxPQUFPO0FBQ3RDLGVBQU8sVUFBVSxjQUFjLElBQUksTUFBTSxPQUFPLENBQUM7QUFBQSxNQUNuRDtBQUFBLElBQ0Y7QUFDQSxXQUFPLFVBQVUsa0JBQWtCO0FBRW5DLFVBQU0sU0FBUyxPQUFPLFVBQVUsY0FBYyxRQUFRO0FBQ3RELFVBQU0sVUFBVSxTQUFTLE9BQU8sYUFBYSxVQUFVLElBQUk7QUFDM0QsUUFBSSxXQUFXLE9BQU8sVUFBVSxRQUFRLFNBQVM7QUFDL0MsYUFBTyxVQUFVLE1BQU07QUFDdkIsYUFBTyxVQUFVLE1BQU07QUFDdkIsYUFBTyxVQUFVLEtBQUs7QUFBQSxJQUN4QjtBQUNBLFVBQU0sd0JBQXdCLFlBQVk7QUFDeEMsVUFBSTtBQUNGLGVBQU8sVUFBVSxjQUFjO0FBSS9CLGNBQU0sZUFBZSxNQUFNO0FBQ3pCLGNBQUksT0FBTyxVQUFVLGNBQWMsYUFBYTtBQUU5QyxrQ0FBc0IsTUFBTTtBQUMxQixvQ0FBc0IsTUFBTTtBQUMxQixvQkFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBQ3JDLG9CQUFJLE9BQU8sYUFBYTtBQUN0QiwyQkFBUyxVQUFVLE9BQU8sUUFBUTtBQUFBLGNBQ3RDLENBQUM7QUFBQSxZQUNILENBQUM7QUFBQSxVQUNILFdBQVcsQ0FBQyxPQUFPLFVBQVUsUUFBUTtBQUVuQyxrQ0FBc0IsWUFBWTtBQUFBLFVBQ3BDO0FBQUEsUUFDRjtBQUVBLGVBQU8sVUFBVSxpQkFBaUIsY0FBYyxXQUFXO0FBQzNELGNBQU0sT0FBTyxVQUFVLEtBQUs7QUFDNUIscUJBQWE7QUFBQSxNQUNmLFNBQVMsR0FBRztBQUNWLGdCQUFRLEtBQUssb0JBQW9CLENBQUM7QUFFbEMsWUFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBRUEsUUFBSSxPQUFPLFVBQVUsY0FBYyxHQUFHO0FBQ3BDLDRCQUFzQjtBQUFBLElBQ3hCLE9BQU87QUFDTCxhQUFPLFVBQVUsaUJBQWlCLFdBQVcsdUJBQXVCO0FBQUEsUUFDbEUsTUFBTTtBQUFBLE1BQ1IsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ08sTUFBTSxlQUFlLFdBQVk7QUFDdEMsV0FBTyxZQUFZO0FBQ25CLFdBQU8sY0FBYyxjQUFjLGFBQWEsRUFBRSxNQUFNLGdCQUN0RDtBQUFBLEVBQ0o7QUFDTyxNQUFNLGNBQWMsV0FBWTtBQUNyQyxXQUFPLGNBQWMsY0FBYyxhQUFhLEVBQUUsTUFBTSxnQkFDdEQ7QUFBQSxFQUNKO0FBQ08sTUFBTSxjQUFjLFdBQVk7QUFDckMsUUFBSSxPQUFPLFdBQVc7QUFDcEIsYUFBTyxZQUFZO0FBQ25CLGFBQU8sVUFBVSxLQUFLO0FBQUEsSUFDeEIsT0FBTztBQUNMLGFBQU8sWUFBWTtBQUNuQixhQUFPLFVBQVUsTUFBTTtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUNPLE1BQU0sNkJBQTZCLFdBQVk7QUFDcEQsV0FBTyxjQUFjLGNBQWMsb0JBQW9CLEVBQUUsTUFBTSxnQkFDN0Q7QUFBQSxFQUNKO0FBQ08sTUFBTSw4QkFBOEIsV0FBWTtBQUNyRCxXQUFPLGNBQWMsY0FBYyxvQkFBb0IsRUFBRSxNQUFNLGdCQUM3RDtBQUFBLEVBQ0o7QUFDTyxNQUFNLDBCQUEwQixTQUFVLGlCQUFpQjtBQUNoRSxpQ0FBNkI7QUFDN0IsV0FBTyxjQUNKLGlCQUFpQixvQkFBb0IsRUFDckMsUUFBUSxTQUFVLElBQUksT0FBTztBQUM1QixVQUFJLFVBQVUsaUJBQWlCO0FBQzdCLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0w7QUFDTyxNQUFNLCtCQUErQixXQUFZO0FBQ3RELFdBQU8sY0FDSixpQkFBaUIsb0JBQW9CLEVBQ3JDLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFNBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDTDtBQUNPLE1BQU0sc0JBQXNCLFNBQVUsS0FBSztBQUNoRCxRQUFJLE9BQU8sYUFBYSxPQUFPLHNCQUFzQjtBQUNuRCxVQUFJLFVBQVUsT0FBTyxTQUFTO0FBQUEsRUFDbEM7QUFDTyxNQUFNLHFCQUFxQixTQUFVLEtBQUs7QUFDL0MsMEJBQXNCO0FBQ3RCLGVBQVcsTUFBTTtBQUNmLFVBQUksVUFBVSxJQUFJLFNBQVM7QUFBQSxJQUM3QixHQUFHLEVBQUU7QUFBQSxFQUNQO0FBQ08sTUFBTSx3QkFBd0IsU0FBVSxTQUFTO0FBQ3RELFFBQUksQ0FBQyxRQUFTLFdBQVUsT0FBTztBQUMvQixZQUFRLGlCQUFpQixXQUFXLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDMUQsU0FBRyxVQUFVLE9BQU8sU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxnQkFBZ0IsU0FBVSxLQUFLLFVBQVUsZ0JBQWdCO0FBQ3BFLFFBQUk7QUFDSixVQUFNLFVBQVUsSUFDYixRQUFRLElBQUksY0FBYyxFQUFFLEVBQzVCLGlCQUFpQixJQUFJLFFBQVEsRUFBRTtBQUNsQyxZQUFRLFFBQVEsU0FBVSxJQUFJLE9BQU87QUFDbkMsVUFBSSxPQUFPLElBQUssY0FBYTtBQUFBLElBQy9CLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDs7O0FDclJBLE1BQU0sU0FBTixNQUFhO0FBQUEsSUFDWCxZQUFZLGtCQUFrQixXQUFXO0FBQ3ZDLFdBQUssU0FBUztBQUNkLFdBQUssWUFBWTtBQUdqQixXQUFLLFVBQVUsS0FBSyxPQUFPLE1BQU0sYUFBYSxLQUFLLFNBQVM7QUFDNUQsV0FBSyxTQUFTLEtBQUssT0FBTyxNQUFNLGVBQWUsS0FBSyxTQUFTO0FBQzdELFdBQUssY0FBYyxLQUFLLE9BQU8sU0FBUyxrQkFBa0IsS0FBSyxTQUFTO0FBQ3hFLFdBQUssMEJBQTBCO0FBQUEsUUFDN0IsR0FBRyxLQUFLLE9BQU8sU0FBUyxpQ0FBaUMsS0FBSyxTQUFTO0FBQUEsTUFDekU7QUFDQSxXQUFLLGtCQUFrQjtBQUFBLFFBQ3JCLEdBQUcsS0FBSyxPQUFPLFNBQVMsc0JBQXNCLEtBQUssU0FBUztBQUFBLE1BQzlEO0FBQ0EsV0FBSyxXQUFXLG9CQUFJLElBQUk7QUFBQSxRQUN0QixDQUFDLHFCQUFxQixLQUFLLGVBQWU7QUFBQSxRQUMxQyxDQUFDLHNCQUFzQixLQUFLLGdCQUFnQjtBQUFBLFFBQzVDLENBQUMsdUJBQXVCLEtBQUssaUJBQWlCO0FBQUEsTUFDaEQsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBO0FBQUEsSUFHQSxjQUFjLFNBQVUsU0FBUyxhQUFhO0FBQzVDLFlBQU0sU0FBUyxLQUFLLFNBQVMsSUFBSSxXQUFXO0FBQzVDLFVBQUksUUFBUTtBQUNWLGVBQU8sT0FBTztBQUFBLE1BQ2hCLE9BQU87QUFDTCxnQkFBUSxLQUFLLHdCQUF3QixXQUFXLEVBQUU7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWUsV0FBWTtBQUN6QixXQUFLLGdCQUFnQixRQUFRLFNBQVUsSUFBSTtBQUN6QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLHFCQUFxQixXQUFZO0FBQy9CLFVBQUksaUJBQWlCLEtBQUssUUFBUSxRQUFTLE1BQUssT0FBTyxNQUFNO0FBQzdELFdBQUssUUFBUSxjQUFjLG9CQUFvQixFQUFFLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDNUU7QUFBQSxJQUNBLGtCQUFrQixTQUFVLFNBQVM7QUFDbkMsY0FDRyxRQUFRLHFCQUFxQixFQUM3QixjQUFjLG9CQUFvQixFQUNsQyxVQUFVLElBQUksUUFBUTtBQUFBLElBQzNCO0FBQUEsSUFDQSxtQkFBbUIsU0FBVSxTQUFTO0FBQ3BDLGNBQ0csUUFBUSxxQkFBcUIsRUFDN0IsY0FBYyxvQkFBb0IsRUFDbEMsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QjtBQUFBLElBQ0Esb0JBQW9CLFNBQVUsU0FBUztBQUNyQyxXQUFLLE9BQU8sdUJBQXVCLE9BQU87QUFDMUMsY0FDRyxRQUFRLHFCQUFxQixFQUM3QixjQUFjLG9CQUFvQixFQUNsQyxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUNBLE1BQU8saUJBQVE7OztBQzFEZixNQUFNLFdBQU4sTUFBZTtBQUFBLElBQ2IsWUFBWSxrQkFBa0IsV0FBVztBQUN2QyxXQUFLLFNBQVM7QUFDZCxXQUFLLFlBQVk7QUFHakIsV0FBSyxtQkFBbUIsS0FBSyxPQUFPLE1BQU0sYUFBYSxLQUFLLFNBQVM7QUFDckUsV0FBSyxrQkFBa0I7QUFBQSxRQUNyQixHQUFHLEtBQUssT0FBTyxTQUFTLGFBQWEsS0FBSyxTQUFTO0FBQUEsTUFDckQ7QUFDQSxXQUFLLHNCQUFzQjtBQUFBLFFBQ3pCLEdBQUcsS0FBSyxPQUFPLFNBQVMsYUFBYSxLQUFLLFNBQVM7QUFBQSxNQUNyRDtBQUNBLFdBQUssc0JBQXNCLEtBQUssT0FBTztBQUFBLFFBQ3JDO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUNBLFdBQUssaUJBQWlCLEtBQUssT0FBTztBQUFBLFFBQ2hDO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUNBLFdBQUssZUFBZSxLQUFLLE9BQU8sTUFBTSxlQUFlLEtBQUssU0FBUztBQUNuRSxXQUFLLG1CQUFtQixLQUFLLE9BQU87QUFBQSxRQUNsQztBQUFBLFFBQ0EsS0FBSztBQUFBLE1BQ1A7QUFDQSxXQUFLLGdCQUFnQjtBQUNyQixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsaUJBQWlCLEtBQUssV0FBVztBQUFBLFFBQ2xDLENBQUMsaUJBQWlCLEtBQUssY0FBYztBQUFBLFFBQ3JDLENBQUMsa0JBQWtCLEtBQUssWUFBWTtBQUFBLFFBQ3BDLENBQUMsZUFBZSxLQUFLLE9BQU8sb0JBQW9CLEtBQUssSUFBSSxDQUFDO0FBQUEsTUFDNUQsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBO0FBQUEsSUFHQSxjQUFjLENBQUMsU0FBU0EsYUFBWTtBQUNsQyxXQUFLLE9BQU8sU0FBUyxVQUFVLE9BQU8sUUFBUTtBQUM5QyxXQUFLLGlCQUFpQixVQUFVLE9BQU8sUUFBUTtBQUMvQyxXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxPQUFPLGFBQWE7QUFDekIsVUFBSSxTQUFTO0FBQ1gsYUFBSyxPQUFPLHVCQUF1QixPQUFPO0FBQzFDLGFBQUssT0FBTyxjQUFjO0FBQUEsTUFDNUI7QUFDQSxXQUFLLE9BQU8sMkJBQTJCO0FBQ3ZDLFdBQUssWUFBWTtBQUNqQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxpQkFBaUIsVUFBVSxJQUFJLFFBQVE7QUFDNUMsVUFBSUEsU0FBUztBQUNiLFdBQUssa0JBQWtCO0FBQUEsSUFDekI7QUFBQSxJQUNBLGNBQWMsQ0FBQyxTQUFTLGdCQUFnQjtBQUN0QyxZQUFNLFNBQVMsS0FBSyxTQUFTLElBQUksV0FBVztBQUM1QyxVQUFJLFFBQVE7QUFDVixlQUFPLE9BQU87QUFBQSxNQUNoQixPQUFPO0FBQ0wsZ0JBQVEsS0FBSyx3QkFBd0IsV0FBVyxFQUFFO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjLE1BQU07QUFDbEIsV0FBSyxnQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDekMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxnQkFBZ0IsTUFBTTtBQUNwQixXQUFLLGdCQUNGLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxnQkFBZ0IsT0FBTyxFQUMvQyxVQUFVLElBQUksUUFBUTtBQUFBLElBQzNCO0FBQUEsSUFDQSxrQkFBa0IsTUFBTTtBQUN0QixXQUFLLGdCQUNGLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxnQkFBZ0IsS0FBSyxhQUFhLEVBQzFELFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDM0I7QUFBQSxJQUNBLDBCQUEwQixNQUFNO0FBQzlCLFdBQUssb0JBQW9CLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDakQ7QUFBQSxJQUNBLDBCQUEwQixNQUFNO0FBQzlCLFdBQUssb0JBQW9CLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDcEQ7QUFBQSxJQUNBLHFCQUFxQixDQUFDLFlBQVk7QUFDaEMsV0FBSyxvQkFBb0IsUUFBUSxDQUFDLE9BQU87QUFDdkMsWUFBSSxHQUFHLFVBQVUsU0FBUyxPQUFPLEVBQUc7QUFDcEMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUM1QixZQUFJLEdBQUcsUUFBUSxZQUFZLFNBQVM7QUFDbEMsZUFBSyxnQkFBZ0I7QUFDckIsZUFBSyxjQUFjLFVBQVUsSUFBSSxRQUFRO0FBQUEsUUFDM0M7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxxQkFBcUIsTUFBTTtBQUN6QixXQUFLLG9CQUFvQixRQUFRLENBQUMsT0FBTztBQUN2QyxZQUFJLEdBQUcsVUFBVSxTQUFTLE9BQU8sRUFBRztBQUNwQyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLG9CQUFvQixNQUFNO0FBQ3hCLFdBQUssaUJBQWlCLFVBQVUsT0FBTyxRQUFRO0FBQy9DLFdBQUssd0JBQXdCO0FBQzdCLFdBQUssbUJBQW1CO0FBRXhCLFlBQU0sWUFDSixLQUFLLG9CQUFvQixpQkFBaUIsaUJBQWlCO0FBQzdELGdCQUFVLFFBQVEsQ0FBQyxPQUFPO0FBRXhCLFlBQUksR0FBRyxpQkFBaUIsTUFBTTtBQUM1QixnQkFBTSxNQUFNLEdBQUcsY0FBYyxZQUFZO0FBQ3pDLGNBQUksS0FBSztBQUNQLGdCQUFJLGNBQWM7QUFDbEIsZ0JBQUksS0FBSztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsaUJBQWlCLENBQUMsbUJBQW1CO0FBQ25DLFdBQUssb0JBQW9CO0FBQ3pCLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssT0FBTyxZQUFZO0FBQ3hCLFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUMzQyxXQUFLLHdCQUF3QjtBQUM3QixXQUFLLG1CQUFtQixlQUFlLFFBQVEsT0FBTztBQUN0RCxXQUFLLGdCQUFnQixlQUFlLFFBQVE7QUFDNUMsV0FBSyx5QkFBeUI7QUFDOUIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssT0FBTyxhQUFhLEtBQUssZUFBZSxJQUFJO0FBQ2pELFdBQUssT0FBTyxhQUFhLGVBQWUsUUFBUSxTQUFTO0FBQ3pELFdBQUssT0FBTyxXQUFXLGVBQWUsUUFBUSxPQUFPO0FBQ3JELFdBQUssT0FBTyxtQkFBbUIsY0FBYztBQUM3QyxXQUFLLE9BQU8sU0FBUyxVQUFVLElBQUksUUFBUTtBQUMzQyxXQUFLLE9BQU8sVUFBVTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxlQUFlLE1BQU07QUFDbkIsV0FBSyxPQUFPLFlBQVk7QUFDeEIsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFNBQVMsTUFBTTtBQUNiLFVBQUksS0FBSywyQkFBMkIsT0FBTztBQUN6QyxhQUFLLE9BQU8sNEJBQTRCO0FBQ3hDLGFBQUssT0FBTyxhQUFhO0FBQ3pCLGFBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUMzQyxhQUFLLGdCQUFnQixXQUFXLE1BQU07QUFDcEMsZUFBSyxpQkFBaUIsVUFBVSxJQUFJLFFBQVE7QUFDNUMscUJBQVcsTUFBTTtBQUNmLGlCQUFLLFlBQVk7QUFDakIsaUJBQUssY0FBYztBQUNuQixpQkFBSyxPQUFPLG9CQUFvQjtBQUNoQyxpQkFBSyxPQUFPLHNCQUFzQjtBQUNsQyxpQkFBSyxPQUFPLHdCQUF3QjtBQUNwQyxpQkFBSyxPQUFPLDJCQUEyQjtBQUN2QyxpQkFBSyxrQkFBa0I7QUFBQSxVQUN6QixHQUFHLE9BQU8sR0FBRyx1QkFBdUI7QUFBQSxRQUN0QyxHQUFHLE9BQU8sTUFBTSxhQUFhO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBc0IsTUFBTTtBQUMxQixXQUFLLHlCQUF5QjtBQUM5QixtQkFBYSxLQUFLLGFBQWE7QUFDL0IsV0FBSyxnQkFBZ0I7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFDQSxNQUFPLG1CQUFROzs7QUN0S2YsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sT0FBTixNQUFXO0FBQUEsSUFDVCxZQUFZLGtCQUFrQixXQUFXO0FBQ3ZDLFdBQUssU0FBUztBQUNkLFdBQUssWUFBWTtBQUdqQixXQUFLLFlBQVksS0FBSyxPQUFPLE1BQU0scUJBQXFCLEtBQUssU0FBUztBQUN0RSxXQUFLLGNBQWMsS0FBSyxPQUFPLE1BQU0sa0JBQWtCLEtBQUssU0FBUztBQUNyRSxXQUFLLGVBQWUsS0FBSyxPQUFPLE1BQU0sa0JBQWtCLEtBQUssU0FBUztBQUN0RSxXQUFLLGlCQUFpQjtBQUFBLFFBQ3BCLEdBQUcsS0FBSyxPQUFPLFNBQVMsbUJBQW1CLEtBQUssU0FBUztBQUFBLE1BQzNEO0FBQ0EsV0FBSyxTQUFTLEtBQUssT0FBTyxNQUFNLFdBQVcsS0FBSyxTQUFTO0FBQ3pELFdBQUssWUFBWSxLQUFLLE9BQU8sTUFBTSxnQkFBZ0IsS0FBSyxTQUFTO0FBQ2pFLFdBQUssb0JBQW9CLEtBQUssT0FBTztBQUFBLFFBQ25DO0FBQUEsUUFDQSxLQUFLO0FBQUEsTUFDUDtBQUNBLFdBQUssa0JBQWtCO0FBQUEsUUFDckIsR0FBRyxLQUFLLE9BQU8sU0FBUywyQkFBMkIsS0FBSyxTQUFTO0FBQUEsTUFDbkU7QUFDQSxXQUFLLFVBQVUsQ0FBQyxHQUFHLEtBQUssT0FBTyxTQUFTLG1CQUFtQixLQUFLLFNBQVMsQ0FBQztBQUMxRSxXQUFLLHFCQUFxQjtBQUFBLFFBQ3hCLEdBQUcsS0FBSyxPQUFPLFNBQVMsc0JBQXNCLEtBQUssU0FBUztBQUFBLE1BQzlEO0FBQ0EsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxhQUFhO0FBQ2xCLFdBQUssaUJBQWlCLEVBQUUsTUFBTSxVQUFVLFdBQVcsR0FBRyxTQUFTLEVBQUU7QUFDakUsV0FBSyxjQUFjO0FBQ25CLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssV0FBVztBQUNoQixXQUFLLGtCQUFrQjtBQUN2QixXQUFLLHVCQUF1QixLQUFLLG1CQUFtQixDQUFDO0FBQ3JELFdBQUssWUFBWTtBQUNqQixXQUFLLFVBQVU7QUFDZixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsYUFBYSxLQUFLLFdBQVc7QUFBQSxRQUM5QixDQUFDLGlCQUFpQixLQUFLLG9CQUFvQjtBQUFBLFFBQzNDLENBQUMsaUJBQWlCLEtBQUssaUJBQWlCO0FBQUEsUUFDeEMsQ0FBQyxnQkFBZ0IsS0FBSyxrQkFBa0I7QUFBQSxRQUN4QyxDQUFDLHVCQUF1QixLQUFLLGdCQUFnQjtBQUFBLFFBQzdDLENBQUMsd0JBQXdCLEtBQUssZ0JBQWdCO0FBQUEsUUFDOUMsQ0FBQyxrQkFBa0IsS0FBSyxtQkFBbUI7QUFBQSxRQUMzQyxDQUFDLGVBQWUsS0FBSyxPQUFPLG9CQUFvQixLQUFLLElBQUksQ0FBQztBQUFBLE1BQzVELENBQUM7QUFDRCxXQUFLLFlBQVksb0JBQUksSUFBSTtBQUFBLFFBQ3ZCLENBQUMsVUFBVSxPQUFPLFFBQVEsRUFBRSxPQUFPO0FBQUEsUUFDbkMsQ0FBQyxhQUFhLE9BQU8sUUFBUSxFQUFFLE1BQU07QUFBQSxRQUNyQyxDQUFDLFVBQVUsT0FBTyxRQUFRLEVBQUUsT0FBTztBQUFBLFFBQ25DLENBQUMsYUFBYSxPQUFPLFFBQVEsRUFBRSxNQUFNO0FBQUEsTUFDdkMsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBO0FBQUEsSUFHQSxjQUFjLENBQUMsWUFBWTtBQUN6QixXQUFLLE9BQU8sY0FBYztBQUUxQixXQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDckMsV0FBSyxXQUFXO0FBQ2hCLFdBQUssVUFBVSxjQUFjO0FBQzdCLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssWUFBWTtBQUNqQixXQUFLLG1CQUFtQjtBQUN4QixXQUFLLFVBQVUsVUFBVSxJQUFJLFFBQVE7QUFDckMsV0FBSyxtQkFBbUI7QUFDeEIsV0FBSyxPQUFPLHVCQUF1QixPQUFPO0FBRTFDLFdBQUssT0FBTyxtQkFBbUI7QUFDL0IsV0FBSyxrQkFBa0I7QUFDdkIsV0FBSyx3QkFBd0I7QUFBQSxJQUMvQjtBQUFBLElBQ0EsY0FBYyxDQUFDLFNBQVMsZ0JBQWdCO0FBQ3RDLFlBQU0sU0FBUyxLQUFLLFNBQVMsSUFBSSxXQUFXO0FBQzVDLFVBQUksUUFBUTtBQUNWLGVBQU8sT0FBTztBQUFBLE1BQ2hCLE9BQU87QUFDTCxnQkFBUSxLQUFLLHdCQUF3QixXQUFXLEVBQUU7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLG1CQUFtQixNQUFNO0FBQ3ZCLFdBQUssYUFBYSxVQUFVLElBQUksUUFBUTtBQUFBLElBQzFDO0FBQUEsSUFDQSxtQkFBbUIsTUFBTTtBQUN2QixXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM3QztBQUFBLElBQ0Esc0JBQXNCLE1BQU07QUFDMUIsVUFBSSxLQUFLLGFBQWEsU0FBUztBQUM3QixhQUFLLFdBQVc7QUFDaEIsYUFBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQ3JDLGFBQUssZ0JBQWdCLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDaEQsT0FBTztBQUNMLGFBQUssV0FBVztBQUNoQixhQUFLLE9BQU8sVUFBVSxJQUFJLFFBQVE7QUFDbEMsYUFBSyxnQkFBZ0IsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUM3QztBQUNBLFdBQUssa0JBQWtCLGNBQWMsY0FBYyxFQUFFLGNBQ25ELEtBQUs7QUFBQSxJQUNUO0FBQUEsSUFDQSxjQUFjLE1BQU07QUFDbEIsV0FBSywwQkFBMEI7QUFDL0IsV0FBSyxrQkFDRixpQkFBaUIsaUJBQWlCLEVBQ2xDLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDTDtBQUFBLElBQ0EsV0FBVyxNQUFNO0FBQ2YsV0FBSyxrQkFBa0IsVUFBVSxJQUFJLFFBQVE7QUFDN0MsV0FBSyxrQkFBa0IsaUJBQWlCLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxPQUFPO0FBQ3pFLFlBQUksR0FBRyxRQUFRLFNBQVMsS0FBSyxjQUFjLFFBQVE7QUFDakQsZUFBSyxrQkFBa0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QsV0FBSyxnQkFBZ0IsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUM3QztBQUFBLElBQ0Esa0JBQWtCLE1BQU07QUFDdEIsV0FBSyxtQkFBbUIsUUFBUSxDQUFDLE9BQU87QUFDdEMsV0FBRyxjQUFjLGdCQUFnQixFQUFFLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLGNBQWMsTUFBTTtBQUNsQixXQUFLLHFCQUNGLGlCQUFpQixXQUFXLEVBQzVCLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQ0gsV0FBSyxxQkFBcUIsVUFBVSxJQUFJLFFBQVE7QUFDaEQsV0FBSyxxQkFDRixjQUFjLGdCQUFnQixFQUM5QixVQUFVLElBQUksUUFBUTtBQUFBLElBQzNCO0FBQUEsSUFDQSxxQkFBcUIsTUFBTTtBQUN6QixXQUFLLFFBQVEsUUFBUSxTQUFVLElBQUk7QUFDakMsV0FBRyxjQUFjLFVBQVUsSUFBSSxRQUFRO0FBQ3ZDLFdBQUcsY0FBYyxzQkFBc0IsRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUNwRCxXQUFHLGNBQWMsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM1QyxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0Esb0JBQW9CLENBQUMsYUFBYTtBQUNoQyxVQUFJLENBQUMsVUFBVTtBQUNiLGFBQUssZUFBZSxPQUFPLEtBQUs7QUFBQSxNQUNsQyxPQUFPO0FBQ0wsYUFBSyxlQUFlLE9BQU87QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQixNQUFNO0FBQ3BCLFdBQUssYUFBYSxLQUFLLGNBQWMsUUFBUTtBQUFBLElBQy9DO0FBQUEsSUFDQSxrQkFBa0IsTUFBTTtBQUN0QixXQUFLLFlBQVksZUFBZSxLQUFLLGVBQWUsSUFBSSxFQUFFO0FBQzFELFdBQUssVUFBVSxlQUFlLEtBQUssZUFBZSxJQUFJLEVBQUU7QUFBQSxJQUMxRDtBQUFBLElBQ0Esd0JBQXdCLE1BQU07QUFDNUIsV0FBSyxjQUFjO0FBQ25CLFVBQ0UsS0FBSyxlQUFlLFNBQVMsYUFDN0IsS0FBSyxlQUFlLFdBQ3BCO0FBQ0EsYUFBSyxnQkFBZ0I7QUFDckI7QUFBQSxNQUNGO0FBQ0EsVUFDRSxLQUFLLGVBQWUsU0FBUyxhQUM3QixLQUFLLGVBQWUsV0FDcEI7QUFDQSxhQUFLLGdCQUFnQjtBQUNyQixhQUFLLGdCQUFnQjtBQUNyQjtBQUFBLE1BQ0Y7QUFDQSxXQUFLLFlBQVksS0FBSyxjQUFjLFFBQVE7QUFDNUMsV0FBSyxVQUFVLEtBQUssY0FBYyxRQUFRO0FBQUEsSUFDNUM7QUFBQSxJQUNBLHdCQUF3QixNQUFNO0FBQzVCLFdBQUssY0FBYztBQUNuQixXQUFLLFlBQVk7QUFDakIsV0FBSyxZQUFZLEtBQUssY0FBYyxRQUFRO0FBQzVDLFdBQUssVUFBVSxLQUFLLGNBQWMsUUFBUTtBQUFBLElBQzVDO0FBQUEsSUFDQSxtQkFBbUIsTUFBTTtBQUN2QixZQUFNLFlBQVksS0FBSyxPQUFPLGFBQWE7QUFDM0MsVUFBSSxDQUFDLFVBQVc7QUFDaEIsVUFBSSxTQUFTLEtBQUs7QUFDbEIsVUFBSSxVQUFVLGNBQWMsVUFBVSxTQUFTLElBQUksRUFBRyxXQUFVO0FBQ2hFLFlBQU0sUUFBUSxLQUFLLFVBQVUsSUFBSSxNQUFNO0FBQ3ZDLGdCQUFVLGFBQWEsVUFBVSxLQUFLO0FBQUEsSUFDeEM7QUFBQSxJQUNBLDBCQUEwQixNQUFNO0FBQzlCLFlBQU0sWUFBWSxLQUFLLE9BQU8sYUFBYTtBQUMzQyxVQUFJLENBQUMsVUFBVztBQUNoQixZQUFNLGdCQUFnQixVQUFVLFFBQVEsV0FBVztBQUNuRCxVQUFJLFNBQVMsS0FBSyxlQUFlO0FBQ2pDLFVBQUksVUFBVSxjQUFjLFVBQVUsU0FBUyxJQUFJLEVBQUcsV0FBVTtBQUNoRSxZQUFNLFFBQVEsS0FBSyxVQUFVLElBQUksTUFBTTtBQUN2QyxvQkFBYyxNQUFNLGtCQUFrQixRQUFRLEtBQUs7QUFBQSxJQUNyRDtBQUFBLElBQ0EsNEJBQTRCLE1BQU07QUFDaEMsV0FBSyxnQkFBZ0IsUUFBUSxDQUFDLE9BQU87QUFDbkMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxvQkFBb0IsQ0FBQyx1QkFBdUI7QUFFMUMsVUFBSSxtQkFBbUIsUUFBUSxTQUFTLEtBQUssV0FBWTtBQUV6RCxXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxZQUFZLGNBQWMsbUJBQW1CO0FBQ2xELFdBQUssb0JBQW9CLEtBQUssZ0JBQWdCO0FBQUEsUUFDNUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxTQUFTLG1CQUFtQixRQUFRO0FBQUEsTUFDekQ7QUFDQSxXQUFLLGdCQUFnQjtBQUVyQixXQUFLLE9BQU8sYUFBYTtBQUN6QixXQUFLLHdCQUF3QjtBQUM3QixXQUFLLGNBQWM7QUFDbkIsV0FBSyx3QkFBd0I7QUFFN0IsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSyxZQUFZO0FBQUEsSUFDbkI7QUFBQSxJQUNBLHVCQUF1QixDQUFDLG1CQUFtQjtBQUN6QyxXQUFLLE9BQU8sYUFBYTtBQUN6QixXQUFLLGtCQUFrQjtBQUN2QixXQUFLLHdCQUF3QjtBQUM3QixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLGdCQUFnQjtBQUVyQixXQUFLLHNCQUFzQixLQUFLLGFBQWE7QUFDN0MsV0FBSyxZQUFZO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGNBQWMsTUFBTTtBQUNsQixXQUFLLFVBQVUsVUFBVSxPQUFPLFFBQVE7QUFDeEMsV0FBSyxxQkFBcUIsVUFBVSxPQUFPLFFBQVE7QUFDbkQsV0FBSyxPQUFPLGFBQWEsS0FBSyxTQUFTO0FBQ3ZDLFdBQUssT0FBTyxXQUFXLEtBQUssT0FBTztBQUNuQyxXQUFLLE9BQU8sVUFBVTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxTQUFTLE1BQU07QUFDYixVQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssZUFBZTtBQUMzQyxhQUFLLGtCQUFrQjtBQUN2QixhQUFLLHdCQUF3QjtBQUM3QixhQUFLLGlCQUFpQjtBQUN0QixhQUFLLHlCQUF5QjtBQUM5QixhQUFLLFVBQVUsVUFBVSxJQUFJLFFBQVE7QUFDckMsYUFBSyxPQUFPLHdCQUF3QjtBQUFBLE1BQ3RDLFdBQVcsS0FBSyxlQUFlO0FBQzdCLGFBQUssZ0JBQWdCO0FBQ3JCLGFBQUssa0JBQWtCLFNBQVM7QUFDaEMsYUFBSyx3QkFBd0I7QUFDN0IsYUFBSyxzQkFBc0I7QUFDM0IsYUFBSyxZQUFZO0FBQUEsTUFDbkIsT0FBTztBQUNMLGFBQUssT0FBTyxVQUFVLElBQUksUUFBUTtBQUNsQyxhQUFLLGtCQUNGLGNBQWMsY0FBYyxFQUM1QixVQUFVLElBQUksUUFBUTtBQUN6QixhQUFLLFNBQVM7QUFDZCxhQUFLLFlBQVk7QUFFakIsY0FBTSxnQkFBZ0IsS0FBSyxPQUFPLGFBQWEsRUFBRSxRQUFRLFdBQVc7QUFDcEUsWUFBSSxlQUFlO0FBQ2pCLHdCQUFjLE1BQU0sa0JBQWtCO0FBQ3RDLHdCQUFjLE1BQU0sa0JBQWtCO0FBQUEsUUFDeEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCLE1BQU07QUFDekIsV0FBSyxPQUFPLGNBQWM7QUFFMUIsV0FBSyxrQkFBa0IsY0FBYyxjQUFjLEVBQUUsY0FBYztBQUNuRSxXQUFLLFdBQVc7QUFDaEIsV0FBSyxrQkFDRixjQUFjLGNBQWMsRUFDNUIsVUFBVSxPQUFPLFFBQVE7QUFDNUIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssT0FBTyxVQUFVLE9BQU8sUUFBUTtBQUNyQyxXQUFLLFVBQVUsVUFBVSxJQUFJLFFBQVE7QUFDckMsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxtQkFBbUI7QUFHeEIsV0FBSyx3QkFBd0I7QUFDN0IsV0FBSyxPQUFPLG1CQUFtQjtBQUFBLElBQ2pDO0FBQUEsSUFDQSwyQkFBMkIsTUFBTTtBQUMvQixXQUFLLHFCQUFxQixVQUFVLE9BQU8sUUFBUTtBQUFBLElBQ3JEO0FBQUEsSUFDQSwyQkFBMkIsTUFBTTtBQUMvQixXQUFLLHFCQUFxQixVQUFVLElBQUksUUFBUTtBQUFBLElBQ2xEO0FBQUEsSUFDQSxxQkFBcUIsTUFBTTtBQUN6QixXQUFLLHFCQUFxQixpQkFBaUIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxPQUFPO0FBQ3RFLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQixDQUFDO0FBQ0QsV0FBSyxxQkFBcUIsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUNsRDtBQUFBLElBQ0EsMEJBQTBCLE1BQU07QUFDOUIsV0FBSyxPQUFPLDZCQUE2QjtBQUN6QyxXQUFLLHVCQUF1QixLQUFLLG1CQUFtQjtBQUFBLFFBQ2xELENBQUMsT0FBTyxHQUFHLFFBQVEsU0FBUyxLQUFLO0FBQUEsTUFDbkM7QUFBQSxJQUNGO0FBQUEsSUFDQSwrQkFBK0IsTUFBTTtBQUNuQyxXQUFLLG1CQUFtQixRQUFRLENBQUMsT0FBTztBQUN0QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0EsTUFBTyxlQUFROzs7QUNwVGYsTUFBTSxXQUFOLE1BQWU7QUFBQSxJQUNiLFlBQVksa0JBQWtCLFdBQVc7QUFDdkMsV0FBSyxTQUFTO0FBQ2QsV0FBSyxZQUFZO0FBR2pCLFdBQUssZUFBZSxLQUFLLE9BQU8sTUFBTSxlQUFlLEtBQUssU0FBUztBQUNuRSxXQUFLLGlCQUFpQjtBQUFBLFFBQ3BCLEdBQUcsS0FBSyxPQUFPLFNBQVMsYUFBYSxLQUFLLFNBQVM7QUFBQSxNQUNyRDtBQUNBLFdBQUssY0FBYztBQUFBLFFBQ2pCLEdBQUcsS0FBSyxPQUFPLFNBQVMsbUJBQW1CLEtBQUssU0FBUztBQUFBLE1BQzNEO0FBQ0EsV0FBSyxvQkFBb0I7QUFBQSxRQUN2QixHQUFHLEtBQUssT0FBTyxTQUFTLG1CQUFtQixLQUFLLFNBQVM7QUFBQSxNQUMzRDtBQUNBLFdBQUssaUJBQWlCO0FBQUEsUUFDcEIsR0FBRyxLQUFLLE9BQU8sU0FBUyxhQUFhLEtBQUssU0FBUztBQUFBLE1BQ3JEO0FBQ0EsV0FBSyxxQkFBcUI7QUFBQSxRQUN4QixHQUFHLEtBQUssT0FBTyxTQUFTLHNCQUFzQixLQUFLLFNBQVM7QUFBQSxNQUM5RDtBQUNBLFdBQUssYUFBYTtBQUNsQixXQUFLLGlCQUFpQjtBQUN0QixXQUFLLG1CQUFtQjtBQUV4QixXQUFLLG1CQUFtQjtBQUN4QixXQUFLLHFCQUFxQjtBQUMxQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLHVCQUF1QjtBQUM1QixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsaUJBQWlCLEtBQUssV0FBVztBQUFBLFFBQ2xDLENBQUMsdUJBQXVCLEtBQUsseUJBQXlCO0FBQUEsUUFDdEQsQ0FBQyxpQkFBaUIsS0FBSyxjQUFjO0FBQUEsUUFDckMsQ0FBQyxrQkFBa0IsS0FBSyxZQUFZO0FBQUEsUUFDcEMsQ0FBQyxlQUFlLEtBQUssT0FBTyxvQkFBb0IsS0FBSyxJQUFJLENBQUM7QUFBQSxNQUM1RCxDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUE7QUFBQSxJQUdBLGNBQWMsQ0FBQyxZQUFZO0FBQ3pCLFdBQUssT0FBTyxjQUFjO0FBQzFCLFdBQUssaUJBQWlCLFFBQVEsUUFBUTtBQUN0QyxXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxPQUFPLGFBQWE7QUFDekIsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSywyQkFBMkI7QUFDaEMsV0FBSywyQkFBMkI7QUFDaEMsV0FBSyx5QkFBeUIsb0JBQUksSUFBSTtBQUN0QyxZQUFNLFFBQVEsS0FBSyxpQkFBaUIsaUJBQWlCLFdBQVc7QUFDaEUsWUFBTSxRQUFRLENBQUMsT0FBTztBQUNwQixhQUFLLHVCQUF1QixJQUFJLEdBQUcsUUFBUSxJQUFJO0FBQUEsTUFDakQsQ0FBQztBQUNELFdBQUssK0JBQStCO0FBQ3BDLFdBQUssaUJBQ0YsY0FBYyxpQkFBaUIsRUFDL0IsVUFBVSxJQUFJLFFBQVE7QUFDekIsVUFBSSxDQUFDLEtBQUssWUFBWTtBQUNwQixhQUFLLE9BQU8sdUJBQXVCLE9BQU87QUFBQSxNQUM1QyxPQUFPO0FBQ0wsYUFBSyxPQUFPO0FBQUEsVUFDVixRQUFRLFFBQVEscUJBQXFCLEVBQUUsY0FBYyxnQkFBZ0I7QUFBQSxRQUN2RTtBQUNBLGVBQU87QUFBQSxVQUNMLElBQUksWUFBWSxzQkFBc0IsRUFBRSxRQUFRLFFBQVEsQ0FBQztBQUFBLFFBQzNEO0FBQ0EsYUFBSyxhQUFhO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjLENBQUMsU0FBUyxnQkFBZ0I7QUFDdEMsWUFBTSxTQUFTLEtBQUssU0FBUyxJQUFJLFdBQVc7QUFDNUMsVUFBSSxRQUFRO0FBQ1YsZUFBTyxPQUFPO0FBQUEsTUFDaEIsT0FBTztBQUNMLGdCQUFRLEtBQUssd0JBQXdCLFdBQVcsRUFBRTtBQUFBLE1BQ3BEO0FBQUEsSUFDRjtBQUFBLElBQ0EsNEJBQTRCLENBQUMsWUFBWTtBQUN2QyxVQUFJLG9CQUFvQixRQUFRLFNBQVM7QUFDdkMsZUFBTztBQUFBLFVBQ0wsSUFBSSxZQUFZLHVCQUF1QixFQUFFLFFBQVEsUUFBUSxDQUFDO0FBQUEsUUFDNUQ7QUFBQSxNQUNGLE9BQU87QUFDTCxhQUFLLGFBQWE7QUFDbEIsYUFBSyxZQUFZLE9BQU87QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLDZCQUE2QixNQUFNO0FBQ2pDLFdBQUssZUFBZSxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsT0FBTyxRQUFRLENBQUM7QUFDakUsV0FBSyxtQkFBbUIsS0FBSyxlQUFlO0FBQUEsUUFDMUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxhQUFhLEtBQUs7QUFBQSxNQUN2QztBQUNBLFdBQUssaUJBQWlCLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDOUM7QUFBQSxJQUNBLDZCQUE2QixNQUFNO0FBQ2pDLFdBQUssZUFBZSxRQUFRLFNBQVUsSUFBSTtBQUN4QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQzVCLFdBQUcsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLFNBQVUsS0FBSztBQUN0RCxjQUFJLFVBQVUsT0FBTyxRQUFRO0FBQUEsUUFDL0IsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUNELFdBQUssbUJBQW1CLEtBQUssZUFBZTtBQUFBLFFBQzFDLENBQUMsT0FBTyxHQUFHLFFBQVEsYUFBYSxLQUFLO0FBQUEsTUFDdkM7QUFDQSxXQUFLLGlCQUFpQixVQUFVLElBQUksUUFBUTtBQUFBLElBQzlDO0FBQUEsSUFDQSx3QkFBd0IsQ0FBQyxxQkFBcUI7QUFDNUMsV0FBSyxpQkFBaUIsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTztBQUNsRSxZQUFJLEdBQUcsUUFBUSxTQUFTLGtCQUFrQjtBQUN4QyxhQUFHLFVBQVUsSUFBSSxRQUFRO0FBQUEsUUFDM0IsT0FBTztBQUNMLGFBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxRQUM5QjtBQUNBLFlBQUksR0FBRyxVQUFVLFNBQVMsUUFBUSxLQUFLLEdBQUcsaUJBQWlCO0FBQ3pELGVBQUsscUJBQXFCLEdBQUcsY0FBYyxNQUFNO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLGlDQUFpQyxNQUFNO0FBQ3JDLFdBQUssbUJBQW1CLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxPQUFPLFFBQVEsQ0FBQztBQUNyRSxXQUFLLHVCQUF1QixLQUFLLG1CQUFtQjtBQUFBLFFBQ2xELENBQUMsT0FBTyxHQUFHLFFBQVEsYUFBYSxLQUFLO0FBQUEsTUFDdkM7QUFDQSxXQUFLLHFCQUFxQixVQUFVLElBQUksUUFBUTtBQUFBLElBQ2xEO0FBQUEsSUFDQSxtQkFBbUIsTUFBTTtBQUN2QixXQUFLLFlBQVksUUFBUSxDQUFDLE9BQU87QUFDL0IsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSx3QkFBd0IsTUFBTTtBQUM1QixXQUFLLGtCQUFrQixRQUFRLENBQUMsT0FBTztBQUNyQyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLGlCQUFpQixDQUFDLG1CQUFtQjtBQUNuQyxXQUFLLG9CQUFvQjtBQUN6QixXQUFLLE9BQU8sYUFBYTtBQUN6QixXQUFLLE9BQU8sWUFBWTtBQUN4QixXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxpQkFDRixjQUFjLGlCQUFpQixFQUMvQixVQUFVLE9BQU8sUUFBUTtBQUM1QixXQUFLLGlCQUNGLGNBQWMsaUJBQWlCLEVBQy9CLFVBQVUsSUFBSSxRQUFRO0FBQ3pCLFdBQUsseUJBQXlCO0FBQzlCLFdBQUssc0JBQXNCLGVBQWUsUUFBUSxJQUFJO0FBQ3RELFdBQUssT0FBTyxhQUFhLEtBQUssa0JBQWtCLEtBQUssa0JBQWtCO0FBQ3ZFLFdBQUssT0FBTyxhQUFhLGVBQWUsUUFBUSxTQUFTO0FBQ3pELFdBQUssT0FBTyxXQUFXLGVBQWUsUUFBUSxPQUFPO0FBQ3JELFdBQUssT0FBTyxtQkFBbUIsY0FBYztBQUM3QyxXQUFLLE9BQU8sU0FBUyxVQUFVLElBQUksUUFBUTtBQUMzQyxXQUFLLE9BQU8sVUFBVTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxlQUFlLE1BQU07QUFDbkIsV0FBSyxPQUFPLFlBQVk7QUFDeEIsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFNBQVMsTUFBTTtBQUNiLFVBQUksS0FBSywyQkFBMkIsT0FBTztBQUN6QyxhQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsYUFBSyxPQUFPLGFBQWEsS0FBSyxZQUFZO0FBQzFDLGFBQUssT0FBTyxzQkFBc0I7QUFDbEMsWUFBSSxvQkFBb0I7QUFDdEIsY0FBSSxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssc0JBQXNCLEVBQUU7QUFBQSxZQUNyRCxLQUFLLG1CQUFtQixjQUFjLFFBQVE7QUFBQSxVQUNoRDtBQUNBLGNBQUksb0JBQW9CLEtBQUssdUJBQXVCLE9BQU87QUFDekQsOEJBQWtCO0FBQUEsZUFDZjtBQUNILCtCQUFtQjtBQUFBLFVBQ3JCO0FBQ0EsZ0JBQU0sY0FBYztBQUFBLFlBQ2xCLEdBQUcsS0FBSyxxQkFBcUIsaUJBQWlCLFdBQVc7QUFBQSxVQUMzRCxFQUFFO0FBQUEsWUFDQSxDQUFDLE9BQ0MsR0FBRyxRQUFRLFNBQ1gsQ0FBQyxHQUFHLEtBQUssc0JBQXNCLEVBQUUsZUFBZTtBQUFBLFVBQ3BEO0FBQ0EscUJBQVcsTUFBTTtBQUNmLGlCQUFLLGVBQWUsV0FBVztBQUFBLFVBQ2pDLEdBQUcsR0FBRztBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0Esc0JBQXNCLE1BQU07QUFDMUIsV0FBSyx5QkFBeUI7QUFDOUIsbUJBQWEsS0FBSyxhQUFhO0FBQy9CLFdBQUssZ0JBQWdCO0FBQUEsSUFDdkI7QUFBQSxFQUNGO0FBQ0EsTUFBTyxtQkFBUTs7O0FDNUxmLFdBQVMsaUJBQWlCLG9CQUFvQixNQUFNO0FBQ2xELFNBQUs7QUFBQSxFQUNQLENBQUM7QUFHRCxNQUFNLGVBQXNCLE1BQU0sa0JBQWtCLFFBQVE7QUFDNUQsTUFBTSxvQkFBMkIsTUFBTSxxQkFBcUIsUUFBUTtBQUNwRSxNQUFNLGdCQUF1QixNQUFNLGlCQUFpQixRQUFRO0FBQzVELE1BQU0sb0JBQTJCLE1BQU0scUJBQXFCLFFBQVE7QUFDcEUsTUFBTSxTQUFTLElBQUksZUFBWSxnQkFBUSxZQUFZO0FBQ25ELE1BQU0sV0FBVyxJQUFJLGlCQUFjLGdCQUFRLGlCQUFpQjtBQUM1RCxNQUFNLE9BQU8sSUFBSSxhQUFVLGdCQUFRLGFBQWE7QUFDaEQsTUFBTSxXQUFXLElBQUksaUJBQWMsZ0JBQVEsaUJBQWlCO0FBQzVELE1BQU0sV0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBR0EsZUFBYSxpQkFBaUIsU0FBUyxTQUFVLEdBQUc7QUFDbEQsVUFBTSxVQUFVLEVBQUUsT0FBTyxRQUFRLHFCQUFxQjtBQUN0RCxRQUFJLENBQUMsUUFBUztBQUNkLFVBQU0sZ0JBQWdCLFFBQVEsUUFBUTtBQUN0QyxVQUFNLGVBQWUsU0FBUyxhQUFhO0FBQzNDLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFFL0IsUUFBSSxvQkFBb0IsUUFBUSxTQUFTO0FBRXZDLG1CQUFhLFlBQVksU0FBUyxNQUFNO0FBQ3hDO0FBQUEsSUFDRjtBQUVBLElBQU8sU0FBUyxVQUFVLElBQUksUUFBUTtBQUV0QyxJQUFPLGlCQUFpQixhQUFhO0FBRXJDLGlCQUFhLFlBQVksU0FBUyxNQUFNO0FBQUEsRUFDMUMsQ0FBQztBQUNELGVBQWEsaUJBQWlCLGFBQWEsU0FBVSxHQUFHO0FBQ3RELFVBQU0sVUFBVSxFQUFFLE9BQU8sUUFBUSx5QkFBeUI7QUFDMUQsUUFBSSxDQUFDLFFBQVM7QUFDZCxRQUFJLEtBQUssaUJBQWlCLFFBQVM7QUFDbkMsU0FBSyxlQUFlO0FBQ3BCLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFDL0IsV0FBTyxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQ3BDLENBQUM7QUFDRCxlQUFhLGlCQUFpQixZQUFZLFNBQVUsR0FBRztBQUNyRCxVQUFNLFVBQVUsRUFBRSxPQUFPLFFBQVEsd0JBQXdCO0FBQ3pELFFBQUksQ0FBQyxRQUFTO0FBRWQsUUFBSSxRQUFRLFNBQVMsRUFBRSxhQUFhLEVBQUc7QUFDdkMsU0FBSyxlQUFlO0FBQ3BCLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFDL0IsV0FBTyxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQ3BDLENBQUM7QUFFRCxTQUFPLGlCQUFpQix1QkFBdUIsU0FBVSxHQUFHO0FBQzFELFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFFBQUksQ0FBQyxRQUFTO0FBQ2QsV0FBTyxrQkFBa0IsT0FBTztBQUFBLEVBQ2xDLENBQUM7QUFFRCxTQUFPLGlCQUFpQixzQkFBc0IsU0FBVSxHQUFHO0FBQ3pELFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFFBQUksQ0FBQyxRQUFTO0FBQ2QsV0FBTyxpQkFBaUIsT0FBTztBQUMvQixXQUFPLG1CQUFtQjtBQUFBLEVBQzVCLENBQUM7QUFHRCxFQUFPLFlBQVksaUJBQWlCLFNBQVMsU0FBVSxHQUFHO0FBQ3hELFVBQU0sVUFBVSxFQUFFLE9BQU8sUUFBUSxxQkFBcUI7QUFDdEQsUUFBSSxDQUFDLFFBQVM7QUFDZCxVQUFNLGdCQUFnQixRQUFRLFFBQVEsVUFBVSxFQUFFLFFBQVE7QUFDMUQsVUFBTSxlQUFlLFNBQVMsYUFBYTtBQUMzQyxVQUFNLFNBQVMsUUFBUSxRQUFRO0FBQy9CLGlCQUFhLFlBQVksU0FBUyxNQUFNO0FBQUEsRUFDMUMsQ0FBQztBQUNELEVBQU8sWUFBWSxpQkFBaUIsYUFBYSxTQUFVLEdBQUc7QUFDNUQsVUFBTSxVQUFVLEVBQUUsT0FBTyxRQUFRLHlCQUF5QjtBQUMxRCxRQUFJLENBQUMsUUFBUztBQUNkLFFBQUksS0FBSyxpQkFBaUIsUUFBUztBQUNuQyxTQUFLLGVBQWU7QUFDcEIsVUFBTSxnQkFBZ0IsUUFBUSxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQzFELFVBQU0sZUFBZSxTQUFTLGFBQWE7QUFDM0MsVUFBTSxTQUFTLFFBQVEsUUFBUTtBQUMvQixpQkFBYSxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQzFDLENBQUM7QUFDRCxFQUFPLFlBQVksaUJBQWlCLFlBQVksU0FBVSxHQUFHO0FBQzNELFVBQU0sVUFBVSxFQUFFLE9BQU8sUUFBUSx3QkFBd0I7QUFDekQsUUFBSSxDQUFDLFFBQVM7QUFFZCxRQUFJLFFBQVEsU0FBUyxFQUFFLGFBQWEsRUFBRztBQUN2QyxTQUFLLGVBQWU7QUFDcEIsVUFBTSxnQkFBZ0IsUUFBUSxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQzFELFVBQU0sZUFBZSxTQUFTLGFBQWE7QUFDM0MsVUFBTSxTQUFTLFFBQVEsUUFBUTtBQUMvQixpQkFBYSxZQUFZLFNBQVMsTUFBTTtBQUFBLEVBQzFDLENBQUM7QUFJRCxFQUFPLFFBQVEsUUFBUSxTQUFVLElBQUk7QUFDbkMsT0FBRyxpQkFBaUIsU0FBUyxTQUFVLEdBQUc7QUFDeEMsWUFBTSxXQUFXLEVBQUUsT0FBTyxRQUFRLE1BQU07QUFDeEMsVUFBSSxDQUFDLFNBQVU7QUFDZixZQUFNLGFBQWEsU0FBUyxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQ3hELFlBQU0sZUFBZSxTQUFTLFVBQVU7QUFDeEMsbUJBQWEsT0FBTztBQUFBLElBQ3RCLENBQUM7QUFBQSxFQUNILENBQUM7QUFJRCxNQUFNLE9BQU8sV0FBWTtBQUN2QixxQkFBaUI7QUFDakIsSUFBTyxxQkFBcUI7QUFDNUIsSUFBTyxTQUFTLFVBQVUsSUFBSSxRQUFRO0FBQ3RDLGlCQUFhLFVBQVUsT0FBTyxRQUFRO0FBQ3RDLFdBQU8sZ0JBQWdCLFFBQVEsU0FBVSxJQUFJO0FBQzNDLFNBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QixDQUFDO0FBQ0QsSUFBTyxpQkFBaUIsVUFBVTtBQUNsQyxJQUFPLGFBQWE7QUFDcEIsSUFBTyxTQUFTLFVBQVUsT0FBTyxRQUFRO0FBQ3pDLGFBQVMsa0JBQWtCO0FBRzNCLGVBQVcsTUFBTTtBQUNmLG1CQUFhLFVBQVUsSUFBSSxRQUFRO0FBQ25DLGVBQVMsWUFBWSxNQUFPLFVBQVUsSUFBSztBQUFBLElBQzdDLEdBQUcsT0FBTyxHQUFHLGVBQWU7QUFBQSxFQUc5QjtBQUNBLE1BQU0sbUJBQW1CLFdBQVk7QUFDbkMsVUFBTSxjQUFjLFNBQVMsaUJBQWlCLE1BQU07QUFDcEQsVUFBTSxrQkFBa0I7QUFBQSxNQUN0QixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsSUFDYjtBQUNBLFVBQU0sZ0JBQWdCLElBQUkscUJBQXFCLENBQUMsWUFBWTtBQUMxRCxjQUFRLFFBQVEsQ0FBQyxVQUFVO0FBQ3pCLGNBQU0sUUFBUSxNQUFNO0FBQ3BCLGNBQU0sVUFBVSxNQUFNLGlCQUFpQixRQUFRO0FBQy9DLFlBQUksTUFBTSxnQkFBZ0I7QUFFeEIsa0JBQVEsUUFBUSxDQUFDLFdBQVc7QUFFMUIsa0JBQU0sVUFBVSxPQUFPLGFBQWEsVUFBVSxLQUFLLE9BQU87QUFDMUQsZ0JBQUksU0FBUztBQUNYLHFCQUFPLE1BQU07QUFFYixxQkFBTyxhQUFhLFlBQVksT0FBTztBQUFBLFlBQ3pDO0FBQUEsVUFDRixDQUFDO0FBQ0QsZ0JBQU0sS0FBSztBQUFBLFFBQ2IsT0FBTztBQUdMLHNCQUFZLGNBQWM7QUFDMUIsc0JBQVkscUJBQXFCO0FBQ2pDLHNCQUFZLFdBQVc7QUFDdkIsdUJBQWEsTUFBTSxRQUFRLFVBQVUsQ0FBQztBQUN0QyxnQkFBTSxNQUFNO0FBQ1osa0JBQVEsUUFBUSxDQUFDLFdBQVc7QUFFMUIsa0JBQU0sYUFBYSxPQUFPO0FBQzFCLGdCQUFJLFlBQVk7QUFDZCxxQkFBTyxhQUFhLFlBQVksVUFBVTtBQUMxQyxxQkFBTyxNQUFNO0FBQ2IscUJBQU8sZ0JBQWdCLEtBQUs7QUFBQSxZQUM5QjtBQUFBLFVBQ0YsQ0FBQztBQUVELGdCQUFNLEtBQUs7QUFBQSxRQUNiO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxHQUFHLGVBQWU7QUFDbEIsZ0JBQVksUUFBUSxDQUFDLFFBQVEsY0FBYyxRQUFRLEdBQUcsQ0FBQztBQUd2RCxVQUFNLGVBQWUsU0FBVSxTQUFTO0FBQ3RDLFVBQUksQ0FBQyxRQUFTO0FBQ2QsY0FBUSxpQkFBaUIsTUFBTSxFQUFFLFFBQVEsU0FBVSxJQUFJO0FBQ3JELFdBQUcsY0FBYztBQUNqQixXQUFHLE1BQU07QUFBQSxNQUNYLENBQUM7QUFDRCxNQUFPLHNCQUFzQixPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGOyIsCiAgIm5hbWVzIjogWyJpc0ludHJvIl0KfQo=
