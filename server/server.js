import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { query } from "express-validator";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { RecipeModel } from "./models/recipe.js";

dotenv.config();
const PORT = process.env.PORT || 3030;
const HOST = "0.0.0.0";
const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose.connect(MONGO_URI, {
  dbName: "recipedb",
});

app.use(cors());

app.use(express.json());

//get all recipes that match the title query (if title query is empty or not there - return all recipes)
app.get("/recipes", query("title").escape(), async (req, res, next) => {
  const title = req.query.title;
  try {
    const predicate = {};
    if (title) {
      predicate.title = { $regex: title, $options: "i" };
    }

    const results = await RecipeModel.find(predicate);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

//get a recipe by the id
app.get("/recipes/:id", async (req, res) => {
  const id = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await RecipeModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//update a recipe
app.put("/recipes/:id", async (req, res, next) => {
  const id = ObjectId.createFromHexString(req.params.id);
  const body = req.body;
  try {
    const result = await RecipeModel.findById(id);
    result.title = body.title;
    result.instructions = body.instructions;
    result.ingredients = body.ingredients;
    result.prepTime = body.prepTime;
    result.cookTime = body.cookTime;
    result.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//delete a recipe
app.delete("/recipes/:id", async (req, res, next) => {
  try {
    const id = ObjectId.createFromHexString(req.params.id);
    const result = await RecipeModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: `Recipe successfully deleted` });
  } catch (error) {
    next(error);
  }
});

//create a recipe
app.post("/recipes", async (req, res, next) => {
  try {
    const result = await RecipeModel.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// start the Express server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
