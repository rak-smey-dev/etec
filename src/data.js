// src/data.js
import dbData from '../db.json';

export const products = dbData.products || [];

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id == id) || null;
};