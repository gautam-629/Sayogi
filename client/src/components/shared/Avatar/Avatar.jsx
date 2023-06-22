import React from 'react'
import Stars from '../Star/Star';

const Avatar = ({name,title}) => {
  return (
    <div>
        <img className='h-16 w-16 ml-3 border-4 rounded-full
         cursor-pointer object-cover border-gray-400' src="/img/elon.jpg" alt="profile" />
         <span className='text-textColor'>{name}</span> <br />
         <div className='ml-2'>
         <Stars rating={4}/>
         <span className='text-secTextColor'>({title})</span>
         </div>
    </div>
  )
}

export default Avatar;