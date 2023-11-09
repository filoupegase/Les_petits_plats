import { removeStopWords } from "../utils/utilitis.js";
import { Recipe, RecipesList } from "./recipe.js";


/**
 * 1/
 * @constructor
 * @param {[{cover: string, appliance: string, servings: number, ustensils: string[], name: string, ingredients: [{unit: string, ingredient: string, quantity: number}, {ingredient: string, quantity: number}, {unit: string, ingredient: string, quantity: number}, {unit: string, ingredient: string, quantity: number}, {ingredient: string}], description: string, id: number, time: number}, {cover: string, appliance: string, servings: number, ustensils: [string], altText: string, name: string, ingredients, description: string, id: number, time: number}, {cover: string, appliance: string, servings: number, ustensils: [string], altText: string, name: string, ingredients, description: string, id: number, time: number}, {cover: string, appliance: string, servings: number, ustensils: string[], altText: string, name: string, ingredients, description: string, id: number, time: number}, {cover: string, appliance: string, servings: number, ustensils: string[], altText: string, name: string, ingredients, description: string, id: number, time: number}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]} dataSource
 * @return {recipes: Array.Object} RecipesList
 */
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
        // console.log(new RecipesList(recipes));
        return new RecipesList(recipes);
    }
}

function extractKeywordsFromRecipe(recipe) {
    let recipeWords = `${ recipe.nameWithoutAccent } ${ recipe.joinedIngredientsWithoutAccent } ${ recipe.applianceNameWithoutAccent } ${ recipe.joinedUstensilsWithoutAccent } ${ recipe.descriptionWithoutAccent }`;

    recipeWords = recipeWords.split(" ");

    return removeStopWords(recipeWords);
}

function addRecipeKeywordsToHashTable(recipe, recipeKeywords, hashTable) {
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

        hashTableForSearchingRecipes = addRecipeKeywordsToHashTable(
            recipe,
            recipeKeywords,
            hashTableForSearchingRecipes
        );
    }

    return hashTableForSearchingRecipes;
}
