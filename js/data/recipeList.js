import { sortAlpha } from "../utils/utilitis.js";

export class RecipeList {
  constructor(recipes) {
    this.recipes = recipes;
    this._sortByName();
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
}