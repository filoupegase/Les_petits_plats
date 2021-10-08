export class Recipe {
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    ustensils,
    appliance
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.ustensils = ustensils;
    this.appliance = appliance;
  }

  get nameFilterWithNoAccents() {
    return RemoveAccents(this.name);
  }
}