var inp = document.querySelector("#inp");
var btn = document.querySelector("#btn");
var city;

btn.addEventListener("click", function (e) {
  e.preventDefault();
  var city = inp.value;
  getWeather(city);
});
getWeather();


async function getWeather(city = "cairo") {
  try {
    var apiKey = "a97fb839cc1b4911a26124852241806";
    var url = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    var data = await url.json();
    displayWeather(data.current, data.location, data.forecast.forecastday);
  } catch (error) {
    displayError();
  }
}

function displayWeather(current, location, forecastDays) {
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var firstDay = new Date(forecastDays[0].date).getDay();
  var secDay = new Date(forecastDays[1].date).getDay();
  var thirdDay = new Date(forecastDays[2].date).getDay();
  var month = new Date(forecastDays[0].date).toString();
  var fDay = daysOfWeek[firstDay];
  var sDay = daysOfWeek[secDay];
  var tDay = daysOfWeek[thirdDay];

  const weatherResult = document.getElementById("weather-result");
  let htmlContent = `
    <div class="first-box col-lg-4 text-light">
        <p class="d-flex justify-content-between align-items-center mb-0 py-2"><span>${fDay}</span><span>${month.substring(
    8,
    10
  )} ${month.substring(4, 7)}</span></p>
        <h5>${location.name}</h5>
        <h1>${forecastDays[0].day.maxtemp_c}°C</h1>

        <img src="https:${current.condition.icon}" alt="" class="sun">

        <h6>${current.condition.text}</h6>
        
        <div class="details d-flex justify-content-between">
        <span class="me-2"><img src="image/icon-umberella.png" alt="umbrella"> 20%</span>
        <span class="me-2"> <img src="image/icon-wind.png" alt="wind"> 18km/h</span>
        <span class="me-2"> <img src="image/icon-compass.png" alt="compass"> East</span>
        </div>
    </div>

  <div class="second-box col-lg-4 text-light text-center p-0">
    <p class="mb-0 py-2">${sDay}</p>
    <img src="https:${
      forecastDays[0].day.condition.icon
    }" alt="sun" class="py-4">
    <h3>${forecastDays[1].day.maxtemp_c}°C</h3>
    <span>${forecastDays[1].day.mintemp_c}°C</span>
    <h6 class="py-4">${forecastDays[1].day.condition.text}</h6>
  </div>
  
  <div class="third-box col-lg-4 text-light text-center p-0">
    <p class="mb-0 py-2">${tDay}</p>
    <img src="https:${
      forecastDays[0].day.condition.icon
    }" alt="sun" class="py-4">
    <h3>${forecastDays[2].day.maxtemp_c}°C</h3>
    <span>${forecastDays[2].day.mintemp_c}°C</span>
    <h6 class="py-4">${forecastDays[2].day.condition.text}</h6>
  </div>
    `;
  weatherResult.innerHTML = htmlContent;
}

function displayError() {
  var weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = `
      <p>Sorry, no weather information found. Please try again.</p>
    `;
}


