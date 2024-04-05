import React, { useEffect, useState } from 'react'
import { findServiceProvider } from '../../http';
import { useSelector } from 'react-redux';
import RatingInput from '../../components/shared/RatingInput/RatingInput';
import SlideBar from '../../components/shared/slidebar/SlideBar';
const ServiceProvider = () => {
    const [serviceProvider, setServiceProvider] = useState([]);
    const { accessToken } = useSelector((state) => state.auth.token);
    
    useEffect(() => {
      (async () => {
        try {
          const res = await findServiceProvider(accessToken);
          setServiceProvider(res.data.serviceRequest);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
    
    let count = 0;
  
    return (
      <>
        <div className='grid grid-cols-12'>
          <div className='col-span-3'>
            <SlideBar />
          </div>
          <div className='col-span-9 mt-14'>
            {serviceProvider.length !== 0 ? (
              <div>
                <div className='relative mt-10'>
                  <span className='text-textColor border-b-4  border-blue  text-2xl  font-bold'>
                    History as a Service Provider
                  </span>
                  <img className='inline w-6 mb-4 ml-2' src="/img/like.png" alt="" />
                </div>
                <div className='mt-11'>
                  <table className='bg-secBackColor text-textColor w-5/6 text-center rounded-md'>
                    <thead className='border-blue border-b-2'>
                      <tr>
                        <th className='py-2'>S.n</th>
                        <th className='py-2'>Service Receiver</th>
                        <th className='py-2'>Title</th>
                        <th className='py-2'>Accept On</th>
                        <th className='py-2'>Charge</th>
                        <th className='py-2'>Provide rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceProvider &&
                        Array.isArray(serviceProvider) &&
                        serviceProvider.map((data) => (
                          <tr key={data._id}>
                            <td className='py-2'>{++count}</td>
                            <td className='py-2'>{data.receiver.name}</td>
                            <td className='py-2'>{data.title}</td>
                            <td className='py-2'>{new Date(data.acceptOn).toLocaleString()}</td>
                            <td className='py-2'>{`${data.charge} per ${data.duration}`}</td>
                            <td className='pl-5'> <RatingInput userId={data.receiver._id} /> </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-textColor top-72 right-96 absolute text-2xl font-bold">
                No History Provider
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default ServiceProvider;
  