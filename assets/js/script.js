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

var $key = `798aa8a41a70442411dba5a35b70bb2d`;

function getWeather(search) { // Incorporate this into the search function later
    var $api = `https://api.openweathermap.org/data/2.5/weather?q=Texas&appid=${$key}&units=imperial`;

    fetch($api)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        $("#city-name").append(data.name);

        var $today = $("#today");
        $today.textContent = "";

        var $cardHead = document.createElement("h3");
        $cardHead.className = "card-title";
        $cardHead.textContent = moment().format("LL");

        var $cardCon = document.createElement("div");
        $cardCon.className = "card";

        var $card = document.createElement("div");
        $card.className = "card-body";

        var $temp = document.createElement("p");
        $temp.className = "card-text";
        $temp.textContent = `Temperature: ${data.main.temp} °F`;

        var $wind = document.createElement("p");
        $wind.className = "card-text";
        $wind.textContent = `Wind: ${data.wind.speed} MPH`;

        var $hum = document.createElement("p");
        $hum.className = "card-text";
        $hum.textContent = `Humidity: ${data.main.humidity} %`;

        var $uvIndex = document.createElement('p');
        $uvIndex.className = "card-text";

        fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${$key}&lat=${data.coord.lat}&lon=${data.coord.lon}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            $uvIndex.textContent = `UV Index: ${data.value}`;
        });

        var $weatherImg = document.createElement("img");
        $weatherImg.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

        $cardHead.append($weatherImg);
        $card.append($cardHead);
        $card.append($temp);
        $card.append($wind);
        $card.append($hum);
        $card.append($uvIndex);
        $cardCon.append($card);
        $today.append($cardCon);
    })
}

function fiveDay(search) { // Incorporate this into the search function later
    var $fiveHead = $("#five-head");

    $fiveHead.removeClass();

    var $forecast = $("#forecast");

    $forecast.innerHTML = "";

    var $api = `https://api.openweathermap.org/data/2.5/forecast?q=Texas&appid=${$key}&units=imperial`;

    fetch($api)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        var $forecastTwo = document.getElementById("forecast");

        for (var i=0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
                var $cardHead = document.createElement('h5');                
                $cardHead.className = "card-title text-left";
                $cardHead.textContent = moment(data.list[i].dt_txt.split("12:")[0]).format("M/D/YYYY");// Keep messing with sizing settings to get it JUST right

                var $cardCon = document.createElement('div');
                $cardCon.className = "card col-12 col-md-2 m-2 bg-success text-white";

                var $card = document.createElement('div');
                $card.className = "card-body";

                var $cardTwo = document.createElement('div');

                var $temp = document.createElement('p');
                $temp.className = "card-text"
                $temp.textContent = `Temp: ${data.list[i].main.temp_max} °F`;

                var $wind = document.createElement('p');
                $wind.className = "card-text";
                $wind.textContent = `Wind: ${data.list[i].wind.speed} MPH`;

                var $hum = document.createElement('p');
                $hum.className = "card-text"
                $hum.textContent = `Humidity: ${data.list[i].main.humidity} %`;

                var $weatherImg = document.createElement('img');
                $weatherImg.setAttribute('src', `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);

                $card.appendChild($cardHead);
                $card.appendChild($weatherImg);
                $card.appendChild($temp);
                $card.appendChild($wind);
                $card.appendChild($hum);
                $cardCon.appendChild($card);
                $cardTwo.appendChild($cardCon);
                $forecastTwo.appendChild($cardCon);
            }
        }
    })
}

getWeather();
fiveDay();