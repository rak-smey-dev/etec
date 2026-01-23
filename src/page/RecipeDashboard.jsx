// src/page/RecipeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaUser, FaFire, FaHeart, FaRegHeart, FaUtensils, FaExclamationTriangle, FaDollarSign, FaList, FaTh, FaPlus, FaFilter } from 'react-icons/fa';
import { products } from '../data'; // Changed from './data' to '../data'

const RecipeDashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // Default to list view
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Count ingredients from recipe string safely
  const countIngredients = (recipeText) => {
    try {
      if (!recipeText || typeof recipeText !== 'string') return 8;
      
      const lines = recipeText.split('\n');
      const ingredientLines = lines.filter(line => {
        const trimmedLine = line.trim();
        return trimmedLine.startsWith('-') || 
               trimmedLine.toLowerCase().includes('ingredient') ||
               trimmedLine.match(/^[•*]\s/);
      });
      return ingredientLines.length > 0 ? ingredientLines.length : 8;
    } catch (err) {
      console.error('Error counting ingredients:', err);
      return 8;
    }
  };

  // Determine difficulty (prefer API value; fallback to 'Medium')
  const getDifficulty = (recipe) => {
    try {
      if (recipe && recipe.difficulty) return recipe.difficulty;
      return 'Medium';
    } catch (err) {
      return 'Medium';
    }
  };

  // Transform API data to match dashboard format safely
  // Keeps product fields deterministic and marks top-rated items as trending
  const transformRecipeData = (apiRecipes) => {
    try {
      if (!apiRecipes || !Array.isArray(apiRecipes)) {
        return getFallbackRecipes();
      }

      // First pass: normalize fields and use stable fallbacks (no randomness)
      const normalized = apiRecipes.map((recipe, idx) => {
        const deterministicId = recipe.id ?? (
          recipe.title ? recipe.title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') : `product-${idx + 1}`
        );

        const safeRecipe = {
          id: deterministicId,
          title: recipe.title || 'Untitled Recipe',
          category: recipe.category || 'Main Course',
          description: recipe.description || 'Delicious Cambodian dish',
          recipe: recipe.recipe || '',
          image: recipe.image || getDefaultImage(),
          price: recipe.price || 0
        };

        const cookTime = recipe.cookTime || '30 mins';
        const difficulty = getDifficulty(recipe);
        const calories = recipe.calories ?? 400;
        const rating = recipe.rating != null ? parseFloat(recipe.rating).toFixed(1) : '4.5';
        const isTrending = recipe.isTrending ?? false; // respect API if provided

        return {
          ...safeRecipe,
          cookTime,
          difficulty,
          calories,
          rating,
          ingredients: countIngredients(safeRecipe.recipe),
          isTrending,
        };
      });

      // Ensure there's always a stable set of trending recipes: pick top 4 by rating
      try {
        const topByRating = [...normalized]
          .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
          .slice(0, 4)
          .map(r => r.id);

        return normalized.map(r => ({
          ...r,
          // keep API-provided isTrending true, otherwise set true if in topByRating
          isTrending: r.isTrending || topByRating.includes(r.id),
        }));
      } catch (e) {
        // If something goes wrong computing trending, return normalized list
        return normalized;
      }
    } catch (err) {
      console.error('Error transforming recipe data:', err);
      return getFallbackRecipes();
    }
  };

  // Get default image fallback
  const getDefaultImage = () => {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
  };

  // Fallback sample data in case API is not available
  const getFallbackRecipes = () => {
    return [
      {
        id: 1,
        title: "Beef Lok Lak",
        category: "Main Course",
        cookTime: "25 mins",
        difficulty: "Medium",
        calories: 450,
        rating: 4.8,
        image: "https://www.visit-angkor.org/wp-content/uploads/2024/03/beef-lok-lak-cambodia.jpg",
        ingredients: 12,
        isTrending: true,
        price: 8.99,
        description: "A traditional Cambodian dish made with marinated beef, served with fresh vegetables and rice."
      },
      {
        id: 2,
        title: "Fish Amok",
        category: "Main Course",
        cookTime: "40 mins",
        difficulty: "Medium",
        calories: 380,
        rating: 4.9,
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSB-fAmvFc9mosZptiv5pNfzdbgOcyzkHIFiP2EuSmhgoviiWrQzQocySLRZizCfH6z8F-pZhkgPVNfdxMJMjD8XbMfZdi2HtOypk0oGA",
        ingredients: 15,
        isTrending: true,
        price: 7.99,
        description: "Steamed fish curry with coconut milk and traditional Khmer spices, wrapped in banana leaves."
      },
      {
        id: 3,
        title: "Khmer Red Curry",
        category: "Main Course",
        cookTime: "35 mins",
        difficulty: "Easy",
        calories: 520,
        rating: 4.6,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjA9plmXG-wYO8PzDTG5sX5Sjo-bR1ISZdEcKDE-cYWGAQpK_X3L2Fb8p1VcdtpZtyt8&usqp=CAU",
        ingredients: 10,
        isTrending: false,
        price: 9.99,
        description: "Mild and creamy curry with beef, eggplant, and fresh herbs."
      },
      {
        id: 4,
        title: "Nom Banh Chok",
        category: "Breakfast",
        cookTime: "20 mins",
        difficulty: "Easy",
        calories: 320,
        rating: 4.7,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnMt-6xkjh_R8Vo3PkjVDmDden9F787X_Hg&s",
        ingredients: 8,
        isTrending: true,
        price: 5.99,
        description: "Traditional Khmer noodle dish with fish-based green curry and fresh vegetables."
      },
      {
        id: 5,
        title: "Bai Sach Chrouk",
        category: "Breakfast",
        cookTime: "30 mins",
        difficulty: "Easy",
        calories: 420,
        rating: 4.5,
        image: "https://i.pinimg.com/736x/5c/6e/1d/5c6e1d3b07d5d5e4b4e4b4e4b4e4b4e4.jpg",
        ingredients: 6,
        isTrending: false,
        price: 4.99,
        description: "Grilled pork with rice, pickled vegetables, and ginger sauce."
      },
      {
        id: 6,
        title: "Kuy Teav",
        category: "Noodles",
        cookTime: "25 mins",
        difficulty: "Easy",
        calories: 380,
        rating: 4.4,
        image: "https://i.pinimg.com/736x/5c/6e/1d/5c6e1d3b07d5d5e4b4e4b4e4b4e4b4e4.jpg",
        ingredients: 9,
        isTrending: false,
        price: 6.99,
        description: "Cambodian noodle soup with pork broth, herbs, and various toppings."
      }
    ];
  };

  // Load recipes from local data
  useEffect(() => {
    const loadRecipes = () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get recipes from localStorage first
        const savedRecipes = localStorage.getItem('recipes');
        
        if (savedRecipes) {
          // Parse and transform recipes from localStorage
          const parsedRecipes = JSON.parse(savedRecipes);
          const transformedData = transformRecipeData(parsedRecipes);
          setRecipes(transformedData);
        } else {
          // If no recipes in localStorage, use imported data
          if (products && Array.isArray(products)) {
            const transformedData = transformRecipeData(products);
            setRecipes(transformedData);
          } else {
            // Fallback to sample data
            setRecipes(getFallbackRecipes());
          }
        }
        
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Error loading recipes from local data');
        setRecipes(getFallbackRecipes());
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []); // Empty dependency array - runs once on mount

  // Safe image error handler
  const handleImageError = (e, fallbackImage = null) => {
    e.target.src = fallbackImage || getDefaultImage();
  };

  // Generate categories based on actual recipe data
  const categories = React.useMemo(() => {
    try {
      const categoryCounts = {};
      recipes.forEach(recipe => {
        if (recipe && recipe.category) {
          categoryCounts[recipe.category] = (categoryCounts[recipe.category] || 0) + 1;
        }
      });

      const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count
      }));

      return [
        { name: "All", count: recipes.length },
        ...categoryList
      ].filter(cat => cat.count > 0);
    } catch (err) {
      console.error('Error generating categories:', err);
      return [{ name: "All", count: recipes.length }];
    }
  }, [recipes]);

  const stats = [
    { label: "Total Recipes", value: `${recipes.length}+`, icon: FaUtensils, color: "blue" },
    { label: "Cooking Time", value: "15-55min", icon: FaClock, color: "green" },
    { label: "Categories", value: (categories.length - 1).toString(), icon: FaFire, color: "red" },
    { label: "Favorites", value: `${favorites.length}`, icon: FaHeart, color: "purple" }
  ];

  const toggleFavorite = (recipeId) => {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Safe filtering and sorting
  const filteredRecipes = React.useMemo(() => {
    try {
      if (!recipes || !Array.isArray(recipes)) return [];
      
      let filtered = recipes;

      // Filter by search term
      const searchLower = searchTerm.toLowerCase().trim();
      if (searchLower) {
        filtered = filtered.filter(recipe => {
          if (!recipe) return false;
          
          return (
            (recipe.title?.toLowerCase() || '').includes(searchLower) ||
            (recipe.category?.toLowerCase() || '').includes(searchLower) ||
            (recipe.description?.toLowerCase() || '').includes(searchLower)
          );
        });
      }

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(recipe => recipe.category === selectedCategory);
      }

      // Sort recipes
      switch (sortBy) {
        case 'name':
          filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'time':
          filtered = [...filtered].sort((a, b) => {
            const timeA = parseInt(a.cookTime);
            const timeB = parseInt(b.cookTime);
            return timeA - timeB;
          });
          break;
        case 'rating':
          filtered = [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        case 'calories':
          filtered = [...filtered].sort((a, b) => a.calories - b.calories);
          break;
        default:
          // Default sorting - trending first, then by rating
          filtered = [...filtered].sort((a, b) => {
            if (a.isTrending && !b.isTrending) return -1;
            if (!a.isTrending && b.isTrending) return 1;
            return parseFloat(b.rating) - parseFloat(a.rating);
          });
      }

      return filtered;
    } catch (err) {
      console.error('Error filtering recipes:', err);
      return recipes || [];
    }
  }, [recipes, searchTerm, selectedCategory, sortBy]);

  // Get trending recipes safely
  const trendingRecipes = React.useMemo(() => {
    try {
      return recipes
        .filter(recipe => recipe && recipe.isTrending)
        .slice(0, 4);
    } catch (err) {
      console.error('Error getting trending recipes:', err);
      return [];
    }
  }, [recipes]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading delicious Cambodian recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">រូបមន្តអាហារខ្មែរ - Recipe Dashboard</h1>
              {error && (
                <div className="flex items-center mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <FaExclamationTriangle className="text-amber-600 mr-2 flex-shrink-0" />
                  <span className="text-amber-800 dark:text-amber-200 text-sm">{error}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden self-start">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                  title="List View"
                >
                  <FaList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                  title="Grid View"
                >
                  <FaTh className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                  stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                  stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-red-100 dark:bg-red-900'
                }`}>
                  <stat.icon className={`text-xl ${
                    stat.color === 'blue' ? 'text-blue-600 dark:text-blue-300' :
                    stat.color === 'green' ? 'text-green-600 dark:text-green-300' :
                    stat.color === 'purple' ? 'text-purple-600 dark:text-purple-300' : 'text-red-600 dark:text-red-300'
                  }`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaFilter className="text-amber-600 mr-2" />
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex justify-between items-center w-full p-3 text-left rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className={`font-medium ${
                      selectedCategory === category.name
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {category.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      selectedCategory === category.name
                        ? 'bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sort By</h2>
              <div className="space-y-2">
                {[
                  { value: 'default', label: 'Recommended' },
                  { value: 'name', label: 'Name (A-Z)' },
                  { value: 'rating', label: 'Highest Rating' },
                  { value: 'time', label: 'Cooking Time' },
                  { value: 'calories', label: 'Calories' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      sortBy === option.value
                        ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-medium'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Recipes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaFire className="text-red-500 mr-2" />
                Trending Now
              </h2>
              <div className="space-y-4">
                {trendingRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => handleImageError(e)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{recipe.title}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-amber-600 font-semibold">{recipe.rating} ★</span>
                        <span className="mx-1">•</span>
                        <span>{recipe.cookTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {trendingRecipes.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No trending recipes</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedCategory === 'All' ? 'All Recipes' : selectedCategory} 
                  <span className="text-amber-600 ml-2">({filteredRecipes.length})</span>
                </h2>
                {searchTerm && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Search results for "{searchTerm}"
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link 
                  to="/new-recipe"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <FaPlus className="mr-2" />
                  Add New Recipe
                </Link>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSortBy('default');
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Recipes List/Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center border border-gray-200 dark:border-gray-700">
                <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No recipes found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm ? `No recipes match "${searchTerm}"` : 'No recipes available in this category'}
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  View All Recipes
                </button>
              </div>
            ) : viewMode === 'list' ? (
              /* Enhanced List View */
              <div className="space-y-4">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Recipe Image */}
                      <div className="sm:w-48 md:w-56 flex-shrink-0 relative">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-48 sm:h-full object-cover"
                          onError={(e) => handleImageError(e)}
                        />
                        {recipe.isTrending && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Trending
                          </div>
                        )}
                        <button
                          onClick={() => toggleFavorite(recipe.id)}
                          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {favorites.includes(recipe.id) ? (
                            <FaHeart className="text-red-500 w-4 h-4" />
                          ) : (
                            <FaRegHeart className="text-gray-400 dark:text-gray-300 w-4 h-4" />
                          )}
                        </button>
                      </div>
                      
                      {/* Recipe Details */}
                      <div className="flex-1 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {recipe.title}
                              </h3>
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded-full font-medium">
                                {recipe.rating} ★
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {recipe.description}
                            </p>
                          </div>
                        </div>

                        {/* Recipe Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FaClock className="mr-2 flex-shrink-0 text-amber-600" />
                            <span className="font-medium">{recipe.cookTime}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FaUtensils className="mr-2 flex-shrink-0 text-green-600" />
                            <span className="font-medium">{recipe.ingredients} ingredients</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FaFire className="mr-2 flex-shrink-0 text-red-600" />
                            <span className="font-medium">{recipe.calories} cal</span>
                          </div>
                          {/* <div className="flex items-center text-sm font-semibold text-amber-600">
                            <FaDollarSign className="mr-1 flex-shrink-0" />
                            <span>{recipe.price}</span>
                          </div> */}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex flex-wrap gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              recipe.difficulty === 'Easy' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                : recipe.difficulty === 'Medium'
                                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            }`}>
                              {recipe.difficulty}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                              {recipe.category}
                            </span>
                          </div>
                          <Link 
                            to={`/product/${recipe.id}`}
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2 text-sm"
                          >
                            View Recipe
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Grid View (fallback) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => handleImageError(e)}
                      />
                      <button
                        onClick={() => toggleFavorite(recipe.id)}
                        className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        {favorites.includes(recipe.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-400 dark:text-gray-300" />
                        )}
                      </button>
                      {recipe.isTrending && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{recipe.title}</h3>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                          {recipe.rating} ★
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{recipe.description}</p>

                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3 flex-wrap gap-2">
                        <div className="flex items-center">
                          <FaClock className="mr-1 flex-shrink-0" />
                          {recipe.cookTime}
                        </div>
                        <div>
                          {recipe.ingredients} ing
                        </div>
                        <div>
                          {recipe.calories} cal
                        </div>
                        {/* <div className="font-semibold text-amber-600">
                          ${recipe.price}
                        </div> */}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          recipe.difficulty === 'Easy' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : recipe.difficulty === 'Medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {recipe.difficulty}
                        </span>
                        <Link 
                          to={`/product/${recipe.id}`}
                          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                        >
                          View Recipe
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDashboard;