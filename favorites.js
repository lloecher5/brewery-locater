const favoritesList = document.querySelector(".favorites");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  //gets favorites from the local storage and then converts to an array
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  //creates an HTML element for each brewery in the local storage
  const favoritesArray = favorites.map((favorite) => {
    return `<div class="card clear" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${favorite.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${favorite.city}, ${favorite.state}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${favorite.street}</h6>
      <h6 class="card-subtitle mb-2 text-muted">phone: ${favorite.phone}</h6>
      <a href="${favorite.website_url}" class="card-link">Link to website</a>
      <button class="remove">Remove </button>
      
    </div>
  </div>`;
  });

  //joins array into a string
  favoritesList.innerHTML = favoritesArray.join("");
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
