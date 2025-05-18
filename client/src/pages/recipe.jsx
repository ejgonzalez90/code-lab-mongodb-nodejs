import React from "react";
import { getData } from "../client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import "./recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const fetchRecipe = async () => {
      const recievedRecipe = await getData(
        `/api/recipes/${id}`
      );
      setRecipe(recievedRecipe);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  return (
    <div className="App">
      <span className="header">
        <a href="/" className="backArrow">
          <MdOutlineArrowBackIos />
        </a>
        <h1>Recipe</h1>
      </span>

      {loading && <h2>Loading...</h2>}
      {!loading && (
        <div className="body">
          <h3>Title</h3>
          <p>{recipe.title}</p>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => {
              return (
                <li key={ingredient._id}>
                  {ingredient.quantity} {ingredient.metric} of{" "}
                  {ingredient.ingredient}
                </li>
              );
            })}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
          <h3>Prep Time</h3>
          <p>{recipe.prepTime} Minutes</p>
          <h3>Cook Time</h3>
          <p>{recipe.cookTime} Minutes</p>
        </div>
      )}
    </div>
  );
}
