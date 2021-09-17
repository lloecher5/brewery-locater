fetch("https://api.openbrewerydb.org/breweries?by_city=san_diego")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log("hi");
  });
