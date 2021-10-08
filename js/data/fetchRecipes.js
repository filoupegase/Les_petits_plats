import { Recipe } from "./recipe";
import { RecipeList } from "./recipeList";


export class FetchRecipes {
  constructor(sourceData) {
    this._sourceData = sourceData;
  }

  getListRecipe() {
    const recipesHash = [];

    for (let recipe of this._sourceData) {
      recipesHash.push(
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
    return new RecipeList(recipesHash);
  }
}