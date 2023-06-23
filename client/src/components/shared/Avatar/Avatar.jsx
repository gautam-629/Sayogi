import React from 'react'
import Stars from '../Star/Star';
import { Link } from 'react-router-dom'
const Avatar = ({ name, title, rating, img, id }) => {
  return (
    <div>
      <Link to={`/getserviceseekerprofile/${id}`}><img className='h-16 w-16 ml-3 border-4 rounded-full
         cursor-pointer object-cover border-gray-400' src={img} alt="profile" />
      </Link>
      {name && <><span className='text-textColor'>{name}</span><br /></>}
      <div className='ml-2'>
        <Stars rating={rating} />
        <span className='text-secTextColor'>({title})</span>
      </div>
    </div>
  )
}

export default Avatar;