import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './workout_movement_functions'
import React from 'react'
import {Paper, Typography, Card, Button, Divider, Box, TextField} from '@mui/material'



function Component({course_id, user_id, workout_id, workout_name, setUpdate}) {

  const [movements, setMovements] = useState([])
  
  useEffect(()=>{
    Functions.getWorkoutMovements(workout_id, setMovements)
  },[])

  return (
    <>
      {movements.map((movement, index) => 
        <Box>
          <CreatePerformance 
            course_id={course_id} 
            user_id={user_id} 
            workout_id={workout_id} 
            setUpdate={setUpdate} 
            movement={movement}
            workout_name={workout_name}
          />
        </Box>
      )}
    </>
  );
}

export default Component;


function CreatePerformance({course_id, user_id, workout_id, setUpdate, movement, workout_name}) {

  const [auth, setAuth] = useState(true) // auth handler  
  const [performance, setPerformance] = useState({
    movement_id: movement.movement_id,
    course_id, 
    user_id,
    workout_id,
    kg: '',
    meter: '',
    rep: '',
    cal: '',
    sec: ''
  })


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{display: 'flex', alignItems: 'stretch'}}> 
      <Typography sx={{ width: 1/9, display: 'flex', alignItems: 'center', justifyContent: 'right', mr: 1}}>{movement.name}</Typography>
      <TextField  sx={{mr:1, mt:1, width: 80}} size='small' type='number' label="kg" variant="outlined" value={performance.kg} onChange={e=>{setPerformance({...performance, kg: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 80}} size='small' type='number' label="rep" variant="outlined" value={performance.rep} onChange={e=>{setPerformance({...performance, rep: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 80}} size='small' type='number' label="meter" variant="outlined" value={performance.meter} onChange={e=>{setPerformance({...performance, meter: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 80}} size='small' type='number' label="cal" variant="outlined" value={performance.cal} onChange={e=>{setPerformance({...performance, cal: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 80}} size='small' type='number' label="sec" variant="outlined" value={performance.sec} onChange={e=>{setPerformance({...performance, sec: e.target.value})}}/>
      <Button sx={{ mr: 1, mt:1}}  variant="contained" onClick={()=>{Functions.createPerformance(performance, setAuth, setUpdate)}}>create performance</Button>
     {/*  {movement.name}:         
      kg: <input placeholder='kg' style={{ width: 60}} value={performance.kg} onChange={e=>{setPerformance({...performance, kg: e.target.value})}}></input>
      meter: <input placeholder='meter' style={{ width: 60}} value={performance.meter}onChange={e=>{setPerformance({...performance, meter: e.target.value})}}></input>
      rep: <input placeholder='rep' style={{ width: 60}} value={performance.rep}onChange={e=>{setPerformance({...performance, rep: e.target.value})}}></input>
      cal: <input placeholder='cal' style={{ width: 60}} value={performance.cal}onChange={e=>{setPerformance({...performance, cal: e.target.value})}}></input>
      sec: <input placeholder='sec' style={{ width: 60}} value={performance.sec}onChange={e=>{setPerformance({...performance, sec: e.target.value})}}></input>
      <button onClick={()=>{Functions.createPerformance(performance, setAuth, setUpdate)}}>add performance</button> */}
    </Box>
  );
}

