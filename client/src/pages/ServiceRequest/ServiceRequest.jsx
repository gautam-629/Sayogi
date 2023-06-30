import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { STATUSES } from '../../config';
import Loader from '../../components/shared/Loader/Loader';
import { createServiceRequest } from '../../store/ServiceRequest';
import { setStatus } from '../../store/ServiceRequest';
const ServiceRequest = () => {
  
  const [title,setTitle]=useState('');
  const [address,setAddress]=useState('');
  const [charge,setCharge]=useState('');
  const [duration,setSelectDuration]=useState('hour');
  const [description,setDescription]=useState('');

  const {status}=useSelector((state)=>state.serviceRequests);
  const {accessToken}= useSelector((state)=>state.auth.token);
  let dispatch=useDispatch();
  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  const sucessNotify=(msg)=>toast.success(`${msg}`)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(createServiceRequest({title,address,charge,duration,description,},accessToken));
}

useEffect(()=>{
  if(status===STATUSES.ERROR){
        errorNotify("Something went wong!");
  }
  if(status===STATUSES.SUCESS){
     sucessNotify("Porfile created sucessfully 💚");
  }

  return ()=>{
    dispatch(setStatus(STATUSES.IDLE))
  }

},[status,dispatch])

{status===STATUSES.LOADING && <Loader message={"Loading, please wait.."}/>}
  return (
    <>
     <div className='relative top-8 left-20'>
      <span className='text-textColor border-b-4 border-blue  text-2xl mt-8 font-bold'>
        Create a Service Request</span>
      <img className='inline w-6 mb-4 ml-2' src="/img/like.png" alt="" />
      </div>
    <div className='mt-14 ml-20'>
      <form onSubmit={handleSubmit}>
           <div className='mt-2'>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Service Title</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setTitle(e.target.value)}  type="text" name="title" id="title" />
            </div>
            <div className='mt-3'>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Description</label><br />
              <textarea onChange={(e)=>setDescription(e.target.value)} className='w-96 rounded-md text-textColor border-none mt-1  bg-secBackColor outline-none px-2 py-0.5'  name="description" id="" cols="2" rows="3"></textarea>
            </div>
    
            <div className='mt-3'>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Address</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setAddress(e.target.value)} type="text" name="address" id="address" />
            </div>
            <div className='mt-5'>
            <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
            <label className='text-textColor font-semibold text-lg ' htmlFor=""> Charge</label><br />
            <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 text-textColor bg-secBackColor '
              onChange={(e)=>setCharge(e.target.value)} type="number" name="charge" id="charge" />
            <select  value={duration} onChange={(e)=>setSelectDuration(e.target.value)} className='w-44 ml-3 rounded-md text-textColor py-0.5 bg-secBackColor' name="duration" id="duration">
              <option value="hour">Hourly</option>
              <option value="month">monthely</option>
            </select>
          </div>
          <div>
            <button type='submit' className='text-textColor font-bold rounded-md py-1 px-3 mt-5 ml-60 bg-blue'>Create Request</button>
          </div>
      </form>
    </div>
    </>
  )
}

export default ServiceRequest;