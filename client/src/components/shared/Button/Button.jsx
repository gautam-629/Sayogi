import React from 'react'
import style from './Button.module.css'
const Button = ({text,click}) => {
  return (
    <button className={style.button} onClick={click}>
    <span>{text}</span>
    <img width={20} height={20} className={style.arrow} src="/img/arrow-forward.png" alt="arrow" />
  </button>
  )
}

export default Button;