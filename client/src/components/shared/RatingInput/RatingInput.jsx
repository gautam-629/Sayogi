import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { createReview } from '../../../http';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const RatingInput = ({userId}) => {
  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  const sucessNotify = (msg) => toast.success(`${msg}!`);
  const [rating, setRating] = useState(0);
  const { accessToken } = useSelector((state) => state.auth.token);
  const handleClick = async (value) => {
    if (rating === value) {
      // If the same rating is clicked again, reset to 0
      setRating(0);
    } else {
      setRating(value);
    }
 
     try {
        const res=await createReview(rating,userId,accessToken)
        if(res.data){
          sucessNotify("Thank you for your rating")
        }
     } catch (error) {
      console.log(error)
      errorNotify('Sorry Something went Wrong');
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
      {console.log(rating)}
    </div>
  );
};

export default RatingInput;
