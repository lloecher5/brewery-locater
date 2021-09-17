const form = document.querySelector("form");
const input = document.querySelector(".form-control");
const mapDisplay = document.querySelector(".map");

const addMarker = (coordinates, map) => {
  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
  });
};

//function from google maps API
function initMap() {
  //add event listener to the form that triggers when submit button is clicked
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //store the input value into a variable
    const city = input.value;
    //fetches data with the city typed into input bar
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //changes the display of the map from none to block. Map is originally set to display of none
        mapDisplay.style.display = "block";
        //stores the array of data to a variable
        const breweries = data;

        //creates an array of just the coordinates for each brewery
        const coordinates = breweries.map((brewery) => {
          return [brewery.latitude, brewery.longitude];
        });

        //sets what the initial map looks like
        const options = {
          zoom: 12,
          center: {
            //picked coordinates from one of the breweries to focus the map. Need to think of a better way to do this.
            lat: Number(coordinates[5][0]),
            lng: Number(coordinates[5][1]),
          },
        };

        //creates map
        const map = new google.maps.Map(
          document.querySelector(".map"),
          options
        );

        //for each brewery, creates a marker on the map.
        breweries.forEach((brewery) => {
          breweries.forEach((brewery) => {
            addMarker(
              { lat: Number(brewery.latitude), lng: Number(brewery.longitude) },
              map
            );
          });
        });
      });
  });
}
