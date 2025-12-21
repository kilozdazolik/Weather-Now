
# 🌤️ Weather Now 

A modern, responsive weather dashboard application providing real-time, hourly, and daily forecasts. Built with **Vanilla JavaScript**

👉 **[View Live Demo Here](https://kilozdazolik.github.io/Weather-Now/)**

## ✨ Features

* **Real-time Weather Data:** Current temperature, humidity, wind speed, and precipitation.
* **Location Search:** Autocomplete search bar with **debounce** logic to minimize API calls.
* **7-Day Forecast:** Detailed daily forecast cards.
* **Interactive Hourly Forecast:** Sidebar displaying 24h forecast, filterable by selecting specific days.
* **Unit Conversion:** Seamless toggling between **Metric** (°C, km/h, mm) and **Imperial** (°F, mph, in) systems.
* **Responsive Design:** Optimized layout for Mobile, Tablet, and Desktop using CSS Grid and Flexbox.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, JavaScript (ES6+ Modules).
* **Build Tool:** [Vite](https://vitejs.dev/) - For fast development and optimized production build.
* **API:** [Open-Meteo API](https://open-meteo.com/) - Free weather API (No API key required).
* **Deployment:** GitHub Pages (via `gh-pages`).


### File Structure
```text
src/
├── js/
│   ├── api.js           # API Service Layer (Fetches & transforms data)
│   ├── dom.js           # UI Orchestrator (Manages DOM updates & components)
│   ├── main.js          # Entry Point (Event Listeners & State Management)
│   ├── utils.js         # Helper functions (e.g., Icon mapping)
│   └── components/      # UI Components (Pure functions rendering HTML strings)
│       ├── CurrentWeather.js
│       ├── DailyForecast.js
│       ├── Highlights.js
│       └── HourlyForecast.js

```
       
## 📦 Getting Started

To run this project locally:

1.  **Clone the repository**

    ```
    git clone [https://github.com/yourusername/weather-app.git](https://github.com/yourusername/weather-app.git)
    cd weather-app
    
    ```
    
2.  **Install dependencies**
    

    ```
    npm install
    
    ```
    
3.  **Start the development server**

    
    ```
    npm run dev
    
    ```
    
4.  **Build for production**
    
  
    
    ```
    npm run build
    ```
