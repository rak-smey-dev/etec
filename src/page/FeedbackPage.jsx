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
  const [updatingId, setUpdatingId] = useState(null) // Track which item is being updated

  // Fetch feedback from JSON Server
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/feedback')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Fetched feedback:', data) // Debug log
        
        // Sort by timestamp (newest first)
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        setFeedback(sortedData)
      } catch (err) {
        console.error('Error fetching feedback:', err)
        setError(`Failed to load feedback: ${err.message}. Make sure JSON Server is running on port 5000.`)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  // Mark feedback as read/unread - FIXED
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      setUpdatingId(id)
      
      const newStatus = currentStatus === 'read' ? 'unread' : 'read'
      console.log(`Updating feedback ${id} from ${currentStatus} to ${newStatus}`)

      const response = await fetch(`http://localhost:5000/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: newStatus,
          // Include all required fields to avoid validation issues
          name: feedback.find(f => f.id === id)?.name,
          email: feedback.find(f => f.id === id)?.email,
          subject: feedback.find(f => f.id === id)?.subject,
          message: feedback.find(f => f.id === id)?.message,
          timestamp: feedback.find(f => f.id === id)?.timestamp
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server responded with ${response.status}: ${errorText}`)
      }

      const updatedItem = await response.json()
      console.log('Update response:', updatedItem)

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

  // Delete feedback - FIXED
  const deleteFeedback = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete feedback from ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        console.log(`Deleting feedback ${id}`)
        
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Server responded with ${response.status}: ${errorText}`)
        }

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
  }

  // Alternative: Update without API call (client-side only)
  const toggleReadStatusLocal = (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read'
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
    
    Swal.fire({
      title: "Updated!",
      text: `Feedback marked as ${newStatus}.`,
      icon: "success",
      confirmButtonColor: "#d97706",
      timer: 1500
    })
  }

  // Alternative: Delete without API call (client-side only)
  const deleteFeedbackLocal = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete feedback from ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFeedback(prev => prev.filter(item => item.id !== id))
        Swal.fire({
          title: "Deleted!",
          text: "Feedback has been deleted.",
          icon: "success",
          confirmButtonColor: "#d97706",
          timer: 1500
        })
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

        {/* Debug Info */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Debug:</strong> Loaded {feedback.length} feedback items. 
              Server: http://localhost:5000/feedback
            </p>
          </div>
        )} */}

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
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center border border-gray-200 dark:border-gray-700">
              <FaEnvelope className="text-gray-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No feedback found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No feedback has been submitted yet.'}
              </p>
              {feedback.length === 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Make sure your JSON Server is running with feedback data.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400"
                  >
                    Go to Contact page to submit feedback
                  </Link>
                </div>
              )}
            </div>
          ) : (
            filteredFeedback.map((item) => (
              <div
                key={item.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all duration-300 ${
                  item.status === 'unread' 
                    ? 'border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/10' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-lg font-semibold ${
                          item.status === 'unread' 
                            ? 'text-amber-900 dark:text-amber-100' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {item.subject || 'No Subject'}
                        </h3>
                        {item.status === 'unread' && (
                          <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-medium">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          <span>{item.name || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaEnvelope className="w-3 h-3" />
                          <span>{item.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendar className="w-3 h-3" />
                          <span>{formatDate(item.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleReadStatus(item.id, item.status)}
                        disabled={updatingId === item.id}
                        className={`p-2 rounded-lg transition-colors ${
                          item.status === 'unread'
                            ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } ${updatingId === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={item.status === 'unread' ? 'Mark as read' : 'Mark as unread'}
                      >
                        {updatingId === item.id ? (
                          <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : item.status === 'unread' ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                      <button
                        onClick={() => deleteFeedback(item.id, item.name)}
                        className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                        title="Delete feedback"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {item.message || 'No message content'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage