import React, { useEffect } from "react";
import Avatar from "../../components/shared/Avatar/Avatar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchsingleServiceSeeker } from "../../store/AuthSlice";
import { toast } from "react-toastify";
import { STATUSES } from "../../config";
import { setStatus } from "../../store/Notification";
import { createNotification } from "../../store/Notification";
import { updateServiceRequest } from "../../store/ServiceRequest";
import io from "socket.io-client";
import SlideBar from "../../components/shared/slidebar/SlideBar";
import { Link } from "react-router-dom";
const ServiceSeekerProfile = () => {
  let dispatch = useDispatch();
  const location = useLocation();
  const { serviceID, receiver, senderAvatar, senderName } =
    location.state || {};
  const { user } = useSelector((state) => state.auth.serviceSeeker);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { accessToken } = useSelector((state) => state.auth.token);
  const { status } = useSelector((state) => state.notification);
  const { id } = useParams();

  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  const sucessNotify = (msg) => toast.success(`${msg}`);

  useEffect(() => {
    dispatch(fetchsingleServiceSeeker(id));

    if (status === STATUSES.ERROR) {
      errorNotify("Something went wong!");
    }
    if (status === STATUSES.SUCESS) {
      sucessNotify("Sucessfully Request to Hire 💚");
    }
    return () => {
      dispatch(setStatus(STATUSES.IDLE));
    };
  }, [id, dispatch, status]);
  function RequestNotification(e) {
    const socket = io("http://localhost:5000");
    dispatch(createNotification(receiver, serviceID, accessToken));

    dispatch(updateServiceRequest({ serviceID, receiver }, accessToken));

    socket.emit("sendNoti", {
      receiverId: receiver,
      senderAvatar: senderAvatar,
      senderName: senderName,
    });
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <SlideBar />
        </div>
        <div className="col-span-9">
          {user && (
            <div className="bg-secBackColor rounded-md  h-96 w-2/4 mt-20 ml-28">
              <div className="top-6 relative">
                <div className="flex flex-col items-center">
                  <Avatar
                    key={user.id}
                    name={user.name}
                    rating={user.rating}
                    img={user.avatar}
                    title={user.title}
                  />
                </div>
                <div className="flex justify-around mt-2">
                  <h2 className="text-secTextColor font-bold">
                    Experience :{" "}
                    <span className="text-textColor font-mono">
                      {user.experience}
                    </span>
                  </h2>
                  <h2 className="text-secTextColor font-bold">
                    Skills :{" "}
                    <span className="text-textColor font-mono">
                      {user.skills}
                    </span>
                  </h2>
                </div>
                <div className="mt-2 ml-4">
                  <h2 className="text-secTextColor font-bold">
                    Expected charge :{" "}
                    <span className="text-textColor font-mono">{`${user.charge} per ${user.duration}`}</span>
                  </h2>
                </div>

                <div className="mt-2 ml-4">
                  <h2 className="text-secTextColor font-bold">
                    Address :{" "}
                    <span className="text-textColor font-mono">
                      {user.address}
                    </span>
                  </h2>
                </div>
                <div className="mt-2 ml-4">
                  <h2 className="text-secTextColor font-bold">
                    Email :{" "}
                    <span className="text-textColor font-mono">
                      {user.email}
                    </span>
                  </h2>
                </div>

                <div className="mt-2 ml-4">
                  <h2 className="text-secTextColor cursor-pointer font-bold bg-blue inline px-2 py-0.5 rounded-sm">
                    <Link to={user.cv} target="_blank">
                      Show Cv
                    </Link>
                  </h2>
                </div>
                <div className="flex items-center justify-center">
                  {receiver === currentUser.id ? null : (
                    <button
                      onClick={RequestNotification}
                      className="bg-blue px-3 py-1 rounded-md mt-3 text-textColor font-bold"
                    >
                      Request to Hire
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceSeekerProfile;
