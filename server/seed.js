import mongoose from "mongoose";
import { RecipeModel } from "./models/recipe.js";
import recipes from "./sampleData/sampleRecipes.js";

mongoose.connect("mongodb://127.0.0.1:27017/recipedb");

try {
  await RecipeModel.deleteMany({});
  await RecipeModel.insertMany(recipes);
  console.log("Application Seeded!");
  console.log("Type Ctrl+C to Quit");
} catch (error) {
  console.log(error);
}
