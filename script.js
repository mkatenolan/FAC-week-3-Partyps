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

        var random = chooseRandom(recipeObj.results);

        recipeTitle.textContent = random.title;
        recipeImg.src = random.thumbnail;
        recipeIngredients.textContent = random.ingredients;
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  })();
});

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * 10)];
}
