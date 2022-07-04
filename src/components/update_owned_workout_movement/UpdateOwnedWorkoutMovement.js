import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './update_owned_workout_movement_functions'
import {Paper, Typography, Card, Button, Box, Radio, TextField, TextareaAutosize} from '@mui/material'



function Component({movement, setPassDownUpdate, passDownUpdate, setUpdateFromChild}) {

  const workout_movement_id = movement.id
  const [auth, setAuth] = useState(true) // auth
  const [update, setUpdate] = useState(Date())
  const [updatedMovement, setUpdatedMovement] = useState(movement)


  useEffect(()=>{
    Functions.getWorkoutMovement(setUpdatedMovement, workout_movement_id)
  },[update, movement])

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <>
    <Box sx={{ maxHeight: '100%', display: 'flex'}}>
      <TextField disabled={true} sx={{m:1, width: 150}} size='small' label="Movement" variant="outlined" value={updatedMovement.name}/>
      <TextField sx={{m:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={updatedMovement.kg || ''} onChange={e => setUpdatedMovement({...updatedMovement, kg: e.target.value})}/>
      <TextField sx={{m:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={updatedMovement.rep || ''} onChange={e => setUpdatedMovement({...updatedMovement, rep: e.target.value})}/>
      <TextField sx={{m:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={updatedMovement.meter || ''} onChange={e => setUpdatedMovement({...updatedMovement, meter: e.target.value})}/>
      <TextField sx={{m:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={updatedMovement.cal || ''} onChange={e => setUpdatedMovement({...updatedMovement, cal: e.target.value})}/>
      <TextField sx={{m:1, width: 100}} size='small' type='number' label="sec" variant="outlined" value={updatedMovement.sec || ''} onChange={e => setUpdatedMovement({...updatedMovement, sec: e.target.value})}/>
      <Button sx={{ m: 1}} size='small' onClick={()=>{Functions.updateOwnedWorkoutMovement(updatedMovement, setUpdate, setPassDownUpdate, setAuth)}} variant="contained" >update</Button>
      <Button sx={{ m: 1}} size='small' onClick={()=>{Functions.deleteWorkoutMovement(workout_movement_id, setUpdateFromChild, setPassDownUpdate, setAuth)}} variant="contained" color="secondary">delete</Button> 
    </Box>
    {/* <div>
      {updatedMovement.name} --  
      kg: <input type='number' value={updatedMovement.kg} onChange={e => setUpdatedMovement({...updatedMovement, kg: e.target.value})}></input>
      rep: <input type='number' value={updatedMovement.rep} onChange={e => setUpdatedMovement({...updatedMovement, rep: e.target.value})}></input>
      meter: <input type='number' value={updatedMovement.meter} onChange={e => setUpdatedMovement({...updatedMovement, meter: e.target.value})}></input>
      cal: <input type='number' value={updatedMovement.cal} onChange={e => setUpdatedMovement({...updatedMovement, cal: e.target.value})}></input>
      sec: <input type='number' value={updatedMovement.cal} onChange={e => setUpdatedMovement({...updatedMovement, sec: e.target.value})}></input>
      <button onClick={()=>{Functions.updateOwnedWorkoutMovement(updatedMovement, setUpdate, setPassDownUpdate, setAuth)}}>update</button>
      <button onClick={()=>{Functions.deleteWorkoutMovement(workout_movement_id, setUpdateFromChild, setPassDownUpdate, setAuth)}}>delete</button>
    </div> */}
    </>
  );
}

export default Component;