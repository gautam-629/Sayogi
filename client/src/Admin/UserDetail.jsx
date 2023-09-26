import React from 'react'
import SlideBar from './SlideBar'
import { useLocation } from 'react-router-dom'
import Avatar from '../components/shared/Avatar/Avatar'
const UserDetail = () => {
    let location=useLocation();

    const {user}=location.state || {};
    
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <SlideBar />
            </div>
            <div className='col-span-9'>
                <div className='bg-secBackColor rounded-md  h-96 w-2/4 mt-20 ml-28'>
                    <div className='top-6 relative'>
                        <div className='flex flex-col items-center'>
                            <Avatar key={user._id} name={user.name} rating={user.rating} img={`http://localhost:5000${user.avatar}`} title={user.title} />
                        </div>
                        <div className='flex justify-around mt-2'>
                            <h2 className='text-secTextColor font-bold'>
                                Experience : <span className='text-textColor font-mono'>{user.experience}</span>
                            </h2>
                            <h2 className='text-secTextColor font-bold'>
                                Skills : <span className='text-textColor font-mono'>{user.skills}</span>
                            </h2>
                        </div>
                        <div className='mt-2 ml-4'>
                            <h2 className='text-secTextColor font-bold'>
                                Expected charge : <span className='text-textColor font-mono'>{`${user.charge} per ${user.duration}`}</span>
                            </h2>
                        </div>

                        <div className='mt-2 ml-4'>
                            <h2 className='text-secTextColor font-bold'>
                                Address : <span className='text-textColor font-mono'>{user.address}</span>
                            </h2>
                        </div>
                        <div className='mt-2 ml-4'>
                            <h2 className='text-secTextColor font-bold'>
                                Email : <span className='text-textColor font-mono'>{user.email}</span>
                            </h2>
                        </div>

                        <div className='mt-2 ml-4'>
                            <h2 className='text-secTextColor cursor-pointer font-bold bg-blue inline px-2 py-0.5 rounded-sm'>
                                Show CV
                            </h2>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail