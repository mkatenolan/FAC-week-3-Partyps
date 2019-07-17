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
