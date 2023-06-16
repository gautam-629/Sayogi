import React,{useState} from 'react'
import UserName from '../../../steps/UserName/UserName';
import { Avatar } from '../../../steps/Avatar/Avatar';
const steps={
    1: UserName,
    2: Avatar,
  };

  const Activate = () => {
  const [step, setStep] = useState(1)
  const Step = steps[step];
  function onNext() {
    setStep(step + 1);
  }
  return (
    <div>
    <Step handleOnNext={onNext} />
  </div>
  )
}

export default Activate;