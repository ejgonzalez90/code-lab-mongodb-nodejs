import mongoose from "mongoose";
import { RecipeModel } from "./models/recipe.js";
import recipes from "./sampleData/sampleRecipes.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  dbName: "recipedb",
});

try {
  await RecipeModel.deleteMany({});
  await RecipeModel.insertMany(recipes);
  console.log("Application Seeded!");
  console.log("Type Ctrl+C to Quit");
} catch (error) {
  console.log(error);
}
