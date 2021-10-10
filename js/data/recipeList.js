import { sortAlpha, capFirstChar } from "../utils/utilitis.js";

export class RecipeList {
  constructor(recipes) {
    this.recipes = recipes;
    this._sortByName();
  }

  get sortAppliances() {
    return sortAlpha(this._collectAppliances());
  }

  get sortIngredients() {
    return sortAlpha(this._collectIngredients());
  }

  get sortUstensils() {
    return sortAlpha(this._collectUstensils());
  }

  _sortByName() {
    return this.recipes.sort((recipe1, recipe2) => {
      const name1 = recipe1.name.toLowerCase();
      const name2 = recipe2.name.toLowerCase();

      const [sortedName1, sortedName2] = sortAlpha([name1, name2]);

      if (sortedName1 === name2) return 1;
      if (sortedName2 === name1) return -1;
      return 0;
    });
  }

  _collectAppliances() {
    const appliances = new Set();

    for (let recipe of this.recipes) {
      appliances.add(capFirstChar(recipe.appliance));
    }

    return [...appliances];
  }

  _collectIngredients() {
    const ingredients = new Set();

    for (let recipe of this.recipes) {
      for (let item of recipe.ingredients) {
        ingredients.add(capFirstChar(item.ingredient));
      }
    }

    return [...ingredients];
  }

  _collectUstensils() {
    const ustensils = new Set();

    for (let recipe of this.recipes) {
      for (let ustensil of recipe.ustensils) {
        ustensils.add(capFirstChar(ustensil));
      }
    }

    return [...ustensils];
  }

  search(TEST_REQUEST_1, HASH_TABLE_FOR_SEARCHING_RECIPES) {
    return undefined;
  }
}