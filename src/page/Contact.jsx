import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create feedback object with timestamp
      const feedbackData = {
        ...formData,
        id: Date.now(), // Simple ID based on timestamp
        timestamp: new Date().toISOString(),
        status: 'unread'
      }

      // Send feedback to JSON Server
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      // Show success message
      Swal.fire({
        title: "Thank You!",
        text: "Your feedback has been submitted successfully! We appreciate your input.",
        icon: "success",
        confirmButtonColor: "#d97706",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "View All Feedback"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/feedback')
        }
      })

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })

    } catch (error) {
      console.error('Error submitting feedback:', error)
      Swal.fire({
        title: "Error!",
        text: "Failed to submit your feedback. Please try again.",
        icon: "error",
        confirmButtonColor: "#d97706"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-amber-700 dark:text-amber-300 max-w-2xl mx-auto">
            Have questions about Khmer recipes? Want to share your own traditional Cambodian dishes? 
            We'd love to hear from you!
          </p>
          <button
            onClick={() => navigate('/feedback')}
            className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition duration-300"
          >
            View All Feedback
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-amber-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 dark:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-200">Address</h3>
                  <p className="text-amber-700 dark:text-amber-300">Phnom Penh, Cambodia</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 dark:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-200">Phone</h3>
                  <p className="text-amber-700 dark:text-amber-300">+855 0977472061</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 dark:bg-gray-700 p-3 rounded-full transition-colors duration-300">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-200">Email</h3>
                  <p className="text-amber-700 dark:text-amber-300">touchchanraksmey169@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://x.com/t_chanraksmey" className="bg-amber-100 dark:bg-gray-700 hover:bg-amber-200 dark:hover:bg-gray-600 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/touchchanraksmey7?igsh=eXA4cGEwY254cmNp&utm_source=qr" className="bg-amber-100 dark:bg-gray-700 hover:bg-amber-200 dark:hover:bg-gray-600 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1Gbb7e6qZB/?mibextid=wwXIfr" className="bg-amber-100 dark:bg-gray-700 hover:bg-amber-200 dark:hover:bg-gray-600 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-amber-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amber-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition duration-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amber-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition duration-300"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-amber-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition duration-300"
                  placeholder="Tell us about your inquiry or share your recipe ideas..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-amber-900 dark:bg-gray-700 text-amber-100 py-12 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">Sharing Recipes</h3>
            <p className="text-amber-200 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Preserving and sharing the rich culinary heritage of Cambodia through authentic recipes and traditional cooking methods.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">About</a>
              <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Recipes</a>
              <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Contact</a>
            </div>
            <p className="text-amber-300 dark:text-gray-400 text-sm">© 2025 Khmer Food Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Contact