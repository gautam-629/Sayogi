import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
const RequestDetail = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { serviceDetail } = location.state || {};
    console.log(serviceDetail)
    return (
        <>
            <div className='flex justify-center items-center mt-12 flex-col '>
                <div className='bg-secBackColor w-96 h-auto rounded-md p-3'>
                    <div>
                        <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
               object-cover border-gray-400' src='/img/elon.jpg' alt="profile" />
                        <span className='text-textColor font-bold pl-2'>{serviceDetail.sender.name}</span>
                    </div>
                    <h2 className='text-secTextColor font-bold pl-11 pt-1'>{serviceDetail.serviceRequest.title}</h2>
                    <hr />
                    <p className='text-textColor pt-2 pr-2'>{serviceDetail.serviceRequest.description}</p>
                    <p className='text-textColor pt-2 pl-3'>{`I am willing to pay Nrs ${serviceDetail.serviceRequest.charge} per hour`} </p>
                    <div className='mt-2 ml-2'>
                        <img className='inline-block h-4 w-4' src="/img/location.png" alt="location" />
                        <span className='text-textColor pl-2'>{serviceDetail.serviceRequest.address}</span>
                    </div>
                    <div className='text-right'>
                        <span className='text-secTextColor font-bold'> Ponted on : </span>
                        <span className='text-textColor'>Aug 26 2021</span>
                    </div>
                    <div className='flex justify-between px-6'>
                        <button onClick={()=>setOpen(true)} className='bg-blue px-3 py-0.5 rounded-md mt-3 text-textColor font-bold'>Accept</button>
                        <button className='bg-blue px-3 py-0.5 rounded-md mt-3 text-textColor font-bold'>Reject</button>
                    </div>
                </div>
                {open &&
                    <div className='bg-secBackColor rounded-md mt-10 px-10 flex justify-center items-center gap-3'>
                        <img className='inline-block h-7 w-7' src="/img/call.png" alt="call" />
                        <span className='text-textColor text-3xl'>{serviceDetail.sender.phoneNumber}</span>
                    </div>
                }
            </div>
        </>
    )
}

export default RequestDetail;