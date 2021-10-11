import { RecipeCard } from "./_components/cards.js";
import { removeAccents } from "../utils/utilitis.js";

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

  getRecipesListToDisplay() {
    return this._recipeList.search(
      this._userRequest,
      this._hashTableForSearchingRecipes
    )
  }

  getItemsListToDisplay(recipeList) {
    return {
      ingredient: recipeList.sortIngredients,
      appliance: recipeList.sortAppliances,
      ustensil: recipeList.sortUstensils
    };
  }

  render() {
    this._renderFiltersOption(this._filtersItems)
    this._renderCards(this._recipeList);

    this._addCloseAllFiltersEvent();
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

  _closeAllFiltersExceptClicked(clickedFilter) {
    for (let filter of FILTERSLIST) {
      if (filter !== clickedFilter) {
        const filterLabel = document.getElementById(`${filter}-filter-label`);
        const filterIcon = document.getElementById(`${filter}-filter-icon`);
        const itemsList = document.getElementById(`${filter}-list`);

        filterLabel.classList.remove("clicked");

        filterIcon.classList.add("fa-chevron-down");
        filterIcon.classList.remove("fa-chevron-up");

        itemsList.classList.add("closed");
        itemsList.style.height = 0;
      }
    }
  }

  _addCloseAllFiltersEvent() {
    const bodySelector = document.querySelector("body");

    bodySelector.onclick = () => {
      this._closeAllFiltersExceptClicked();
    }
  }

  _resizeOpenedFilter() {
    const openedItemsList = document.querySelector("ul:not(.closed)");

    if (openedItemsList) {
      const filter = openedItemsList.getAttribute("data-filter");

      this._sizeFilterList(filter);
    }
  }

  _addSearchWithFiltersEvents() {
    for (let filter of FILTERSLIST) {
      const filterInput = document.getElementById(`${filter}`);
      const itemsList = document.getElementById(`${filter}-list`);
      const itemsLines = document.querySelectorAll(`#${filter}-list li`);

      filterInput.oninput = () => {
        console.log(`User input for ${filter} >`, filterInput.value);

        let itemListsToDisplay = {};
        Object.assign(itemListsToDisplay, this._filtersItems);

        itemListsToDisplay[filter] =
          itemListsToDisplay[filter].filter((item) =>
            removeAccents(item).startsWith(removeAccents(filterInput.value)
            ));

        this._renderFiltersOption(itemListsToDisplay);
        this.sizeFilterList(filter);
      };

      filterInput.onsubmit = () => {
        filterInput.blur();
      };

      filterInput.onsubmit = () => {
        filterInput.value = "";
      };

      itemsList.onclick = (e) => e.stopPropagation();

      for (let itemLine of itemsLines) {
        itemLine.onclick = () => {
          if (!this._badgesList.includes(itemLine.textContent)) {
            this._createFilterBadge(filter, itemLine.textContent);

            const recipesListToDisplay = this.getRecipesListToDisplay();

            this._renderFiltersOption(
              this.getItemsListToDisplay(recipesListToDisplay));

            this._displaySearchResultMessage(recipesListToDisplay);
            this._renderCards(recipesListToDisplay);

            window.scrollTo(0, 0);
          }
        };
      }
    }
  }
}
