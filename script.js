
let apiKey = "9912a871379b3e7285fcdbca65faf901";

let cities = [];

let button = document.querySelector("#search-button");

let formEl = document.querySelector("#citySearch");

let weatherContainerEl = document.querySelector("#current-weather");

let citySearchInputEl = document.querySelector("#searched-city");

let forecastTitle = document.querySelector("#forecast");

let forecastContainerEl = document.querySelector("#fiveday-forecast");

let historyEl = document.querySelector("#history-buttons");




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

};


button.addEventListener("click", search);


      // Logic for retrieving data from API.
    let getCityWeather = function(city){


        fetch("https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9912a871379b3e7285fcdbca65faf901")
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

                weatherHTML(city, uvResponse.value);
        
                // Plot Temperature
                //let newDiv = document.createElement("div");

                // newDiv.innerHTML = `<hi>${cities}
            
            })    

          
          
          
        
        
        
        
        
        
        
        
        
        }
    
          
    

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));


  // Function to convert each letter of a string to uppercase letter.

    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

       capitalizeFirstLetter('string');

       function saveSearchHistory() {
       localStorage.setItem('search history', JSON.stringify(searchHistoryArray));

       }
