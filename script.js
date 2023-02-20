

fetch("https://api.openweathermap.org/geo/1.0/direct?q=London,GBR&limit=5&appid=9912a871379b3e7285fcdbca65faf901")
    .then(response => response.json())
    .then(data => {

        console.log(data)
    })

    