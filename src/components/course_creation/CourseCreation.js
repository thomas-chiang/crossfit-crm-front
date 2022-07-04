import { CalendarContext } from '../../utils/reactContexts' 
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_creation_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import SelectParticipants from '../select_participants/SelectParticipants'
import SelectWorkouts from '../select_workouts/SelectWorkouts'
import {Paper, Typography, Card, Button, Divider, Box, TextField, TextareaAutosize} from '@mui/material'
import {Input} from '@mui/material';
import Select from 'react-select';
import moment from 'moment'

function Component({id ,courseFromCalendar, obj}) {

  const [auth, setAuth] = useState(true) // auth

  const calendarContext = useContext(CalendarContext)
  const courseInfo = calendarContext.arr.find(item => item.id === id)

  

  const [course, setCourse] = useState({
    id,
    start: moment(courseInfo?.start).local().format('YYYY-MM-DDTHH:mm'),
    end: moment(courseInfo?.end).local().format('YYYY-MM-DDTHH:mm'),
    title: obj[id]?.title || '',
    size: obj[id]?.size || '',
    note: obj[id]?.note || '',
    point: obj[id]?.point || '',
    coaches: obj[id]?.coaches || null,
    workouts: obj[id]?.workouts || null,
  }) 
  const [selectedGym, setSelectedGym] = useState(null)
  const [selectedCoaches, setSelectedCoaches] = useState(obj[id]?.coaches || null)
  const [selectedMembers, setSelectedMembers] = useState(null)
  const [selectedWorkouts, setSelectedWorkouts] = useState(obj[id]?.workouts || null)
  const [workouts, setWorkouts] = useState([])
  const [coaches, setCoaches] = useState([])

  useEffect(()=>{
    setCourse({
      ...course,
      note: obj[id]?.note || '',
      point: obj[id]?.point || '',
      size: obj[id]?.size || '',
      title: obj[id]?.title || '',
      coaches: obj[id]?.coaches || null,
      workouts: obj[id]?.workouts || null,
      start: courseInfo?.start.slice(0,-6),
      end: courseInfo?.end.slice(0,-6)
    })
    setSelectedCoaches(obj[id]?.coaches)
    setSelectedWorkouts(obj[id]?.workouts)
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


  useEffect(() => {
    Functions.getWorkouts(setWorkouts)
    Functions.getValidCoaches(setCoaches)
  },[])

  useEffect(() => {
    calendarContext.obj[id] = course
    calendarContext.setObj(calendarContext.obj)
  },[course])

  console.log(new Date(course.start).toUTCString())
  
  if (!auth) return <Navigate to='/login'/> // auth
  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between',  alignItems: 'baseline', mb: 1}}>
        <Typography sx={{ display: 'inline' }} variant="h5" >CREATE COURSE</Typography>
        <Box sx={{display: 'inline-flex'}}>
          <TextField size='small' label="Start time" type="datetime-local" value={course.start} onChange={e => setCourse({...course, start: e.target.value})} />
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <TextField size='small' label="End time" type="datetime-local" value={course.end} onChange={e => setCourse({...course, end: e.target.value})} />
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <TextField sx={{width: 80}} type='number' size='small' label="Point" variant="outlined" value={course.point} onChange={e => setCourse({...course, point: e.target.value})}/>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <TextField sx={{width: 80}} type='number' size='small' label="Size" variant="outlined" value={course.size} onChange={e => setCourse({...course, size: e.target.value})}/>
        </Box> 
      </Box>
      
      <Box sx={{mb: 1, display: 'flex'}}>
        <TextField sx={{ flexGrow: 1}} size='small' label="Course title" variant="outlined" value={course.title} onChange={e => setCourse({...course, title: e.target.value})}/>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
        <Box sx={{ flexGrow: 2}}><Select isMulti value={selectedCoaches} onChange={setSelectedCoaches} options={coaches} placeholder={'Select coaches'} /></Box>
      </Box>
      <Box sx={{mb: 1}}><Select isMulti value={selectedWorkouts} onChange={setSelectedWorkouts} options={workouts} placeholder={'Select workouts'} /></Box>   
      <Box sx={{display: 'flex', mb: 1}}><TextareaAutosize placeholder="note" minRows={3} style={{ width: "100%" }} value={course.note} onChange={e => setCourse({...course, note: e.target.value}) }/></Box>
      <Box sx={{display: 'flex', justifyContent: 'right'}}>
        <Button sx={{mr:1}} variant='contained' onClick={()=>{ Functions.handleCreateButton(course, courseFromCalendar, calendarContext, setAuth)}}>Create</Button>
        <Button color='secondary' variant='contained' onClick={()=>Functions.cancel(id, calendarContext)}>Cancel</Button>
      </Box>
    {/* <div className={styles.course_border}>
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
            Functions.handleCreateButton(course, courseFromCalendar, calendarContext, setAuth)
          }}>Create</button>
        <button className={styles.button} onClick={()=>Functions.cancel(courseFromCalendar, calendarContext)}>Cancel</button>
      </div>
    </div> */}
    </Paper> 
  )
}

export default Component;

// <button className={styles.button} onClick={()=>calendarContext.setNewCalendarEvent(null)}>Cancel</button>