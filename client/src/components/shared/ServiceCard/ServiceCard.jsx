import React, { useState } from 'react';
import Kcomments from '../KComments/Kcomments';

const ServiceCard = ({service}) => {
  
  const [open,setOpen]=useState(false);
  return (
    <>
      <div className='bg-secBackColor w-96 h-auto rounded-md p-3'>
          <div>
            <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
            object-cover border-gray-400' src={service.avatar} alt="profile" />
              <span className='text-textColor font-bold pl-2'>{service.name}</span>
          </div>
          <h2 className='text-secTextColor font-bold pl-11 pt-1'>{service.title}</h2>
          <hr />
          <p className='text-textColor pt-2 pr-2'>{service.description}</p>
         <p className='text-textColor pt-2 pl-3'>{`I am willing to pay Nrs ${service.charge} per hour`} </p>
         <div className='mt-2 ml-2'>
            <img className='inline-block h-4 w-4' src="/img/location.png" alt="location" />
            <span className='text-textColor pl-2'>{service.address}</span>
         </div>
         <div className='ml-20  mt-3  '>
            <button onClick={(e)=>setOpen(!open)} className='bg-blue px-7 rounded-md text-center '>
                <img className=' inline-block h-5 pb-1 mb-0.5 w-7' src="/img/comment.png" alt="comment" />
                <span className='text-textColor font-bold text-lg pl-1 '>{service.comments.length}</span>
            </button>
         </div>
         <div className='text-right'>
         <span className='text-secTextColor font-bold'> Ponted on : </span>
         <span className='text-textColor'>{ new Date(service.createdAt).toLocaleString()  }</span>
         </div>
      </div>
      <div>
     { open &&
      <Kcomments setopen={setOpen} comments={service.comments} serviceId={service.id}/>}  
      </div>
    </>
  )
}

export default ServiceCard;