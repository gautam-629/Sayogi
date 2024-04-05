import React, { useState } from "react";
import SlideBar from "./SlideBar";
import { useNavigate } from "react-router-dom";
import { getHiredList } from "../http/admin";
import { useSelector } from "react-redux";

const HiredUser = () => {
  const { accessToken } = useSelector((state) => state.auth.token);
  const [hiredUser, setHiredUser] = useState([]);

  let nativate = useNavigate();
  useState(() => {
    (async () => {
      const { data } = await getHiredList(accessToken);
      setHiredUser(data.hiredUser);
    })();
  }, [hiredUser]);
  let count = 0;

  function sendDetail(paymentInfo) {
    nativate("/paymentdetail", {
      state: {
        paymentInfo: paymentInfo,
      },
    });
  }

  function sendUser(userData) {
    nativate("/adminuserdetail", {
      state: {
        user: userData,
      },
    });
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <SlideBar />
      </div>
      <div className="col-span-9 mt-28">
        <div className="mb-5">
          <h1 className="text-textColor font-bold text-2xl border-b-4 inline border-blue">
            List of all Hired User
          </h1>
        </div>
        <div>
          <table className="bg-secBackColor text-textColor w-5/6 text-center rounded-md">
            <thead className="border-blue border-b-2">
              <tr>
                <th className="py-2">S.n</th>
                <th className="py-2">Provider</th>
                <th className="py-2">Receiver</th>
                <th className="py-2">Budget</th>
                <th className="py-2">Payment</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {hiredUser &&
                Array.isArray(hiredUser) &&
                hiredUser.map((data) => (
                  <tr key={data._id}>
                    <td className="py-2">{++count}</td>
                    <td onClick={() => sendUser(data.sender)} className="py-2">
                      <img
                        className=" inline-block h-12 w-12 ml-3 border-4 rounded-full
                                        cursor-pointer object-cover border-gray-400"
                        src={`http://localhost:5000${
                          data?.sender?.avatar ?? "/img/detail.png"
                        }`}
                        alt="profile"
                      />{" "}
                      <br />
                      <span className="cursor-pointer">{data.sender.name}</span>
                    </td>
                    <td
                      onClick={() => sendUser(data.receiver)}
                      className="py-2"
                    >
                      <img
                        className=" inline-block h-12 w-12 ml-3 border-4 rounded-full
                                        cursor-pointer object-cover border-gray-400"
                        src={`http://localhost:5000${
                          data?.receiver?.avatar ?? "/img/detail.png"
                        } `}
                        alt="profile"
                      />{" "}
                      <br />
                      <span className="cursor-pointer">
                        {data.receiver.name}
                      </span>
                    </td>
                    <td className="py-2">{`Rs.${data.paymentInfo.amount}`}</td>
                    <td
                      style={
                        data.paymentInfo.status === "pending"
                          ? { color: "red" }
                          : { color: "green" }
                      }
                    >
                      {data.paymentInfo.status}
                    </td>
                    <td className="pl-5">
                      <img
                        onClick={(e) => sendDetail(data.paymentInfo)}
                        className="w-10 inline mx-2 cursor-pointer"
                        src="/img/detail.png"
                        alt=""
                      />

                      <img
                        className="w-6 inline mx-2 cursor-pointer"
                        src="/img/delete.png"
                        alt=""
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HiredUser;
