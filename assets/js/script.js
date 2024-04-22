const apiKey = "df5d648541c8705160d9300fe16bdeba";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcons = document.querySelector(".weather-icon");
const containerDetail = document.querySelector(".details");
const toggleButton = document.querySelector(".show-hide-button");


/**
 * Takes an argument "city" and checks the user input 
 * for its validity!
 */
async function checkForValidity(city) {
  // Check for empty city name
  if (city.length === 0) {
    alert("Please enter a city name.");
    return false;
  }
  // Check for characters only
  const isValidFormat = /^[a-zA-Z]+$/.test(city);
  if (!isValidFormat) {
    alert("Please enter a valid city name using only letters.");
    return false;
  }
  // Check for excessive length 
  const maxLengthallowed = 20;
  if (city.length > maxLengthallowed) {
    alert(`City name cannot be longer than ${maxLengthallowed} characters.`);
    return false;
  }
  return true;
}


/**
 * Takes an argument "data" and updates the weather details. 
 * Collects the element by targeting 'className' and updating it. 
 * Resetting the search field once the search result is posted.
 */
async function updateWeather(data) {
  const cityElement = document.getElementsByClassName("city")[0];
  cityElement.textContent = data.name;

  const temperatureElement = document.getElementsByClassName("temperature")[0];
  temperatureElement.textContent = Math.round(data.main.temp) + "°c";

  const temperatureElementB = document.getElementsByClassName("feelsliketemp")[0];
  temperatureElementB.textContent = "Feels-like : " + Math.round(data.main.feels_like) + "°c";

  const temperatureElementC = document.getElementsByClassName("tempmax")[0];
  temperatureElementC.textContent = "H : " + (data.main.temp_max) + "°c";

  const temperatureElementD = document.getElementsByClassName("tempmin")[0];
  temperatureElementD.textContent = "L : " + (data.main.temp_min) + "°c";

  const humidityElement = document.getElementsByClassName("humidity")[0];
  humidityElement.textContent = data.main.humidity + " %";

  const windSpeedElement = document.getElementsByClassName("windspeed")[0];
  windSpeedElement.textContent = data.wind.speed + " km/h";

  const visibilityElement = document.getElementsByClassName("visibility")[0];
  visibilityElement.textContent = Math.round(data.visibility / 1000) + " km";

  //Update the weather-icon with the respective temperature. 
  if (data.weather[0].main.toLowerCase() === "Clouds".toLowerCase()) {
    weatherIcons.src = "assets/media/clouds02.png";
  } else if (data.weather[0].main.toLowerCase() === "Clear".toLowerCase()) {
    weatherIcons.src = "assets/media/clear01.png";
  } else if (data.weather[0].main.toLowerCase() === "Drizzle".toLowerCase()) {
    weatherIcons.src = "assets/media/drizzle01.png";
  } else if (data.weather[0].main.toLowerCase() === "Mist".toLowerCase()) {
    weatherIcons.src = "assets/media/mist.png";
  } else if (data.weather[0].main.toLowerCase() === "Snow".toLowerCase()) {
    weatherIcons.src = "assets/media/snow01.png";
  } else if (data.weather[0].main.toLowerCase() === "Haze".toLowerCase()) {
    weatherIcons.src = "assets/media/haze.png";
  }

  document.querySelector(".search input").value = "";
}


/**
 * Takes an argument "city" and gives the weather details. 
 * Uses 'await' to wait for response after the data is requested via 'fetch'
 * once retrieved successfully, converts the json data to javascript object
 * and store it in 'data'.
 */
async function getWeather(city) {
  if (!checkForValidity(city)) {
    return; // Exit the function if city is invalid
  }
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    updateWeather(data);
    containerDetail.style.display = 'none';
  } catch (error) {
    console.error("Error getting weather:", error.message);
  }
}


//Event listeners(search bar to be clicked, entered and enter place name in uppercase)
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

toggleButton.addEventListener('click', function() {
  if (containerDetail.style.display === 'none') {
    containerDetail.style.display = 'flex';
    containerDetail.style.justifyContent = 'space-between'; 
  } else {
    containerDetail.style.display = 'none';
  }
});
