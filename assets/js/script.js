/*
Establish a function that FETCHES data from a weather api
This function will be a CLICK function that activates when the user hits search
Parse that info into data that will then be distributed into specific information
That information will detail the city, date, temperature, wind, humidity, and UV index for the CURRENT date
Below that information will be the same data across 5 additional days
The 5 day forecast will be smaller in size (Small boxes) and contain image icons correlated to the weather expected fro that day (icons)
The user will be able to search by different city's
The city's will be put into a history bank to be referenced back to even after further searches
*/

// Establish my key as a variable so as to not constantly type it out for every instance it is needed
// Establish the search/submit button as a variable simply to call on it for the event listener
var $key = `798aa8a41a70442411dba5a35b70bb2d`;
var $submit = document.getElementById("submit");

// The first function to be established is the one that gets the current days weather
// Utilize a fetch call to get the information from the openweather api
// With that info, fill out the first container with todays weather info
// The info to utilize will be the temp, wind, humidity, and uv index
function getWeather(search) {
    var $api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${$key}&units=imperial`;

    fetch($api)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var $cityName =document.getElementById("city-name")
        $cityName.textContent = "Showing Weather For: ";

        var $today = document.getElementById("today");
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

        // A separate fetch call must be made for uv index as the initial call didn't contain such info
        // Provide indicator of whether the uv index is favorable for the given day
        fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${$key}&lat=${data.coord.lat}&lon=${data.coord.lon}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            $uvIndex.textContent = `UV Index: ${data.value}`;

            if (data.value < 3){
                $uvIndex.className = "badge bg-secondary bg-success fs-5";
            } else if (data.value < 7) {
                $uvIndex.className = "badge bg-secondary bg-warning fs-5";
            } else {
                $uvIndex.className = "badge bg-secondary bg-danger fs-5";
            }
        });

        // Final step is to apply the weather forecast icon associated with the days weather to the card info
        var $weatherImg = document.createElement("img");
        $weatherImg.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

        $("#city-name").append(data.name);
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

// The second function to be established is that of the 5 day forecast
// Much similar to the first function, a fetch call will be made to gather the information from api
// Structure of info is to be set up similarly to the first card, however set across 5 additional and smaller cards
function fiveDay(search) {
    var $fiveHead = $("#five-head");

    $fiveHead.removeClass();

    var $forecast = document.getElementById("forecast");

    $forecast.innerHTML = "";

    var $api = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${$key}&units=imperial`;

    fetch($api)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        var $forecastTwo = document.getElementById("forecast");

        // Establish for loop with specific parameters to get 5 days of weather
        // Failure to set up specific parameters resulted in weather forecast for every 3 hours
        // Start at index 6 and get info from every additional 8 indexes
        // This provides the weather information for every other day at exactly noon
        // Noon is chosen as that is GENERALLY considered to be the highest temp point for the day
        for (var i=6; i < data.list.length; i+=8) {
            console.log(data);
            var $cardHead = document.createElement('h5');
            $cardHead.className = "card-title text-left";
            $cardHead.textContent = moment(data.list[i].dt_txt).format("M/D/YYYY");// Keep messing with sizing settings to get it JUST right

            var $cardCon = document.createElement('div');
            $cardCon.className = "card col-12 col-md-2 m-2 bg-success text-white";

            var $card = document.createElement('div');
            $card.className = "card-body p-2";

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
    })
}

// The third function to be established is that of the search the user inputs
// Whatever city is entered, that value is captured and sent into the previous two functions to output the weather info for whichever specific location
// Additional functions to be added are to add the search to local storage and to set the city in a city history so as to be recalled upon if so desired
function searchCity() {
    var $lookup = document.getElementById("city").value;
    if (document.getElementById("city").value !== ""){
        getWeather($lookup);
        fiveDay($lookup);
        setSearch($lookup);
        storeSearch();

        document.getElementById("city").value = "";
    }
}

// Establish an additional variable to simply check if there are any cities stored in local storage
var searchMemory;
    if (JSON.parse(localStorage.getItem("history")) != null){        
        searchMemory = JSON.parse(localStorage.getItem("history"));
    } else {
        searchMemory = [];
    }

// The fourth function is to set the search value the user input into local memory
function setSearch(search) {
    if (!searchMemory.includes(search)) {
        searchMemory.push(search);
        localStorage.setItem("history", JSON.stringify(searchMemory));
    }
}

// The fifth function is to apply the city that is searched into the searched cities list
function storeSearch() {
    while (document.getElementById("history").firstChild) {
        document.getElementById("history").removeChild(document.getElementById("history").firstChild);
    }
    citiesList();
}

// The sixth function is to populate a list in accordance to the users cities searched
// The cities will be given event listeners so as to be clicked again should the user wish to revisit the information related to a city already searched for
function citiesList() {
    searchMemory.forEach(function(search) {
        var $city = document.createElement("li");
        $city.className = "list-group-item";
        $city.textContent = search;

        $city.addEventListener("click", function(event) {
            getWeather(event.target.textContent);
            fiveDay(event.target.textContent);
        });
        document.getElementById("history").appendChild($city);
    });
}

// Invoke citiesList function to simply have the list of searched cities populate on page load should there be any cities stored in local data
// Have an event listener for when the user clicks on search/submit
citiesList();
$submit.addEventListener("click", searchCity);