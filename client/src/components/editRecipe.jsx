import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateData } from "../client";
import IngredientsList from "./ingredientsList";

export default function EditRecipe({ editingRecipe, setEditingRecipe }) {
  if (Object.keys(editingRecipe).length === 0) {
    return <></>;
  }

  const closeModal = () => {
    setEditingRecipe({});
  };

  const submitForm = async (event) => {
    // The form will rerender the page on submission without this line
    // event.preventDefault();

    const tableBody = document.getElementById("ingredientsTableBody");
    let ingredients = [];
    for (const row of tableBody.children) {
      const ingredient = {
        quantity: row.children[0].innerHTML,
        metric: row.children[1].innerHTML,
        ingredient: row.children[2].innerHTML,
      };
      ingredients.push(ingredient);
    }
    console.log(ingredients);

    const body = {
      title: event.target.title.value,
      instructions: event.target.instructions.value,
      prepTime: event.target.prepTime.value,
      cookTime: event.target.cookTime.value,
      ingredients: ingredients,
    };
    console.log(body);
    const message = await updateData(
      `/api/recipes/${editingRecipe._id}`,
      body
    );
    console.log(message);
    setEditingRecipe({});
  };

  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <IngredientsList recipe={editingRecipe} />
            <Form onSubmit={submitForm} id="recipeForm">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editingRecipe.title}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="prepTime">
                <Form.Label>Prep Time</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  defaultValue={editingRecipe.prepTime}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cookTime">
                <Form.Label>Cook Time</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  defaultValue={editingRecipe.cookTime}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="instructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={editingRecipe.instructions}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" form="recipeForm">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}
