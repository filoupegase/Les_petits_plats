import { RecipeCard } from "./_components/cards.js";

const FILTERSLIST = ["ingredient", "appliance", "ustensil"];

export class HomePageBuilder {
  constructor(recipeList, hashTableForSearchingRecipes) {
    this._recipeList = recipeList;
    this._hashTableForSearchingRecipes = hashTableForSearchingRecipes;
    this._badgesList = [];
    this._filtersItems = {
      ingredient: this._recipeList.sortIngredients,
      appliance: this._recipeList.sortAppliances,
      ustensils: this._recipeList.sortUstensils,
    };
  }


  get _userRequest() {
    const searchBarInput = document.getElementById("search-bar-input");

    return {
      userInput: searchBarInput.value.trim(),
      joinBadges: this._badgesList.join(" ").trim()
    }
  }

  recipesToDisplay() {
    return this._recipeList.search(
      this._userRequest,
      this._hashTableForSearchingRecipes
    )
  }

  itemsToDisplay(recipeList) {
    return {
      ingredient: recipeList.sortIngredients,
      appliance: recipeList.sortAppliances,
      ustensil: recipeList.sortUstensils
    };
  }

  render() {
    // this._renderFiltersOption(this._filtersItems)
    this._renderCards(this._recipeList);
  }

  _renderFiltersOption(itemsLists) {
    for (let filter of FILTERSLIST) {
      const itemsList = document.getElementById(`${filter}-list`);

      let htmlContent = "";

      for (let item of itemsLists[filter]) {
        htmlContent += `<li>${item}</li>`;
      }

      itemsList.innerHTML = htmlContent;
    }
    this._resizeOpenedFilter();
    this._addSearchWithFiltersEvents();
  }


  _renderCards(recipesList) {
    const cardsWrapper = document.getElementById("cards-wrapper");

    let htmlContent = "";

    for (let i = 0; i < recipesList.recipes.length; i++) {
      htmlContent += new RecipeCard(recipesList.recipes[i], i).html;
    }
    cardsWrapper.innerHTML = htmlContent;
  }
}