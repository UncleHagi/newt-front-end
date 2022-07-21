import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getActivityDetails } from '../../services/bored-api'
import { useLocation } from 'react-router-dom'
import  styles from './ActivityDetails.module.css'
import * as profileService from '../../services/profileService'
import * as activityService from '../../services/activityService'
import CommentSection from '../../components/CommentSection/CommentSection'

const ActivityDetails = ( {user} ) => {
  const [activityDetails, setActivityDetails] = useState({})
  const location = useLocation()
  const [savedActivity, setSavedActivity] = useState()
  console.log(location)
  const key = location.state.soloActivity 
    ? location.state.soloActivity.key 
    : location.state.groupActivity.key

  console.log("this is the key", key)


  useEffect(() => {
    const fetchActivityDetails = async () => {
      const activityData = await getActivityDetails(key)
      const res = await activityService.findCommentsByKey(key)
      // if (!res) {
      // }
      setSavedActivity(res)
      console.log('res', res)
      setActivityDetails(activityData)
    }
    fetchActivityDetails()
  }, [key])
  console.log(key)

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log('user', user.profile, activityDetails)
    const activity = await profileService.addApiActivity(user.profile, activityDetails)
    setSavedActivity(activity)
    console.log('activity', activity)
  }

  // const handleAddApiActivity = async (newApiActivityData) => {
  //   
  // }
  console.log('activity details', activityDetails)
  console.log('saved activity', savedActivity)

  return (
    <>
      <div className={styles.detailsPage}>
      {activityDetails.activity ?
      <>
        <div className={styles.activityDetails}>
          <div className={styles.activityName}>
            <h4>ACTIVITY:</h4>
            <p>
              {activityDetails.activity}
              </p>
            </div>
            <div className={styles.activityType}>
              <h4>TYPE:</h4>
              {activityDetails.type}
            </div>
            <div className={styles.activityPartic}>
              <h4>PARTICIPANTS:</h4>
              {activityDetails.participants}
            </div>
            <div className={styles.activityPrice}>
              <h4>PRICE:</h4>
              {activityDetails.price}
            </div>
            <div className={styles.CommentSectionDiv}>
              {savedActivity &&
              
              <CommentSection 
                savedActivity={savedActivity}
                setSavedActivity={setSavedActivity}
                profile={user?.profile}
              />
              }
            </div>
            <div className={styles.returnContainer}>
              <br />
              <Link className={styles.returnLink} to="/">Return Home</Link>
              <button onClick={handleSubmit} className={styles.addButton}>Add to List</button>
            </div>
          </div>
      </>
      :
      <>
        <p>Loading activity details...</p>
        <div className='returnContainer'>
          <Link className='returnLink' to="/">Return</Link>
        </div>
      </>
      }
      </div>
    </>
  )
}

export default ActivityDetails