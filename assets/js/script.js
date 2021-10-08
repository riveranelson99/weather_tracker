// // Establish a function that FETCHES data from a weather api
// // This function will be a CLICK function that activates when the user hits search
// // Parse that info into data that will then be distributed into specific information
// // That information will detail the city, date, temperature, wind, humidity, and UV index for the CURRENT date
// // Below that information will be the same data across 5 additional days
// // The 5 day forecast will be smaller in size (Small boxes) and contain image icons correlated to the weather expected fro that day (icons)
// // The user will be able to search by different city's
// // The city's will be put into a history bank to be referenced back to even after further searches
// var $weatherServer = 'url';
// var $key = "798aa8a41a70442411dba5a35b70bb2d";

// var $api = `https://api.openweathermap.org/data/2.5/weather?q=Texas&appid=${$key}`;



// function getWeather () {
//     fetch ($api)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//         var $cityName = data.name;
//         // var $temp = data.main.temp;
//         var $temp = parseFloat((data.main.temp-273.15)*1.8)+32;
//         $temp = $temp.toFixed(2);
//         var $wind = data.wind.speed;
//         var $hum = data.main.humidity;

//         $("#city-name").append(`${$cityName} </br>`);

//         var $testCard = `
//         temp: ${$temp} </br>
//         wind: ${$wind} </br>
//         hum: ${$hum} </br>`

//         $(".list-group").append($testCard);

//         var $lat = data.coord.lat;
//         var $lon = data.coord.lon;
//         var $apiToo = `https://api.openweathermap.org/data/2.5/onecall?lat=${$lat}&lon=${$lon}&appid=${$key}`
//         fetch($apiToo)
//         .then( function (response) {
//             return response.json();
//         })
//         .then(function (dataToo) {
//             console.log(dataToo);

//             var $uv = dataToo.current.uvi;

//             $(".list-group").append(`uv: ${$uv}`);

//         })
//     })
// }

// getWeather();

// // button.on("click", getWeather);

// {/* <h5>${$cityName}</h5> </br> */}