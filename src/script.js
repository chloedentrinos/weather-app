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

function showImperialTemperature(event) {
  event.preventDefault();
  metricLink.classList.remove("active");
  metricLink.classList.add("nonActive");
  imperialLink.classList.remove("nonActive");
  imperialLink.classList.add("active");
  document.querySelector("#current-temperature").innerHTML =
    Math.round((metricTemperature * 9) / 5) + 32;
  document.querySelector("#maximum-temperature-today").innerHTML =
    Math.round((metricTemperatureMaximum * 9) / 5) + 32;
  document.querySelector("#minimum-temperature-today").innerHTML =
    Math.round((metricTemperatureMinimum * 9) / 5) + 32;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    metricWindSpeed / 1.609
  );
  document.querySelector("#windSpeedValue").innerHTML = "mph";

  let maxTempForecast = document.querySelectorAll(
    "#maximum-temperature-forecast"
  );
  let maxTempArray = Array.from(maxTempForecast);

  maxTempArray.forEach(function (temp, index) {
    temp = maxTempArray[index].innerText;
    let convertedMaxTemp =
      (metricTemperatureMaximumForecast[index] * 9) / 5 + 32;
    maxTempForecast[index].innerHTML = `${Math.round(convertedMaxTemp)}`;
  });

  let minTempForecast = document.querySelectorAll(
    "#minimum-temperature-forecast"
  );
  let minTempArray = Array.from(minTempForecast);

  minTempArray.forEach(function (temp, index) {
    temp = minTempArray[index].innerText;
    let convertedMinTemp =
      (metricTemperatureMinimumForecast[index] * 9) / 5 + 32;
    minTempForecast[index].innerHTML = `${Math.round(convertedMinTemp)}`;
  });
}

function showMetricTemperature(event) {
  event.preventDefault();
  metricLink.classList.remove("nonActive");
  metricLink.classList.add("active");
  imperialLink.classList.remove("active");
  imperialLink.classList.add("nonActive");
  document.querySelector("#current-temperature").innerHTML =
    Math.round(metricTemperature);
  document.querySelector("#maximum-temperature-today").innerHTML = Math.round(
    metricTemperatureMaximum
  );
  document.querySelector("#minimum-temperature-today").innerHTML = Math.round(
    metricTemperatureMinimum
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(metricWindSpeed);
  document.querySelector("#windSpeedValue").innerHTML = "km/h";
  let maxTempForecast = document.querySelectorAll(
    "#maximum-temperature-forecast"
  );
  let maxTempArray = Array.from(maxTempForecast);

  maxTempArray.forEach(function (temp, index) {
    temp = maxTempArray[index].innerText;
    let convertedMaxTemp = metricTemperatureMaximumForecast[index];
    maxTempForecast[index].innerHTML = `${Math.round(convertedMaxTemp)}`;
  });

  let minTempForecast = document.querySelectorAll(
    "#minimum-temperature-forecast"
  );
  let minTempArray = Array.from(minTempForecast);

  minTempArray.forEach(function (temp, index) {
    temp = minTempArray[index].innerText;
    let convertedMinTemp = metricTemperatureMinimumForecast[index];
    minTempForecast[index].innerHTML = `${Math.round(convertedMinTemp)}`;
  });
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
          <div class="temperature"><span id="maximum-temperature-forecast">${Math.round(
            forecastDay.temp.max
          )}</span>° / <span id="minimum-temperature-forecast">${Math.round(
          forecastDay.temp.min
        )}</span>°</div>
        </div>`;
      metricTemperatureMaximumForecast.push(forecastDay.temp.max);
      metricTemperatureMinimumForecast.push(forecastDay.temp.min);
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
  metricTemperatureMaximum = response.data.main.temp_max;
  document.querySelector("#maximum-temperature-today").innerHTML = Math.round(
    metricTemperatureMaximum
  );
  metricTemperatureMinimum = response.data.main.temp_min;
  document.querySelector("#minimum-temperature-today").innerHTML = Math.round(
    metricTemperatureMinimum
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  metricWindSpeed = response.data.wind.speed;
  document.querySelector("#windSpeed").innerHTML = Math.round(metricWindSpeed);

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

let metricTemperature = null;
let metricTemperatureMaximum = null;
let metricTemperatureMinimum = null;
let metricWindSpeed = null;
let metricTemperatureMaximumForecast = [];
let metricTemperatureMinimumForecast = [];
let temperatures = [];

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
