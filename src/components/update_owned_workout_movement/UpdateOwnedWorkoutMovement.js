import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './update_owned_workout_movement_functions'


function Component({movement, setPassDownUpdate, passDownUpdate, setUpdateFromChild}) {

  const workout_movement_id = movement.id
  const [auth, setAuth] = useState(true) // auth
  const [update, setUpdate] = useState(Date())
  const [updatedMovement, setUpdatedMovement] = useState(movement)

  //console.log(updatedMovement)

  useEffect(()=>{
    Functions.getWorkoutMovement(setUpdatedMovement, workout_movement_id)
  },[update, update])

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div>
      {updatedMovement.name} --  
      kg: <input type='number' value={updatedMovement.kg} onChange={e => setUpdatedMovement({...updatedMovement, kg: e.target.value})}></input>
      rep: <input type='number' value={updatedMovement.rep} onChange={e => setUpdatedMovement({...updatedMovement, rep: e.target.value})}></input>
      meter: <input type='number' value={updatedMovement.meter} onChange={e => setUpdatedMovement({...updatedMovement, meter: e.target.value})}></input>
      cal: <input type='number' value={updatedMovement.cal} onChange={e => setUpdatedMovement({...updatedMovement, cal: e.target.value})}></input>
      sec: <input type='number' value={updatedMovement.cal} onChange={e => setUpdatedMovement({...updatedMovement, sec: e.target.value})}></input>
      <button onClick={()=>{Functions.updateOwnedWorkoutMovement(updatedMovement, setUpdate, setPassDownUpdate, setAuth)}}>update</button>
      <button onClick={()=>{Functions.deleteWorkoutMovement(workout_movement_id, setUpdateFromChild, setPassDownUpdate, setAuth)}}>delete</button>
    </div>
  );
}

export default Component;