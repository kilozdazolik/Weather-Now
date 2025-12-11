"use strict";

import "./style.css";
import * as dom from "./js/dom.js";

addEventListener("DOMContentLoaded", (e) => {
  const btnToggleDropdown = document.querySelector(".unit");
  btnToggleDropdown.addEventListener("click", () => {
    dom.toggleUnitsDropdown();
  });

  const btnToggleSidebar = document.querySelector(".sidebar-button");
  btnToggleSidebar.addEventListener("click", () => {
    dom.toggleSidebarDropdown();
  });

  window.addEventListener("click", (e) => {
    const clickedInsideUnit = e.target.closest(".dropdown-container");
    if (!clickedInsideUnit) {
      if (dom.isUnitsDropdownOpen()) {
        dom.closeUnitsDropdown();
      }
    }

    const clickedInsideSidebar = e.target.closest(
      ".sidebar-dropdown-container"
    );
    if (!clickedInsideSidebar) {
      if (dom.isSidebarDropdownOpen()) {
        dom.closeSidebarDropdown();
      }
    }
  });
});
