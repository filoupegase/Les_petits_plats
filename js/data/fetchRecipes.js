import { Recipe } from "./recipe.js";
import { RecipeList } from "./recipeList.js";
import { removeStopWords } from "../utils/utilitis.js";

export class FetchRecipes {
  constructor(sourceData) {
    this._sourceData = sourceData;
  }

  getListRecipe() {
    const recipes = [];

    for (let recipe of this._sourceData) {
      recipes.push(new Recipe(
          recipe.id,
          recipe.name,
          recipe.cover,
          recipe.altText,
          recipe.servings,
          recipe.ingredients,
          recipe.time,
          recipe.description,
          recipe.appliance,
          recipe.ustensils
        )
      );
    }

    return new RecipeList(recipes);
  }
}

function extractKeywordsFromRecipe(recipe) {
  let recipeWords = `${recipe.nameFilterWithNoAccent} ${recipe.joinedIngredientsWithNoAccent} ${recipe.applianceNameWithNoAccent} ${recipe.joinedUstensilsWithNoAccent} ${recipe.descriptionWithNoAccent}`

  recipeWords = recipeWords.split(" ");

  return removeStopWords(recipeWords);
}

function pushRecipeKeywordsToHashTable(recipe, recipeKeywords, hashTable) {
  for (let keyword of recipeKeywords) {
    for (let i = 1; i <= keyword.length; i++) {
      const truncatedKeyword = keyword.slice(0, i);

      if (truncatedKeyword in hashTable) {
        hashTable[truncatedKeyword].add(recipe);
      } else {
        hashTable[truncatedKeyword] = new Set([recipe]);
      }
    }
  }

  return hashTable;
}

export function buildHashTableForSearchingRecipes(recipesList) {
  let hashTableForSearchingRecipes = {};

  for (let recipe of recipesList.recipes) {
    const recipeKeywords = extractKeywordsFromRecipe(recipe);

    hashTableForSearchingRecipes = pushRecipeKeywordsToHashTable(
      recipe, recipeKeywords, hashTableForSearchingRecipes
    );
  }

  return hashTableForSearchingRecipes;
}
