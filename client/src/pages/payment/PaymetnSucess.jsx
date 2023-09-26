import React from 'react'
import { Link } from 'react-router-dom'
import SlideBar from '../../components/shared/slidebar/SlideBar'
const PaymetnSucess = () => {
  return (
    <>
    
    <div className='grid grid-cols-12'>
    <div className='col-span-3'>
      <SlideBar/>
    </div>
    <div className='col-span-9'>
    <div className="flex justify-center items-center h-screen">
    <div className="text-center">
      <img
        className="my-5 mx-auto w-40 h-40"
        src="/img/order_success.png"
        alt="Order Success"
      />

      <h2 className="text-2xl text-textColor font-bold mb-4">Your Payment has been pay successfully.</h2>

      <Link
        to="/servicereceiver"
        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go To Receiver Page
      </Link>
    </div>
  </div>
    </div>
</div>
    </>
    
  )
}

export default PaymetnSucess