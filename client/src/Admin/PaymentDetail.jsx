import React from 'react'
import SlideBar from './SlideBar'
import { useLocation } from 'react-router-dom'
const PaymentDetail = () => {
    let location=useLocation();

    const {paymentInfo}=location.state || {};
    console.log("paymentInfo",paymentInfo)
    return (

        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <SlideBar />
            </div>
            <div className='col-span-9 mt-6 text-textColor'>
                <div>
                    <h1 className=''>Payment</h1>
                    <h3>Paid</h3>
                </div>
                <div>
                    <h1>Stripe ID</h1>
                    <h3>pi_vdnvirtmhrohirnv</h3>
                </div>
                <div>
                    <h1>Payment At</h1>
                    <h3>2067/2/67</h3>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetail