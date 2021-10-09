import { RECIPES } from "./data/recipesData.js";
import { FetchRecipes } from "./data/fetchRecipes";
import { removeStopWords } from "./utils/utilitis";

const dataFetcher = new FetchRecipes(RECIPES);
const recipesList = dataFetcher.getListRecipe();

function makeHashTableForSearchingRecipes(recipesList) {
  const hashTableSearchingRecipes = {};

  for (let recipe of recipesList.recipesHash) {
    let recipeWords = `${recipe.nameFilterWithNoAccents}`;

    recipeWords = recipeWords.split(" ");

    const recipeKeyWords = removeStopWords(recipeWords);

    for (let keyword of recipeKeyWords) {
      for (let i = 1; i <= keyword.length; i++) {
        const troncatedKeyword = keyword.slice(0, 1);
      }
    }
  }
  return hashTableSearchingRecipes
}

const HASH_TABLE_FOR_SEARCHING_RECIPES =
  makeHashTableForSearchingRecipes(recipesList);


console.log(HASH_TABLE_FOR_SEARCHING_RECIPES);
