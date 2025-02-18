import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react'; // Adjust as needed
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import defaultProfileIcon from '../assets/defaultProfileIcon.png'; // Import default profile icon

const ReviewSection = ({ venueId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    comment: '',
    rating: 5, // Default rating
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:8000/api/court_reviews/?court_id=${venueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data.reviews || []); // Ensure the correct data is set and handle undefined
      } catch (err) {
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

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="review-section bg-white rounded-lg shadow-lg p-6 mt-6" style={{ textAlign: 'left' }}>
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
          <div className="bg-white rounded-lg p-6 w-96">
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Write a Review</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Comment:</label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Share your experience..."
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Rating:</label>
                <select
                  name="rating"
                  value={newReview.rating}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Display Reviews */}
      <div className="space-y-4 mt-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={review.user_profile_picture || defaultProfileIcon} // Use default profile icon if user_profile_picture is not available
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <p><strong style={{ fontFamily: 'Arial, sans-serif' }}>{review.user_name}</strong></p> {/* Display user_name instead of user */}
              </div>
              <p style={{ fontFamily: 'Arial, sans-serif' }}>{review.comment}</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  index < review.rating ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} className="text-yellow-500" />
                ))}
              </div>
              <p style={{ fontFamily: 'Arial, sans-serif' }}><small>{new Date(review.created_at).toLocaleDateString()}</small></p>
            </div>
          ))
        ) : (
          <p style={{ fontFamily: 'Arial, sans-serif' }}>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;