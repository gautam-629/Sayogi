import React, { ChangeEvent, FunctionComponent } from 'react';
import style  from './InputText.module.css';
const InputText = (props) => {
  return (
    <div>
    <input className={style.input} type="text" {...props}/>
   </div>
  )
}

export default InputText;