/* ============================================================
   weather.js
   Fetches current conditions and a 3-day forecast for
   Bujumbura, Burundi from the OpenWeatherMap API.

   SETUP REQUIRED:
   1. Create a free account at https://openweathermap.org/api
   2. Copy your API key and paste it below as API_KEY.
   3. New keys can take up to a couple of hours to activate.
   ============================================================ */

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // <-- paste your key here

const LOCATION = {
  name: "Bujumbura, Burundi",
  lat: -3.3822,
  lon: 29.3644,
};

const UNITS = "metric"; // metric = Celsius

const currentUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${LOCATION.lat}&lon=${LOCATION.lon}&units=${UNITS}&appid=${API_KEY}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${LOCATION.lat}&lon=${LOCATION.lon}&units=${UNITS}&appid=${API_KEY}`;

// DOM references
const tempEl = document.getElementById("weatherTemp");
const descEl = document.getElementById("weatherDesc");
const statusEl = document.getElementById("weatherStatus");
const forecastListEl = document.getElementById("forecastList");

async function loadCurrentWeather() {
  const response = await fetch(currentUrl);
  if (!response.ok) {
    throw new Error(`Current weather request failed: ${response.status}`);
  }
  const data = await response.json();
  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
  };
}

async function loadForecast() {
  const response = await fetch(forecastUrl);
  if (!response.ok) {
    throw new Error(`Forecast request failed: ${response.status}`);
  }
  const data = await response.json();
  return buildThreeDayForecast(data.list);
}

// The free /forecast endpoint returns data in 3-hour steps for 5 days.
// Pick one entry per upcoming day, closest to midday, for a clean 3-day summary.
function buildThreeDayForecast(list) {
  const days = {};

  list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const dayKey = date.toISOString().split("T")[0];
    const hour = date.getUTCHours();

    if (!days[dayKey] || Math.abs(hour - 12) < Math.abs(days[dayKey].hour - 12)) {
      days[dayKey] = {
        hour,
        date,
        temp: entry.main.temp,
        description: entry.weather[0].description,
      };
    }
  });

  const todayKey = new Date().toISOString().split("T")[0];

  return Object.keys(days)
    .filter((key) => key !== todayKey)
    .sort()
    .slice(0, 3)
    .map((key) => days[key]);
}

function renderCurrent(current) {
  tempEl.textContent = `${current.temp}\u00B0C`;
  descEl.textContent = current.description;
}

function renderForecast(days) {
  const labels = ["Tomorrow", "In 2 days", "In 3 days"];

  forecastListEl.innerHTML = days
    .map((day, index) => {
      const label =
        labels[index] ||
        day.date.toLocaleDateString(undefined, { weekday: "short" });
      return `
        <div class="forecast-day">
          <span class="forecast-day__label">${label}</span>
          <span class="forecast-day__temp">${Math.round(day.temp)}&deg;C</span>
          <span class="forecast-day__desc">${day.description}</span>
        </div>
      `;
    })
    .join("");
}

async function initWeather() {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
    statusEl.textContent =
      "Add your OpenWeatherMap API key in js/weather.js to load live conditions.";
    descEl.textContent = "Weather data not yet configured.";
    return;
  }

  try {
    const [current, forecastDays] = await Promise.all([
      loadCurrentWeather(),
      loadForecast(),
    ]);

    renderCurrent(current);
    renderForecast(forecastDays);
    statusEl.textContent = "Live data from OpenWeatherMap.";
  } catch (error) {
    console.error(error);
    statusEl.textContent =
      "Could not load live weather right now. Please try again later.";
    descEl.textContent = "Weather unavailable.";
  }
}

initWeather();