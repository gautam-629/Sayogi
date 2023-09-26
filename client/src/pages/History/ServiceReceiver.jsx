import React, { useEffect, useState } from 'react'
import { findServiceReceiver } from '../../http'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SlideBar from '../../components/shared/slidebar/SlideBar';
const ServiceReceiver = () => {
    let navigate=useNavigate();
    const [serviceReceiver, setServiceReceiver] = useState([]);
    const { accessToken } = useSelector((state) => state.auth.token);
    useEffect(() => {
        (async () => {
            try {
                const res = await findServiceReceiver(accessToken);
                setServiceReceiver(res.data.serviceRequest);
               
            } catch (error) {
                console.log(error)
            }
        })()

    }, [])
    let count = 0;

    function handleNavigate(serviceId,amount){
         navigate('/payment',{
            state:{
                 serviceId:serviceId,
                 serviceAmount:amount
            }
         })
    }

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-3'>
                    <SlideBar />
                </div>
                {serviceReceiver.length !== 0 ? (
                    <div className='col-span-9'>
                        <div>
                            <div className='relative mt-10'>
                                <span className='text-textColor border-b-4 border-blue  text-2xl  font-bold'>
                                    History as a Service Receiver</span>
                                <img className='inline w-6 mb-4 ml-2' src="/img/like.png" alt="" />
                            </div>
                            <div className='mt-11'>
                                <table className='bg-secBackColor
                             text-textColor w-5/6 text-center rounded-md'>
                                    <thead className='border-blue border-b-2 '>
                                        <tr >
                                            <th className='py-2'>S.n</th>
                                            <th className='py-2'>Service Provider</th>
                                            <th className='py-2'>Title</th>
                                            <th className='py-2'>Accept On</th>
                                            <th className='py-2'>Charge</th>
                                            <th className='py-2'>Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            serviceReceiver.map((data) => (
                                                
                                                <tr key={data._id}>
                                                    <td className='py-2'>{++count}</td>
                                                    <td className='py-2'>{data.sender.name}</td>
                                                    <td className='py-2'>{data.title}</td>
                                                    <td className='py-2'>{new Date(data.acceptOn).toLocaleString()}</td>
                                                    <td className='py-2'>{`${data.charge} per ${data.duration}`}</td>
                                                    <td> 
                                                        <span style={data.paymentInfo.status === 'pending' ? { color: 'red' } : { color: 'green' }}>{data.paymentInfo.status}</span><br />
                                                        <span onClick={()=>handleNavigate(data._id,data.charge)} className='text-blue font-bold cursor-pointer' >Click to Pay</span> 
                                                    </td>
                                                </tr>
                                                
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (<div className="text-textColor top-72 right-96 absolute text-2xl font-bold">
                    No History as Receiver
                </div>)}
            </div>
        </>
    )
}
export default ServiceReceiver;