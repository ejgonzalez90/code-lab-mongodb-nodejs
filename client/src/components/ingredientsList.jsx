import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function IngredientsList({ recipe }) {
  const ingredientsListDeepCopy = JSON.parse(
    JSON.stringify(recipe?.ingredients)
  );

  const [ingredients, setIngredients] = useState(ingredientsListDeepCopy);
  if (!ingredients) {
    return <></>;
  }
  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient._id !== id));
  };
  const submitForm = (event) => {
    event.preventDefault();
    const ingredient = [
      {
        quantity: event.target.quantity.value,
        metric: event.target.metric.value,
        ingredient: event.target.ingredient.value,
      },
    ];
    setIngredients(ingredient.concat(ingredients));
  };
  return (
    <>
      <Form onSubmit={submitForm} id="addIngredientForm">
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" step="0.01" placeholder="1" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="metric">
          <Form.Label>Metric</Form.Label>
          <Form.Control type="text" placeholder="cup" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ingredient">
          <Form.Label>Ingredient</Form.Label>
          <Form.Control type="text" placeholder="butter" required />
        </Form.Group>
      </Form>
      <Button variant="success" type="submit" form="addIngredientForm">
        Add Ingredient
      </Button>
      {ingredients.length > 0 && (
        <Table striped bordered hover id="ingredientsTable">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Metric</th>
              <th>Ingredient</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="ingredientsTableBody">
            {ingredients.map((ingredient) => {
              return (
                <tr key={ingredient._id || ingredient.ingredient}>
                  <td>{ingredient.quantity}</td>
                  <td>{ingredient.metric}</td>
                  <td>{ingredient.ingredient}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeIngredient(ingredient._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
