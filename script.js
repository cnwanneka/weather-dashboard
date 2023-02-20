
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


  