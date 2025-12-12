"use strict";

import { renderCurrentWeather } from "./components/currentWeather.js";
import { renderHighlights } from "./components/highlights.js";
import { renderDailyForecast } from "./components/dailyForecast.js";
import { renderHourlyForecast } from "./components/hourlyForecast.js";

let currentSidebarDay = null;

export function updateDashboard(data, cityName, units = "metric") {
  const currentContainer = document.querySelector(".current-weather-card");
  renderCurrentWeather(
    currentContainer,
    { name: cityName, country: "" },
    data.current,
    units
  );

  const highlightsContainer = document.querySelector(".highlights-grid");
  if (highlightsContainer) {
    renderHighlights(highlightsContainer, data.current, units);
  }

  const dailyContainer = document.querySelector(".daily-grid");
  if (dailyContainer) {
    renderDailyForecast(dailyContainer, data.daily, units);
  }

  const hourlyContainer = document.querySelector(".sidebar-list");
  const sidebarButton = document.querySelector(".sidebar-button");

  if (currentSidebarDay === null) {
    currentSidebarDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  if (sidebarButton) {
    const iconHTML = sidebarButton.querySelector("img")
      ? sidebarButton.querySelector("img").outerHTML
      : "";
    sidebarButton.innerHTML = `${currentSidebarDay} ${iconHTML}`;
  }

  if (hourlyContainer) {
    renderHourlyForecast(
      hourlyContainer,
      data.hourly,
      units,
      currentSidebarDay
    );
  }
}

export function updateSidebarDay(dayName, fullWeatherData, units) {
  currentSidebarDay = dayName;

  const hourlyContainer = document.querySelector(".sidebar-list");
  const sidebarButton = document.querySelector(".sidebar-button");

  if (sidebarButton) {
    const iconHTML = sidebarButton.querySelector("img")
      ? sidebarButton.querySelector("img").outerHTML
      : "";
    sidebarButton.innerHTML = `${dayName} ${iconHTML}`;
  }

  renderHourlyForecast(
    hourlyContainer,
    fullWeatherData.hourly,
    units,
    currentSidebarDay
  );
}

// --- DROPDOWN CONTROLLER ---
class DropdownController {
  constructor(dropdownSelector, buttonSelector) {
    this.dropdown = document.querySelector(dropdownSelector);
    this.button = buttonSelector
      ? document.querySelector(buttonSelector)
      : null;
  }

  toggle() {
    this.dropdown?.classList.toggle("show");
    this.button?.classList.toggle("show");
  }

  open() {
    this.dropdown?.classList.add("show");
    this.button?.classList.add("show");
  }

  close() {
    this.dropdown?.classList.remove("show");
    this.button?.classList.remove("show");
  }

  isOpen() {
    return this.dropdown?.classList.contains("show") ?? false;
  }
}

// --- DROPDOWN INSTANCES ---
const unitsDropdown = new DropdownController(".dropdown-unit", ".unit");
const sidebarDropdown = new DropdownController(
  ".dropdown-sidebar",
  ".sidebar-button"
);
const searchDropdown = new DropdownController(".dropdown-search");

// --- SEARCH CONTROLLER ----
export function renderSearchResults(locations) {
  const searchList = document.querySelector(".dropdown-search-list");

  if (!searchList) return;
  searchList.innerHTML = "";

  locations.forEach((location) => {
    const li = document.createElement("li");
    li.className = "dropdown-search-list-item text-preset text-preset-7";
    li.textContent = `${location.name}, ${location.country}`;

    li.dataset.lat = location.lat;
    li.dataset.lon = location.lon;
    li.dataset.name = location.name;

    searchList.appendChild(li);
  });
}

export function renderSearchLoader() {
  const searchList = document.querySelector(".dropdown-search-list");
  if (!searchList) return;

  searchList.innerHTML = `
    <div class="loader-container">
      <span class="loader"></span>
      <p class="text-preset text-preset-7">Search in progress...</p>
    </div>
  `;
}

// --- EXPORTS ---
export const toggleUnitsDropdown = () => unitsDropdown.toggle();
export const closeUnitsDropdown = () => unitsDropdown.close();
export const isUnitsDropdownOpen = () => unitsDropdown.isOpen();

export const toggleSidebarDropdown = () => sidebarDropdown.toggle();
export const closeSidebarDropdown = () => sidebarDropdown.close();
export const isSidebarDropdownOpen = () => sidebarDropdown.isOpen();

export const toggleSearchDropdown = () => searchDropdown.toggle();
export const openSearchDropdown = () => searchDropdown.open();
export const closeSearchDropdown = () => searchDropdown.close();
export const isSearchDropdownOpen = () => searchDropdown.isOpen();
