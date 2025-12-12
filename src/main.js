"use strict";

import "./style.css";
import * as dom from "./js/dom.js";

addEventListener("DOMContentLoaded", () => {
  // --- DROPDOWN CONFIGURATION ---
  const dropdowns = [
    {
      trigger: ".unit",
      container: ".dropdown-container",
      toggle: dom.toggleUnitsDropdown,
      close: dom.closeUnitsDropdown,
      isOpen: dom.isUnitsDropdownOpen,
    },
    {
      trigger: ".sidebar-button",
      container: ".sidebar-dropdown-container",
      toggle: dom.toggleSidebarDropdown,
      close: dom.closeSidebarDropdown,
      isOpen: dom.isSidebarDropdownOpen,
    },
    {
      trigger: ".input-search",
      container: ".section-search",
      toggle: dom.toggleSearchDropdown,
      close: dom.closeSearchDropdown,
      isOpen: dom.isSearchDropdownOpen,
    },
  ];

  // --- CLOSE ALL EXCEPT ONE ---
  const closeAllExcept = (currentIndex) => {
    dropdowns.forEach((dropdown, index) => {
      if (index !== currentIndex && dropdown.isOpen()) {
        dropdown.close();
      }
    });
  };

  // --- ATTACH TRIGGER LISTENERS ---
  dropdowns.forEach((dropdown, index) => {
    const trigger = document.querySelector(dropdown.trigger);
    if (trigger) {
      trigger.addEventListener("click", () => {
        closeAllExcept(index);
        dropdown.toggle();
      });
    }
  });

  // --- GLOBAL CLICK OUTSIDE ---
  window.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      const clickedInside = e.target.closest(dropdown.container);
      if (!clickedInside && dropdown.isOpen()) {
        dropdown.close();
      }
    });
  });
});
