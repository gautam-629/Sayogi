import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchallServiceRequest } from '../../store/ServiceRequest';
import ServiceCard from '../../components/shared/ServiceCard/ServiceCard';
import Kcomments from '../../components/shared/KComments/Kcomments';
const Home = () => {
  // let dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(fetchallServiceRequest())
  // },[dispatch])
  return (
    <>
      <div className="flex flex-wrap gap-y-7 mt-8 overflow-y-scroll">
        <div className="w-full sm:w-1/2">
          <ServiceCard />
        </div>
        <div className="w-full sm:w-1/2">
          <ServiceCard />
        </div>
        <div className="w-full sm:w-1/2">
          <ServiceCard />
        </div>
        <div className="w-full sm:w-1/2">
          <ServiceCard />
        </div>
        <div className="w-full sm:w-1/2">
          <ServiceCard />
        </div>
      </div>


    </>
  )
}

export default Home;


{/* <div className="flex flex-wrap">
      {serviceData.map((service) => (
        <div key={service.id} className="w-full sm:w-1/2">
          <ServiceCard title={service.title} />
        </div>
      ))}
    </div> */}