import moment from 'moment'
import styles from './course_member.module.css'
import { CalendarContext } from '../../utils/reactContexts'
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_member_functions'
import  { Navigate } from 'react-router-dom' // auth handler


function Component({id}) {

  const calendarContext = useContext(CalendarContext)
  let courseInfo = calendarContext.arr.find(item => item.id === id)

  const [auth, setAuth] = useState(true) // auth handler
  const [course, setCourse] = useState({
    id, 
    start: courseInfo.start.slice(0,-6),
    end: courseInfo.end.slice(0,-6),
    title: courseInfo.title,
    size: courseInfo.size,
    note: courseInfo.note,
  })
  const [selectedGym, setSelectedGym] = useState(courseInfo.gym)
  const [selectedCoaches, setSelectedCoaches] = useState(courseInfo.coaches)
  const [selectedMembers, setSelectedMembers] = useState(courseInfo.members)
  const [selectedWorkouts, setSelectedWorkouts] = useState(courseInfo.workouts)

  useEffect(() => {
    courseInfo = calendarContext.arr.find(item => item.id === id)
  },[calendarContext.update])


  useEffect(()=>{
    setCourse({
      ...course, 
      start: courseInfo.start.slice(0,-6),
      end: courseInfo.end.slice(0,-6)
    })
  },[courseInfo])

  useEffect(()=>{
    setCourse({
      ...course, 
      gym_id: selectedGym?.id,
      coaches: selectedCoaches,
      members: selectedMembers,
      workouts: selectedWorkouts
    })
  },[selectedGym, selectedCoaches, selectedMembers, selectedWorkouts])

  //console.log(courseInfo.members)


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div className={styles.course_border}>
      <div className={styles.course_item}>
        Course ID: {id}
      </div>
      <div className={styles.course_item}>
        Course title: <input disabled className={styles.input_text} type="text" value={course.title} onChange={e => setCourse({...course, title: e.target.value})} ></input>
      </div>
      
      <div className={styles.course_item}>
        Course start time: <input disabled type="datetime-local" value={moment(courseInfo.start).local().format('YYYY-MM-DDTHH:mm:ss')} ></input>
      </div>
      <div className={styles.course_item}>
        Course end time: <input disabled type="datetime-local" value={moment(courseInfo.end).local().format('YYYY-MM-DDTHH:mm:ss')} ></input>
      </div>
      <div className={styles.course_item}>
        Course coaches: 
        {
          courseInfo.coaches?.map((coach, index) => <div key={index} > &nbsp; &nbsp; {coach.name} </div>)
        }
      </div>
      <div className={styles.course_item}>
        Course size: {courseInfo.size_enrolled}/{courseInfo.size}
      </div>
      <div className={styles.course_item}>
        {
          courseInfo.workouts 
          ?  
            <>
              <>Workouts: </>
              {courseInfo.workouts.map((workout, index) =><div key={index}>{workout.name}</div>)}
            </> 
          : <></>
        }
      </div>
      <div className={styles.course_item}>
        Course members: 
        {
          courseInfo.members?.map((member, index) => <div key={index} > 
            &nbsp; &nbsp; {member.name} &nbsp;
            {(() => {
                switch(member.enrollment) {
                  case 0:
                    return 'canceled'
                  case 1:
                    return ''
                  default:
                    return 'waiting'
                }
            })()}
          </div>)
        }
      </div>
      <div className={styles.course_item}>
        Course note:
      </div>
      <div className={styles.course_item}>
        <textarea disabled className={styles.textarea} value={course.note} onChange={e => setCourse({...course, note: e.target.value}) } ></textarea>
      </div>
      <div className={styles.course_item}>
        <button className={styles.button} onClick={()=>Functions.handleEnrollButton(id, calendarContext, setAuth)}>Enroll</button>
        <button className={styles.button} onClick={()=>Functions.handleQuitButton(id, calendarContext, setAuth)}>Quit</button>
        <button className={styles.button} onClick={()=>Functions.handleCancelButton(id, calendarContext)}>Cancel</button>
      </div>
    </div> 
  )
}

export default Component;