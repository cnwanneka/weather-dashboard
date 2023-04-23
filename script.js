
let apiKey = "appid=9912a871379b3e7285fcdbca65faf901";

let searchHistory = [];

let numberOfCities = 6;

let searchForm = $("#searchForm");

let unit = "units=metric";

let dailyWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";

let forecastWeatherApi = "https://api.openweathermap.org/data/3.0/onecall?";

let searchedCities = $("#history");



// Getting the current weather
let getCityWeather = function (searchInputName) {

  let apiUrl = dailyWeatherApi + searchInputName + "&" + apiKey + "&" + unit;
  
  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json().then(function (response) {
        $("#cityName").html(response.name);
      
        let unixTime = response.dt;
        let date = moment.unix(unixTime).format("DD/MM/YYYY");
        $("#currentdate").html(date);
        
        let weatherIconUrl = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        $("#weatherIconToday").attr("src", weatherIconUrl);
        $("#currentTemp").html(response.main.temp + " \u00B0C");
        $("#currentWindSpeed").html(response.wind.speed + " KPH");
        $("#currentHumidity").html(response.main.humidity + " %");
        
      
        let lat = response.coord.lat;
        let lon = response.coord.lon;
  
        getForecast(lat, lon);
      });
    } else {
      alert("Please enter a city.");
    }
  });
};



// Getting the 5 day weather forecast
let getForecast = function (lat, lon) {
  
  let apiUrl = forecastWeatherApi + "lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly" + "&" +
    apiKey + "&" + unit;
  
    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      for (let i = 1; i < 6; i++) {
        
        let unixTime = response.daily[i].dt;
        let date = moment.unix(unixTime).format("DD/MM/YYYY");
        $("#Date" + i).html(date);
        
        let weatherIconUrl = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png";
        $("#weatherIconDay" + i).attr("src", weatherIconUrl);
        
        let temp = response.daily[i].temp.day + " \u00B0C";
        $("#tempDay" + i).html(temp);
      
        let wind = response.daily[i].wind_speed;
        $("#windDay" + i).html(wind + " KPH")

        let humidity = response.daily[i].humidity;
        $("#humidityDay" + i).html(humidity + " %");
      }
    });
};

// creating buttons for history items
let createBtn = function (btnText) {
  let btn = $("<button>")
    .text(btnText)
    .addClass("list-group-item list-group-item-action")
    .attr("type", "submit");
  return btn;
};

// Loading saved cities from local storage 
let loadSavedCity = function () {
  searchHistory = JSON.parse(localStorage.getItem("weatherInfo"));
  if (searchHistory == null) {
    searchHistory = [];
  }
  for (let i = 0; i < searchHistory.length; i++) {
    let cityNameBtn = createBtn(searchHistory[i]);
    searchedCities.append(cityNameBtn);
  }
};
  
// save search in local storage
let saveCityName = function (searchInputName) {
  let newcity = 0;
  searchHistory = JSON.parse(localStorage.getItem("weatherInfo"));
  if (searchHistory == null) {
    searchHistory = [];
    searchHistory.unshift(searchInputName);
  } else {
    for (let i = 0; i < searchHistory.length; i++) {
      if (searchInputName.toLowerCase() == searchHistory[i].toLowerCase()) {
        return newcity;
      }
    }
    if (searchHistory.length < numberOfCities) {
      
      searchHistory.unshift(searchInputName);
    } else {
      
      // setting the limit of history items to 6
      searchHistory.pop();
      searchHistory.unshift(searchInputName);
    }
  }
  localStorage.setItem("weatherInfo", JSON.stringify(searchHistory));
  newcity = 1;
  return newcity;
};
    
    
// create buttons with searched cities
let createCityNameBtn = function (searchInputName) {
  let saveCities = JSON.parse(localStorage.getItem("weatherInfo"));
  
  if (saveCities.length == 1) {
    let cityNameBtn = createBtn(searchInputName);
    searchedCities.prepend(cityNameBtn);
  } else {
    for (let i = 1; i < saveCities.length; i++) {
      if (cityName.toLowerCase() == saveCities[i].toLowerCase()) {
        return;
      }
    }
    // checking the number of items in search history
    if (searchedCities[0].childElementCount < numberOfCities) {
      let cityNameBtn = createBtn(cityName);
    } else {
      searchedCities[0].removeChild(searchedCities[0].lastChild);
      let cityNameBtn = createBtn(cityName);
    }
    searchedCities.prepend(cityNameBtn);
    $(":button.list-group-item-action").on("click", function () {
      BtnClickHandler(Event);
    });
  }
};

// Function to load saved cities
loadSavedCity();

// submit form event handler
let formSubmitHandler = function (Event) {
  event.preventDefault();
  // city name
  let cityName = $("#searchInput").val().trim();
  let newcity = saveCityName(cityName);
  getCityWeather(cityName);
  if (newcity == 1) {
    createCityNameBtn(cityName);
  }
};

let BtnClickHandler = function (Event) {
  event.preventDefault();
  // city name
  let cityName = event.target.textContent.trim();
  getCityWeather(cityName);
};

// call functions using submit button
$("#searchForm").on("submit", function () {
  formSubmitHandler(Event);
});
$(":button.list-group-item-action").on("click", function () {
  BtnClickHandler(Event);
});
