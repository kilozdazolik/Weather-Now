import { getIconName } from "../utils.js";

export function renderCurrentWeather(container, location, current, units) {
  if (!container) return;

  let iconName = getIconName(current.code);

  const unitSymbol = units === "metric" ? "C" : "F";

  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const bgSize = window.innerWidth >= 768 ? "large" : "small";
  container.style.backgroundImage = `url(./images/bg-today-${bgSize}.svg)`;

  container.innerHTML = `
    <div class="left">
      <p class="text-preset text-preset-4 weather-card_location">
        ${location.name}, ${location.country}
      </p>
      <p class="text-preset text-preset-6 weather-card_date">
        ${dateString}
      </p>
    </div>
    
    <div class="right">
      <img 
        class="weather-card_icon" 
        src="./images/icon-${iconName}.webp" 
        alt="${current.description}" 
      />
      <p class="text-preset text-preset-1 weather-card_temperature">
        ${current.temp}°${unitSymbol}
      </p>
    </div>
  `;
}
