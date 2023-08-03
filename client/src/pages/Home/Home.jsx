import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallServiceRequest } from '../../store/ServiceRequest';
import ServiceCard from '../../components/shared/ServiceCard/ServiceCard';
import { STATUSES } from '../../config/'
import { setStatus } from '../../store/ServiceRequest';
import SlideBar from '../../components/shared/slidebar/SlideBar';
import Search from '../../components/shared/Search/Search';

const Home = () => {
  let dispatch = useDispatch();
  const { serviceRequest } = useSelector((state) => state.serviceRequests.serviceRequest);
  const { comments } = useSelector((state) => state.serviceRequests);
  const { accessToken } = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(fetchallServiceRequest());
    return () => {
      dispatch(setStatus(STATUSES.IDLE))
    }
  }, [dispatch, comments])
  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='col-span-3'>
          <SlideBar />
        </div>
        <div className='col-span-9 mt-14'>
          <div className=' px-6'>
            <Search/>
          </div>
          <div className="flex flex-wrap mt-8 overflow-y-scroll gap-y-2">
            {serviceRequest && Array.isArray(serviceRequest) &&
              serviceRequest.map((service) => (
                <div key={service.id} className="w-full sm:w-1/2">
                  <ServiceCard service={service} />
                </div>
              ))}
          </div>
        </div>
      </div>


    </>
  )
}

export default Home;

