
let apiKey = "9912a871379b3e7285fcdbca65faf901"

// Array of cities

let cities = ["Berlin", "Paris", "Edinburgh", "Madrid", "Birmungham", "London"];








// Function to convert each letter of a string to uppercase letter.

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

capitalizeFirstLetter('string');





function saveSearchHistory() {
    localStorage.setItem('search history', JSON.stringify(searchHistoryArray));
};




// Logic for retrieving data from API.

fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9912a871379b3e7285fcdbca65faf901")
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
    })



  