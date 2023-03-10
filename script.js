
let apiKey = "9912a871379b3e7285fcdbca65faf901";

let city = ""

let searchHistory = [];

let numberOfCities = 6;

let button = document.querySelector("#search-button");

let cityForm = $("#cityForm");

let weatherContainerEl = document.querySelector("#current-weather");

let citySearchInputEl = document.querySelector("#searched-city");

let historyEl = document.querySelector("#history-buttons");

let searchedCities = $("#searchedCityLi");


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
  for (var i = 0; i < searchHistory.length; i++) {
    var cityNameBtn = createBtn(searchHistory[i]);
    searchedCities.append(cityNameBtn);
  }
};















// event handler for form submission
let submitHandler = function (event) {
  event.preventDefault();
  
  // inputting city name
  let cityName = $("#city").val().trim();
  let newcity = saveCityName(cityName);
  getCityWeather(cityName);
  if (newcity == 1) {
    createCityNameBtn(cityName);
  }
};
let BtnClickHandler = function (event) {
  event.preventDefault();
  
  // inputting city name
  let cityName = event.target.textContent.trim();
  getCityWeather(cityName);
};




// Getting today's weather
let getCityWeather = function (cityName) {


  // This function handles events where one button is clicked
  let search = function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    let inputElement = document.querySelector("#city");
    let textInput = inputElement.value.trim();
  
    if(inputElement.value === "") {
        alert("Please enter a city");
        return; 
    }  
    else{

    getCityWeather(textInput)
  }

}


// Logic for retrieving data from API.

button.addEventListener("click", function (event) {

  if (event.target.matches("search-button")) {

    console.log(event.target.textContent);



    fetch("http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=9912a871379b3e7285fcdbca65faf901")
      .then(response => response.json())
      .then(citiesFound => {
        let firstCity = citiesFound[0];
        console.log(firstCity.lat);
        console.log(firstCity.lon);

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=9912a871379b3e7285fcdbca65faf901`)
      })


      .then(response => response.json())
      .then(data => {

        console.log(data);

        saveCity(city);
      })    
  }
        
})       








    
// save search in local storage

let saveCityName = function (cityName) {
  let newcity = 0;
  searchHistory = JSON.parse(localStorage.getItem("weatherInfo"));
  if (searchHistory == null) {
    searchHistory = [];
    searchHistory.unshift(cityName);
  } else {
    for (let i = 0; i < searchHistory.length; i++) {
      if (cityName.toLowerCase() == searchHistory[i].toLowerCase()) {
        return newcity;
      }
    }
    if (searchHistory.length < numberOfCities) {
      
      searchHistory.unshift(cityName);
    } else {
      
      // setting the limit of history items to 6
      searchHistory.pop();
      searchHistory.unshift(cityName);
    }
  }
  localStorage.setItem("weatherInfo", JSON.stringify(searchHistory));
  newcity = 1;
  return newcity;
};
    
    
// create buttons with searched cities

let createCityNameBtn = function (cityName) {
  let saveCities = JSON.parse(localStorage.getItem("weatherInfo"));
  
  if (saveCities.length == 1) {
    let cityNameBtn = creatBtn(cityName);
    searchedCities.prepend(cityNameBtn);
  } else {
    for (let i = 1; i < saveCities.length; i++) {
      if (cityName.toLowerCase() == saveCities[i].toLowerCase()) {
        return;
      }
    }
    // checking the number of items in search history
    if (searchedCities[0].childElementCount < numberOfCities) {
      let cityNameBtn = creatBtn(cityName);
    } else {
      searchedCities[0].removeChild(searchedCities[0].lastChild);
      let cityNameBtn = creatBtn(cityName);
    }
    searchedCities.prepend(cityNameBtn);
    $(":button.list-group-item-action").on("click", function () {
      BtnClickHandler(event);
    });
  }
};




  // Function to convert each letter of a string to uppercase letter.

   // function capitalizeFirstLetter(string) {
    //return string.charAt(0).toUpperCase() + string.slice(1);
   // }

     //  capitalizeFirstLetter('string');
// Function to load saved cities
loadSavedCity();

// logic for calling functions when submit button is clicked
$("#search-button").on("submit", function () {
    submitHandler(event);
});

$(":button.list-group-item-action").on("click", function () {
  BtnClickHandler(event);
});

}