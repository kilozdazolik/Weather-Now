"use strict";
const unitDropdown = document.querySelector(".dropdown-unit");
const button = document.querySelector(".unit");
const sidebarDropdown = document.querySelector(".dropdown-sidebar");
const sidebarButton = document.querySelector(".sidebar-button");

export function toggleUnitsDropdown() {
  unitDropdown.classList.toggle("show");
  button.classList.toggle("show");
}

export function closeUnitsDropdown() {
  unitDropdown.classList.remove("show");
  button.classList.remove("show");
}

export function isUnitsDropdownOpen() {
  return unitDropdown.classList.contains("show");
}

export function toggleSidebarDropdown() {
  sidebarDropdown.classList.toggle("show");
  sidebarButton.classList.toggle("show");
}

export function closeSidebarDropdown() {
  sidebarDropdown.classList.remove("show");
  sidebarButton.classList.remove("show");
}

export function isSidebarDropdownOpen() {
  return sidebarDropdown.classList.contains("show");
}
