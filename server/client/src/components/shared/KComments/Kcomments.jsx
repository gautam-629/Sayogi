import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createComments } from "../../../http";
import { setComments } from "../../../store/ServiceRequest";
import { useDispatch } from "react-redux";
const Kcomments = ({
  setopen,
  comments,
  serviceId,
  creatorAvatar,
  creatorName,
}) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const { user, isAuth } = useSelector((state) => state.auth);
  const { accessToken } = useSelector((state) => state.auth.token);
  async function handleSubmit() {
    try {
      const res = await createComments(content, serviceId, accessToken);
      dispatch(setComments(res.data.serviceRequest.comments));
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  const handleProfileClick = (userId) => {
    navigate(`/getserviceseekerprofile/${userId}`, {
      state: {
        receiver: userId,
        serviceID: serviceId,
        senderName: creatorName,
        senderAvatar: creatorAvatar,
      },
    });
  };

  return (
    <div className="bg-secBackColor relative p-4 h-auto w-96 rounded-md">
      <img
        onClick={(e) => setopen(false)}
        className="cursor-pointer absolute h-5 w-5 right-3 top-2"
        src="/img/cross.png"
        alt="cross"
      />
      {comments.map((com) => {
        return (
          <div key={com._id} className="flex items-center gap-4 mt-6">
            {/* <Link to={`/getserviceseekerprofile/${com.user._id}`}><img className='inline-block h-12 w-12 ml-3 border-4 rounded-full cursor-pointer 
                  object-cover border-gray-400' src={`http://localhost:5000${com.user.avatar}`} alt="profile" />
                  </Link> */}
            <img
              onClick={(e) => handleProfileClick(com.user._id)}
              className="inline-block h-12 w-12 ml-3 border-4 rounded-full cursor-pointer 
                  object-cover border-gray-400"
              src={`http://localhost:5000${com.user.avatar}`}
              alt="profile"
            />

            <div className="bg-tecBackColor inline-block rounded-md px-2">
              <span className="text-textColor pl-14 font-bold">
                {com.user.name}
              </span>
              <p className="text-secTextColor">{com.content} 🙄</p>
            </div>
          </div>
        );
      })}
      {isAuth && user?.activated && user?.serviceSeeker && (
        <div className="flex mt-14 gap-3">
          <img
            className="inline-block h-12 w-12 ml-3 border-4 rounded-full cursor-pointer object-cover
           border-gray-400"
            src={user?.avatar}
            alt="profile"
          />
          <div className="relative">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-tecBackColor outline-none border-none text-textColor py-2 px-8 rounded-md"
              type="text"
            />
            {/* <textarea className='bg-tecBackColor inline-block outline-none border-none text-textColor  px-10 rounded-md'  value={content}  onChange={(e)=>setContent(e.target.value)} name="" id="" cols="20" rows="2"></textarea> */}
            <img
              onClick={handleSubmit}
              className="h-5 w-7 pl-2 inline-block cursor-pointer absolute right-2 top-2"
              src="img/send.png"
              alt="send"
            />
          </div>
        </div>
      )}
      :
    </div>
  );
};
export default Kcomments;
