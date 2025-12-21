import { getIconName } from "../utils.js";

export function renderHourlyForecast(
  container,
  hourlyData,
  units,
  selectedDayName = null
) {
  if (!container || !hourlyData) return;

  container.innerHTML = "";

  if (!selectedDayName) {
    selectedDayName = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  const filteredHours = hourlyData.filter((hour) => {
    const date = new Date(hour.time);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayName === selectedDayName;
  });

  const hoursToShow = filteredHours.slice(0, 8);

  const htmlContent = hoursToShow
    .map((hour) => {
      const timeObj = new Date(hour.time);
      const timeString = timeObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      const iconName = getIconName(hour.code);

      return `
      <li class="sidebar-list-item">
        <div class="sidebar-list-item_left">
          <img
            class="sidebar-list-item_icon"
            src="./images/icon-${iconName}.webp"
            alt="weather icon"
          />
          <p class="text-preset text-preset-5-medium">${timeString}</p>
        </div>
        <p class="text-preset text-preset-6">${hour.temp}°</p>
      </li>
    `;
    })
    .join("");

  if (htmlContent === "") {
    container.innerHTML = `<p class="text-preset text-preset-7" style="text-align:center; padding: 20px;">No data for ${selectedDayName}</p>`;
  } else {
    container.innerHTML = htmlContent;
  }
}
