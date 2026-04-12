class Sequence {
  constructor(globalController, container) {
    this.global = globalController;
    this.container = container; //The root for this module
    //.......................................................................
    //DEFINITIONS............................................................
    this.pauseWrapper = this.global.query(".pause-wrap", this.container);
    this.allTxtWrappers = [
      ...this.global.queryAll(".txt-wrap", this.container),
    ];
    this.allIntroTxt = [
      ...this.global.queryAll(".intro-txt-wrap", this.container),
    ];
    this.allActionHeadings = [
      ...this.global.queryAll(".action-heading", this.container),
    ];
    this.allVidWrappers = [
      ...this.global.queryAll(".vid-wrap", this.container),
    ];
    this.allCtrlBtnWrappers = [
      ...this.global.queryAll(".section-wrap-btns", this.container),
    ];
    this.isDropdown = false;
    this.activeSequence = null;
    this.activeSectionTxt = null;
    this.activeVidWrapper = null;
    this.activeCtrlBtnWrapper = null;
    this.sequenceTimer = null;
    this.sequenceEndIsCancelled = false;
    this.eventMap = new Map([
      ["open-sequence", this.initSection],
      ["open-sequence-index", this.setActiveSequenceDropdown],
      ["play-ctrl-vid", this.playCtrlBtnVid],
      ["pause-ctrl-vid", this.pauseCtrlVid],
      ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)],
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
    this.setAndShowActiveCtrlBtnWrapper();
    this.activeTxtWrapper
      .querySelector(".intro-txt-wrap")
      .classList.add("active");
    if (!this.isDropdown) {
      this.global.activateCurrentNavLink(clicked);
    } else {
      this.global.activateCurrentNavLink(
        clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link"),
      );
      window.dispatchEvent(
        new CustomEvent("dropdownOptClicked", { detail: clicked }),
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
        new CustomEvent("dropdownIconClicked", { detail: clicked }),
      );
    } else {
      this.isDropdown = true;
      this.initSection(clicked);
    }
  };
  setAndShowActiveTxtWrapper = () => {
    this.allTxtWrappers.forEach((el) => el.classList.remove("active"));
    this.activeTxtWrapper = this.allTxtWrappers.find(
      (el) => el.dataset.sequence === this.activeSequence,
    );
    this.activeTxtWrapper.classList.add("active");
  };
  setAndShowActiveVidWrapper = () => {
    this.allVidWrappers.forEach((el) => el.classList.remove("active"));
    this.activeVidWrapper = this.allVidWrappers.find(
      (el) => el.dataset.sequence === this.activeSequence,
    );
    this.activeVidWrapper.classList.add("active");
  };
  setAndShowActiveCtrlBtnWrapper = () => {
    this.allCtrlBtnWrappers.forEach((el) => el.classList.remove("active"));
    this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
      (el) => el.dataset.sequence === this.activeSequence,
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
    this.activeTxtWrapper
      .querySelector(".intro-txt-wrap")
      .classList.remove("active");
    this.activeTxtWrapper
      .querySelector(".action-heading")
      .classList.add("active");
    this.sequenceEndIsCancelled = false;
    this.global.setActiveVid();
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
    }
  };
  clearSequenceTimers = () => {
    this.sequenceEndIsCancelled = true;
    clearTimeout(this.sequenceTimer);
    this.sequenceTimer = null;
  };
}
export default Sequence;
