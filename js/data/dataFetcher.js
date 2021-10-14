import { removeStopWords } from "../utils/utilitis.js";
import { Recipe, RecipesList } from "./recipe.js";

export class DataFetcher {
  constructor(dataSource) {
    this._dataSource = dataSource;
  }

  getRecipesList() {
    const recipes = [];

    for (let recipe of this._dataSource) {
      recipes.push(
        new Recipe(
          recipe.id,
          recipe.name,
          recipe.servings,
          recipe.ingredients,
          recipe.time,
          recipe.description,
          recipe.appliance,
          recipe.ustensils
        )
      );
    }

    return new RecipesList(recipes);
  }
}

function extractKeywordsFromRecipe(recipe) {
  let recipeWords = `${recipe.nameWithoutAccent} ${recipe.joinedIngredientsWithoutAccent} ${recipe.applianceNameWithoutAccent} ${recipe.joinedUstensilsWithoutAccent} ${recipe.descriptionWithoutAccent}`;

  recipeWords = recipeWords.split(" ");

  return removeStopWords(recipeWords);
}

function addRecipeKeywordsToHashTable(recipe, recipeKeywords, hashTable) {
  for (let keyword of recipeKeywords) {
    for (let i = 1; i <= keyword.length; i++) {
      const troncatedKeyword = keyword.slice(0, i);

      if (troncatedKeyword in hashTable) {
        hashTable[troncatedKeyword].add(recipe);
      } else {
        hashTable[troncatedKeyword] = new Set([recipe]);
      }
    }
  }

  return hashTable;
}

export function buildHashTableForSearchingRecipes(recipesList) {
  let hashTableForSearchingRecipes = {};

  for (let recipe of recipesList.recipes) {
    const recipeKeywords = extractKeywordsFromRecipe(recipe);

    hashTableForSearchingRecipes = addRecipeKeywordsToHashTable(
      recipe,
      recipeKeywords,
      hashTableForSearchingRecipes
    );
  }

  return hashTableForSearchingRecipes;
}
