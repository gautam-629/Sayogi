import React, { useState } from 'react'
import SlideBar from './SlideBar'
import { useLocation } from 'react-router-dom'
import {EditUser  } from '../http/admin'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify';
const UpdateUser = () => {
    let location=useLocation();
    const {user,userId}=location.state || {};
   const [name,setName]=useState(user.name || '');
   const [phone,setPhone]=useState(user.phoneNumber || '');
   const [selectValue,setSelectValue]=useState(user.role || '');
   const { accessToken } = useSelector((state) => state.auth.token|| '');
  
   const sucessMsg=(msg)=> toast.success(msg)
   const errMsg=(msg)=>toast.error(msg)
   async function handleClick(){
        let data={
            name:name,
            phoneNumber:phone,
            role:selectValue
        }
        try {
           const res= await EditUser(accessToken,data,userId);
           if(res.data.sucess){
              sucessMsg(res.data.msg)
           }
           setName('');
           setPhone('');
           setSelectValue('')
        } catch (error) {
            console.log(error)

            errMsg(error.response.data.message);

        }
    }

    return (

        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <SlideBar />
            </div>
            <div className='col-span-9 mt-28 ml-80'>
                <div className='mb-4 ml-8'>
                    <h1 className='text-textColor font-bold text-2xl border-b-4 inline border-blue'>Update user</h1>
                </div>
                <div>
                    <div className='mb-1'>
                        <label className='text-textColor font-semibold ' htmlFor="">Name</label><br />
                        <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
                            type="text" onChange={(e)=>setName(e.target.value)} value={name} name="name" id="name" />
                    </div>
                    <div className='mb-1'>
                        <label className='text-textColor font-semibold  ' htmlFor="">Phone Number</label><br />
                        <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
                            type="text" onChange={(e)=>setPhone(e.target.value)} name="phone" id="phone" value={phone} />
                    </div>
                      
                    <div className='mb-1'>
                        <label className='text-textColor font-semibold ' htmlFor="">Role</label> <br />
                        <select value={selectValue} onChange={(e)=>setSelectValue(e.target.value)}  className='w-60 rounded-sm text-textColor py-1  bg-secBackColor' name="duration" id="duration">
                            <option value="hour">user</option>
                            <option value="month">admin</option>
                        </select>
                    </div>
                    <div className='ml-16'>
                        <button onClick={(e)=>handleClick()} type='button' className='text-textColor font-bold rounded-md py-1 px-3 mt-6 bg-blue'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser