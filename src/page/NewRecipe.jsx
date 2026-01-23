import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { products } from '../data'; // Import local data

const NewRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: '',
    category: '',
    description: '',
    image: '',
    price: '',
    cookTime: '30 mins',
    difficulty: 'Medium',
    calories: 400,
    rating: '4.5',
    isTrending: false,
    ingredients: [''],
    instructions: ['']
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Ingredients handlers
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: updatedIngredients
      }));
    }
  };

  // Instructions handlers
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      instructions: updatedInstructions
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        instructions: updatedInstructions
      }));
    }
  };

  const formatRecipeText = () => {
    const validIngredients = formData.ingredients.filter(ing => ing.trim() !== '');
    const validInstructions = formData.instructions.filter(inst => inst.trim() !== '');

    let recipeText = 'Ingredients:\n';
    validIngredients.forEach(ingredient => {
      recipeText += `- ${ingredient}\n`;
    });

    recipeText += '\nInstructions:\n';
    validInstructions.forEach((instruction, index) => {
      recipeText += `${index + 1}. ${instruction}\n`;
    });

    return recipeText;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the recipe text
      const recipeText = formatRecipeText();
      
      // Prepare the new recipe object
      const newRecipe = {
        id: formData.id,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        recipe: recipeText,
        image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        price: parseFloat(formData.price) || 0,
        cookTime: formData.cookTime,
        difficulty: formData.difficulty,
        calories: parseInt(formData.calories) || 400,
        rating: formData.rating,
        isTrending: false
      };

      // Get existing products from localStorage or use imported ones
      let existingProducts;
      try {
        const savedProducts = localStorage.getItem('recipes');
        existingProducts = savedProducts ? JSON.parse(savedProducts) : [...products];
      } catch (err) {
        existingProducts = [...products];
      }

      // Add new recipe
      const updatedProducts = [...existingProducts, newRecipe];
      
      // Save to localStorage
      localStorage.setItem('recipes', JSON.stringify(updatedProducts));

      alert('Recipe added successfully!');
      navigate('/recipes');

    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Error adding recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component remains the same
  // At the end of the file
}
export default NewRecipe;
