import React, { useState } from "react";

const ReviewFilter = ({ reviews }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleRatingChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    selectedRatings.length ? selectedRatings.includes(review.rating) : true
  );

  return (
    <div className="review-section">
      <div className="filter-options">
        <h3>Filter by Rating</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="star-label">
            <input
              type="checkbox"
              value={rating}
              onChange={() => handleRatingChange(rating)}
            />
            <span className="stars">
              {"★".repeat(rating) + "☆".repeat(5 - rating)}
            </span>
          </label>
        ))}
      </div>
      <div className="review-list">
        {filteredReviews.map((review, index) => (
          <div key={index} className="review">
            <h3>{review.title}</h3>
            <p>
              <span className="stars">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </span>
            </p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewFilter;
