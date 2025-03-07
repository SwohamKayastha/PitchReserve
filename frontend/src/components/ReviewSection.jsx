import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquarePlus, Trash2, AlertTriangle } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import defaultProfileIcon from '../assets/defaultProfileIcon.png';

const ReviewSection = ({ venueId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    comment: '',
    rating: 5, // Default rating
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [hoverRating, setHoverRating] = useState(0); // Add hover rating state
  const API_URL = process.env.API_URL;

  const getCurrentUserId = () => {
    const userId = localStorage.getItem('user_id');
    console.log('Getting user ID from localStorage:', userId);
    return userId ? parseInt(userId, 10) : null;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log('No access token found');
          return;
        }

        const response = await axios.get(`${API_URL}/api/court_reviews/?court_id=${venueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('Reviews response:', response.data);
        setReviews(response.data.reviews || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [venueId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleStarMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const payload = {
        ...newReview,
        court: venueId, // Ensure the court field is included
      };
      console.log('Submitting review with payload:', payload); // Debugging line
      const response = await axios.post(
        'http://127.0.0.1:8000/api/reviews/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data); // Debugging line
      setReviews([...reviews, response.data]);
      setNewReview({ comment: '', rating: 5 }); // Reset the form
      setShowReviewModal(false);
    } catch (err) {
      console.error('Error submitting review:', err.response ? err.response.data : err.message); // Debugging line
      setError(err.message);
    }
  };

  const handleDeleteClick = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (reviewToDelete) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://127.0.0.1:8000/api/reviews/${reviewToDelete}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(reviews.filter((review) => review.id !== reviewToDelete));
        setShowDeleteConfirmation(false);
        setReviewToDelete(null);
      } catch (err) {
        console.error('Error deleting review:', err);
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="review-section bg-white rounded-lg shadow-lg p-6 mt-6 w-full" style={{ textAlign: 'left' }}>
      <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Reviews for this Futsal</h3>
      <button
        onClick={() => setShowReviewModal(true)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <MessageSquarePlus className="w-5 h-5" />
        <span>Drop a Review</span>
      </button>

      {/* Review Modal */}
      {showReviewModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-xl p-6 w-96">
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Write a Review</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Rating:</label>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={`cursor-pointer ${index < (hoverRating || newReview.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => handleStarClick(index + 1)}
                      onMouseEnter={() => handleStarMouseEnter(index + 1)}
                      onMouseLeave={handleStarMouseLeave}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Comment:</label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-xl shadow-xl focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Share your experience..."
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-xl p-6 w-96">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h4 className="text-xl font-bold">Confirm Delete</h4>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to remove your review?</p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setReviewToDelete(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Display Reviews */}
      <div className="space-y-4 mt-6">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const currentUserId = getCurrentUserId();
            const isOwner = currentUserId === review.user_id;
            
            console.log('Review comparison:', {
              reviewId: review.id,
              reviewUserId: review.user_id,
              currentUserId,
              isOwner
            });
            
            return (
              <div key={review.id} className="review border-b pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.user_profile_picture || defaultProfileIcon}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <p><strong style={{ fontFamily: 'Arial, sans-serif' }}>{review.user_name}</strong></p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => handleDeleteClick(review.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                      title="Delete review"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <p style={{ fontFamily: 'Arial, sans-serif' }} className="mt-2">{review.comment}</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    index < review.rating ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} className="text-yellow-500" />
                  ))}
                </div>
                <p style={{ fontFamily: 'Arial, sans-serif' }} className="mt-2">
                  <small>{new Date(review.created_at).toLocaleDateString()}</small>
                </p>
              </div>
            );
          })
        ) : (
          <p style={{ fontFamily: 'Arial, sans-serif' }}>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;