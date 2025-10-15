import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    console.log('Fetching product with ID:', id)
    
    // Try multiple possible API endpoints
    const endpoints = [
      `http://localhost:5000/products/${id}`,
      `http://localhost:5000/api/products/${id}`,
      `http://localhost:5000/recipes/${id}`,
      `http://localhost:5000/api/recipes/${id}`
    ]

    const fetchProduct = async () => {
      try {
        for (const endpoint of endpoints) {
          try {
            console.log('Trying endpoint:', endpoint)
            const res = await axios.get(endpoint)
            if (res.data) {
              console.log('Product found:', res.data)
              setProduct(res.data)
              setLoading(false)
              return
            }
          } catch (err) {
            console.log(`Endpoint ${endpoint} failed:`, err.message)
            continue
          }
        }
        
        // If no endpoint worked, try getting all products and filtering
        console.log('Trying to fetch all products and filter...')
        const allProductsRes = await axios.get('http://localhost:5000/products')
        const foundProduct = allProductsRes.data.find(item => 
          item.id === parseInt(id) || 
          item.id === id || 
          item._id === id
        )
        
        if (foundProduct) {
          console.log('Product found in all products:', foundProduct)
          setProduct(foundProduct)
        } else {
          console.log('Product not found in all products')
          setProduct(null)
        }
      } catch (error) {
        console.error('All fetch attempts failed:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.title} to cart!`)
  }

  // For testing - create mock product data
  const mockProduct = {
    id: id,
    title: "Amok Trey",
    description: "A traditional Cambodian fish curry steamed in banana leaves with coconut milk and Khmer spices.",
    price: "15.99",
    category: "Curry",
    prepTime: "30 mins",
    cookTime: "45 mins",
    spicy: true,
    ingredients: ["Fresh fish", "Coconut milk", "Kroeung paste", "Banana leaves", "Lemon grass", "Turmeric"]
  }

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

  // Use mock data if no product found from API
  const displayProduct = product || mockProduct

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-amber-700 mb-8">
          <Link to="/" className="hover:text-amber-900 transition duration-300">Home</Link>
          <span>›</span>
          <Link to="/home" className="hover:text-amber-900 transition duration-300">Recipes</Link>
          <span>›</span>
          <span className="text-amber-900 font-semibold">{displayProduct.title}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                {displayProduct.image ? (
                  <img
                    src={displayProduct.image}
                    alt={displayProduct.title}
                    className="w-full h-96 lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-96 lg:h-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-4">🍛</span>
                      <p className="text-amber-700 font-semibold">{displayProduct.title}</p>
                      <p className="text-amber-600 text-sm mt-2">Traditional Khmer Recipe</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Favorite Button */}
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition duration-300">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                {/* Development Warning */}
                {!product && (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4">
                    <p className="text-sm">⚠️ Using mock data - API endpoint not working</p>
                  </div>
                )}

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                    {displayProduct.category || 'Khmer Cuisine'}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Traditional
                  </span>
                  {displayProduct.spicy && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      🌶️ Spicy
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-amber-900 mb-4 leading-tight">
                  {displayProduct.title}
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {displayProduct.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-amber-700">
                    ${displayProduct.price || '15.99'}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <div className="text-2xl mb-2">⏱️</div>
                    <div className="font-semibold text-amber-800">Prep Time</div>
                    <div className="text-sm text-gray-600">{displayProduct.prepTime || '30 mins'}</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="font-semibold text-amber-800">Cook Time</div>
                    <div className="text-sm text-gray-600">{displayProduct.cookTime || '45 mins'}</div>
                  </div>
                </div>

                {/* Ingredients Preview */}
                <div className="mb-6">
                  <h3 className="font-semibold text-amber-900 mb-3">Key Ingredients:</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayProduct.ingredients ? (
                      displayProduct.ingredients.slice(0, 5).map((ingredient, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {ingredient}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Fresh Fish</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Coconut Milk</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Khmer Spices</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Banana Leaves</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-amber-300 rounded-lg">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="px-4 py-2 text-amber-600 hover:bg-amber-50 transition duration-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-2 text-amber-600 hover:bg-amber-50 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                    View Recipe
                  </button>
                  <button 
                    onClick={() => navigate('/home')}
                    className="flex-1 border border-gray-400 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Back to Recipes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Recipes Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 text-center hover:shadow-xl transition duration-300 cursor-pointer">
              <div className="text-4xl mb-4">🍜</div>
              <h3 className="font-semibold text-amber-800 mb-2">Nom Banh Chok</h3>
              <p className="text-gray-600 text-sm mb-4">Traditional Khmer noodles</p>
              <span className="text-amber-700 font-bold">$12.99</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 text-center hover:shadow-xl transition duration-300 cursor-pointer">
              <div className="text-4xl mb-4">🥘</div>
              <h3 className="font-semibold text-amber-800 mb-2">Amok Trey</h3>
              <p className="text-gray-600 text-sm mb-4">Fish coconut curry</p>
              <span className="text-amber-700 font-bold">$14.99</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 text-center hover:shadow-xl transition duration-300 cursor-pointer">
              <div className="text-4xl mb-4">🍖</div>
              <h3 className="font-semibold text-amber-800 mb-2">Bai Sach Chrouk</h3>
              <p className="text-gray-600 text-sm mb-4">Pork and rice</p>
              <span className="text-amber-700 font-bold">$10.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product