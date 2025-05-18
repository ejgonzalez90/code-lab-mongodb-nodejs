import mongoose from 'mongoose';
import { IngredientSchema } from './ingredient.js';

const RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [IngredientSchema]
    },
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    }
});

const RecipeModel = mongoose.model('Recipe', RecipeSchema);

export { RecipeModel, RecipeSchema };