import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Stars = ({ rating, review }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        {/* <span className="mr-1">{rating}</span> */}
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400">
            {index < fullStars ? (
              <FaStar />
            ) : index === fullStars && hasHalfStar ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </div>
      {/* <p>{review}</p> */}
    </div>
  );
};

export default Stars;
