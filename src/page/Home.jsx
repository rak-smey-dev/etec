import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { products } from '../data'

const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Safe category extraction with error handling
  const categories = React.useMemo(() => {
    try {
      if (!products || !Array.isArray(products)) {
        return ['All']
      }
      const uniqueCategories = [...new Set(products
        .filter(item => item && item.category && typeof item.category === 'string')
        .map(item => item.category.trim())
        .filter(Boolean)
      )]
      return ['All', ...uniqueCategories]
    } catch (err) {
      console.error('Error extracting categories:', err)
      return ['All']
    }
  }, [])

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (!products || !Array.isArray(products)) {
          throw new Error('Invalid products data')
        }

        const fixedData = products
          .filter(item => item && typeof item === 'object')
          .map(item => {
            const safeItem = {
              ...item,
              id: item.id || Math.random().toString(36).substr(2, 9),
              title: item.title || 'Untitled Recipe',
              description: item.description || 'No description available',
              category: item.category || 'Uncategorized',
              recipe: item.recipe || '',
              price: item.price || 0
            }
            
            return {
              ...safeItem,
              // image: getPlaceholderImage(safeItem.title),
              parsedRecipe: parseRecipeData(safeItem.recipe)
            }
          })

        setData(fixedData)
      } catch (err) {
        console.error('Error initializing data:', err)
        setError('Failed to load recipes. Please try again later.')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    initializeData()
  }, [])

  // Robust recipe parsing with error handling
  const parseRecipeData = (recipeText) => {
    try {
      if (!recipeText || typeof recipeText !== 'string') {
        return { ingredients: [], instructions: [] }
      }

      const lines = recipeText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
      
      if (lines.length === 0) {
        return { ingredients: [], instructions: [] }
      }

      const ingredientsStart = lines.findIndex(line => 
        line.toLowerCase().includes('ingredients')
      )
      const instructionsStart = lines.findIndex(line => 
        line.toLowerCase().includes('instructions')
      )

      let ingredients = []
      let instructions = []

      if (ingredientsStart === -1 || instructionsStart === -1) {
        ingredients = lines.filter(line => 
          line.startsWith('- ') || line.startsWith('• ') || line.match(/^[*-]\s/)
        ).map(line => line.replace(/^[-•*]\s*/, '').trim())
        
        instructions = lines.filter(line => 
          line.match(/^\d+\./) || line.match(/^step\s*\d+/i)
        ).map(line => line.replace(/^\d+\.\s*/, '').replace(/^step\s*\d+\s*:?\s*/i, '').trim())
      } else {
        ingredients = lines.slice(ingredientsStart + 1, instructionsStart)
          .filter(line => line.startsWith('- ') || line.startsWith('• ') || line.match(/^[*-]\s/) || line.match(/^\d+\./))
          .map(line => line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
          .filter(line => line.length > 0)

        instructions = lines.slice(instructionsStart + 1)
          .filter(line => line.match(/^\d+\./) || line.match(/^step\s*\d+/i) || line.startsWith('- '))
          .map(line => line.replace(/^\d+\.\s*/, '').replace(/^step\s*\d+\s*:?\s*/i, '').replace(/^-\s*/, '').trim())
          .filter(line => line.length > 0)
      }

      if (instructions.length === 0 && lines.length > 0) {
        const startIndex = Math.max(ingredientsStart, instructionsStart) + 1
        if (startIndex < lines.length) {
          instructions = lines.slice(startIndex).filter(line => line.length > 0)
        }
      }

      return { 
        ingredients: ingredients.length > 0 ? ingredients : ['No ingredients listed'], 
        instructions: instructions.length > 0 ? instructions : ['No instructions available'] 
      }
    } catch (err) {
      console.error('Error parsing recipe:', err)
      return { 
        ingredients: ['Error loading ingredients'], 
        instructions: ['Error loading instructions'] 
      }
    }
  }

  // Safe filtering with null checks
  const filteredData = React.useMemo(() => {
    try {
      return data.filter(item => {
        if (!item) return false
        
        const searchLower = searchTerm.toLowerCase().trim()
        if (!searchLower) {
          return selectedCategory === 'All' || item.category === selectedCategory
        }
        
        const matchesSearch = 
          (item.title?.toLowerCase() || '').includes(searchLower) ||
          (item.description?.toLowerCase() || '').includes(searchLower) ||
          (item.category?.toLowerCase() || '').includes(searchLower)
        
        const matchesCategory = 
          selectedCategory === 'All' || 
          item.category === selectedCategory
        
        return matchesSearch && matchesCategory
      })
    } catch (err) {
      console.error('Error filtering data:', err)
      return []
    }
  }, [data, searchTerm, selectedCategory])

  // SIMPLIFIED: Get reliable image URL
  // const getPlaceholderImage = (title) => {
  //   const foodImages = {
  //     'Beef Lok Lak': 'https://www.visit-angkor.org/wp-content/uploads/2024/03/beef-lok-lak-cambodia.jpg',
  //     'Fish Amok': 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSB-fAmvFc9mosZptiv5pNfzdbgOcyzkHIFiP2EuSmhgoviiWrQzQocySLRZizCfH6z8F-pZhkgPVNfdxMJMjD8XbMfZdi2HtOypk0oGA',
  //     'Nom Banh Chok': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnMt-6xkjh_R8Vo3PkjVDmDden9F787X_Hg&s',
  //     'Khmer Red Curry': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjA9plmXG-wYO8PzDTG5sX5Sjo-bR1ISZdEcKDE-cYWGAQpK_X3L2Fb8p1VcdtpZtyt8&usqp=CAU',
  //     'Prahok Ktis': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VZ4zycpXYmT3_DURKfaaKdysoYWaMaK8Lw&s',
  //     'Sticky Rice with Mango': 'https://rakskitchen.net/wp-content/uploads/2024/06/mango-sticky-rice-thai.jpg',
  //     'Samlor Korkor': 'https://toursbyjeeps.com/wp-content/uploads/2020/12/Untitled-1.jpg',
  //     'Khmer Noodles Soup (Kuy Teav)': 'https://www.foodnetwork.com/content/dam/images/food/fullset/2022/01/19/FN_kuy-teav-deana-saukam_s4x3.jpg',
  //     'Crispy Fried Spring Rolls': 'https://thai-foodie.com/wp-content/uploads/2023/07/thai-egg-rolls-redo.jpg',
  //     'Cambodian Iced Coffee': 'https://i.pinimg.com/736x/ea/3f/78/ea3f781f81bc8f1f3e411c19ca800c28.jpg',
  //     'Cambodian Mango Salad': 'https://grantourismotravels.com/wp-content/uploads/2021/10/Burmese-Green-Mango-Salad-Recipe-Copyright-2022-Terence-Carter-Grantourismo-T-480x270.jpg',
  //     'Cambodian Beef Skewers (Sach Ko Ang)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgVOZWJ52MfHuu3MneqOHTeuWxXOndPtRjDCv7dGAXvITNPbtBbogU3mglmP9sjN1SCeM&usqp=CAU',
  //     'Cambodian Pumpkin Custard (Sankhya Lapov)': 'https://www.indochinatour.com/assets/images/Cambodia-/cambodia-sankhya-lapov.jpg',
  //     'Cambodian Fried Rice (Bai Cha)': 'https://www.jozmahal.com/wp-content/uploads/2023/11/pork-fried-rice-featured.jpg',
  //     'Cambodian Banana Fritters ': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCsx1n6HiA0lSBqiSRRAMJ6YDBzkoRkPIZhhFGK-bTuJUAC5Ycl_GPCLNqpOrah0Tyk30&usqp=CAU',
  //     'Samlor Machu Kroeung': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzsrRRN3H_Vo8Z4rsMCjCTU2GkZXcO_5NJhBKj_pmWt54RUVYymr9FihkhqchQSvShWIDAKS4cxr92aojBvVenDNg7Q9DIoM95kgTGCOs349eGvvXCJ6MvzNLG6pE2D3I98N1g9jLpX2oy/s1600/DSC_0048.JPG',
  //     'Bai Sach Chrouk': 'https://i.ytimg.com/vi/OUP55SzZPgk/maxresdefault.jpg',
  //     'Cambodian Sweet Sticky Rice with Coconut (Bai Domneab)': 'https://i.ytimg.com/vi/QcFa8-tSBEA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDWFh8WkmtDWHnYrAURFKComtegfA',
  //     'Cambodian Grilled Chicken (Sach Moan)': 'https://summeryule.com/wp-content/uploads/2022/02/ninja-foodi-whole-chicken-500x500.jpeg',
  //     'Cambodian Coconut Pancakes (Num Plae Ai)': 'https://i0.wp.com/flavourfullygood.com/wp-content/uploads/2022/07/Num-Plae-Ai-3-Flavourfully-Good-e1663339351470.jpg?fit=2400%2C1600&ssl=1',
  //   }
    
  //   const safeTitle = title || 'Food'
  //   return foodImages[safeTitle] || `https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&text=${encodeURIComponent(safeTitle)}`
  // }

  // SIMPLIFIED: Always use reliable Unsplash images
  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop";
  }

  const handleViewRecipe = (itemId) => {
    if (!itemId) {
      console.error('Invalid item ID')
      return
    }
    navigate(`/product/${itemId}`)
  }

  // SIMPLIFIED: Basic image error handling
  const handleImageError = (e) => {
    console.log('Image failed to load, using fallback');
    e.target.src = getFallbackImage();
    e.target.onerror = null; // Prevent infinite loop
  }

  // Fix SVG background pattern
  const backgroundPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">Error Loading Recipes</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header with Hero Section */}
      <header className="relative bg-gradient-to-r from-amber-900 to-orange-800 dark:from-gray-800 dark:to-gray-900 text-white overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: backgroundPattern }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            Khmer Food Recipes
          </h1>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto leading-relaxed">
            សូមស្វាគមន៍មកកាន់រូបមន្តអាហារខ្មែរយើងខ្ញុំ ❤️
            <br />Discover the authentic taste of Cambodia
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200 text-gray-800 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-amber-400 dark:placeholder-gray-400 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="max-w-md mx-auto mt-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                      : 'bg-white dark:bg-gray-800 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-8 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group">
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">{data.length}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Recipes</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Authentic</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">ស្រស់</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fresh Ingredients</div>
            </div>
            <div className="group">
              <div className="text-3xl mb-4 w-9 h-9 mx-auto font-bold text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/crown.png" alt="" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Royal Recipes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">Traditional Khmer Recipes</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collection of authentic Cambodian dishes passed down through generations. 
            Each recipe tells a story of our rich cultural heritage.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 dark:border-amber-400"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🍜</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No recipes found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords</p>
          </div>
        )}

        {/* Product Grid - SIMPLIFIED IMAGE HANDLING */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100 dark:border-gray-700 hover:translate-y-[-4px] group cursor-pointer"
              onClick={() => handleViewRecipe(item.id)}
            >
              {/* SIMPLIFIED: Image section */}
              <div className="relative overflow-hidden h-48 bg-amber-100 dark:bg-gray-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2 line-clamp-1">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Recipe Stats */}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <span className="text-amber-500">🥕</span>
                    {item.parsedRecipe?.ingredients?.length || 0} ingredients
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-amber-500">👨‍🍳</span>
                    {item.parsedRecipe?.instructions?.length || 0} steps
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-2 py-1 rounded text-xs">Khmer</span>
                  <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs">Traditional</span>
                  {item.category && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">{item.category}</span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewRecipe(item.id)
                    }}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Recipe
                  </button>
                  
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-full transition duration-300 group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-gray-900 text-amber-100 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">🍛 រូបមន្តអាហារខ្មែរ</h3>
          <p className="text-amber-200 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Preserving and sharing the rich culinary heritage of Cambodia through authentic recipes and traditional cooking methods.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">About</a>
            <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Recipes</a>
            <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Contact</a>
          </div>
          <p className="text-amber-300 dark:text-gray-400 text-sm">©2025 Khmer Food Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home