import React, { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchallServiceRequest } from '../../store/ServiceRequest';
import ServiceCard from '../../components/shared/ServiceCard/ServiceCard';
const Home = () => {
  let dispatch=useDispatch();
  const {serviceRequest}=useSelector((state)=>state.serviceRequests.serviceRequest);
  useEffect(()=>{
    dispatch(fetchallServiceRequest())
  },[dispatch])
  return (
    <>
     <div className="flex flex-wrap mt-8 overflow-y-scroll gap-y-2">
      { serviceRequest && Array.isArray(serviceRequest) &&
      serviceRequest.map((service) => (
        <div key={service.id} className="w-full sm:w-1/2">
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
    </>
  )
}

export default Home;


{/* <div className="flex flex-wrap mt-8 overflow-y-scroll">
      {serviceData.map((service) => (
        <div key={service.id} className="w-full sm:w-1/2">
          <ServiceCard title={service.title} />
        </div>
      ))}
    </div> */}