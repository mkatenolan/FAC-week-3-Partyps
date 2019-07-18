var button = document.querySelector("#button-submit");
var buttonClear = document.querySelector("#button-clear");

// Search Functionality
button.addEventListener("click", function() {
  var searchInput = document.querySelector("#search-query").value;
  recipeCall(searchInput);
  deezerCall(searchInput);
});

// Clear Functionality
buttonClear.addEventListener("click", function() {
  var searchInput = document.querySelector("#search-query");
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
      var recipeImg = document.querySelector("#recipe-img");
      var recipeIngredients = document.querySelector("#recipe-ingredients");
      var recipeLink = document.querySelector("#recipe-link");
      var random = chooseRandom(recipeObj.results);
      var ingredients = random.ingredients.split(",");

      function listCreation(str) {
        var listItem = document.createElement("li");
        listItem.textContent = str;
        recipeIngredients.appendChild(listItem);
      }

      function addIngredients() {
        recipeIngredients.textContent = "";
        ingredients.forEach(c => listCreation(c));
      }

      if (random.thumbnail) {
        recipeImg.src = random.thumbnail;
      } else {
        recipeImg.src =
          "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
      }
      recipeLink.textContent = random.title;
      recipeLink.href = random.href;
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

      var playlistTitle = randomPlaylist.title; //  Returns selected playlist's title
      var playlistImage = randomPlaylist.picture_medium; //  Returns selected playlist's cover
      var playlistLink = randomPlaylist.link;

      //  var tracklistLink = randomPlaylist.tracklist; Returns playlist tracklist link > for second call
      console.log(randomPlaylist);
      console.log(playlistLink);
      //console.log(tracklistLink);
      var image = document.querySelector("#playlist-img");
      var playlist = document.querySelector("#playlist-songs");

      playlist.textContent = "Suggested playlist: " + playlistTitle;
      image.src = playlistImage;
      playlist.href = playlistLink;
    }
  };

  xhr.open("GET", createURL(url, searchTerms), true);
  xhr.send();
}

// SECOND COSMIC API CALL TO NEW GALAXY

function deezerCallTwo(tracklistLink) {
  var xhs = new XMLHttpRequest();
  xhs.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var parsedTracklist = JSON.parse(xhs.responseText);

      //console.log(parsedTracklist);
    }

    xhs.open("GET", tracklistLink, true);
    xhs.send();
  };
}
