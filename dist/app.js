(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
// REQUIRES
// let citiesList = require("./city-list");

// foodie stuff:

function getData(file) {
    return $.ajax({
        url: file
    });
}

getData("/restaurants.json")
    .then((restarauntArray) => {
        let restaurantList = restarauntArray.restaurants;
        let ratingArray = [];
        let sortedByRating = ratingArray.sort(function(a, b) {
            return a - b;
        });

        function compare(a, b) {
            const ratingA = a.my_rating;
            const ratingB = b.my_rating;
          
            let comparison = 0;
            if (ratingA < ratingB) {
              comparison = 1;
            } else if (ratingA > ratingB) {
              comparison = -1;
            }
            return comparison;
          }

        console.log("Restaraunt Object, sorted by ratings: ", restarauntArray.restaurants.sort(compare));
        let restarauntByRatingsObj = restarauntArray.restaurants.sort(compare);
        console.log(restarauntByRatingsObj); // <---- Array of objects
        // Poor form AJAX request inside another .then -_____- Figure out how to modularize this....

        function getCityListData(cityListFile) {
            return $.ajax({
                url: cityListFile
            });
        }

        getCityListData("/cities.json")
            .then((citiesArray) => {
                console.log("test");
                console.log(citiesArray.cities);


                for (let i = 0; i < restarauntByRatingsObj.length; i++) {
                    document.getElementById("restaraunts").innerHTML += `${i+1}. ${restarauntByRatingsObj[i].restaurant} <br>   `;
                }

                document.getElementById("citiesSelect").innerHTML += `<option value="all">All Cities</option>`;

                for (let i = 0; i < citiesArray.cities.length; i++) {
                    let cityNames = citiesArray.cities;
                    console.log(citiesArray.cities[i].city);
                    document.getElementById("citiesSelect").innerHTML += `<option value="${citiesArray.cities[i].id}">${citiesArray.cities[i].city}</option>`;
                    document.getElementById("addRestarauntCity").innerHTML += `<option value="${citiesArray.cities[i].id}">${citiesArray.cities[i].city}</option>`;

                }

                let citySelectionIdValue = document.getElementsByTagName("option")[0].getAttribute("value");
                var src = document.getElementById("homePic"); //sets home img container div to a varaiable.

                $("#citiesSelect").change(function() {
                    src.innerHTML = ``; //Eliminates home img tag
                    let e = document.getElementById("citiesSelect");
                    let citySelectionValue = e.options[e.selectedIndex].value;
                    console.log(citySelectionValue);
                    document.getElementById("restaraunts").innerHTML = ``;
                    
                    let dropDownSelection = restarauntByRatingsObj.filter(function(restarauntByRatingsObj) {
                        return restarauntByRatingsObj.city_id === Number(citySelectionValue);
                    });

                    if (citySelectionValue === "all") {
                        console.log("this works");
                        
                        for (let i = 0; i < restarauntByRatingsObj.length; i++) {
                            document.getElementById("restaraunts").innerHTML += `${i+1}. ${restarauntByRatingsObj[i].restaurant} <br>   `;
                        }

                    }
                    else {
                        for (let i = 0; i < dropDownSelection.length; i++) {
                            document.getElementById("restaraunts").innerHTML += `${i+1}. ${dropDownSelection[i].restaurant} <br>   `;
                        }
                    }

                    if (Number(citySelectionValue) === 7) {
                        src.innerHTML = `<img src="/imHome.jpg">`;
                    }
                });

                //Add Restaraunt Functionality:

                let restarauntToAdd = document.getElementById("addRestarauntNameInput");
                let ratingToAdd = document.getElementById("addRatingInput");
                let dateToAdd = document.getElementById("addDateVisitedInput");
                let idToAdd = restarauntByRatingsObj.length + 1;

                $("#submitAddRestarauntBtn").click(function(e){
                    e.preventDefault();
                    let citySelectionToAdd = document.getElementById("addRestarauntCity").options[document.getElementById("addRestarauntCity").selectedIndex];

                    console.log(restarauntByRatingsObj);
                    console.log(citySelectionToAdd.value);

                    // create new object and push it onto restaraunts array

                    let restarauntObjectToAdd = {
                        id: idToAdd,
                        restaurant: restarauntToAdd.value,
                        city_id: Number(citySelectionToAdd.value),
                        date_visited: dateToAdd.value,
                        my_rating: Number(ratingToAdd.value)
                    };

                    restarauntByRatingsObj.push(restarauntObjectToAdd);
                    restarauntByRatingsObj = restarauntByRatingsObj.sort(compare);
                    document.getElementById("restaraunts").innerHTML = ``;

                    for (let i = 0; i < restarauntByRatingsObj.length; i++) {
                        document.getElementById("restaraunts").innerHTML += `${i+1}. ${restarauntByRatingsObj[i].restaurant} <br>   `;
                    }
                    document.getElementById("addRestarauntForm").reset();
                });
        });
    });

    





},{}]},{},[1]);
