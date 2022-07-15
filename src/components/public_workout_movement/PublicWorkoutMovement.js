import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './public_workout_movement_functions'
import { Button, Box, TextField } from '@mui/material'
import { AppContext } from '../../utils/reactContexts'




function Component({movement, setPassDownUpdate, setUpdateFromChild}) {

  const setAlert =  useContext(AppContext).setAlert

  const workout_movement_id = movement.id
  const [auth, setAuth] = useState(true) // auth
  const [update, setUpdate] = useState(Date())
  const [updatedMovement, setUpdatedMovement] = useState(movement)
  const [disable, setDisable] = useState(false)


  useEffect(()=>{
    Functions.getWorkoutMovement(setUpdatedMovement, workout_movement_id)
  },[update, movement])


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{ maxHeight: '100%', display: 'flex', alignItems: 'center'}}>
      <Box sx={{m:1, width: 150, textAlign: 'end'}}>{movement.name}:</Box>
      {updatedMovement?.kg ? <Box sx={{m:1}}>{updatedMovement?.kg} kg(s)</Box> : <></>}
      {updatedMovement?.rep ? <Box sx={{m:1}}>{updatedMovement?.rep} rep(s)</Box> : <></>}
      {updatedMovement?.meter ? <Box sx={{m:1}}>{updatedMovement?.meter} meter(s)</Box> : <></>}
      {updatedMovement?.cal ? <Box sx={{m:1}}>{updatedMovement?.cal} cal(s)</Box> : <></>}  
    </Box>
  );
}

export default Component;