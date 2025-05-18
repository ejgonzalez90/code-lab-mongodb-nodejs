import React, { useState } from "react";
import debounce from "lodash.debounce";
import { getData } from "../client";

export default function RecipeSearch({ setRecipes }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((term) => {
    const fetchRecipes = async () => {
      const allRecipes = await getData(
        `/api/recipes?title=${term}`
      );
      setRecipes(allRecipes);
    };
    console.log("Searching for:", term);
    fetchRecipes();
  }, 300); // Delay of 300 milliseconds

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}
