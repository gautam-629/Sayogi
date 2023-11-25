import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallServiceRequest } from "../../store/ServiceRequest";
import ServiceCard from "../../components/shared/ServiceCard/ServiceCard";
import { STATUSES } from "../../config/";
import { setStatus } from "../../store/ServiceRequest";
import SlideBar from "../../components/shared/slidebar/SlideBar";
import Search from "../../components/shared/Search/Search";
import axios from "axios";

const Home = () => {
  const [sug, setSug] = useState([]);
  let dispatch = useDispatch();
  const { serviceRequest } = useSelector(
    (state) => state.serviceRequests.serviceRequest
  );
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.serviceRequests);
  const { accessToken } = useSelector((state) => state.auth.token);

  const getSuggestService = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
          common: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });
      const res = await axiosInstance.get(
        "http://localhost:5000/api/servicerequest/suggestions",
        { title: user?.title, address: user?.address }
      );
      setSug(res.data.suggestions);
      console.log(sug);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchallServiceRequest());
    getSuggestService();
    return () => {
      dispatch(setStatus(STATUSES.IDLE));
    };
  }, [dispatch, comments]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <SlideBar />
        </div>
        <div className="col-span-9 mt-14">
          <div className=" px-6">
            <Search />
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6 overflow-y-auto">
              <h1 className="text-textColor border-b-4 border-blue  inline-block text-2xl mt-8 font-bold">
                All Available Services
              </h1>
              {serviceRequest &&
                Array.isArray(serviceRequest) &&
                serviceRequest.map((service) => (
                  <div key={service.id} className="w-full sm:w-1/2 mt-4">
                    <ServiceCard service={service} />
                  </div>
                ))}
            </div>
            {user?.serviceSeeker && (
              <div className="col-span-6 overflow-y-auto">
                <h1 className="text-textColor border-b-4 border-blue inline-block  text-2xl mt-8 font-bold">
                  Recommended
                </h1>
                {sug &&
                  Array.isArray(serviceRequest) &&
                  sug.map((service) => (
                    <div key={service.id} className="w-full sm:w-1/2 mt-4 ">
                      <ServiceCard service={service} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
