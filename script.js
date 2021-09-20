const form = document.querySelector("form");
const input = document.querySelector(".form-control");
const mapDisplay = document.querySelector(".map");
const favoritesLink = document.querySelector(".favorite-list");

const addMarker = (name, street, link, coordinates, map) => {
  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: "images/beer-emoji.jpg",
  });
  const infoWindow = new google.maps.InfoWindow({
    content: `<h6>${name} </h6>
               <p>${street}</p>
               <a href = "${link}" target ="_blank"> Link to website</a>
               <button style =" border-radius: 10%; display: block; margin-top: 10px; color: white; background-color: blue;" class="save" data-name ="${name}">Add to favorites</button>`,
  });
  //adds event listener to each marker, that opens it up when clicked
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
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
        console.log(breweries);

        //creates an array of just the coordinates for each brewery
        const coordinates = breweries.map((brewery) => {
          return [brewery.latitude, brewery.longitude];
        });

        //sets what the initial map looks like
        const options = {
          zoom: 12,
          center: {
            //picked coordinates from one of the breweries to focus the map. Need to think of a better way to do this.
            lat: Number(coordinates[3][0]),
            lng: Number(coordinates[3][1]),
          },
        };

        //creates map
        const map = new google.maps.Map(
          document.querySelector(".map"),
          options
        );

        //for each brewery, creates a marker on the map.

        breweries.forEach((brewery) => {
          console.log(brewery);
          if (brewery.latitude !== null && brewery.longitude !== null) {
            addMarker(
              brewery.name,
              brewery.street,
              brewery.website_url,
              {
                lat: Number(brewery.latitude),
                lng: Number(brewery.longitude),
              },
              map
            );
          }
        });
        //function that saves breweries to list
        const saveToFavorites = (breweryName) => {
          //gives you all the brewery information that matches the target name
          const brewery = breweries.find((currentBrewery) => {
            return currentBrewery.name === breweryName;
          });

          let favoriteListJSON = localStorage.getItem("favorites");

          //converts the watchlist object from JSON to an array
          let favoriteList = JSON.parse(favoriteListJSON);

          //if favorite list is empty, create new array
          if (!favoriteList) {
            favoriteList = [];
          }

          //push selected brewery into the array
          favoriteList.push(brewery);

          //converts array back into JSON
          favoriteListJSON = JSON.stringify(favoriteList);

          //adds the brewery to the local storage
          localStorage.setItem("favorites", favoriteListJSON);
        };

        //add event listener to add buttons on the info windows
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("save")) {
            const breweryName = e.target.dataset.name;
            alert(`${breweryName} has been added to your favorites`);
            saveToFavorites(breweryName);
            //display anchor tag for favorites list
            favoritesLink.style.display = "block";
          }
        });
      });
  });
}
