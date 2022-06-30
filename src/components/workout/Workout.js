import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './workout_functions'
import Select from 'react-select';
import { AppContext } from '../../utils/reactContexts'
import UpdateOwnedWorkout from '../update_owned_workout/UpdateOwnedWorkout'



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
    minute: 0,
    note: ''
  })
  const [movementOptions, setMovementOptions] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [movementDetail, setMovementDetail] = useState ({
    kg: 0,
    rep: 0,
    meter: 0,
    cal: 0,
    sec: 0
  })
  const [movementArr, setMovementArr] = useState([])
  
  // owned workouts
  const [ownedWorkouts, setOwnedWorkouts] = useState([])


  useEffect(() => {
    Functions.getWorkoutsWithMovements(setWorkouts)
    Functions.getOwnedWorkoutsWithMovements(setOwnedWorkouts)
    Functions.getMovementOptions(setMovementOptions)
  },[update, appContext.update, passDownUpdate])



  //console.log(ownedWorkouts)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div>
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

      {/* create workout */}
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


      {/* owned workouts  */}
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
    </div>
  );
}

export default Component;

