
// let now = new Date();
// function currentTime() {
//   let currentHour = now.getHours();
//   let currentMinute = now.getMinutes();
//   document.querySelector("#display-time").innerHTML = `Today ${currentHour}:${currentMinute}`;
// }
// currentTime();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML =`<div class="row">`;
  let days =["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function(day) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
  <div class="forecast-day">${day}</div>
  <img class="forecast-weather-icon" src="src/images/01d.svg" alt="">
  <div class="forecast-hi-temp">11°C</div>
  <div class="forecast-lo-temp">6°C</div>
  </div>
  `;});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}
displayForecast();

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let tempFeels = Math.round(response.data.main.feels_like)
  let description = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;
  let showWeatherIcon = document.querySelector("#weather-icon-today")
  showWeatherIcon.setAttribute("src", `src/images/${weatherIcon}.svg`);
  document.querySelector("#temperature").innerHTML = temp;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#feels-like-temp").innerHTML = tempFeels;
  document.querySelector("#display-weather-description").innerHTML = description;
  document.querySelector("#new-city").innerHTML = response.data.name;
  {
    function showTime(response) {
    let unix = response.data.dt;
    let timezone = response.data.timezone;
    let unixMS = unix * 1000
    let timezoneAdjust = timezone - 3600
    let timezoneMS = timezoneAdjust * 1000
    let localTime = unixMS + timezoneMS;
    let timeObject = new Date(localTime);
    let hour = timeObject.toLocaleString("en-GB", {hour: "numeric"});
    let minute = timeObject.toLocaleString("en-US", {minute: "numeric"});
    document.querySelector("#display-time").innerHTML = `${hour}:${minute}`;
    }
    return showTime(response)}
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  document.querySelector("#new-city").innerHTML = `${city.value}`;
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
function geolocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", geolocation);
