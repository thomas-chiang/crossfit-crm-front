import styles from './course_creation.module.css'
import { CalendarContext } from '../../utils/reactContexts' 
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_creation_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import SelectParticipants from '../select_participants/SelectParticipants'
import SelectWorkouts from '../select_workouts/SelectWorkouts'

import {Input} from '@mui/material';


function Component() {

  const [auth, setAuth] = useState(true) // auth

  const calendarContext = useContext(CalendarContext)
  const newCourseInfo = calendarContext.newCalendarEvent
  
  const [course, setCourse] = useState({
    start: newCourseInfo.start.slice(0,-6),
    end: newCourseInfo.end.slice(0,-6),
    title: '',
    size: 0,
    note: '',
    point: 0
  }) 
  const [selectedGym, setSelectedGym] = useState(null)
  const [selectedCoaches, setSelectedCoaches] = useState(null)
  const [selectedMembers, setSelectedMembers] = useState(null)
  const [selectedWorkouts, setSelectedWorkouts] = useState(null)

  //console.log(course)
  
  useEffect(()=>{
    setCourse({
      ...course, 
      start: newCourseInfo.start.slice(0,-6),
      end: newCourseInfo.end.slice(0,-6)
    })
  },[calendarContext.newCalendarEvent])

  useEffect(()=>{
    setCourse({
      ...course, 
      gym_id: selectedGym?.id,
      coaches: selectedCoaches,
      members: selectedMembers,
      workouts: selectedWorkouts
    })
  },[selectedGym, selectedCoaches, selectedMembers, selectedWorkouts])

  if (!auth) return <Navigate to='/login'/> // auth
  return (
    <div className={styles.course_border}>
      <div className={styles.course_item}>
        Create course
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
        Course points: <Input size="small" type="number" sx={{ width: 30 }} value={course.point} onChange={e => setCourse({...course, point: e.target.value})} />
      </div>
      
      <div className={styles.course_item}>
        Course size: <input className={styles.input_number} type="number" value={course.size} onChange={e => setCourse({...course, size: e.target.value})} ></input>
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
        <button className={styles.button} onClick={()=>{
            Functions.handleCreateButton(course, calendarContext, setAuth)
          }}>Create</button>
        <button className={styles.button} onClick={()=>calendarContext.setNewCalendarEvent(null)}>Cancel</button>
      </div>
    </div> 
  )
}

export default Component;