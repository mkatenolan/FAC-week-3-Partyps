// Define Buttons & Default for Undefined
var button = document.querySelector("#button-submit");
var buttonClear = document.querySelector("#button-clear");
var found = true;

// Recipe Elements
var recipeImg = document.querySelector("#recipe-img");
var recipeIngredients = document.querySelector("#recipe-ingredients");
var recipeLink = document.querySelector("#recipe-link");

// Playlist Elements
var image = document.querySelector("#playlist-img");
var playlist = document.querySelector("#playlist-songs");

//Search Element
var searchInput = document.querySelector("#search-query");

// Search Functionality
button.addEventListener("click", function() {
  var searchValue = searchInput.value;
  console.log(searchValue);
  if (searchValue == "") {
    alert("Please put in a party theme!");
  } else {
    recipeCall(searchValue);
    deezerCall(searchValue);
  }
});

// Clear Functionality
buttonClear.addEventListener("click", function() {
  searchInput.value = "";
});

// RECIPE PUPPY API CALL
function recipeCall(searchTerm) {
  var xhr = new XMLHttpRequest();
  var url = "http://www.recipepuppy.com/api/?q=";
  var searchTerms = createSearchTerm(searchTerm);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var recipeObj = JSON.parse(xhr.responseText);
      var randomRecipe = chooseRandom(recipeObj.results); // Choose a random result

      found = true;
      // Check if there are no results
      if (randomRecipe == undefined) {
        alert("Please put in a proper party theme!");

        searchInput.value = "";
        found = false;
      }
      // Split ingredients list into items
      var ingredients = randomRecipe.ingredients.split(",");

      // Function for creating list items
      function listCreation(str) {
        var listItem = document.createElement("li");
        listItem.textContent = str;
        recipeIngredients.appendChild(listItem);
      }
      // Function to add each ingredient
      function addIngredients() {
        recipeIngredients.textContent = "";
        ingredients.forEach(c => listCreation(c));
      }

      // Check for thumbnail and resort to default if unavailable
      if (randomRecipe.thumbnail) {
        recipeImg.src = randomRecipe.thumbnail;
      } else {
        recipeImg.src = "Images/default-food.png";
      }
      recipeLink.textContent = randomRecipe.title;
      recipeLink.href = randomRecipe.href;
      dropdownButton.style.display = "block";
      addIngredients();
    }
  };
  xhr.open("GET", createURL(url, searchTerms), true);
  xhr.send();
}

// DEEZER API CALL

function deezerCall(searchTerm) {
  var searchTerms = createSearchTerm(searchTerm);
  var url = `https://api.deezer.com/search/playlist?q=`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var parsedContent = JSON.parse(xhr.responseText);
      var randomPlaylist = chooseRandom(parsedContent.data); //  Returns random playlist out of top 10

      //  var tracklistLink = randomPlaylist.tracklist; Returns playlist tracklist link > for second call

      if (found) {
        playlist.textContent = randomPlaylist.title;
        image.src = randomPlaylist.picture_medium;
        playlist.href = randomPlaylist.link;
      }
    }
  };

  xhr.open("GET", createURL(url, searchTerms), true);
  xhr.send();
}

/* HIDE AND DISPLAY INGREDIENTS */

var dropdownButton = document.querySelector("#dropdown");
var recipeContainer = document.querySelector("#recipe-ingredients");

dropdownButton.addEventListener("click", function() {
  if (recipeContainer.style.display === "none") {
    recipeContainer.style.display = "block";
  } else {
    recipeContainer.style.display = "none";
  }
});
