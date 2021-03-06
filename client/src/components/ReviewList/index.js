import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews.length) {
    return <h4>Be the first to write a review!</h4>
  }
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Reviews</span>
      </div>
      <div className="card-body">
        {reviews &&
        reviews.map(review => (
          <p className="pill mb-3" key={review._id}>
            {review.reviewBody}<br /><br />
              {review.username}{' '} on {review.createdAt}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

//hello