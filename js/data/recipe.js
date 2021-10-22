import {
  capitalizeFirstChar,
  keepOnlyLettersAndRemoveAccents,
  removeStopWords,
  sortAlphabetically,
} from "../utils/utilitis.js";

export class Recipe {
  /**
   * propsValidation
   * @constructs
   * @param {number} id
   * @param {string} name
   * @param {number} servings
   * @param {Array.Object} ingredients
   * @param {number} time
   * @param {string} description
   * @param {string} appliance
   * @param {Array.string} ustensils
   */
  constructor(
    id,
    name,
    cover,
    altText,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.name = name;
    this.cover = cover;
    this.altText = altText;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  get applianceNameWithoutAccent() {
    return keepOnlyLettersAndRemoveAccents(this.appliance);
  }

  get descriptionWithoutAccent() {
    return keepOnlyLettersAndRemoveAccents(this.description);
  }

  get joinedIngredientsWithoutAccent() {
    const ingredientsList = [];

    for (let item of this.ingredients) {
      ingredientsList.push(keepOnlyLettersAndRemoveAccents(item.ingredient));
    }

    return ingredientsList.join(" ");
  }

  get nameWithoutAccent() {
    return keepOnlyLettersAndRemoveAccents(this.name);
  }

  get joinedUstensilsWithoutAccent() {
    const ustensilsList = [];

    for (let ustensil of this.ustensils) {
      ustensilsList.push(keepOnlyLettersAndRemoveAccents(ustensil));
    }

    return ustensilsList.join(" ");
  }
}

export class RecipesList {
  constructor(recipes) {
    this.recipes = recipes;
    this._sortByName();
  }

  get sortedAppliances() {
    return sortAlphabetically(this._collectAppliances());
  }

  get sortedIngredients() {
    return sortAlphabetically(this._collectIngredients());
  }

  get sortedUstensils() {
    return sortAlphabetically(this._collectUstensils());
  }

  _sortByName() {
    return this.recipes.sort((r1, r2) => {
      const name1 = r1.name.toLowerCase();
      const name2 = r2.name.toLowerCase();

      const [sortedName1, sortedName2] = sortAlphabetically([name1, name2]);

      if (sortedName1 === name2) return 1;
      if (sortedName1 === name1) return -1;
      return 0;
    });
  }

  _collectAppliances() {
    const appliances = new Set();

    for (let recipe of this.recipes) {
      appliances.add(capitalizeFirstChar(recipe.appliance));
    }

    return [...appliances];
  }

  _collectIngredients() {
    const ingredients = new Set();

    for (let recipe of this.recipes) {
      for (let item of recipe.ingredients) {
        ingredients.add(capitalizeFirstChar(item.ingredient));
      }
    }

    return [...ingredients];
  }

  _collectUstensils() {
    const ustensils = new Set();

    for (let recipe of this.recipes) {
      for (let ustensil of recipe.ustensils) {
        ustensils.add(capitalizeFirstChar(ustensil));
      }
    }

    return [...ustensils];
  }

  search(userRequest, hashTableForSearchingRecipes) {
    userRequest = `${userRequest.userInput} ${userRequest.joinedBadges}`;

    const words = userRequest.split(" ");
    const keywords = removeStopWords(words);

    let filteredRecipes = new Set(this.recipes);

    for (let keyword of keywords) {
      // get all recipes containing this keyword :
      keyword = keepOnlyLettersAndRemoveAccents(keyword);

      const keywordRecipes =
        keyword in hashTableForSearchingRecipes
          ? hashTableForSearchingRecipes[keyword]
          : new Set();

      // intersect keywordRecipes with actual filteredRecipes :
      filteredRecipes = new Set(
        [...keywordRecipes].filter((recipe) => filteredRecipes.has(recipe))
      );
    }

    return new RecipesList([...filteredRecipes]);
  }
}