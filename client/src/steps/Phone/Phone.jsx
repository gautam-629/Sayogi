import React, { useState } from 'react';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import InputText from '../../components/shared/InputText/InputText';
import { sendOtpRequest, setStatus } from '../../store/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { STATUSES } from '../../config';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const phoneSchema=Yup.string()
.required('Phone number is required')
.matches(/^(98|97)\d{8}$/, 'Invalid phone number')
.length(10, 'Otp must be 10 digits');

const Phone = ({ handleOnNext }) => {

  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);

  let dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState("");
  async function submit() {
    
    // validate
    try {
      await phoneSchema.validate(phoneNumber);
    } catch (error) {
       return errorNotify(error.message);
    }

    dispatch(sendOtpRequest({ phoneNumber }))

        handleOnNext();
   
  }
  const { status } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (status === STATUSES.ERROR) {
      errorNotify('Internal Server Error');
    }

    return()=>{
      dispatch(setStatus(STATUSES.IDLE));
    }

  }, [status,dispatch])
  return (
    <>
      <div className='flex w-full h-screen justify-center items-center'>
        <Card icon='phone' title='Enter your Phone number'>
          <InputText
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className='mt-2'>
            <Button text='Next' click={submit} />
          </div>
          <p style={{ color: '#c4c5c5', width: '70%', margin: '0 auto', marginTop: '10px' }}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  )
}

export default Phone