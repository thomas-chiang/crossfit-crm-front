import styles from './course.module.css'
import { CalendarContext } from '../../utils/reactContexts'
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import SelectParticipants from '../select_participants/SelectParticipants'
import SelectWorkouts from '../select_workouts/SelectWorkouts'
import {Input} from '@mui/material'


function Component({id}) {

  const calendarContext = useContext(CalendarContext)
  const courseInfo = calendarContext.arr.find(item => item.id === id)

  const [auth, setAuth] = useState(true) // auth handler
  const [course, setCourse] = useState({
    id, 
    start: courseInfo.start.slice(0,-6),
    end: courseInfo.end.slice(0,-6),
    title: courseInfo.title,
    size: courseInfo.size,
    note: courseInfo.note,
    point: courseInfo.point
  })
  const [selectedGym, setSelectedGym] = useState(courseInfo.gym)
  const [selectedCoaches, setSelectedCoaches] = useState(courseInfo.coaches)
  const [selectedMembers, setSelectedMembers] = useState(courseInfo.members)
  const [selectedWorkouts, setSelectedWorkouts] = useState(courseInfo.workouts)

  

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

  //console.log(course)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div className={styles.course_border}>
      <div className={styles.course_item}>
        Course ID: {id}
      </div>
      <div className={styles.course_item}>
        Course start time: <input type="datetime-local" value={course.start} onChange={e => setCourse({...course, start: e.target.value})} ></input>
      </div>
      <div className={styles.course_item}>
        Course end time: <input type="datetime-local" value={course.end} onChange={e => setCourse({...course, end: e.target.value})} ></input>
      </div>
      <div className={styles.course_item}>
        Course title: <input className={styles.input_text} type="text" value={course.title} onChange={e => setCourse({...course, title: e.target.value})} ></input>
      </div>
      <div className={styles.course_item}>
        Course size: <input className={styles.input_number} type="number" value={course.size} onChange={e => setCourse({...course, size: e.target.value})} ></input>
        &nbsp; Course points: <Input size="small" type="number" sx={{ width: 30 }} value={course.point} onChange={e => setCourse({...course, point: e.target.value})} />
      </div>
      <div className={styles.course_item}>
        <SelectParticipants 
          selectedGym = {selectedGym}
          setSelectedGym = {setSelectedGym}
          selectedCoaches = {selectedCoaches}
          setSelectedCoaches = {setSelectedCoaches}
          selectedMembers = {selectedMembers}
          setSelectedMembers = {setSelectedMembers}
        /> 
      </div>
      <div className={styles.course_item}>
        <SelectWorkouts
          selectedWorkouts = {selectedWorkouts}
          setSelectedWorkouts = {setSelectedWorkouts}
        /> 
      </div>
      <div className={styles.course_item}>
        Course note:
      </div>
      <div className={styles.course_item}>
        <textarea className={styles.textarea} value={course.note} onChange={e => setCourse({...course, note: e.target.value}) } ></textarea>
      </div>
      <div className={styles.course_item}>
        <button className={styles.button} onClick={()=>Functions.handleUpdateButton(course, calendarContext, setAuth)}>Update</button>
        <button className={styles.button} onClick={()=>Functions.handleDeleteButton(id, calendarContext, setAuth)}>Delete</button>
        <button className={styles.button} onClick={()=>Functions.handleCancelButton(id, calendarContext)}>Cancel</button>
      </div>
    </div> 
  )
}

export default Component;