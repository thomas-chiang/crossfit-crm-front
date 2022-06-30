import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './update_owned_workout_functions'
import Select from 'react-select';
import UpdateOwnedWorkoutMovement from '../update_owned_workout_movement/UpdateOwnedWorkoutMovement'



function Component({workout, movementOptions, passDownUpdate, setPassDownUpdate}) {

  const [updateFromChild, setUpdateFromChild] = useState(Date())
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [updatedWorkout, setUpdatedWorkout] = useState(workout)
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [newWorkoutMovement, setNewWorkoutMovement] = useState ({
    workout_id: workout.id,
    kg: 0,
    rep: 0,
    meter: 0,
    cal: 0,
    sec: 0
  })

  useEffect(() => {
    Functions.getWorkout(workout.id, setUpdatedWorkout)
  },[update, updateFromChild, workout]) // must add 'workout'

  useEffect(() => {
    setNewWorkoutMovement({...newWorkoutMovement, movement_id: selectedMovement?.id})
  },[selectedMovement])

  //console.log(workout)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div>
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
    </div>
  );
}

export default Component;

