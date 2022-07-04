import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './workout_functions'
import Select from 'react-select';
import { AppContext } from '../../utils/reactContexts'
import UpdateOwnedWorkout from '../update_owned_workout/UpdateOwnedWorkout'
import {Paper, Typography, Card, Button, Box, Radio, TextField, TextareaAutosize} from '@mui/material'



function Component() {
 
  const appContext = useContext(AppContext)
  const [passDownUpdate, setPassDownUpdate] = useState(Date())
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth


  // all workouts
  const [workouts, setWorkouts] = useState([])

  // create workout
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    demo_link: '' ,
    minute: '',
    note: ''
  })
  const [movementOptions, setMovementOptions] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [movementDetail, setMovementDetail] = useState ({
    kg: '',
    rep: '',
    meter: '',
    cal: '',
    sec: ''
  })
  const [movementArr, setMovementArr] = useState([])
  
  // owned workouts


  useEffect(() => {
    Functions.getWorkoutsWithMovements(setWorkouts)
    Functions.getMovementOptions(setMovementOptions)
  },[update, appContext.update, passDownUpdate])


  const customStyles = {
    control: base => ({
      ...base,
      height: 40,
      width: 150,
    })
  };

 

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3, display: 'flex', alignItems: 'stretch', flexWrap: 'wrap'}}>
      <Card sx={{ p: 1, m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', /* width: 950  */}}>
        <TextField sx={{m:1}} size='small' label="Workout name" variant="outlined" value={newWorkout.name} onChange={e => setNewWorkout({...newWorkout, name: e.target.value})}/>
        {
          movementArr.length > 0 
          ? 
          movementArr.map((movement, index) =>
            <Box key={index} sx={{ maxHeight: '100%', display: 'flex'}}>
              <TextField disabled={true} sx={{m:1, width: 150}} size='small' label="Movement" variant="outlined" value={movement.name}/>
              <TextField disabled={true} sx={{m:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={movement.kg}/>
              <TextField disabled={true} sx={{m:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={movement.rep}/>
              <TextField disabled={true} sx={{m:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={movement.meter}/>
              <TextField disabled={true} sx={{m:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={movement.cal}/>
              <TextField disabled={true} sx={{m:1, width: 100}} size='small' type='number' label="sec" variant="outlined" value={movement.sec}/>
              <Button sx={{ m: 1}} size='small' onClick={()=>{setMovementArr(movementArr.filter((m, i) => i !== index))}} variant="contained" color="secondary">remove movement</Button> 
            </Box>
          )
          : <></>
        }
        <Box sx={{ maxHeight: '100%', display: 'flex'}}>
          <Box sx={{m:1}}>
            <Select maxMenuHeight={120} defaultValue={selectedMovement} onChange={setSelectedMovement} options={movementOptions} styles={customStyles}/>
          </Box>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={movementDetail.kg} onChange={e => setMovementDetail({...movementDetail, kg: e.target.value})}/>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={movementDetail.rep} onChange={e => setMovementDetail({...movementDetail, rep: e.target.value})} />
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={movementDetail.meter} onChange={e => setMovementDetail({...movementDetail, meter: e.target.value})}/>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={movementDetail.cal} onChange={e => setMovementDetail({...movementDetail, cal: e.target.value})}/>
          <TextField sx={{m:1, width: 100}} size='small' type='number' label="sec" variant="outlined" value={movementDetail.sec} onChange={e => setMovementDetail({...movementDetail, sec: e.target.value})}/>
          <Button sx={{ m: 1}} size='small' disabled={!selectedMovement} onClick={()=>{setMovementArr([...movementArr, { ...movementDetail, movement_id: selectedMovement.id, name: selectedMovement.name}])}} variant="contained" > add movement</Button> 
        </Box>
        <TextareaAutosize placeholder="note" style={{ margin: 10 }} minRows={3} value={newWorkout.note} onChange={e => setNewWorkout({...newWorkout, note: e.target.value})}/>
        <Box sx={{display: 'flex', justifyContent: 'right'}}>
          <Button sx={{ m: 1}} variant='contained' disabled={movementArr.length == 0} onClick={() => Functions.createWorkout(newWorkout, movementArr, setUpdate, setAuth)} >create workout</Button>
        </Box>
      </Card>
      {workouts.map((ownedWorkout, index)=>
        <UpdateOwnedWorkout key={index} movementOptions={movementOptions} workout={ownedWorkout} setPassDownUpdate={setPassDownUpdate} passDownUpdate={passDownUpdate}/>
      )}

    </Box>
  )
}

export default Component;



/* <div>
All workouts: {workouts.map((workout, index) => 
  <div key={index}>
    {workout.name} 
    <br />
    {
      workout.movements.map((movement, key) =>
        <div key={key}>
          &nbsp; &nbsp; {movement.name} -- kg:{movement.kg} rep:{movement.rep} meter:{movement.meter} cal:{movement.cal} 
        </div>
      )
    }
    <a href={workout.demo_link} target="_blank" rel="noopener noreferrer">demo link</a>
    <div>minutes: {workout.minute}</div>
    note:
    <div style={{whiteSpace: 'pre'}}> {workout.note}</div>
    <br />
  </div>
)}
<br/><br/><br/>

<div>Create workout:</div>
Workout name: <input value={newWorkout.name} onChange={e => setNewWorkout({...newWorkout, name: e.target.value})}></input>
  <div style={{display: 'flex'}}>
    <Select
      defaultValue={selectedMovement}
      onChange={setSelectedMovement}
      options={movementOptions}
    />
    kg: <input type='number' value={movementDetail.kg} onChange={e => setMovementDetail({...movementDetail, kg: e.target.value})}></input>
    rep: <input type='number' value={movementDetail.rep} onChange={e => setMovementDetail({...movementDetail, rep: e.target.value})}></input>
    meter: <input type='number' value={movementDetail.meter} onChange={e => setMovementDetail({...movementDetail, meter: e.target.value})}></input>
    cal: <input type='number' value={movementDetail.cal} onChange={e => setMovementDetail({...movementDetail, cal: e.target.value})}></input>
    sec: <input type='number' value={movementDetail.sec} onChange={e => setMovementDetail({...movementDetail, sec: e.target.value})}></input>
     <button disabled={!selectedMovement} onClick={()=>{
      setMovementArr([...movementArr, {
        ...movementDetail,
        movement_id: selectedMovement.id,
        name: selectedMovement.name
      }])
    }}>add movement</button>
  </div>
{
  movementArr.length > 0 
  ? 
  movementArr.map((movement, index) =>
      <div key={index}>
        {movement.name} kg:{movement.kg} rep:{movement.rep} meter:{movement.meter} cal:{movement.cal} sec:{movement.sec}
        <button onClick={()=>{setMovementArr(movementArr.filter((m, i) => i !== index))}}>remove</button>
      </div>
  )
  : <></>
}
<br/> Demo-link: <input value={newWorkout.demo_link} onChange={e => setNewWorkout({...newWorkout, demo_link: e.target.value})}></input>
<br/> Minutes: <input type='number' value={newWorkout.minute} onChange={e => setNewWorkout({...newWorkout, minute: e.target.value})}></input>
<br/> Note: <textarea value={newWorkout.note} onChange={e => setNewWorkout({...newWorkout, note: e.target.value})}></textarea>
<br/><button disabled={movementArr.length == 0} onClick={() => Functions.createWorkout(newWorkout, movementArr, setUpdate, setAuth)}>create workout</button>
<br/><br/><br/><br/><br/>


{
  ownedWorkouts.length > 0  
  ? <> 
      <div>Your workouts: </div>
      {ownedWorkouts.map((ownedWorkout, index)=>
      <div key={index}>
        <UpdateOwnedWorkout movementOptions={movementOptions} workout={ownedWorkout} setPassDownUpdate={setPassDownUpdate} passDownUpdate={passDownUpdate}/>
      </div>
      )}
    </> 
  : <></>
}
</div> */