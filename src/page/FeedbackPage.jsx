import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaUser, FaCalendar, FaEye, FaEyeSlash, FaTrash, FaSearch } from 'react-icons/fa'
import Swal from 'sweetalert2'

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)

  // Load feedback from localStorage on component mount
  useEffect(() => {
    const loadFeedback = () => {
      try {
        setLoading(true)
        const savedFeedback = JSON.parse(localStorage.getItem('feedback')) || []
        
        console.log('Loaded feedback from localStorage:', savedFeedback)
        
        // Sort by timestamp (newest first)
        const sortedData = savedFeedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        setFeedback(sortedData)
      } catch (err) {
        console.error('Error loading feedback:', err)
        setError('Failed to load feedback from local storage.')
      } finally {
        setLoading(false)
      }
    }

    loadFeedback()
  }, [])

  // Save feedback to localStorage whenever it changes
  useEffect(() => {
    if (feedback.length > 0) {
      localStorage.setItem('feedback', JSON.stringify(feedback))
    }
  }, [feedback])

  // Mark feedback as read/unread
  const toggleReadStatus = (id, currentStatus) => {
    try {
      setUpdatingId(id)
      
      const newStatus = currentStatus === 'read' ? 'unread' : 'read'
      console.log(`Updating feedback ${id} from ${currentStatus} to ${newStatus}`)

      // Update local state
      setFeedback(prev => prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ))

      Swal.fire({
        title: "Success!",
        text: `Feedback marked as ${newStatus}.`,
        icon: "success",
        confirmButtonColor: "#d97706",
        timer: 1500
      })

    } catch (err) {
      console.error('Error updating status:', err)
      Swal.fire({
        title: "Error!",
        text: `Failed to update feedback status: ${err.message}`,
        icon: "error",
        confirmButtonColor: "#d97706"
      })
    } finally {
      setUpdatingId(null)
    }
  }

  // Delete feedback
  const deleteFeedback = (id, name) => {
    const result = Swal.fire({
      title: 'Are you sure?',
      text: `Delete feedback from ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    result.then((confirmed) => {
      if (confirmed.isConfirmed) {
        try {
          console.log(`Deleting feedback ${id}`)
          
          // Remove from local state
          setFeedback(prev => prev.filter(item => item.id !== id))

          Swal.fire({
            title: "Deleted!",
            text: "Feedback has been deleted.",
            icon: "success",
            confirmButtonColor: "#d97706",
            timer: 1500
          })
        } catch (err) {
          console.error('Error deleting feedback:', err)
          Swal.fire({
            title: "Error!",
            text: `Failed to delete feedback: ${err.message}`,
            icon: "error",
            confirmButtonColor: "#d97706"
          })
        }
      }
    })
  }

  // Filter feedback based on search and status
  const filteredFeedback = feedback.filter(item => {
    if (!item) return false
    
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (err) {
      return 'Invalid date'
    }
  }

  // Get unread count safely
  const unreadCount = feedback.filter(f => f?.status === 'unread').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading feedback...</p>
        </div>
      </div>
    )
  }

  // Update the error message to remove JSON Server reference
  const displayError = error ? error.replace('JSON Server', 'local storage') : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/contact"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Contact
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Feedback</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and review all customer feedback and inquiries
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                {unreadCount} Unread
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {feedback.length} Total
              </span>
            </div>
          </div>
        </div>

        {/* Debug Info - Remove server reference */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Note:</strong> Feedback is stored locally in your browser.
            </p>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {displayError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{displayError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
    
  )
}
// At the end of the file
export default FeedbackPage;