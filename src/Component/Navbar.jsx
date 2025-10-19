import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }
  

  return (
    <nav className="bg-amber-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍛</span>
            <span className="text-white font-bold text-xl">ហាងម្ហូបខ្មែរ</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActive('/') 
                  ? 'bg-amber-700 text-white' 
                  : 'text-amber-100 hover:bg-amber-800 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/home" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActive('/home') 
                  ? 'bg-amber-700 text-white' 
                  : 'text-amber-100 hover:bg-amber-800 hover:text-white'
              }`}
            >
              Recipes
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActive('/about') 
                  ? 'bg-amber-700 text-white' 
                  : 'text-amber-100 hover:bg-amber-800 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link 
              to="/products" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActive('/products') 
                  ? 'bg-amber-700 text-white' 
                  : 'text-amber-100 hover:bg-amber-800 hover:text-white'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                isActive('/contact') 
                  ? 'bg-amber-700 text-white' 
                  : 'text-amber-100 hover:bg-amber-800 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-100 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-amber-800">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/home" 
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Recipes
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/products" 
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar