class Navbar {
  constructor(globalController, container) {
    this.global = globalController;
    this.container = container; //The root for this module
    //.......................................................................
    //DEFINITIONS............................................................
    this.navMenu = this.global.query(".nav_menu", this.container);
    this.navBtn = this.global.query(".nav_button", this.container);
    this.allNavLinks = this.global.queryAll(".nav_menu_link", this.container);
    this.allNavLinksWithDropdown = [
      ...this.global.queryAll('[data-nav-section="sequence"]', this.container),
    ];
    this.allNavDropdowns = [
      ...this.global.queryAll(".nav_menu_dropdown", this.container),
    ];
    this.eventMap = new Map([
      ["open-nav-dropdown", this.openNavDropdown],
      ["close-nav-dropdown", this.closeNavDropdown],
      ["toggle-nav-dropdown", this.toggleNavDropdown],
    ]);
  }
  //.......................................................................
  //FUNCTIONS..............................................................
  handleEvent = function (trigger, eventAction) {
    const action = this.eventMap.get(eventAction);
    if (action) {
      action(trigger);
    } else {
      console.warn(`No action found for: ${eventAction}`);
    }
  };
  closeNavMenu = function () {
    this.allNavDropdowns.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  closeMobileNavMenu = function () {
    if ("navMenuOpen" in this.navMenu.dataset) this.navBtn.click();
    this.navMenu.querySelector(".nav_menu_dropdown").classList.remove("active");
  };
  openNavDropdown = function (trigger) {
    trigger
      .closest(".nav_menu_link-wrap")
      .querySelector(".nav_menu_dropdown")
      .classList.add("active");
  };
  closeNavDropdown = function (trigger) {
    trigger
      .closest(".nav_menu_link-wrap")
      .querySelector(".nav_menu_dropdown")
      .classList.remove("active");
  };
  toggleNavDropdown = function (trigger) {
    this.global.activateCurrentNavLink(trigger);
    trigger
      .closest(".nav_menu_link-wrap")
      .querySelector(".nav_menu_dropdown")
      .classList.toggle("active");
  };
}
export default Navbar;
