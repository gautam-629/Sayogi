import React from 'react'
import SlideBar from './SlideBar'

const Users = () => {
    return (

        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <SlideBar />
            </div>
            <div className='col-span-9 mt-28'>
                <div className='mb-5'>
                    <h1 className='text-textColor font-bold text-2xl border-b-4 inline border-blue'>List of all Users</h1>
                </div>
                <div>
                    <table className='bg-secBackColor text-textColor w-5/6 text-center rounded-md'>
                        <thead className='border-blue border-b-2'>
                            <tr>
                                <th className='py-2'>S.n</th>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Phone</th>
                                <th className='py-2'>Profession</th>
                                <th className='py-2'>role</th>
                                <th className='py-2'>Service Seeker</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2'>1</td>
                                <td className='py-2'>Binod Gautam</td>
                                <td className='py-2'>9815835831</td>
                                <td className='py-2'>Electrician</td>
                                <td className='py-2'>user</td>
                                <td className='py-2'>Yes</td>
                                <td className='pl-5'>
                                    <img className='w-6 inline mx-2 cursor-pointer' src="/img/edit.png" alt="" />
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

export default Users