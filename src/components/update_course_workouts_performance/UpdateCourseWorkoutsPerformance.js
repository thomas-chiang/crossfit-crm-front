import { useState, useEffect }  from 'react'
import Functions from './update_course_workouts_performance_functions'
import Select from 'react-select';
import { Navigate } from 'react-router-dom' // auth handler
import Performance from '../performance/Performance'
import WorkoutMovements from '../workout_movements/WorkoutMovements'
import {Paper, Typography, Card, Button, Divider, Box, TextField} from '@mui/material'



function Component({
  course_id,
  user_id,
  preSelectedWorkouts
}) {
  const [update, setUpdate] = useState(Date())
  const [workouts, setWorkouts] = useState([])
  const [auth, setAuth] = useState(true) // auth handler  
  const [selectedWorkouts, setSelectedWorkouts] = useState(preSelectedWorkouts)
  const [performances, setPerformances] = useState([])
  const [performances2, setPerformances2] = useState([])


  useEffect(() => {
    Functions.getWorkouts(setWorkouts)
    //Functions.getPerformances(course_id,user_id,setPerformances)
    Functions.getPerformancesByCourseUser(course_id,user_id,setPerformances2)
  },[preSelectedWorkouts, update])

  //console.log(performances2)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box >
      {/* <Box sx={{display: 'flex', justifyContent: 'space-around', mt: 5}}>
        <Button sx={{ mr:1}} variant="contained">add performance</Button>
        <Button variant="contained">update performance</Button>
      </Box> */}
      <Paper elevation={3} sx={{ p:1, my:1}}>
        <Select isMulti defaultValue={selectedWorkouts} onChange={setSelectedWorkouts} options={workouts} />
        {selectedWorkouts?.map((workout, index) =>
          <Paper elevation={3} key={index} sx={{p:1, my: 1}}>
            <Typography >{workout.name}: </Typography>
            < WorkoutMovements 
              setUpdate={setUpdate}
              course_id={course_id}
              user_id={user_id}
              workout_id={workout.id}
              workout_name={workout.name}
            />
          </Paper>
        )}
      </Paper>
      {performances2.length > 0 
      ? 
        <Paper elevation={3} sx={{ p:1, my:1}}>
        <Typography >Performances: </Typography>
        {performances2.map((performance, index) =>
          <Box key={index}>
           
            <Performance
              setUpdate={setUpdate}
              performance={performance}
            />
          </Box>
        )}
      </Paper>
      : <></>}
      
    {/* <div>
      &nbsp; &nbsp; Workouts: 
      <div style={{ margin: '2em', width: 900 }}>
        <Select
          isMulti
          defaultValue={selectedWorkouts}
          onChange={setSelectedWorkouts}
          options={workouts}
        />
        {selectedWorkouts?.map((workout, index) =>
          <div key={index}>
            < WorkoutMovements 
              setUpdate={setUpdate}
              course_id={course_id}
              user_id={user_id}
              workout_id={workout.id}
              workout_name={workout.name}
            />
          </div>
        )}
      </div>
      <br /><br />
      &nbsp; &nbsp; {performances2.length > 0 ? 'Performances: ' : ''}
      <div style={{ marginLeft: '1em' }}>
        {performances2.map((performance, index) =>
          <div key={index}>
            <Performance
              setUpdate={setUpdate}
              performance={performance}
            />
          </div>
        )}
      </div>
      
    </div> */}
    </Box>
  );
}

export default Component;


/* 
{selectedWorkouts?.map((workout, index) =>
  <div key={index}>
    <Performance_creation 
      setUpdate={setUpdate}
      course_id={course_id}
      user_id={user_id}
      workout_id={workout.id}
      workout_name={workout.name}
    />
  </div>
)}
 */