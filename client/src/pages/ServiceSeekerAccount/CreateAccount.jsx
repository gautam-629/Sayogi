import React, { useEffect } from 'react';
import { useState } from 'react';
import { createProfile } from '../../store/AuthSlice';
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { STATUSES } from '../../config';
import Loader from '../../components/shared/Loader/Loader';
import { setStatus } from '../../store/AuthSlice';
const CreateAccount = () => {
  const [file, setFile] = useState(null);
  const [title,setTitle]=useState('');
  const [email,setEmail]=useState('');
  const [experience,setExperience]=useState('');
  const [address,setAddress]=useState('');
  const [skills,setSkills]=useState('');
  const [charge,setCharge]=useState('');
  const [selectDuration,setSelectDuration]=useState('');
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  let dispatch=useDispatch();
  const {accessToken}= useSelector((state)=>state.auth.token)
  const {status}=useSelector((state)=>state.auth);
  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  const sucessNotify=(msg)=>toast.success(`${msg}`)

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title",title);
      formData.append("address",address);
      formData.append("charge",charge);
      formData.append("experience",experience);
      formData.append("duration",selectDuration);
      formData.append("email",email);
      formData.append("cv",file);
      formData.append("skills",skills)
      console.log(formData);
      dispatch(createProfile(formData,accessToken));
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
        Create a Service Seeker account</span>
      <img className='inline w-6 mb-4 ml-2' src="/img/like.png" alt="" />
      </div>
      <div className='mt-14 ml-20'>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-24'>
            <div>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Service Title</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setTitle(e.target.value)}  type="text" name="title" id="title" />
            </div>
            <div>
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Email</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setEmail(e.target.value)} type="text" name="email" id="email" />
            </div>
          </div>

          <div className='flex gap-24 mt-5'>
            <div>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Experience</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setExperience(e.target.value)} type="text" name="experience" id="experience" />
            </div>
            <div>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">Address</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setAddress(e.target.value)} type="text" name="address" id="address" />
            </div>
          </div>

          <div className='flex gap-24  mt-5'>
            <div>
              <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
              <label className='text-textColor font-semibold text-lg ' htmlFor="">skills</label><br />
              <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
               onChange={(e)=>setSkills(e.target.value)} type="text" name="skill" id="skill" />
            </div>
            <div>
              <label className='text-textColor font-semibold text-lg ' htmlFor="">CV</label><br />
              <input onChange={handleFileChange}  className='rounded-md border-none mt-1 outline-none px-2 py-0.5 w-60 text-textColor bg-secBackColor '
                type="file" name="skill" id="skill" />
            </div>
          </div>
          <div className='mt-5'>
            <img className='inline w-2 h-2 mb-1.5' src="/img/star.png" alt="star" />
            <label className='text-textColor font-semibold text-lg ' htmlFor="">Expected Charge</label><br />
            <input className='rounded-md border-none mt-1 outline-none px-2 py-0.5 text-textColor bg-secBackColor '
              onChange={(e)=>setCharge(e.target.value)} type="number" name="charge" id="charge" />
            <select  value={selectDuration} onChange={(e)=>setSelectDuration(e.target.value)} className='w-44 ml-3 rounded-md text-textColor py-0.5 bg-secBackColor' name="duration" id="duration">
              <option value="hour">Hourly</option>
              <option value="month">monthely</option>
            </select>
          </div>
          <div>
            <button type='submit' className='text-textColor font-bold rounded-md py-1 px-3 mt-5 ml-60 bg-blue'>Create Profile</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateAccount;