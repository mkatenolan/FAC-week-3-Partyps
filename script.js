var button = document.querySelector("#button-submit");
var buttonClear = document.querySelector("#button-clear");

button.addEventListener("click", function() {
  var searchInput = document.querySelector("#search-query").value;
  (function() {
    var xhr = new XMLHttpRequest();

    var url =
      "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?q=" +
      searchInput;

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
        console.log(random);
        recipeLink.textContent = random.title;
        recipeLink.href = random.href;

        addIngredients();
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  })();
  deezerCall();
});

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * 10)];
}

// DEEZER API CALL

function deezerCall() {
  var searchInput = document.querySelector("#search-query").value;
  var searchTerms = searchInput.split(" ").join("+");
  var url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/playlist?q=${searchTerms}`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var parsedContent = JSON.parse(xhr.responseText);
      var totalResults = parsedContent.total; //  Returns number of results from the search
      var randomPlaylist = chooseRandom(parsedContent.data); //  Returns random playlist out of top 10

      var playlistTitle = randomPlaylist.title; //  Returns selected playlist's title
      var playlistImage = randomPlaylist.picture_medium; //  Returns selected playlist's cover
      var playlistLink = randomPlaylist.link;

      //  var tracklistLink = randomPlaylist.tracklist; Returns playlist tracklist link > for second call
      console.log(randomPlaylist);
      console.log(playlistLink);
      //console.log(tracklistLink);

      var title = document.querySelector("#playlist-title");
      var image = document.querySelector("#playlist-img");
      var playlist = document.querySelector("#playlist-songs");

      playlist.textContent = "Suggested playlist: " + playlistTitle;
      image.src = playlistImage;
      playlist.href = playlistLink;
    }
  };

  xhr.open("GET", url, true);
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


buttonClear.addEventListener("click", function() {
  var searchInput = document.querySelector("#search-query");
  searchInput.value = "";
});
