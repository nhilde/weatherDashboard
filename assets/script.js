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
            $("#currentCity").text(data.name + moment().format(" M/D/YY"))
            currentTemp.text(data.main.temp + " ℉")
            currentHumidity.text(data.main.humidity + "%")
            currentWind.text(data.wind.speed + " mph")
            // uvIndex


        });

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);





        });
    
    



