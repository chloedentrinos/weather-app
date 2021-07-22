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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row g-4">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-auto">
          <div class="day">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
              alt="${forecastDay.weather[0].description}"
              width="70"/>
          <div class="temperature">${Math.round(
            forecastDay.temp.max
          )}°C / ${Math.round(forecastDay.temp.min)}°C</div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "acd17a551bf3501fded89c5b043d5045";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  let iconCurrent = document.querySelector("#iconCurrent");
  iconCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCurrent.setAttribute("alt", response.data.weather[0].description);
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

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "acd17a551bf3501fded89c5b043d5045";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
