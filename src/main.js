"use strict";

import "./style.css";
import * as dom from "./js/dom.js";
import * as api from "./js/api.js";

addEventListener("DOMContentLoaded", () => {
  // --- STATE VARIABLES ---
  let currentUnits = "metric";
  let lat = null;
  let lon = null;

  // --- UNIT SWITCH LOGIC ---
  function switchUnitSystem(newSystem) {
    // Akkor is engedjük a frissítést, ha ugyanaz a rendszer (az inicializálás miatt)
    currentUnits = newSystem;

    // 1. Gomb frissítése
    const switchBtn = document.querySelector(".button-switch");
    if (switchBtn) {
      switchBtn.textContent =
        currentUnits === "metric" ? "Switch to Imperial" : "Switch to Metric";
    }

    // 2. Aktív osztályok a dropdownban
    const unitItems = document.querySelectorAll(".unit-list-item");
    const metricValues = ["celsius", "kmh", "mm"];
    const imperialValues = ["fahrenheit", "mph", "in", "inch"];

    unitItems.forEach((item) => {
      item.classList.remove("active");
      const val = item.dataset.value;

      if (currentUnits === "metric" && metricValues.includes(val)) {
        item.classList.add("active");
      } else if (currentUnits === "imperial" && imperialValues.includes(val)) {
        item.classList.add("active");
      }
    });

    // 3. Adatok újratöltése (ha van kiválasztott város)
    if (lat && lon) {
      const searchInput = document.querySelector(".input-search");
      // JAVÍTÁS: currentUnits használata uni helyett
      api.getWeatherData(lat, lon, currentUnits).then((data) => {
        if (data) {
          dom.updateDashboard(data, searchInput.value, currentUnits);
        }
      });
    }
  }

  // --- INICIALIZÁLÁS (FONTOS!) ---
  // Azonnal beállítjuk a UI-t Metric-re betöltéskor
  switchUnitSystem("metric");

  // --- EVENT LISTENERS ---

  const switchButton = document.querySelector(".button-switch");
  if (switchButton) {
    switchButton.addEventListener("click", () => {
      const newSystem = currentUnits === "metric" ? "imperial" : "metric";
      switchUnitSystem(newSystem);
    });
  }

  const unitItems = document.querySelectorAll(".unit-list-item");
  unitItems.forEach((item) => {
    item.addEventListener("click", () => {
      const val = item.dataset.value;
      let targetSystem = "metric";
      if (["fahrenheit", "mph", "in", "inch"].includes(val)) {
        targetSystem = "imperial";
      }
      switchUnitSystem(targetSystem);
      dom.closeUnitsDropdown();
    });
  });

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

  const closeAllExcept = (currentIndex) => {
    dropdowns.forEach((dropdown, index) => {
      if (index !== currentIndex && dropdown.isOpen()) {
        dropdown.close();
      }
    });
  };

  dropdowns.forEach((dropdown, index) => {
    const trigger = document.querySelector(dropdown.trigger);
    if (trigger) {
      trigger.addEventListener("click", () => {
        closeAllExcept(index);
        dropdown.toggle();
      });
    }
  });

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

  // --- SEARCH LIST SELECTION ---
  const searchList = document.querySelector(".dropdown-search-list");
  if (searchList) {
    searchList.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-search-list-item");
      if (item) {
        lat = item.dataset.lat;
        lon = item.dataset.lon;
        // Használjuk a dataset.name-et, ha van, vagy a szöveget tisztítva
        const cityName =
          item.dataset.name || item.textContent.split(",")[0].trim();

        searchInput.value = cityName;
        dom.closeSearchDropdown();

        console.log(`Lekérés indítása: ${cityName} (${lat}, ${lon})`);

        // JAVÍTÁS: 'uni' helyett 'currentUnits'
        api.getWeatherData(lat, lon, currentUnits).then((data) => {
          if (data) {
            dom.updateDashboard(data, cityName, currentUnits);
          }
        });
      }
    });
  }

  // --- SEARCH BUTTON CLICK ---
  const searchButton = document.querySelector(".button-search");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      if (lat && lon) {
        // JAVÍTÁS: 'uni' helyett 'currentUnits'
        api.getWeatherData(lat, lon, currentUnits).then((data) => {
          if (data) {
            dom.updateDashboard(data, searchInput.value, currentUnits);
          }
        });
      }
    });
  }

  // --- SIDEBAR DAY SELECTION ---
  const sidebarItems = document.querySelectorAll(".dropdown-sidebar-list-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      // 1. UI: Set active class
      document
        .querySelector(".dropdown-sidebar-list-item.active")
        ?.classList.remove("active");
      item.classList.add("active");

      // 2. Get the day name (e.g., "Monday")
      const selectedDay = item.textContent.trim();

      // 3. Update only the sidebar using cached data
      // Note: We need access to the full 'data' object here.
      // Since we don't store 'data' globally in main.js yet, we might need to fetch it
      // OR better: ensure 'api.getWeatherData' caches it, or pass it around.

      // FOR NOW (Simplest solution): Re-fetch is easiest without state management,
      // but let's try to grab it if we have lat/lon.
      if (lat && lon) {
        api.getWeatherData(lat, lon, currentUnits).then((data) => {
          if (data) {
            dom.updateSidebarDay(selectedDay, data, currentUnits);
          }
        });
      }

      dom.closeSidebarDropdown();
    });
  });
});
