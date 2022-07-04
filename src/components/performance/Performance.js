import { useState, useEffect }  from 'react'
import Functions from './performance_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import {Paper, Typography, Card, Button, Divider, Box, TextField} from '@mui/material'


function Component({performance, setUpdate}) {

  const [auth, setAuth] = useState(true) // auth handler  
  const [updatedPerformance, setUpdatedPerformance] = useState(performance)

  useEffect(() => {
    Functions.getPerformanceWithMovementWorkoutName(performance, setUpdatedPerformance)
  },[performance])


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Paper elevation={3} sx={{p:1, my: 1, display: 'flex', alignItems: 'center'}} >
      <Box sx={{ width: 1/4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mr: 1}}>
        <Typography >{performance.workout_name}</Typography>
        /
        <Typography >{performance.name}</Typography>
      </Box>
      
      <TextField  sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={updatedPerformance.kg} onChange={e=>{setUpdatedPerformance({...updatedPerformance, kg: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={updatedPerformance.rep} onChange={e=>{setUpdatedPerformance({...updatedPerformance, rep: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={updatedPerformance.meter} onChange={e=>{setUpdatedPerformance({...updatedPerformance, meter: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={updatedPerformance.cal} onChange={e=>{setUpdatedPerformance({...updatedPerformance, cal: e.target.value})}}/>
      <TextField  sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="sec" variant="outlined" value={updatedPerformance.sec} onChange={e=>{setUpdatedPerformance({...updatedPerformance, sec: e.target.value})}}/>
      <Button sx={{ mr: 1, mt:1}}  variant="contained" onClick={()=>Functions.updatePerformance(updatedPerformance, setAuth, setUpdate)}>update</Button>
      <Button sx={{ mr: 1, mt:1}}  variant="contained" color="secondary" onClick={()=>Functions.deletePerformance(updatedPerformance, setAuth, setUpdate)}>delete</Button>
    </Paper>
  );
}

export default Component;
