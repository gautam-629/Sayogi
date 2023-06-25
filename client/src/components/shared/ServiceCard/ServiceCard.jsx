import React, { useState } from 'react';
import Kcomments from '../KComments/Kcomments';

const ServiceCard = () => {
  const [open,setOpen]=useState(false);
  return (
    <>
      <div className='bg-secBackColor w-96 h-auto rounded-md p-3'>
          <div>
            <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
            object-cover border-gray-400' src="/img/elon.jpg" alt="profile" />
              <span className='text-textColor font-bold pl-2'>Binod Gautam</span>
          </div>
          <h2 className='text-secTextColor font-bold pl-11 pt-1'>Emergency Electrical Assistance</h2>
          <hr />
          <p className='text-textColor pt-2 pr-2'>I am experiencing a power outage at my location that has lasted for approximately 5 hours.I urgently require the assistance
             of a qualified electrician to restore electricity to my premises.</p>
         <p className='text-textColor pt-2 pl-3'>I am willing to pay $600 per hour </p>
         <div className='mt-2 ml-2'>
            <img className='inline-block h-4 w-4' src="/img/location.png" alt="location" />
            <span className='text-textColor pl-2'>kapan,kathmandu</span>
         </div>
         <div className='ml-20  mt-3  '>
            <button onClick={(e)=>setOpen(!open)} className='bg-blue px-7 rounded-md text-center '>
                <img className=' inline-block h-5 pb-1 mb-0.5 w-7' src="/img/comment.png" alt="comment" />
                <span className='text-textColor font-bold text-lg pl-1 '>2</span>
            </button>
         </div>
         <div className='text-right'>
         <span className='text-secTextColor font-bold'> Ponted on : </span>
         <span className='text-textColor'>Aug 26 2021</span>
         </div>
      </div>
      <div>
     { open && <Kcomments setopen={setOpen}/>}  
      </div>
    
    </>
  )
}

export default ServiceCard;