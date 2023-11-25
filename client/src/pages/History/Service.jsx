import React, { useState, useEffect } from "react";
import HistoryCard from "../../components/shared/HistoryCard/HistoryCard";
import { findServiceHistory } from "../../http";
import { useSelector } from "react-redux";
import SlideBar from "../../components/shared/slidebar/SlideBar";
import Search from "../../components/shared/Search/Search";
const Service = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const { accessToken } = useSelector((state) => state.auth.token);
  useEffect(() => {
    (async () => {
      try {
        const res = await findServiceHistory(accessToken);
        setServiceHistory(res.data.serviceRequest);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <SlideBar />
        </div>
        {serviceHistory.length !== 0 ? (
          <div className="col-span-9 mt-14">
            <div>
              <div className="relative">
                <span className="text-textColor border-b-4 border-blue  text-2xl  font-bold">
                  Your Service Request History
                </span>
                <img
                  className="inline w-6 mb-4 ml-2"
                  src="/img/like.png"
                  alt=""
                />
              </div>
              <div className="mt-4">
                <Search />
              </div>
              <div className="flex flex-wrap mt-8 overflow-y-scroll gap-8 ">
                {serviceHistory.map((data) => (
                  <HistoryCard key={data._id} service={data} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-textColor top-72 right-96 absolute text-2xl font-bold">
            No History as Receiver
          </div>
        )}
      </div>
    </>
  );
};

export default Service;
