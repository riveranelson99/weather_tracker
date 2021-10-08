// Establish a function that FETCHES data from a weather api
// This function will be a CLICK function that activates when the user hits search
// Parse that info into data that will then be distributed into specific information
// That information will detail the city, date, temperature, wind, humidity, and UV index for the CURRENT date
// Below that information will be the same data across 5 additional days
// The 5 day forecast will be smaller in size (Small boxes) and contain image icons correlated to the weather expected fro that day (icons)
// The user will be able to search by different city's
// The city's will be put into a history bank to be referenced back to even after further searches
var $weatherServer = 'url';

function getWeather () {
    fetch ()
    .this(function() {
        return STEVE.json();
    })
}

button.on("click", getWeather);