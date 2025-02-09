import styles from './ApiActivityCard.module.css'
import pinkStar from '../../assets/pink-star.png'

const ApiActivityCard = (props, {user}) => {
  console.log('this is props', props, "this is user", props.profile?._id)
  return (
  <>
    <div className={styles.cardHolder}>
    <div className={styles.star}>
    <img class={styles.starBulletImg} src={pinkStar} alt="pink star bullet" />
    </div>
    <div className={styles.activityProp}>
    {props.activity.activity}
    </div>
  {props.user?.profile === props.profile?._id ?
  <>
    <div>
      <button onClick={() => props.addToDoneActivities(props.activity)}>+</button>
    </div>
  </>
  :
  <>
    <p>
    </p>
  </>
  }
  </div>
  </>
  )
}

export default ApiActivityCard