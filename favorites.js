const favoriteList = document.querySelector(".favorites-list");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  //gets favorites from the local storage and then converts to an array
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  //creates an HTML element for each brewery in the local storage
  const favoritesArray = favorites.map((favorite) => {
    return `<li class="clear" >
    <div class ="item">
    <p> ${favorite.name} </p>
    <button class="remove">Remove </button>
    </div>
    </li>`;
  });

  //joins array into a string
  favoriteList.innerHTML = favoritesArray.join("");
});

//allows you to remove an element from the favorites list
document.addEventListener("click", (e) => {
  //   e.preventDefault();
  if (e.target.classList.contains("remove")) {
    const target = document.querySelector(".clear");
    console.log(target);
    localStorage.removeItem(target);
    target.remove();
  }
});
