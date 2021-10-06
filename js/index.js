// import { recipes } from "../data/recipes";
const cardsInner = document.getElementById('cards-wrapper');
const JsonUrl = "../data/recipes.json";

async function loadRecipes() {
  const response = await fetch(JsonUrl, {
    method: 'GET'
  });
  const recipes = await response.json();
  console.log(recipes);

  recipes.forEach(recipe => {
    console.log(recipe);

    cardsInner.innerHTML += `<article class="c-card lg4 md6 sm12" data-card-id="${
      recipe.id
    }">
        <div class="c-card__img"></div>
        <div class="c-card__body">
          <h2 class="c-card__title">
            <span class="name">${recipe.name}</span>
            <span class="duration">
              <i class="far fa-clock"></i>
              ${recipe.time} min
            </span>
          </h2>
          <div class="c-card__recipe row-12 has-gutter-lg">
            <div class="c-card__ingredients lg6 md6 sm6">
              ...ingredient
            </div>
            <div class="c-card__description lg6 md6 sm6">
              <p>${recipe.description}</p>
            </div>
          </div>
        </div>
      </article>`
  })
}

loadRecipes();