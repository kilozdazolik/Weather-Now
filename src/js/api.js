"use strict";
const API_GEO = "https://geocoding-api.open-meteo.com/v1/search";
const API_WEATHER = "https://api.open-meteo.com/v1/forecast?";

export async function getCoordinates(city) {
  const url = `${API_GEO}?name=${city}&count=5`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status, response.statusText);
    }

    const data = await response.json();
    if (!data.results) {
      return [];
    }

    return data.results.map((result) => ({
      name: result.name,
      country: result.country,
      lat: result.latitude,
      lon: result.longitude,
    }));
  } catch (error) {
    console.error(error);
  }
}

export async function getWeatherData(lat, lon, units = "metric") {
  const temperatureUnit = units === "metric" ? "celsius" : "fahrenheit";
}
