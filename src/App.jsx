// App.jsx - CORRECT with ThemeProvider
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx' // Fixed extension
import { ThemeProvider } from './ThemeContext.jsx'; // Import ThemeProvider
import ScrollToTop from './Component/SmoothLink.jsx';

// Import all pages with .jsx extension
import Contact from './page/Contact.jsx'
import Product from './page/Product.jsx'
import RecipeDashboard from './page/RecipeDashboard.jsx'
import FeedbackPage from './page/FeedbackPage.jsx'
import NewRecipe from './page/NewRecipe.jsx'
import FirstPage from './page/FirstPage.jsx'
import About from './page/About.jsx'
function App() {
  return (
    // Wrap with ThemeProvider if using theme
    <ThemeProvider>
      <Router>
        <ScrollToTop /> 
        <Routes>
          <Route path="/home" element={<Layout><FirstPage /></Layout>} />
          <Route path="/" element={<Layout><FirstPage /></Layout>} /> 
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/product/:id" element={<Layout><Product /></Layout>} />
          <Route path="/recipes" element={<Layout><RecipeDashboard /></Layout>} />
          <Route path="/feedback" element={<Layout><FeedbackPage /></Layout>} />
          <Route path="/new-recipe" element={<Layout><NewRecipe /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;