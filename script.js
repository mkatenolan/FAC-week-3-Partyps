var button = document.querySelector("#button-submit");

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

        var recipeTitle = document.querySelector("#recipe-title");
        var recipeImg = document.querySelector("#recipe-img");
        var recipeIngredients = document.querySelector("#recipe-ingredients");

        function listCreation(str) {
          var listItem = document.createElement("li");
          listItem.textContent = str;
          document.getElementById("recipe-ingredients").appendChild(listItem);
        }
        var random = chooseRandom(recipeObj.results);
        if (random.thumbnail) {
          recipeImg.src = random.thumbnail;
        } else {
          recipeImg.src =
            "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
        }

        var ingredients = random.ingredients.split(",");
        recipeTitle.textContent = random.title;

        ingredients.forEach(c => listCreation(c));
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  })();
});

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * 10)];
}

// DEEZER API CALL

function deezerCall() {
  var testSearch = "sick tunes";
  var searchTerms = testSearch.split(" ").join("+");
  var url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/playlist?q=${searchTerms}`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var parsedContent = JSON.parse(xhr.responseText);
      var totalResults = parsedContent.total; //  Returns number of results from the search
      var randomPlaylist = chooseRandom(parsedContent.data); //  Returns random playlist out of top 10

      var playlistTitle = randomPlaylist.title; //  Returns selected playlist's title
      var playlistImage = randomPlaylist.picture_medium; //  Returns selected playlist's cover
      //
      var tracklistLink = randomPlaylist.tracklist; //  Returns playlist tracklist link > for second call
      console.log(randomPlaylist);
      console.log(tracklistLink);
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

deezerCall();
