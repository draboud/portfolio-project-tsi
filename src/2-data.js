import { ASSETS, VIEW_START_END } from "./0-config";
const HOME_VIEW = "view-1";
class Data {
  constructor(globalController, container) {
    this.global = globalController;
    this.container = container; //The root for this module
    //.......................................................................
    //DEFINITIONS............................................................
    this.introText = this.global.query(".section-wrap-txt", this.container);
    this.viewOptsBtn = this.global.query(".opts-menu-btn", this.container);
    this.viewOptsMenu = this.global.query(".opts-dropdown", this.container);
    this.allViewOptBtns = [
      ...this.global.queryAll(".opts-menu-link", this.container),
    ];
    this.dimmer = this.global.query(".dimmer", this.container);
    this.txtImgBtn = this.global.query(".txt-img-btn", this.container);
    this.activeDataWrapper = this.global.query(
      ".section-wrap-comp-data",
      this.container,
    );
    this.allDataWrappers = [
      ...this.global.queryAll(".section-wrap-comp-data", this.container),
    ];
    this.allData = [...this.global.queryAll(".comp-data-wrap", this.container)];
    this.allCtrlBtnWrappers = [
      ...this.global.queryAll(".section-wrap-btns", this.container),
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
    this.eventMap = new Map([
      ["open-data", this.initSection],
      ["play-ctrl-vid", this.setAndPlayCtrlBtnVid],
      ["play-view-vid", this.setAndPlayViewVid],
      ["back-to-view", this.backToViewFromComp],
      ["open-view-opts-menu", this.showViewOptsMenu],
      ["close-view-opts-menu", this.hideViewOptsMenu],
      ["toggle-img-txt", this.showCompImageOrText],
      ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)],
    ]);
    this.assetsMap = new Map([
      ["view-1", ASSETS["view-1"].desktop],
      ["view-1-mp", ASSETS["view-1"].mobile],
      ["view-2", ASSETS["view-2"].desktop],
      ["view-2-mp", ASSETS["view-2"].mobile],
      ["view-3", ASSETS["view-3"].desktop],
      ["view-3-mp", ASSETS["view-3"].mobile],
    ]);
  }
  //.......................................................................
  //FUNCTIONS..............................................................
  initSection = (clicked) => {
    this.global.flashBlackout();
    //setting UI and logic...
    this.dimmer.classList.remove("active");
    this.txtOrImg = "image";
    this.txtImgBtn.textContent = "image";
    this.hideBackBtn();
    this.hideAllData();
    this.resetAllDataSheets();
    this.introText.classList.add("active");
    this.showCtrlBtnWrapper();
    this.global.activateCurrentNavLink(clicked);
    //setting vid element...
    this.global.clearSectionVidSrc(); //reveal poster
    this.setLastActiveView(); //for bckgrnd img
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
    this.activeDataWrapper.querySelector(".txt-img-btn").textContent =
      this.txtOrImg;
  };
  hideAllData = () => {
    this.deactivateAllDataWrappers();
    this.activeDataWrapper
      .querySelectorAll(".comp-data-wrap")
      .forEach(function (el) {
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
  hideBackBtn = () => {
    this.activeCtrlBtnWrapper
      .querySelector(".ctrl-btn-back")
      .classList.remove("active");
  };
  showBackBtn = () => {
    this.activeCtrlBtnWrapper
      .querySelectorAll(".ctrl-btn")
      .forEach(function (el) {
        el.classList.remove("active");
      });
    this.activeCtrlBtnWrapper.classList.add("active");
    this.activeCtrlBtnWrapper
      .querySelector(".ctrl-btn-back")
      .classList.add("active");
  };
  resetAllDataSheets = () => {
    this.allData.forEach(function (el) {
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
    if (
      this.lastActiveView.view !== HOME_VIEW &&
      this.activeView === HOME_VIEW
    ) {
      this.viewBackToStart();
      return;
    }
    if (
      this.lastActiveView.view !== HOME_VIEW &&
      this.activeView !== HOME_VIEW
    ) {
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
    //return if clicked view same as current view
    if (clickedViewOptsBtn.dataset.view === this.activeView) return;
    //setting UI and logic...
    this.viewOptsMenu.classList.remove("active");
    this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
    this.activeDataWrapper = this.allDataWrappers.find(
      (el) => el.dataset.view === clickedViewOptsBtn.dataset.view,
    );
    this.activeViewBtn = clickedViewOptsBtn;
    //setting vid element...
    this.global.setActiveVid();
    this.setDataVidBackgroundImg();
    this.setActiveView(); //for the poster
    this.setActiveCtrlBtnWrapper();
    //play vid
    this.setViewVidStartAndEnd();
    this.playDataVid();
  };
  setAndPlayCtrlBtnVid = (clickedCtrlBtn) => {
    this.global.setActiveVid();
    this.setLastActiveView(); //for the bckgrnd img to change to comp vid starts
    this.setDataVidBackgroundImg();
    this.hideActiveCtrlBtnWrapper();
    this.activeCtrlBtn = clickedCtrlBtn;
    //play
    this.setDataVidStartAndEnd(this.activeCtrlBtn);
    this.playDataVid(); //removes blackout in global.playRange
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
      this.setDataVidPoster(); //done here so poster doesn't appear earlier
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
      this.activeDataWrapper
        .querySelector(".txt-img-btn")
        .classList.add("active");
      this.showData();
      this.showBackBtn();
      //set bckgrnd img to black to prevent flash of image when changing nav
      const activeVidWrap = this.global.getActiveVid().closest(".vid-wrap");
      if (activeVidWrap) {
        activeVidWrap.style.backgroundImage = "none";
        activeVidWrap.style.backgroundColor = "black";
      }
    }
  };
  backToViewFromComp = () => {
    this.global.flashBlackout();
    //setting UI and logic...
    this.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
    this.txtOrImg = "image";
    this.activeDataWrapper
      .querySelector(".txt-img-btn")
      .classList.remove("active");
    this.hideAllData();
    this.resetAllDataSheets();
    this.dimmer.classList.remove("active");
    this.introText.classList.add("active");
    this.hideBackBtn();
    this.showCtrlBtnWrapper();

    //setting vid element...
    this.setDataVidBackgroundImg();
    this.global.clearSectionVidSrc(); //reveal poster
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
      (el) => el.dataset.view === this.activeView,
    );
  };
  deactivateAllCtrlBtnWrappers = () => {
    this.allCtrlBtnWrappers.forEach((el) => {
      el.classList.remove("active");
    });
  };
}
export default Data;
