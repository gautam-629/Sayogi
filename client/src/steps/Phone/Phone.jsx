import React,{useState} from 'react';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import InputText from '../../components/shared/InputText/InputText';

const Phone = ({handleOnNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  function submit(){
    // write here submit
  }
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