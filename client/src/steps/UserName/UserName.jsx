import React, { useState } from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import InputText from '../../components/shared/InputText/InputText';
import { setName } from '../../store/ActivateSlice';
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
const otpFullName = Yup.string()
.min(3, 'Full name must be at least 3 characters')
.max(20, 'Full name cannot exceed 20 characters')
.required('Full name is required');
  
const UserName = ({ handleOnNext }) => {
  const errorNotify = (errMessage) => toast.error(`${errMessage}!`);
  let dispatch=useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [fullname, setFullname] = useState(name);

  async function nextStep(){
    try {
      console.log(fullname)
      await  otpFullName.validate(fullname);
    } catch (error) {
      return errorNotify(error.message);
    }
    dispatch(setName(fullname));
    handleOnNext();
  }
  return (
    <>
      <div className='flex justify-center items-center mt-36'>
        <Card title="What’s your full name?" icon="goggle-emoji">
          <InputText value={fullname}
            onChange={(e) => setFullname(e.target.value)} />
          <p style={{ color: '#c4c5c5', width: '70%', margin: '0 auto', marginTop: '10px' }}>
            People use real names at Sayogi thanks :)
          </p>
          <Button text='Next' click={nextStep} />
        </Card>
      </div>
    </>
  )
}

export default UserName;