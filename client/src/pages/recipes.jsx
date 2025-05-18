import React from "react";
import RecipeList from "../components/recipeList";
import RecipeSearch from "../components/recipeSearch";
import { getData } from "../client";
import { useState, useEffect } from "react";
import "./recipes.css";
import CreateRecipe from "../components/createRecipe";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const allRecipes = await getData("/api/recipes");
      setRecipes(allRecipes);
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <h1>Recipes</h1>
      <div className="searchBar">
        <RecipeSearch setRecipes={setRecipes} />
      </div>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <RecipeList recipes={recipes} setRecipes={setRecipes} />
      )}
      <CreateRecipe />
    </div>
  );
}
