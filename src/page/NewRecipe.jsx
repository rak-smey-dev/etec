import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const NewRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    price: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the recipe text before submitting
      const recipeText = formatRecipeText();
      
      const submissionData = {
        ...formData,
        recipe: recipeText,
        // Remove arrays from submission data
        ingredients: undefined,
        instructions: undefined
      };

      // Remove the arrays before sending
      delete submissionData.ingredients;
      delete submissionData.instructions;

      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert('Recipe added successfully!');
        navigate('/recipes');
      } else {
        throw new Error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Error adding recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/recipes" 
            className="flex items-center text-amber-600 hover:text-amber-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Recipes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Recipe</h1>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-amber-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                  placeholder="Enter recipe title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                >
                  <option value="">Select Category</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Soup">Soup</option>
                  <option value="Salad">Salad</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>

              {/* Price */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                  placeholder="0.00"
                />
              </div> */}

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Leave empty to use a default food image
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                  placeholder="Describe your recipe, its origin, and what makes it special..."
                />
              </div>

              {/* Ingredients Section */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-lg font-semibold text-amber-800 dark:text-amber-300">
                    Ingredients *
                  </label>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add Ingredient
                  </button>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto p-2">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-amber-600 dark:text-amber-400 font-medium min-w-6">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1} (e.g., 2 cups rice, 1 tbsp salt)`}
                        className="flex-1 px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                      />
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition duration-300"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Section */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-lg font-semibold text-amber-800 dark:text-amber-300">
                    Instructions *
                  </label>
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add Step
                  </button>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto p-2">
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex items-center justify-center w-8 h-8 bg-amber-500 text-white rounded-full text-sm font-bold mt-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          placeholder={`Step ${index + 1} - Describe this step in detail...`}
                          rows="2"
                          className="w-full px-4 py-3 border border-amber-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-300"
                        />
                      </div>
                      {formData.instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInstruction(index)}
                          className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition duration-300 mt-3"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="md:col-span-2 bg-amber-50 dark:bg-gray-700 rounded-xl p-4 mt-6">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3">
                Recipe Preview
              </h3>
              <div className="bg-white dark:bg-gray-500 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                {formatRecipeText() || 'Your formatted recipe will appear here...'}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-amber-200 dark:border-gray-700">
              <Link
                to="/recipes"
                className="flex items-center px-6 py-3 border border-amber-300 dark:border-gray-600 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <FaSave className="mr-2" />
                {loading ? 'Adding Recipe...' : 'Add Recipe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;