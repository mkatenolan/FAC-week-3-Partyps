
var button = document.querySelector(".search-btn");

button.addEventListener("click", function() {
  var searchInput = document.querySelector(".search-query").value;
  (function() {
    var xhr = new XMLHttpRequest();

    var url =
      "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?q=" +
      searchInput;

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var recipeObj = JSON.parse(xhr.responseText);

        var recipeDrop = document.querySelector(".recipe");
        var response = recipeObj;

        var random = chooseRandom(response.results);

        recipeDrop.textContent =
          random.title + " & ingr: " + random.ingredients;
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


(function() {
  var testSearch = "sick tunes"
  var searchTerms = testSearch.split(' ').join('+')
  var url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/playlist?q=${searchTerms}`
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var parsedContent = JSON.parse(xhr.responseText);


        var totalResults = parsedContent.total // Returns number of results from the search

        var singlePlaylist = chooseRandom(parsedContent.data)
        // var playlistTitle = parsedContent.data[randomId].title
        var playlistImage = singlePlaylist.picture_xl

        console.log(singlePlaylist);

      }
  };
  xhr.open("GET", url, true);
  xhr.send();

})()
