import mongoose from "mongoose";

const { Schema } = mongoose;

export const IngredientSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    metric: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    }
});
