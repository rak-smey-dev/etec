import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then(res => {
        console.log('API Data received:', res.data)
        // Replace all image URLs with reliable placeholders
        const fixedData = res.data.map(item => ({
          ...item,
          image: getPlaceholderImage(item.title, item.category)
        }))
        setData(fixedData)
        setLoading(false)
      })
      .catch(err => {
        console.log('API Error:', err)
        setLoading(false)
      })
  }, [])

  // Filter products based on search term
  const filteredData = data.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get reliable placeholder image based on dish name
  const getPlaceholderImage = (title, category) => {
    const foodImages = {
      'Beef Lok Lak': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
      'Fish Amok': 'https://images.unsplash.com/photo-1563379091339-03246963d96f?w=300&h=200&fit=crop',
      'Nom Banh Chok': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop',
      'Khmer Red Curry': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop',
      'Prahok Ktis': 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=300&h=200&fit=crop',
      'Sticky Rice with Mango': 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=200&fit=crop',
      'Samlor Korkor': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop',
      'Khmer Noodles Soup': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
      'Crispy Fried Spring Rolls': 'https://images.unsplash.com/photo-1589606663978-c0c41a32d320?w=300&h=200&fit=crop'
    }
    
    // Return specific image if available, otherwise generic food image
    return foodImages[title] || `https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop&text=${encodeURIComponent(title)}`
  }

  const handleViewRecipe = (itemId) => {
    navigate(`/product/${itemId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header with Hero Section */}
      <header className="relative bg-gradient-to-r from-amber-900 to-orange-800 text-white overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            Khmer Food Recipes
          </h1>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto leading-relaxed">
            សូមស្វាគមន៍មកកាន់ហាងម្ហូបខ្មែរយើងខ្ញុំ ❤️ 
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
                className="w-full px-6 py-4 rounded-full border-2 border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200 text-gray-800 placeholder-gray-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-700">{data.length}+</div>
              <div className="text-sm text-gray-600">Recipes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">100%</div>
              <div className="text-sm text-gray-600">Authentic</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">ស្រស់</div>
              <div className="text-sm text-gray-600">Fresh Ingredients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">👑</div>
              <div className="text-sm text-gray-600">Royal Recipes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Traditional Khmer Recipes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of authentic Cambodian dishes passed down through generations. 
            Each recipe tells a story of our rich cultural heritage.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-100 hover:translate-y-[-4px] group"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    // Ultimate fallback - show gradient background with emoji
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback in case image fails */}
                <div className=" w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 flex flex-col items-center justify-center p-4">
                  <span className="text-4xl mb-2">🍛</span>
                  <span className="text-sm text-amber-700 font-semibold text-center">{item.title}</span>
                  <span className="text-xs text-amber-600 mt-1">{item.category}</span>
                </div>
                
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ${item.price}
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-amber-900 mb-2 line-clamp-1">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">Khmer</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Traditional</span>
                  {item.category && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{item.category}</span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => handleViewRecipe(item.id)}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Recipe
                  </button>
                  
                  <button className="p-2 text-amber-600 hover:bg-amber-100 rounded-full transition duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <footer className="bg-amber-900 text-amber-100 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">🍛 ហាងម្ហូបខ្មែរ</h3>
          <p className="text-amber-200 mb-6 max-w-md mx-auto">
            Preserving and sharing the rich culinary heritage of Cambodia through authentic recipes and traditional cooking methods.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-amber-200 hover:text-white transition duration-300">About</a>
            <a href="#" className="text-amber-200 hover:text-white transition duration-300">Recipes</a>
            <a href="#" className="text-amber-200 hover:text-white transition duration-300">Contact</a>
          </div>
          <p className="text-amber-300 text-sm">© 2025 Khmer Food Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home