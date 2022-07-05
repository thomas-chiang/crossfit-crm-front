import { useState, useEffect }  from 'react'
import Functions from './update_course_workouts_performance_functions'
import Select from 'react-select';
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
  const [selectedWorkouts, setSelectedWorkouts] = useState(preSelectedWorkouts)
  const [performances, setPerformances] = useState([])


  useEffect(() => {
    Functions.getWorkouts(setWorkouts)
    Functions.getPerformancesByCourseUser(course_id,user_id,setPerformances)
  },[preSelectedWorkouts, update])


  return (
    <Box >
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
      {performances.length > 0 
      ? 
        <Paper elevation={3} sx={{ p:1, my:1}}>
        <Typography >Performances: </Typography>
        {performances.map((performance, index) =>
          <Box key={index}>
            <Performance
              setUpdate={setUpdate}
              performance={performance}
            />
          </Box>
        )}
      </Paper>
      : <></>}
    </Box>
  );
}

export default Component;

