"use strict";

import "./style.css";
import * as dom from "./js/dom.js";
import * as api from "./js/api.js";

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

  // --- SEARCH FUNCTION ---
  const searchInput = document.querySelector(".input-search");
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      dom.renderSearchLoader();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const searchValue = e.target.value;
        if (searchValue.length >= 3) {
          const locations = await api.getCoordinates(searchValue);

          dom.renderSearchResults(locations);

          if (locations.length > 0) {
            dom.openSearchDropdown();
          } else {
            dom.closeSearchDropdown();
          }
        } else {
          dom.closeSearchDropdown();
        }
      }, 300);
    });
  }

  const searchList = document.querySelector(".dropdown-search-list");
  if (searchList) {
    searchList.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-search-list-item");
      if (item) {
        const name = item.dataset.name;
        const lat = item.dataset.lat;
        const lon = item.dataset.lon;
      }
      searchInput.value = item.textContent.trim();
      dom.closeSearchDropdown();
    });
  }
});
