import { RecipeCard } from "./_components/cards.js";

export class HomePageBuilder {
  constructor(recipeList) {
    this._recipeList = recipeList;
    this._badgesList = [];
  }

  render() {
    this._renderCards(this._recipeList);
  }

  get _userRequest() {
    const searchBarInput = document.getElementById("search-bar-input");

    return {
      userInput: searchBarInput.value.trim(),
      joinBadges: this._badgesList.join(" ").trim()
    }
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