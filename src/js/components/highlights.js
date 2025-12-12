export function renderHighlights(container, current, units) {
  if (!container) return;

  const tempUnit = units === "metric" ? "C" : "F";
  const speedUnit = units === "metric" ? "km/h" : "mph";
  const lengthUnit = units === "metric" ? "mm" : "in";

  container.innerHTML = `
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Feels like</p>
      <p class="text-preset text-preset-3 card-value">
        ${current.feelsLike}°${tempUnit}
      </p>
    </div>
    
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Humidity</p>
      <p class="text-preset text-preset-3 card-value">
        ${current.humidity}%
      </p>
    </div>
    
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Wind</p>
      <p class="text-preset text-preset-3 card-value">
        ${current.wind} ${speedUnit}
      </p>
    </div>
    
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Precipitation</p>
      <p class="text-preset text-preset-3 card-value">
        ${current.precip} ${lengthUnit}
      </p>
    </div>
  `;
}
