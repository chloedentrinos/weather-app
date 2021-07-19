function showTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentHours}:${currentMinutes}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-temperature-unit-metric").innerHTML =
    "<strong>°C</strong>";
  document.querySelector("#current-temperature-unit-imperial").innerHTML = "°F";
  document.querySelector("#maximum-temperature-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minimum-temperature-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "acd17a551bf3501fded89c5b043d5045";
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value.trim().toLowerCase();
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "acd17a551bf3501fded89c5b043d5045";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showImperial(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = 55;
  document.querySelector("#current-temperature-unit-imperial").innerHTML =
    "<strong>°F</strong>";
  document.querySelector("#current-temperature-unit-metric").innerHTML = "°C";
}

function showMetric(event) {
  event.preventDefault();
  document.querySelector("#current-temperature-unit-metric").innerHTML =
    "<strong>°C</strong>";
  document.querySelector("#current-temperature-unit-imperial").innerHTML = "°F";
}

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = showTime(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let currentTemperatureUnitImperial = document.querySelector(
  "#current-temperature-unit-imperial"
);
currentTemperatureUnitImperial.addEventListener("click", showImperial);

let currentTemperatureUnitMetric = document.querySelector(
  "#current-temperature-unit-metric"
);
currentTemperatureUnitMetric.addEventListener("click", showMetric);

searchCity("Penrith");
