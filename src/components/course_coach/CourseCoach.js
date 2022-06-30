import moment from 'moment'
import styles from './course_coach.module.css'
import { CalendarContext } from '../../utils/reactContexts'
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_coach_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import UpdateCourseWorkoutsPerformance from '../update_course_workouts_performance/UpdateCourseWorkoutsPerformance'

function Component({id}) {

  const calendarContext = useContext(CalendarContext)
  let courseInfo = calendarContext.arr.find(item => item.id === id)

  const [auth, setAuth] = useState(true) // auth handler

  useEffect(() => {
    courseInfo = calendarContext.arr.find(item => item.id === id)
  },[calendarContext.update])


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div className={styles.course_border}>
      <div className={styles.course_item}>
        Course ID: {id}
      </div>
      <div className={styles.course_item}>
        Course title: <input disabled className={styles.input_text} type="text" value={courseInfo.title} ></input>
      </div>
      <div className={styles.course_item}>
        Course start time: <input disabled type="datetime-local" value={moment(courseInfo.start).local().format('YYYY-MM-DDTHH:mm:ss')} ></input>
      </div>
      <div className={styles.course_item}>
        Course end time: <input disabled type="datetime-local" value={moment(courseInfo.end).local().format('YYYY-MM-DDTHH:mm:ss')} ></input>
      </div>
      
      <div className={styles.course_item}>
        Course members: 
        {
          courseInfo.members.map((member, index) => 
          <div key={index} > 
            {member.name}  {member.enrollment == 1 
            ? 
              <UpdateCourseWorkoutsPerformance
                  course_id={id}
                  user_id={member.id}
                  preSelectedWorkouts = {courseInfo.workouts ? courseInfo.workouts : null}
              />
            
            : member.enrollment > 0 ? '-- enrollment status: failed' : '-- enrollment status: canceled'}
            <br/>  
          </div>)
        }
      </div>
  
      <div className={styles.course_item}>
        <button className={styles.button} onClick={()=>Functions.handleCancelButton(id, calendarContext)}>Cancel</button>
      </div>
    </div> 
  )
}

export default Component;