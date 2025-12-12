"use strict";
const API_GEO = "https://geocoding-api.open-meteo.com/v1/search";
const API_WEATHER = "https://api.open-meteo.com/v1/forecast?";

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

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
  const tempUnit = units === "metric" ? "celsius" : "fahrenheit";
  const windUnit = units === "metric" ? "kmh" : "mph";
  const precipUnit = units === "metric" ? "mm" : "inch";

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone: "auto",
    temperature_unit: tempUnit,
    windspeed_unit: windUnit,
    precipitation_unit: precipUnit,
    forecast_days: 7,

    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    hourly: "temperature_2m,weather_code",
  });

  const url = `${API_WEATHER}${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API Error");

    const data = await response.json();

    return {
      current: {
        temp: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        precip: data.current.precipitation,
        isDay: data.current.is_day === 1,
        code: data.current.weather_code,
        description: weatherCodes[data.current.weather_code] || "Unknown",
      },
      daily: data.daily.time.map((time, index) => ({
        date: time,
        maxTemp: Math.round(data.daily.temperature_2m_max[index]),
        minTemp: Math.round(data.daily.temperature_2m_min[index]),
        code: data.daily.weather_code[index],
      })),
      hourly: data.hourly.time.map((time, index) => ({
        time: time,
        temp: Math.round(data.hourly.temperature_2m[index]),
        code: data.hourly.weather_code[index],
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
