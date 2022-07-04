import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './update_owned_workout_functions'
import Select from 'react-select';
import UpdateOwnedWorkoutMovement from '../update_owned_workout_movement/UpdateOwnedWorkoutMovement'
import {Paper, Typography, Card, Button, Box, Radio, TextField, TextareaAutosize} from '@mui/material'



function Component({workout, movementOptions, passDownUpdate, setPassDownUpdate}) {

  const [updateFromChild, setUpdateFromChild] = useState(Date())
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [updatedWorkout, setUpdatedWorkout] = useState(workout)
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [newWorkoutMovement, setNewWorkoutMovement] = useState ({
    workout_id: workout.id,
    kg: '',
    rep: '',
    meter: '',
    cal: '',
    sec: ''
  })

  useEffect(() => {
    Functions.getWorkout(workout.id, setUpdatedWorkout)
  },[update, updateFromChild, workout, passDownUpdate]) // must add 'workout'

  useEffect(() => {
    setNewWorkoutMovement({...newWorkoutMovement, movement_id: selectedMovement?.id})
  },[selectedMovement])

  const customStyles = {
    control: base => ({
      ...base,
      height: 40,
      width: 150,
    })
  };


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    
    <Card sx={{ p: 1, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', /* width: 950 */ }}>
        <TextField sx={{m:1}} size='small' label="Workout name" variant="outlined" value={updatedWorkout.name} onChange={e => setUpdatedWorkout({...updatedWorkout, name: e.target.value})}/>
        {
          updatedWorkout.movements
          ? updatedWorkout.movements.map((movement, index) =>
            <UpdateOwnedWorkoutMovement 
              key={index} 
              movement={movement} 
              workout_id={workout.id} 
              setPassDownUpdate={setPassDownUpdate} 
              passDownUpdate={passDownUpdate}
              setUpdateFromChild={setUpdateFromChild} 
            />)
          : <></>
        }
        <Box sx={{ maxHeight: '100%', display: 'flex'}}>
          <Box sx={{m:1}}>
            <Select maxMenuHeight={120} defaultValue={selectedMovement} onChange={setSelectedMovement} options={movementOptions} styles={customStyles}/>
          </Box>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={newWorkoutMovement.kg} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, kg: e.target.value})}/>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={newWorkoutMovement.rep} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, rep: e.target.value})} />
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={newWorkoutMovement.meter} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, meter: e.target.value})}/>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={newWorkoutMovement.cal} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, cal: e.target.value})}/>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="sec" variant="outlined" value={newWorkoutMovement.sec} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, sec: e.target.value})}/>
          <Button sx={{ m: 1}} size='small' disabled={!selectedMovement} onClick={()=>{Functions.addWorkoutMovement(newWorkoutMovement, setAuth, setUpdate, setPassDownUpdate)}} variant="contained" > add movement</Button> 
        </Box>
        <TextareaAutosize placeholder="note" style={{ margin: 10 }} minRows={3} value={updatedWorkout.note} onChange={e => setUpdatedWorkout({...updatedWorkout, note: e.target.value})}/>
        <Box sx={{display: 'flex', justifyContent: 'right'}}>
          <Button sx={{ m: 1}} variant='contained' onClick={() => {Functions.updateOnlyWorkout(updatedWorkout, setAuth, setUpdate, setPassDownUpdate)}} >update workout</Button>
          <Button sx={{ m: 1}} variant='contained' onClick={() => {Functions.deleteWorkout(updatedWorkout.id, setAuth, setPassDownUpdate)}} color="secondary">delete workout</Button>
        </Box>
      </Card>
    
    
  );
}

export default Component;

{/* <div>
      name: <input value={updatedWorkout.name} onChange={e => setUpdatedWorkout({...updatedWorkout, name: e.target.value})}></input>
      <br/> <br/>{
        updatedWorkout.movements.length > 0 
        ? updatedWorkout.movements.map((movement, index) =>
          <UpdateOwnedWorkoutMovement 
            key={index} 
            movement={movement} 
            workout_id={workout.id} 
            setPassDownUpdate={setPassDownUpdate} 
            passDownUpdate={passDownUpdate}
            setUpdateFromChild={setUpdateFromChild} 
          />)
        : <></>
      }

      <div style={{display: 'flex'}}>
        <Select
          defaultValue={selectedMovement}
          onChange={setSelectedMovement}
          options={movementOptions}
        />
        kg: <input type='number' value={newWorkoutMovement.kg} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, kg: e.target.value})}></input>
        rep: <input type='number' value={newWorkoutMovement.rep} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, rep: e.target.value})}></input>
        meter: <input type='number' value={newWorkoutMovement.meter} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, meter: e.target.value})}></input>
        cal: <input type='number' value={newWorkoutMovement.cal} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, cal: e.target.value})}></input>
        sec: <input type='number' value={newWorkoutMovement.sec} onChange={e => setNewWorkoutMovement({...newWorkoutMovement, sec: e.target.value})}></input>
        <button disabled={!selectedMovement} onClick={()=>{Functions.addWorkoutMovement(newWorkoutMovement, setAuth, setUpdate, setPassDownUpdate)}} >add movement</button>
      </div>

      <br/> Demo-link: <input value={updatedWorkout.demo_link} onChange={e => setUpdatedWorkout({...updatedWorkout, demo_link: e.target.value})}></input>
      <br/> Minutes: <input type='number' value={updatedWorkout.minute} onChange={e => setUpdatedWorkout({...updatedWorkout, minute: e.target.value})}></input>
      <br/> Note: <textarea value={updatedWorkout.note} onChange={e => setUpdatedWorkout({...updatedWorkout, note: e.target.value})}></textarea>
      <br/>
      <button  onClick={() => {Functions.updateOnlyWorkout(updatedWorkout, setAuth, setUpdate, setPassDownUpdate)}}>update workout</button>
      <button  onClick={() => {Functions.deleteWorkout(updatedWorkout.id, setAuth, setPassDownUpdate)}}>delete workout</button>
      <br/><br/><br/><br/><br/>
    </div> */}