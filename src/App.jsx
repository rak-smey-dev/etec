import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'
import Navbar from './Component/Navbar'
import Product from './page/Product'
import Contact from './page/Contact'
import FirstPage from './page/FirstPage'
import ViewRicipe from './page/ViewRicipe'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar - visible on all pages except FirstPage if you prefer */}
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="*" element={<WithNavbar />} />
        </Routes>
      </div>
    </Router>
  )
}

// Component that includes navbar for all other pages
const WithNavbar = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/view-recipe" element={<ViewRicipe />} />
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

// 404 Component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/home" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition duration-300"
        >
          Go to Recipes
        </Link>
      </div>
    </div>
  )
}

export default App