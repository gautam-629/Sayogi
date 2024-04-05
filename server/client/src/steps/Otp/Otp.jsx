import React, { useEffect, useState } from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import InputText from '../../components/shared/InputText/InputText';
import { verifyOtpRequest } from '../../store/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../config';
import { toast } from 'react-toastify';
import { setStatus } from '../../store/AuthSlice';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import SlideBar from '../../components/shared/slidebar/SlideBar';

const otpSchema = Yup.string()
  .required('otp is required')
  .length(4, 'Otp must be 4 digits');

const Otp = ({ handleOnNext }) => {
  let navigate=useNavigate();
  const [otp, setOtp] = useState('');
  const { phoneNumber, hash } = useSelector((state) => state.auth.otp);

  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);

  const {errMessage}=useSelector((state)=>state.auth);

  let dispatch = useDispatch();

  async function verifyOtp() {
    try {
      await otpSchema.validate(otp);
    } catch (error) {
      return errorNotify(error.message);
    }
    dispatch( verifyOtpRequest({ otp, phoneNumber, hash }))
      
    setTimeout(()=>{
      navigate('/activate');
    },2000);
      
  }

  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      errorNotify(errMessage?errMessage:"");
    }
    return()=>{
      dispatch(setStatus(STATUSES.IDLE));
    }
  }, [status,dispatch])

  return (
    <>

    
<div className='grid grid-cols-12'>
    <div className='col-span-3'>
      <SlideBar/>
    </div>
    <div className='col-span-9'>
    <div className='flex justify-center items-center mt-40'>
        <Card title='Enter the code we just texted you' icon='lock-emoji'>
          <InputText value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className='mt-2'>
            <Button text='Next' click={verifyOtp} />
          </div>
          <p style={{ color: '#c4c5c5', width: '70%', margin: '0 auto', marginTop: '10px' }}>
            By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </div>
</div>

      <div className='flex justify-center items-center mt-40'>
        <Card title='Enter the code we just texted you' icon='lock-emoji'>
          <InputText value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className='mt-2'>
            <Button text='Next' click={verifyOtp} />
          </div>
          <p style={{ color: '#c4c5c5', width: '70%', margin: '0 auto', marginTop: '10px' }}>
            By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  )
}

export default Otp