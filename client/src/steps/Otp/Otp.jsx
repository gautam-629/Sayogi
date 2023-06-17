import React, { useEffect, useState } from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import InputText from '../../components/shared/InputText/InputText';
import { verifyOtpRequest } from '../../store/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../config';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const otpSchema = Yup.string()
  .required('otp is required')
  .length(4, 'Phone number must be 4 digits');

const Otp = ({ handleOnNext }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber, hash } = useSelector((state) => state.auth.otp);

  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  let dispatch = useDispatch();

  async function verifyOtp() {
    try {
      await otpSchema.validate(otp);
    } catch (error) {
      return errorNotify(error.message);
    }
    dispatch(verifyOtpRequest({ otp, phoneNumber, hash }))
    // handleOnNext();
        console.log("Hello")
  }

  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      errorNotify('Internal Server Error');

    }
   
  }, [status])

  return (
    <>
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