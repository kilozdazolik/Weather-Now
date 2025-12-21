import { getIconName } from "../utils.js";

export function renderDailyForecast(container, dailyData, units) {
  if (!container || !dailyData) return;

  container.innerHTML = "";

  const htmlContent = dailyData
    .map((day) => {
      const dateObj = new Date(day.date);
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

      const iconName = getIconName(day.code);

      return `
      <div class="day-card">
        <p class="text-preset text-preset-6 day-card_day">${dayName}</p>
        <img
          src="./images/icon-${iconName}.webp"
          alt="weather icon"
          class="day-card_icon"
        />
        <div class="day-card_temperatures">
          <p class="text-preset text-preset-7 day-card_temp-max">
            ${day.maxTemp}°
          </p>
          <p class="text-preset text-preset-7 day-card_temp-min">
            ${day.minTemp}°
          </p>
        </div>
      </div>
    `;
    })
    .join("");

  container.innerHTML = htmlContent;
}
