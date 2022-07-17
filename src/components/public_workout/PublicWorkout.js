import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './public_workout_functions'
import Select from 'react-select';
import PublicWorkoutMovement from '../public_workout_movement/PublicWorkoutMovement'
import {Paper, Button, Box, TextField, TextareaAutosize, Divider, CardMedia, Typography} from '@mui/material'
import { AppContext } from '../../utils/reactContexts'




function Component({workout, movementOptions, passDownUpdate, setPassDownUpdate}) {


  const [updateFromChild, setUpdateFromChild] = useState(Date())
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [updatingWorkout, setUpdatingWorkout] = useState(workout)
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [newWorkoutMovement, setNewWorkoutMovement] = useState ({
    workout_id: workout.id,
    kg: '',
    rep: '',
    meter: '',
    cal: '',
    // sec: ''
  })
  const [disable, setDisable] = useState(false)
  const setAlert =  useContext(AppContext).setAlert
  const [distinctMovements, setDistinctMovements] = useState([])


  useEffect(() => {
    Functions.getWorkout(workout.id, setUpdatingWorkout)
  },[update, updateFromChild, workout, passDownUpdate]) // must add 'workout'

  useEffect(() => {
    setNewWorkoutMovement({...newWorkoutMovement, movement_id: selectedMovement?.id})
  },[selectedMovement])


  useEffect(() => {
    Functions.getDistinctWorkoutMovements(workout.id, setDistinctMovements)
  },[])

  console.log(distinctMovements)

  const customStyles = {
    control: base => ({
      ...base,
      height: 40,
      width: 200,
    })
  };


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Paper elevation={5} sx={{ p: 1, m: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Box sx={{m:1, fontWeight: 'bold'}}> {updatingWorkout.name || ''}:</Box>
        {updatingWorkout.round ? <Box sx={{m:1}}> {updatingWorkout.round} round(s)</Box> : <></> }
        {updatingWorkout.extra_count ? <Box sx={{m:1}}> {updatingWorkout.extra_count} extra count(s)</Box> : <></> }
        {updatingWorkout.minute ? <Box sx={{m:1}}> {updatingWorkout.minute} minute(s)</Box> : <></> }
        {updatingWorkout.extra_sec ? <Box sx={{m:1}}> {updatingWorkout.extra_sec} extra sec(s)</Box> : <></> }
      </Box> 
      <Divider/>
      <Box sx={{display: 'flex'}}>
        <Box>
          {
            updatingWorkout.movements
            ? updatingWorkout.movements.map((movement, index) =>
              <PublicWorkoutMovement 
                key={index} 
                movement={movement} 
                workout_id={workout.id} 
                setPassDownUpdate={setPassDownUpdate} 
                passDownUpdate={passDownUpdate}
                setUpdateFromChild={setUpdateFromChild} 
              />)
            : <></>
          }
        </Box>
        <Divider orientation="vertical" sx={{ m: 1, }} flexItem />
        <Box sx={{display: 'flex', alignItems: 'start', flexWrap: 'wrap', width: 310}}>
          {distinctMovements.map((movement, index)=> 
            <MovementBox key={index} id={movement.id} movement={movement} setUpdate={setUpdate} setAuth={setAuth} />
          )}
        </Box>
      </Box>
      <Divider/>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <TextareaAutosize disabled={true} placeholder="workout note" style={{ margin: 8, flexGrow: 1,  height: '100%' }} minRows={3} value={updatingWorkout.note || ''} onChange={e => setUpdatingWorkout({...updatingWorkout, note: e.target.value})}/>
      </Box>
    </Paper>
    
    
  );
}

export default Component;






function MovementBox({id, movement, setUpdate, setAuth}) {

  const [updateingMovement, setUpdateingMovement] = useState({
    name: movement.name,
    demo_link: movement.demo_link,
    id,
  })
  const [disable, setDisable] = useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setUpdateingMovement({
      name: movement.name,
      demo_link: movement.demo_link,
      id,
    })
  },[movement])
  //console.log(updateingMovement)

  //console.log(movement.embed_link)

  return (
    <Paper elevation={5} sx={{ m: 1,  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer',}} onClick={()=>setPlay(!play)}>
      <Box sx={{mx: 1}}>
        <Typography >{updateingMovement.name}</Typography>
      </Box>
    
      { movement.demo_link ? 
      <Box sx={{flexBasis: '100%'}} >
        {play 
        ?
          <iframe
            frameBorder="0"
            src={`${movement.embed_link}?autoplay=1&mute=1&showinfo=0&modestbranding=1&rel=0`}
            allow='autoplay'
            muted
            style={{height: 140}}
          />
        :
          <CardMedia
            sx={{ mb: 0.5}}
            component="img"
            height="100"
            image={`https://img.youtube.com/vi/${movement.youtube_id}/0.jpg`}
          />
        }
      </Box>  
      : <></>}
    </Paper>
  )
}
