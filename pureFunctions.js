//Choose a random element in an array
function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * 10)];
}

//Modifies search term
function createSearchTerm(str) {
  return str
    .trim()
    .split(" ")
    .join("+");
}

function createURL(URL, str) {
  return "https://cors-anywhere.herokuapp.com/" + URL + str;
}

module.exports = { chooseRandom, createSearchTerm, createURL };
