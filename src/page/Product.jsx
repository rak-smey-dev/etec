import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/products/${id}`)
        
        if (!response.ok) {
          throw new Error('Product not found')
        }
        
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Product not found')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🍜</div>
          <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2">Recipe Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The recipe you're looking for doesn't exist.</p>
          <Link 
            to="/recipes" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    )
  }

  // Parse the recipe text more robustly
  const parseRecipe = (recipeText) => {
    if (!recipeText) {
      return { ingredients: [], instructions: [] }
    }
    
    const lines = recipeText.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    
    const ingredientsStart = lines.findIndex(line => line.toLowerCase().includes('ingredients'))
    const instructionsStart = lines.findIndex(line => line.toLowerCase().includes('instructions'))
    
    let ingredients = []
    let instructions = []
    
    if (ingredientsStart !== -1 && instructionsStart !== -1) {
      // Extract ingredients (lines between "Ingredients:" and "Instructions:")
      ingredients = lines.slice(ingredientsStart + 1, instructionsStart)
        .filter(line => line.startsWith('- ') || line.match(/^\d+\./) || line.startsWith('• '))
        .map(line => line.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, ''))
      
      // Extract instructions (lines after "Instructions:")
      instructions = lines.slice(instructionsStart + 1)
        .filter(line => line.match(/^\d+\./))
        .map(line => line.replace(/^\d+\.\s*/, ''))
    } else {
      // Fallback: if no clear sections, treat all lines as ingredients
      ingredients = lines
        .filter(line => line.startsWith('- ') || line.startsWith('• '))
        .map(line => line.replace(/^[-•]\s*/, ''))
      
      instructions = lines
        .filter(line => line.match(/^\d+\./))
        .map(line => line.replace(/^\d+\.\s*/, ''))
    }
    
    return { ingredients, instructions }
  }

  const { ingredients, instructions } = parseRecipe(product.recipe)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            to="/recipes" 
            className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition duration-300 mb-4 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">{product.title}</h1>
          <p className="text-xl text-amber-700 dark:text-amber-300 max-w-2xl mx-auto">{product.description}</p>
        </div>

        {/* Image */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8 transition-colors duration-300">
          <div className="relative h-96">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                // Create fallback element if it doesn't exist
                if (!e.target.nextSibling) {
                  const fallback = document.createElement('div')
                  fallback.className = 'w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 dark:from-gray-600 dark:to-gray-700 flex flex-col items-center justify-center p-4 absolute inset-0'
                  fallback.innerHTML = `
                    <span class="text-6xl mb-4">🍛</span>
                    <span class="text-xl text-amber-700 dark:text-amber-300 font-semibold text-center">${product.title}</span>
                  `
                  e.target.parentNode.appendChild(fallback)
                }
              }}
            />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
              {product.category}
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center">
              <span className="text-3xl mr-3">🥕</span>
              Ingredients
            </h2>
            {ingredients.length > 0 ? (
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No ingredients listed.</p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center">
              <span className="text-3xl mr-3">👨‍🍳</span>
              Instructions
            </h2>
            {instructions.length > 0 ? (
              <ol className="space-y-4">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex bg-amber-500 text-white text-sm font-bold w-6 h-6 rounded-full items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                <p>No instructions listed.</p>
                <pre className="whitespace-pre-wrap mt-4 font-sans text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  {product.recipe}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Full Recipe Text (Fallback) */}
        {(ingredients.length === 0 || instructions.length === 0) && product.recipe && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-gray-700 mt-8">
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">Full Recipe</h2>
            <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {product.recipe}
            </pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-gray-700 text-amber-100 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Sharing Recipes</h3>
          <p className="text-amber-200 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Preserving and sharing the rich culinary heritage of Cambodia through authentic recipes and traditional cooking methods.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/about" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">About</Link>
            <Link to="/recipes" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Recipes</Link>
            <Link to="/contact" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Contact</Link>
          </div>
          <p className="text-amber-300 dark:text-gray-400 text-sm">© 2025 Khmer Food Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Product