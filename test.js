const test = require("tape");
const {
  chooseRandom,
  createSearchTerm,
  createURL
} = require("./pureFunctions.js");

test("Tape is working", function(t) {
  t.pass("tape is working");
  t.end();
});

test("Return a random number between 0 and 10", function(assert) {
  const actual = typeof chooseRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const expected = "number";

  assert.equal(actual, expected, "Function should return a number");
  assert.end();
});

test("Turn space into plus signs within a string", function(assert) {
  const actual = createSearchTerm(" tomato sauce with cream");
  const expected = "tomato+sauce+with+cream";

  assert.equal(
    actual,
    expected,
    "Function should return a string without spaces"
  );
  assert.end();
});

test("creates URL", function(assert) {
  const actual = createURL("text", "searchTerm");
  const expected = "https://cors-anywhere.herokuapp.com/textsearchTerm";

  assert.equal(actual, expected, "Function should return a url");
  assert.end();
});
