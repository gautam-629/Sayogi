import React from 'react'
import SlideBar from './SlideBar'
import { Link } from 'react-router-dom'
const HiredUser = () => {
    return (

        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <SlideBar />
            </div>
            <div className='col-span-9 mt-28'>
                <div className='mb-5'>
                    <h1 className='text-textColor font-bold text-2xl border-b-4 inline border-blue'>List of all Hired User</h1>
                </div>
                <div>
                    <table className='bg-secBackColor text-textColor w-5/6 text-center rounded-md'>
                        <thead className='border-blue border-b-2'>
                            <tr>
                                <th className='py-2'>S.n</th>
                                <th className='py-2'>Provider</th>
                                <th className='py-2'>Receiver</th>
                                <th className='py-2'>Budget</th>
                                <th className='py-2'>Payment</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2'>1</td>
                                <td className='py-2'>
                                    <img className=' inline-block h-12 w-12 ml-3 border-4 rounded-full
                                    cursor-pointer object-cover border-gray-400' src="/img/elon.jpg" alt="profile" /> <br />
                                    <span className='cursor-pointer'>Binod Gautam</span>
                                </td>
                                <td className='py-2'>
                                    <img className=' inline-block h-12 w-12 ml-3 border-4 rounded-full
                                    cursor-pointer object-cover border-gray-400' src="/img/elon.jpg" alt="profile" /> <br />
                                    <span className='cursor-pointer'>Binod Gautam</span>
                                </td>
                                <td className='py-2'>Rs.500</td>
                                <td className='py-2'>pending</td>
                                <td className='pl-5'>
                                 <Link to={"/paymentdetail"}>
                                    <img className='w-10 inline mx-2 cursor-pointer' src="/img/detail.png" alt="" />
                                 </Link>   
                                    <img className='w-6 inline mx-2 cursor-pointer' src="/img/delete.png" alt="" />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HiredUser