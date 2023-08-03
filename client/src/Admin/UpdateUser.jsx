import React from 'react'
import SlideBar from './SlideBar'

const UpdateUser = () => {
    return (

        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <SlideBar />
            </div>
            <div className='col-span-9 mt-28 ml-80'>
                <div className='mb-4 ml-8'>
                    <h1 className='text-textColor font-bold text-2xl border-b-4 inline border-blue'>Update user</h1>
                </div>
                <div>
                    <div className='mb-1'>
                        <label className='text-textColor font-semibold ' htmlFor="">Name</label><br />
                        <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
                            type="text" name="name" id="name" />
                    </div>
                    <div className='mb-1'>
                        <label className='text-textColor font-semibold  ' htmlFor="">Phone Number</label><br />
                        <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
                            type="text" name="phone" id="phone" />
                    </div>

                    <div className='mb-1'>
                        <label className='text-textColor font-semibold ' htmlFor="">Role</label> <br />
                        <select className='w-60 rounded-sm text-textColor py-1  bg-secBackColor' name="duration" id="duration">
                            <option value="hour">user</option>
                            <option value="month">admin</option>
                        </select>
                    </div>
                    <div className='ml-16'>
                        <button type='submit' className='text-textColor font-bold rounded-md py-1 px-3 mt-6 bg-blue'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser