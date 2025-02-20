import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import defaultProfileIcon from '../assets/defaultProfileIcon.png';

const OwnerReviewSection = ({ venueId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log('No access token found');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/court_reviews/?court_id=${venueId}`, {
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

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="review-section bg-white rounded-2xl shadow-lg p-6 mt-6 w-full">
      <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Customer Reviews</h3>
      
      {/* Display Reviews */}
      <div className="space-y-4 mt-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={review.user_profile_picture || defaultProfileIcon}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <p><strong style={{ fontFamily: 'Arial, sans-serif' }}>{review.user_name}</strong></p>
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
          ))
        ) : (
          <p style={{ fontFamily: 'Arial, sans-serif' }}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerReviewSection;
