import React, { useEffect } from "react";
import SlideBar from "./SlideBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchallServiceSeeker } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { deleteSingleUser } from "../http/admin";
const Users = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth.users);
  const { accessToken } = useSelector((state) => state.auth.token || "");
  useEffect(() => {
    dispatch(fetchallServiceSeeker());
  }, []);

  let count = 0;

  function handleClick(data, userId) {
    navigate("/updateuser", {
      state: {
        user: data,
        userId: userId,
      },
    });
  }

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Are you sure you want to perform this action?"
    );
    try {
      if (confirm) {
        const res = await deleteSingleUser(accessToken, id);
        dispatch(fetchallServiceSeeker());
      }
    } catch (error) {
      throw Error(error);
    }
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <SlideBar />
      </div>
      <div className="col-span-9 mt-28">
        <div className="mb-5">
          <h1 className="text-textColor font-bold text-2xl border-b-4 inline border-blue">
            List of all Users
          </h1>
        </div>
        <div>
          <table className="bg-secBackColor text-textColor w-5/6 text-center rounded-md">
            <thead className="border-blue border-b-2">
              <tr>
                <th className="py-2">S.n</th>
                <th className="py-2">Name</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Profession</th>
                <th className="py-2">role</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                Array.isArray(users) &&
                users.map((data) => (
                  <tr key={data.id}>
                    <td className="py-2">{++count}</td>
                    <td className="py-2">{data.name}</td>
                    <td className="py-2">{data.phoneNumber}</td>
                    <td className="py-2">{data.title}</td>
                    <td className="py-2">{data.role}</td>

                    <td className="pl-5">
                      <img
                        onClick={() => handleClick(data, data.id)}
                        className="w-6 inline mx-2 cursor-pointer"
                        src="/img/edit.png"
                        alt=""
                      />
                      <img
                        className="w-6 inline mx-2 cursor-pointer"
                        src="/img/delete.png"
                        alt=""
                        onClick={(e) => handleDelete(data.id)}
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

export default Users;
