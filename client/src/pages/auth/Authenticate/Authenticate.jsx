import React from 'react'
import { useState } from 'react';
import Phone from '../../../steps/Phone/Phone';
import Otp from '../../../steps/Otp/Otp';
const steps={
    1: Phone,
    2: Otp,
  };

const Authenticate = () => {
    const [step, setStep] = useState(2)
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

export default Authenticate;