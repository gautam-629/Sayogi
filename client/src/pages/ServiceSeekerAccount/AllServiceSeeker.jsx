import React, { useEffect, useState } from "react";
import Avatar from "../../components/shared/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchallServiceSeeker } from "../../store/AuthSlice";
import SlideBar from "../../components/shared/slidebar/SlideBar";
import Search from "../../components/shared/Search/Search";

const AllServiceSeeker = () => {
  const [titleFilter, setTitleFilter] = useState("");
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth.users);
  // useEffect(() => {
  //     dispatch(fetchallServiceSeeker());
  // }, [])
  useEffect(() => {
    dispatch(fetchallServiceSeeker(titleFilter));
  }, [titleFilter]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <SlideBar />
        </div>
        <div className="col-span-9 mt-8">
          <div>
            <Search onChange={(e) => setTitleFilter(e.target.value)} />
          </div>
          <div className="grid grid-cols-5 mt-10 gap-y-6">
            {users &&
              Array.isArray(users) &&
              users.map((user) => (
                <Avatar
                  key={user.id}
                  id={user.id}
                  img={user.avatar}
                  name={user.name}
                  rating={user.rating}
                  title={user.title}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllServiceSeeker;
