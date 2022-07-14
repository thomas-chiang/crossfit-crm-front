import Line from '../line/Line'
import Select from 'react-select';
import Functions from './analysis_functions2'
import { useEffect, useState } from 'react'
import {Paper, Box, Typography } from '@mui/material';
import AnalysisBar from '../analysis_bar/AnalysisBar'

function Component() {

  // const [movements, setMovements] = useState([])
  // const [selectedMovement, setSelectedMovement] = useState(null)
  //const [lineData, setLineDate] = useState(null)
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState(null)
  const [userWorkouts, setUserWorkouts] = useState(null)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [workoutMovements, setWorkoutMovements] = useState(null)
  const [movementArr, setMovementArr] = useState(null)

  useEffect(() => {
    Functions.getUsersByRole(1, setMembers)
  },[])

  
  useEffect(() => {
    setSelectedWorkout(null)
    if(selectedMember) Functions.getUserWorkouts(selectedMember.id, setUserWorkouts)
  },[selectedMember])  

  useEffect(() => {
    if(selectedWorkout) Functions.getDistinctWorkoutMovements(selectedWorkout.workout_id, setWorkoutMovements)
  },[selectedWorkout]) 

  useEffect(() => {
    if(selectedMember && selectedWorkout && workoutMovements) Functions.getPerformanceByWorkout(selectedMember.id, selectedWorkout.workout_id, workoutMovements, setMovementArr)
  },[workoutMovements]) 

  console.log(movementArr)

 
  return (
    <Box sx={{p: 3, height: 'auto'}} > 
      <Paper elevation={3} >
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', pt: 1}}>
          <Typography sx={{flexBasis: '100%', textAlign: 'center', fontWeight: 'bold', my: 1}} variant='h4'>Analysis</Typography>
          <Box sx={{ width: 200, mr: 1}}>
            <Select placeholder={'Select user'} defaultValue={selectedMember} onChange={setSelectedMember} options={members}/>
          </Box>
          { selectedMember ?   
            <Box sx={{ width: 200, mr: 1, display: 'flex', alignItems: 'center'}}>
              {userWorkouts?.length > 0 ?
                <Box sx={{width: 1}}><Select placeholder={'Select workout'} value={selectedWorkout} onChange={setSelectedWorkout} options={userWorkouts}/></Box >
                : <Box sx={{ textAlign: 'center'}}><i>No workout has been done. Please pick another user.</i> </Box>
              }
            </Box>
          : <></> }
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1}}>
          {movementArr ? 
            movementArr.map((movement, index)=> 
              <Paper key={index} elevation={3} key={index} sx={{ m: 1, mb: 3, p: 1, width: 4.5/10 }}>
                {movement.name}
                <AnalysisBar barData={movement.barData}/>
              </Paper>
            )
          : <></>}
        </Box>
      </Paper>
    </Box>
  );
}

export default Component;