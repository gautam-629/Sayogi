import React,{useState} from 'react'
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
import styles from './Avatar.module.css'
export const Avatar = ({handleOnNext}) => {
  const [image, setImage] = useState("/img/monkey-avatar.png");
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
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label className={styles.avatarLabel} htmlFor="avatarInput">
              Choose a different photo
            </label>
          </div>
          <div>
            <Button text="Next" />
          </div>
        </Card>
      </div>
    </>
  )
}
