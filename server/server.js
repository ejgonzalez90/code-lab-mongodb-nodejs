import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { query } from "express-validator";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3030;
const HOST = "0.0.0.0";
const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose.connect(MONGO_URI);

app.use(cors());

app.use(express.json());

//get all recipes that match the title query (if title query is empty or not there - return all recipes)
app.get("/recipes", query("title").escape(), async (req, res, next) => {
  const title = req.query.title;
  try {
    let results = [];
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

//get a recipe by the id
app.get("/recipes/:id", async (req, res) => {
  try {
    const result = {}
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//update a recipe
app.put("/recipes/:id", async (req, res, next) => {
  try {
    let result = {}
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//delete a recipe
app.delete("/recipes/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: `Recipe successfully deleted` });
  } catch (error) {
    next(error);
  }
});

//create a recipe
app.post("/recipes", async (req, res, next) => {
  try {
    const result = {}
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
