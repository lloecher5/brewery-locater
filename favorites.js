const favoritesList = document.querySelector(".favorites");

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    //gets favorites from the local storage and then converts to an array
    const favorites = JSON.parse(localStorage.getItem("favorites"));
        console.log(favorites)
    //creates an HTML element for each brewery in the local storage
    const favoritesArray = favorites.map((favorite) => {
        return `<div class="card clear" data-name = "${favorite.name}" style=" background-color: #f2c025; width: 18rem;">
        <img class="card-img-top" src="https://images.unsplash.com/photo-1555658636-6e4a36218be7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="Card image cap">
    <div class="card-body d-flex flex-column ">
    <a style ="text-decoration: none;" href="${favorite.website_url}" target="_blank" class="card-link">
      <h5 class="card-title">${favorite.name}</h5>
      </a>
      <h6 class="card-subtitle mb-2 text-muted">${favorite.city}, ${favorite.state}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${favorite.street}</h6>
      <h6 class="card-subtitle mb-2 text-muted">phone: ${favorite.phone}</h6>
      
      <button class="remove btn btn-outline-danger  mt-auto ">Remove </button>
      
    </div>
  </div>
  `;
    });

    //joins array into a string
    favoritesList.innerHTML = favoritesArray.join("");
});

//allows you to remove an element from the favorites list
document.addEventListener("click", (e) => {
    //   e.preventDefault();
    if (e.target.classList.contains("remove")) {
        const target = document.querySelector(".clear");

        //removing element from local storage and HTML

        //First, get the current data in the local storage and turn it into an array
        let favoriteList = JSON.parse(localStorage.getItem("favorites"));

        //find the object that you want to remove. This will return the object that matches the name of the card where the remove button is clicked
        const elementRemoved = favoriteList.find((element) => {
            return element.name === target.dataset.name;
        });

        //loop through the local storage. If the name matches the name of object that you want to remove, splice that object from the array
        for (let i = 0; i < favoriteList.length; i++) {
            if (favoriteList[i].name === elementRemoved.name) {
                favoriteList.splice(i, 1);
            }
        }

        //turn the local storage array back into JSON
        favoriteList = JSON.stringify(favoriteList);
        //Reset the local storage to the new JSON object that has removed the desired item
        localStorage.setItem("favorites", favoriteList);
        //Remove HTML
        target.remove();
    }
});

    // initialize jQuery document ready
jQuery(document).ready(function ($) {
    // once the document is ready in the DOM this function will run
    let thehours = new Date().getHours();
    // use the built in time class and convert hours of the day into (0-23)
    if (thehours >= 0 && thehours < 17) {
    // jQuery captures the "main" id and add's a class that we will manipulate in css
        $("#main").addClass("day");
        // repeate the process if its later in the day
    } else if (thehours >= 17 && thehours < 24) {
        $("#main").addClass("night");
    }
});