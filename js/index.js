import { RECIPES } from "./data/recipesData.js";

import { FetchRecipes } from "./data/fetchRecipes.js";

import { removeStopWords } from "./utils/utilitis.js";

const dataFetcher = new FetchRecipes(RECIPES);
const recipesList = dataFetcher.getListRecipe();

function makeHashTableForSearchingRecipes(recipesList) {
  const hashTableSearchingRecipes = {};

  for (let recipe of recipesList.recipes) {
    let recipeWords = `${recipe.nameFilterWithNoAccents}`;

    recipeWords = recipeWords.split(" ");

    const recipeKeyWords = removeStopWords(recipeWords);

    for (let keyword of recipeKeyWords) {
      for (let i = 1; i <= keyword.length; i++) {
        const truncatedKeyword = keyword.slice(0, i);

        if (truncatedKeyword in hashTableSearchingRecipes) {
          hashTableSearchingRecipes[truncatedKeyword].add(recipe);
        } else {
          hashTableSearchingRecipes[truncatedKeyword] = new Set([recipe]);
        }
      }
    }
  }
  return hashTableSearchingRecipes
}

const HASH_TABLE_FOR_SEARCHING_RECIPES =
  makeHashTableForSearchingRecipes(recipesList);

console.log(HASH_TABLE_FOR_SEARCHING_RECIPES);

measureAlgorithmPerformance();

function measureAlgorithmPerformance() {
  const TEST_REQUEST_1 = {
    userInput: "coco",
    joinBadges: "sucre beurre"
  };

  const TEST_REQUEST_2 = {
    userInput: "ananas",
    joinBadges: "maîs basilic"
  };

  const TESTS_QUANTITY =1_000;

  let TEST_STARTING = Date.now();
  // console.log(TEST_STARTING)

  let searchTestResult1, searchTestResult2;

  for (let _ = 0; _ < TESTS_QUANTITY; _++) {
    searchTestResult1 = recipesList.search(
      TEST_REQUEST_1,
      HASH_TABLE_FOR_SEARCHING_RECIPES
    );
    searchTestResult2 = recipesList.search(
      TEST_REQUEST_2,
      HASH_TABLE_FOR_SEARCHING_RECIPES
    );
  }

  let TEST_ENDING = Date.now();
  // console.log(TEST_ENDING)

  const DURATION = TEST_ENDING - TEST_STARTING;

  console.log(
    `${2 * TESTS_QUANTITY} recherches réalisées en ${DURATION} ms`
  );
}
