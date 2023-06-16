import React from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import InputText from '../../components/shared/InputText/InputText';
const UserName = ({handleOnNext}) => {
  return (
    <>
      <div className='flex justify-center items-center mt-36'>
        <Card title="What’s your full name?" icon="goggle-emoji">
          <InputText />
          <p style={{ color: '#c4c5c5', width: '70%', margin: '0 auto', marginTop: '10px' }}>
            People use real names at Sayogi thanks :) 
          </p>
          <Button text='Next'/>
        </Card>
      </div>
    </>
  )
}

export default UserName;