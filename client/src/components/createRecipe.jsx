import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createData } from "../client";
import IngredientsList from "./ingredientsList";
import { useState } from "react";

export default function CreateRecipe() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

    const body = {
      title: event.target.title.value,
      instructions: event.target.instructions.value,
      prepTime: event.target.prepTime.value,
      cookTime: event.target.cookTime.value,
      ingredients: ingredients,
    };
    const message = await createData(`/api/recipes`, body);
    setModalOpen(false);
  };

  return (
    <>
      <Button variant="success" onClick={openModal}>
        Create Recipe
      </Button>
      {modalOpen && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Create Recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <IngredientsList recipe={{ ingredients: [] }} />
              <Form onSubmit={submitForm} id="createRecipeForm">
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Recipe Title"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="prepTime">
                  <Form.Label>Prep Time</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="0"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cookTime">
                  <Form.Label>Cook Time</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="0"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="instructions">
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Instructions..."
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="createRecipeForm">
                Create
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
}
