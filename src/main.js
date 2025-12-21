"use strict";

import "./style.css";
import * as dom from "./js/dom.js";
import * as api from "./js/api.js";

addEventListener("DOMContentLoaded", () => {
  let currentUnits = "metric";
  let lat = null;
  let lon = null;

  function switchUnitSystem(newSystem) {
    currentUnits = newSystem;

    const switchBtn = document.querySelector(".button-switch");
    if (switchBtn) {
      switchBtn.textContent =
        currentUnits === "metric" ? "Switch to Imperial" : "Switch to Metric";
    }

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

    if (lat && lon) {
      const searchInput = document.querySelector(".input-search");
      api.getWeatherData(lat, lon, currentUnits).then((data) => {
        if (data) {
          dom.updateDashboard(data, searchInput.value, currentUnits);
        }
      });
    }
  }

  switchUnitSystem("metric");

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
        lat = item.dataset.lat;
        lon = item.dataset.lon;
        const cityName =
          item.dataset.name || item.textContent.split(",")[0].trim();

        searchInput.value = cityName;
        dom.closeSearchDropdown();

        console.log(`Lekérés indítása: ${cityName} (${lat}, ${lon})`);

        api.getWeatherData(lat, lon, currentUnits).then((data) => {
          if (data) {
            dom.updateDashboard(data, cityName, currentUnits);
          }
        });
      }
    });
  }

  const searchButton = document.querySelector(".button-search");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      if (lat && lon) {
        api.getWeatherData(lat, lon, currentUnits).then((data) => {
          if (data) {
            dom.updateDashboard(data, searchInput.value, currentUnits);
          }
        });
      }
    });
  }

  const sidebarItems = document.querySelectorAll(".dropdown-sidebar-list-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelector(".dropdown-sidebar-list-item.active")
        ?.classList.remove("active");
      item.classList.add("active");

      const selectedDay = item.textContent.trim();

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
