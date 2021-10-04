// import { recipes } from "../data/recipes";

const JsonUrl = "../data/recipes.json";

// fetch(JsonUrl)
//   .then(response => {
//     return console.log(response.json)
//   }).then()
//   .catch(error => {
//   console.error(error);
// })

async function loadRecipes() {
  const response = await fetch(JsonUrl, {
    method: 'GET'
  });
  const recipes = await response.json();
  console.log(recipes);

  recipes.forEach(recipe => {
    console.log(recipe);
  })
}

loadRecipes();