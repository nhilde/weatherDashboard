var apiKey = "a9cf9f359b3a6833d6e7eb9ac294d0a2";

let citySearchForm = document.querySelector("#cityForm")
// var citySearch = document.querySelector("#cityInput").value;

var citySearchBtn = $("#citySearchBtn");
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;



var searchHistory = $("#searchHistory");
var clearHistory = $("#clearHistory");

var currentDate = $("#currentDate");
var currentCity = $("#curentCity");

var currentTemp = $("#currentTemp");
var currentHumidity = $("#currentHumidity");
var currentWind = $("#currentWind");
var uvIndex = $("#uvIndex");
var mainIcon = $("#mainIcon");

var forecastTemp1 = $("#forecastTemp1")
var forecastTemp2 = $("#forecastTemp2")
var forecastTemp3 = $("#forecastTemp3")
var forecastTemp4 = $("#forecastTemp4")
var forecastTemp5 = $("#forecastTemp5")

var forecastHumid1 = $("#forecastHumid1")
var forecastHumid2 = $("#forecastHumid2")
var forecastHumid3 = $("#forecastHumid3")
var forecastHumid4 = $("#forecastHumid4")
var forecastHumid5 = $("#forecastHumid5")

var forecastDate1 = $("#forecastDate1")
var forecastDate2 = $("#forecastDate2")
var forecastDate3 = $("#forecastDate3")
var forecastDate4 = $("#forecastDate4")
var forecastDate5 = $("#forecastDate5")

var icon1 = $("#icon1")
var icon2 = $("#icon2")
var icon3 = $("#icon3")
var icon4 = $("#icon4")
var icon5 = $("#icon5")


$(document).ready(function () {
    $("#currentDate").text(moment().format("dddd, MMMM Do"));
});



citySearchForm.addEventListener("submit", function () {
    event.preventDefault();
    var citySearch = document.querySelector("#cityInput").value.trim()
    console.log(citySearch)

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey + "&units=imperial";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + apiKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $("#currentCity").text(data.name + moment().format(" M/D/YY "));
            currentTemp.text(data.main.temp + " ℉")
            currentHumidity.text(data.main.humidity + "%")
            currentWind.text(data.wind.speed + " mph")
            mainIcon.attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            // uvIndex

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

            fetch(uvURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    uvIndex.text(data.current.uvi)

                    if (data.current.uvi <= 2) {
                        uvIndex.addClass("uviGreen")
                    }

                    if (data.current.uvi > 2 && data.current.uvi <= 5) {
                        uvIndex.addClass("uviYellow")
                    }

                    if (data.current.uvi > 5) {
                        uvIndex.addClass("uviRed")
                    }
                })

            
                

        });

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            forecastTemp1.text("Temp: " + data.list[0].main.temp + " ℉")
            forecastTemp2.text("Temp: " + data.list[10].main.temp + " ℉")
            forecastTemp3.text("Temp: " + data.list[18].main.temp + " ℉")
            forecastTemp4.text("Temp: " + data.list[26].main.temp + " ℉")
            forecastTemp5.text("Temp: " + data.list[34].main.temp + " ℉")

            forecastHumid1.text("Humidity: " + data.list[0].main.humidity + "%")
            forecastHumid2.text("Humidity: " + data.list[10].main.humidity + "%")
            forecastHumid3.text("Humidity: " + data.list[18].main.humidity + "%")
            forecastHumid4.text("Humidity: " + data.list[26].main.humidity + "%")
            forecastHumid5.text("Humidity: " + data.list[34].main.humidity + "%")

            // forecastDate1.text(data.list[0].dt)
            console.log(moment(data.list[0].dt_txt))

            forecastDate1.text(moment(data.list[0].dt_txt).format("M/D/YY"))
            forecastDate2.text(moment(data.list[10].dt_txt).format("M/D/YY"))
            forecastDate3.text(moment(data.list[18].dt_txt).format("M/D/YY"))
            forecastDate4.text(moment(data.list[26].dt_txt).format("M/D/YY"))
            forecastDate5.text(moment(data.list[34].dt_txt).format("M/D/YY"))

            icon1.attr("src", "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png")
            icon2.attr("src", "https://openweathermap.org/img/w/" + data.list[10].weather[0].icon + ".png");
            icon3.attr("src", "https://openweathermap.org/img/w/" + data.list[18].weather[0].icon + ".png");
            icon4.attr("src", "https://openweathermap.org/img/w/" + data.list[26].weather[0].icon + ".png");
            icon5.attr("src", "https://openweathermap.org/img/w/" + data.list[34].weather[0].icon + ".png");
        });


        localStorage.setItem("city", citySearch)


})

