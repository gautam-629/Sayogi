import React from 'react'

const Kcomments = ({setopen}) => {
  return (
    <div className='bg-secBackColor relative p-4 h-auto w-96 rounded-md'>
                 <img onClick={(e)=>setopen(false)} className=' cursor-pointer absolute h-5 w-5 right-3 top-2' src="/img/cross.png" alt="cross" />
                <div className='flex items-center gap-4 mt-6'>
                    <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
                       object-cover border-gray-400' src="/img/elon.jpg" alt="profile" />
                       <div className='bg-tecBackColor inline-block rounded-md px-2'>
                        <span className='text-textColor pl-14 font-bold'>Gaurab Thapa</span>
                        <p className='text-secTextColor'> I am interested doing only in 500 🙄</p>
                       </div>
                </div>
                <div className='flex items-center gap-4 mt-3'>
                    <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
                       object-cover border-gray-400' src="/img/elon.jpg" alt="profile" />
                       <div className='bg-tecBackColor inline-block rounded-md px-2'>
                        <span className='text-textColor pl-14 font-bold'>Gaurab Thapa</span>
                        <p className='text-secTextColor'> I am interested doing only in 500 🙄</p>
                       </div>
                </div>
                <div className='flex items-center gap-4 mt-3'>
                    <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
                       object-cover border-gray-400' src="/img/elon.jpg" alt="profile" />
                       <div className='bg-tecBackColor inline-block rounded-md px-2'>
                        <span className='text-textColor pl-14 font-bold'>Gaurab Thapa</span>
                        <p className='text-secTextColor'> I am interested doing only in 500 🙄</p>
                       </div>
                </div>

                <div className='flex mt-14 gap-3'>
                <img className='inline-block h-12 w-12 ml-3 border-4 rounded-full  cursor-pointer 
                       object-cover border-gray-400' src="/img/elon.jpg" alt="profile" />
                       <div>
                          <input className='bg-tecBackColor outline-none border-none text-textColor py-2 px-8 rounded-md' type="text" />
                          <img className='h-5 w-7 pl-2 inline-block cursor-pointer' src="/img/send.png" alt="send" />
                       </div>
                </div>

            </div>
  )
}

export default Kcomments