const apiKey = "df5d648541c8705160d9300fe16bdeba";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

/**
 * Takes an argument "data" and updates the weather details. 
 * Collects the element by targeting 'className' and updating it. 
 * Resetting the search field once the search result is posted.
 */
async function updateWeather(data) {
  const cityElement = document.getElementsByClassName("city")[0];
  cityElement.textContent = data.name;

  const temperatureElement = document.getElementsByClassName("temperature")[0];
  temperatureElement.textContent = Math.round(data.main.temp) + " °c";

  const humidityElement = document.getElementsByClassName("humidity")[0];
  humidityElement.textContent = data.main.humidity + " %";

  const windSpeedElement = document.getElementsByClassName("windspeed")[0];
  windSpeedElement.textContent = data.wind.speed + " km/h";

  const visibilityElement = document.getElementsByClassName("visibility")[0];
  visibilityElement.textContent = (data.visibility / 1000) + " km";

  document.querySelector(".search input").value = "";
}

/**
 * Takes an argument "city" and gives the weather details. 
 * Uses 'await' to wait for response after the data is requested via 'fetch'
 * once retrieved successfully, converts the json data to javascript object
 * and store it in 'data'.
 */
async function getWeather(city) {
  if (!city) {
    console.error("Please enter a city name before searching!");
    return;
  }
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    console.error("Error getting weather:", error.message);
  }
}

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");


//Event listeners(search bar to be clicked, entered and place name in uppercase)
searchButton.addEventListener("click", () => {
  getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    getWeather(searchBox.value);
  }
});

searchBox.addEventListener("input", () => {
    searchBox.value = searchBox.value.toUpperCase();
});

































































