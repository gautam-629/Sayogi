import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingInput = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    if (rating === value) {
      // If the same rating is clicked again, reset to 0
      setRating(0);
    } else {
      setRating(value);
    }
  };

  return (
    <div className="rating flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 0.5;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              className="sr-only"
            />
            {ratingValue <= rating ? (
              <FaStar className="text-yellow-500" size={20} />
            ) : ratingValue - rating === 0.5 ? (
              <FaStarHalfAlt className="text-yellow-500" size={20} />
            ) : (
              <FaStar className="text-gray-300" size={20} />
            )}
          </label>
        );
      })}
      {/* <div className="selected-rating ml-3 text-lg font-semibold">{rating}</div> */}
    </div>
  );
};

export default RatingInput;
