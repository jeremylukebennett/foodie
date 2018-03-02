"use strict";

console.log("test");

// Joke/Punchline AJAX:

function getData(file) {
    return $.ajax({
        url: file
    });
}

getData("https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke")
    .then((jokeArray) => {
        console.log(jokeArray);

        let joke = jokeArray.setup;
        let jokePunchline = jokeArray.punchline;

        console.log(joke);
        console.log(jokePunchline);

        // $( "div.demo-container" ).html(joke);


        $("#joke").text(joke);
        $("#punchline").text(jokePunchline).hide();
        $("button").click(function(){
        $("#punchline").text(jokePunchline).show();

        });


        // for (var i = 0; i < joke.length; i++) {
        //     console.log(joke[i].setup);
        // }

        // console.log(joke[0]);
        // console.log(joke[0].setup);
    });








    // 1. Make an asynchronous GET request to the following URL: https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke. 
    // 2. Console log the setup and punchline













let restarauntRequest = new XMLHttpRequest();

restarauntRequest.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
        let restarauntArray = JSON.parse(this.responseText);
        console.log(restarauntArray);

        let restaurantList = restarauntArray.restaurants;

        for (var i = 0; i < restaurantList.length; i++) {
            console.log(restaurantList[i].restaurant);
        }

        console.log(restaurantList[0]);
        console.log(restaurantList[0].restaurant);
    }
    else {
        console.log("error");
    }
};







// foodie stuff:

// function getData(file) {
//     return $.ajax({
//         url: file
//     });
// }

// getData("/restaurants.json")
//     .then((restarauntArray) => {
//         console.log(restarauntArray);

//         let restaurantList = restarauntArray.restaurants;
//         let ratingArray = [];
//         for (var i = 0; i < restaurantList.length; i++) {
//             console.log(restaurantList[i].restaurant);

//             let restarauntNames = restaurantList[i].restaurant;
//             let ratings = restaurantList[i].my_rating;

//             // $("#restaraunts").text(restaurantList[i].restaurant);
//             document.getElementById("restaraunts").innerHTML += `${restarauntNames} `;
//             document.getElementById("my_rating").innerHTML += `${ratings} `;

//             ratingArray[i] = restaurantList[i].my_rating;

//         }
//         console.log("Restaraunt Ratings" + ratingArray);

//         let sorted = ratingArray.sort(function(a, b) {
//             return a - b;


//         });

        
//         console.log("sorted?" + sorted);

//         console.log("Restaraunt Ratings" + ratingArray);






//     });


// // 



// // $("#testID").hide();

// // $test.hide();

// console.log("testing now");



// // restarauntRequest.open('GET', '/restaurants.json');
// // restarauntRequest.send();

// // console.log(restarauntRequest.responseText);