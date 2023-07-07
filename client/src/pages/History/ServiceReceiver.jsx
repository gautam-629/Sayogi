import React, { useEffect, useState } from 'react'
import { findServiceReceiver } from '../../http'
import { useSelector } from 'react-redux';
const ServiceReceiver = () => {
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
    return (
        <>
            <div className='relative'>
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
                                    <td style={data.duration === 'pending' ? { color: 'red' } : { color: 'gray' }}> pending</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ServiceReceiver