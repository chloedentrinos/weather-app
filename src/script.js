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

function displayForecast() {
  let forcastElement = document.querySelector("#forecast");

  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];

  let forecastHTML = `<div class="row g-4">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-auto">
      <div class="day">${day}</div>
      <i class="fas fa-cloud-rain cloud-rain iconFuture"></i>
      <div class="temperature">12°C / 9°C</div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#iconCurrent")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#iconCurrent")
    .setAttribute("alt", response.data.weather[0].description);
  metricTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(metricTemperature);
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

function showImperialTemperature(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round((metricTemperature * 9) / 5) + 32;
  metricLink.classList.remove("active");
  metricLink.classList.add("nonActive");
  imperialLink.classList.remove("nonActive");
  imperialLink.classList.add("active");
}

function showMetricTemperature(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(metricTemperature);
  metricLink.classList.remove("nonActive");
  metricLink.classList.add("active");
  imperialLink.classList.remove("active");
  imperialLink.classList.add("nonActive");
}

let metricTemperature = null;

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = showTime(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let imperialLink = document.querySelector("#imperial-link");
imperialLink.addEventListener("click", showImperialTemperature);

let metricLink = document.querySelector("#metric-link");
metricLink.addEventListener("click", showMetricTemperature);

searchCity("Sydney");

displayForecast();
