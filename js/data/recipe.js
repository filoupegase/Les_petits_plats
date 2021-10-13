import { removeAccents } from "../utils/utilitis.js";

export class Recipe {
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  get joinedApplianceWithNoAccent() {
    return removeAccents(this.appliance);
  }

  get descriptionWithNoAccent() {
    return removeAccents(this.description);
  }

  get joinedIngredientsWithNoAccent() {
    const ingredientsList = [];

    for (let item of this.ingredients) {
      ingredientsList.push(removeAccents(item.ingredients));
    }
    return ingredientsList.join(" ");
  }

  get nameFilterWithNoAccent() {
    return removeAccents(this.name);
  }

  get joinedUstensilsWithNoAccent() {
    const ustensilsList = [];

    for (let ustensils of this.ustensils) {
      ustensilsList.push(removeAccents(ustensils));
    }

    return ustensilsList.join(" ")
  }
}