import React, { useState } from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import styles from './Avatar.module.css';
import { setAvatar } from '../../store/ActivateSlice';
import { useSelector, useDispatch } from "react-redux";
import { makeActivateRequest } from '../../http';
import { setAuth } from '../../store/AuthSlice';
import { STATUSES } from '../../config';
import Loader from '../../components/shared/Loader/Loader';
export const Avatar = ({ handleOnNext }) => {
  const dispatch = useDispatch();
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
  const { accessToken, refreshToken} = useSelector((state) => state.auth.token);
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/img/monkey-avatar.png");
  const { status } = useSelector((state) => state.auth);
  async function Submit(){
      try {
        const{data}= await makeActivateRequest(name,avatar,accessToken);
        if(data.auth){
          dispatch(setAuth(data))
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
  }
  {status===STATUSES.LOADING && <Loader/>}
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Okay,${name}`} icon="monkey-emoji">
          <p className={styles.subHeading}>How’s this photo?</p>
          <div className={styles.avatarWrapper}>
            <img src={image} alt="avatar" />
          </div>
          <div>
            <input
              onChange={captureImage}
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label className={styles.avatarLabel} htmlFor="avatarInput">
              Choose a different photo
            </label>
          </div>
          <div>
            <Button text="Next" click={Submit}/>
          </div>
        </Card>
      </div>
    </>
  )
}
