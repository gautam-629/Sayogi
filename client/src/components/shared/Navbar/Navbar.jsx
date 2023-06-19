import React, { useRef, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuth } from '../../../store/AuthSlice';
import { makeLogout } from '../../../http';
const Navbar = () => {
  let dispatch=useDispatch();
  const { user, isAuth } = useSelector((state) => state.auth);
  const { accessToken, refreshToken} = useSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);
  const imgRef = useRef();
  const menuRef = useRef();
  window.addEventListener('click', (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false)
    }
  })

  async function logout(){
    try {
      const{data}= await makeLogout(accessToken,refreshToken);
        dispatch(setAuth(data))
        console.log("In logout",data)
    } catch (error) {
      console.log(error)
    }
}
  
  return (
    <>
      <div className='mt-4 flex justify-between'>

        <div>
          <label>
            <img className='inline' width={20} height={20} src={'/img/inputSearch.png'} alt='search' />
          </label>
          <input className='bg-secBackColor w-56 py-1 pl-4 border-none outline-none rounded-lg text-textColor' type='text' placeholder='search...' />
        </div>

        <div className='flex gap-24 mr-10'>
          <img width={30} src={'/img/notification.png'} alt='notification' />
          {isAuth && user?.activated ?
            <div className='relative mr-10'>
              <img className='h-16 w-16 border-4 rounded-full
                 cursor-pointer object-cover border-gray-400'
                src={user?.avatar} alt="user"
                onClick={(e) => setOpen(!open)}
                ref={imgRef}
              />
              {open &&
                <div ref={menuRef} className='bg-secBackColor p-4 w-32 shadow-lg absolute rounded-sm -left-8 top-20'>
                  <ul>
                  <li onClick={() => { logout(); setOpen(false); }} className='text-textColor font-bold text-lg p-2 cursor-pointer rounded'>Logout</li>
                    <li onClick={() => setOpen(false)} className='text-textColor font-bold text-lg p-2 cursor-pointer rounded'>Profile</li>
                  </ul>
                </div>
              }
            </div>
            : <Link to={'/authenticate'}>
              <span className='text-textColor mr-20 cursor-pointer text-lg font-bold'>login</span>
            </Link>
          }




        </div>

      </div>
    </>
  )
}

export default Navbar