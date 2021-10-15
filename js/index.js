import { RECIPES } from "./data/recipesData.js";
import { DataFetcher } from "./data/dataFetcher.js";
import { HomePageBuilder } from "./pages/homePageBuilder.js";

const dataFetcher = new DataFetcher(RECIPES);
// console.log('dataFetcher : ', dataFetcher);

const recipesList = dataFetcher.getRecipesList();
// console.log('recipesList : ', recipesList);

new HomePageBuilder(recipesList).render();

// SEARCH ALGORITHM PERFORMANCE :
measureAlgorithmPerformance();

function measureAlgorithmPerformance() {
  // with a request corresponding to 4 recipes:
  const TEST_USER_REQUEST_1 = {
    userInput: "choco",
    joinedBadges: "sucre beurre",
  };
  // with a request corresponding to no recipe:
  const TEST_USER_REQUEST_2 = {
    userInput: "choco",
    joinedBadges: "maïs basilic",
  };
  const TESTS_QUANTITY = 500;

  const testStarting = Date.now();

  let searchResult1, searchResult2;

  for (let _ = 0; _ < TESTS_QUANTITY; _++) {
    searchResult1 = recipesList.search(TEST_USER_REQUEST_1);
    searchResult2 = recipesList.search(TEST_USER_REQUEST_2);
  }

  const testEnding = Date.now();

  const testDuration = testEnding - testStarting;

  console.log(
    `${2 * TESTS_QUANTITY} recherches réalisées en ${testDuration} ms`
  );
}
