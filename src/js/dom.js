"use strict";

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
