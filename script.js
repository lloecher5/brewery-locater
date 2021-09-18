
//  ------Our API------
// https://api.openbrewerydb.org/breweries?by_city=

fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD0519rk7q7xeUSCqHWKYk0WkL2FYk_ojc")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log("test");
    });