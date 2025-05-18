import React from "react";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../client";
import { toast, ToastContainer } from "react-toastify";
import EditRecipe from "./editRecipe";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function RecipeList({ recipes, setRecipes }) {
  const navigate = useNavigate();
  const handleReciipeClick = (path) => {
    navigate(path);
  };

  const removeRecipe = async (id) => {
    const message = await deleteData(`/api/recipes/${id}`);
    message && setRecipes(recipes.filter((recipe) => recipe._id !== id));
    message && toast(message.message);
    !message && toast("Failed to delete recipe");
  };

  const [editingRecipe, setEditingRecipe] = useState({});
  const editRecipe = async (id) => {
    setEditingRecipe(recipes.find((recipe) => recipe._id === id));
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {recipes?.map((recipe) => {
              return (
                <tr key={recipe._id}>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        handleReciipeClick(`/recipes/${recipe._id}`)
                      }
                    >
                      {recipe.title}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => editRecipe(recipe._id)}
                    >
                      <FaEdit />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeRecipe(recipe._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <EditRecipe
        editingRecipe={editingRecipe}
        setEditingRecipe={setEditingRecipe}
      />
    </>
  );
}
