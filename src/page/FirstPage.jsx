import React from 'react'
import { useNavigate } from 'react-router-dom'

const FirstPage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d97706' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-16 px-4">
        <div className="inline-block bg-amber-100 rounded-full p-4 mb-8 shadow-lg">
          <span className="text-6xl">🍛</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4">
          ហាងម្ហូបខ្មែរ
        </h1>
        <p className="text-2xl md:text-3xl text-amber-700 mb-2">
          Khmer Recipes
        </p>
        <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Message */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-200 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6">
              សូមស្វាគមន៍! Welcome!
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Discover the rich and flavorful world of authentic Cambodian cuisine. 
              From traditional family recipes to royal palace dishes, explore the taste of Cambodia.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-3xl mb-4">👑</div>
                <h3 className="font-semibold text-amber-800 mb-2">Authentic Recipes</h3>
                <p className="text-sm text-gray-600">Traditional Cambodian dishes passed through generations</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-3xl mb-4">🌶️</div>
                <h3 className="font-semibold text-amber-800 mb-2">Rich Flavors</h3>
                <p className="text-sm text-gray-600">Experience the unique blend of spices and herbs</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-3xl mb-4">👩‍🍳</div>
                <h3 className="font-semibold text-amber-800 mb-2">Easy to Follow</h3>
                <p className="text-sm text-gray-600">Step-by-step instructions for perfect results</p>
              </div>
            </div>

            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xl py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Cooking 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Quick Preview */}
          <div className="bg-amber-900/90 text-amber-50 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">What You'll Discover</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-4 bg-amber-800/50 rounded-xl">
                <div className="text-2xl mb-2">🍜</div>
                <div>Nom Banh Chok</div>
              </div>
              <div className="text-center p-4 bg-amber-800/50 rounded-xl">
                <div className="text-2xl mb-2">🥘</div>
                <div>Amok Trey</div>
              </div>
              <div className="text-center p-4 bg-amber-800/50 rounded-xl">
                <div className="text-2xl mb-2">🍖</div>
                <div>Bai Sach Chrouk</div>
              </div>
              <div className="text-center p-4 bg-amber-800/50 rounded-xl">
                <div className="text-2xl mb-2">🍲</div>
                <div>Samlor Machu</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8 px-4">
        <p className="text-amber-700/80 text-sm">
          Preserving Cambodian culinary heritage one recipe at a time
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <span className="text-xs text-amber-600">Traditional</span>
          <span className="text-xs text-amber-600">Authentic</span>
          <span className="text-xs text-amber-600">Delicious</span>
        </div>
      </footer>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-bounce">
        <div className="text-4xl opacity-20">🥬</div>
      </div>
      <div className="absolute top-1/3 right-16 animate-pulse">
        <div className="text-4xl opacity-20">🍚</div>
      </div>
      <div className="absolute bottom-1/4 left-20 animate-bounce delay-1000">
        <div className="text-4xl opacity-20">🌶️</div>
      </div>
      <div className="absolute bottom-1/3 right-10 animate-pulse delay-500">
        <div className="text-4xl opacity-20">🐟</div>
      </div>
    </div>
  )
}

export default FirstPage