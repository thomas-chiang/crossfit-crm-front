import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './workout_movement_functions'
import React from 'react'

function Component({course_id, user_id, workout_id, workout_name, setUpdate}) {

  const [auth, setAuth] = useState(true) // auth handler  
  const [movements, setMovements] = useState([])
  
  useEffect(()=>{
    Functions.getWorkoutMovements(workout_id, setMovements)
  },[])

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <>
      {movements.map((movement, index) => 
        <div key={index}>
          <CreatePerformance 
          course_id={course_id} 
          user_id={user_id} 
          workout_id={workout_id} 
          setUpdate={setUpdate} 
          movement={movement}/>
        </div>
      )}
    </>
  );
}

export default Component;


function CreatePerformance({course_id, user_id, workout_id, setUpdate, movement}) {

  const [auth, setAuth] = useState(true) // auth handler  
  const [performance, setPerformance] = useState({
    movement_id: movement.movement_id,
    course_id, 
    user_id,
    workout_id,
    kg: 0,
    meter: 0,
    rep: 0,
    cal: 0,
    sec: 0
  })


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <div> 
      <div>{movement.name}:</div>         
      kg: <input placeholder='kg' style={{ width: 60}} value={performance.kg} onChange={e=>{setPerformance({...performance, kg: e.target.value})}}></input>
      meter: <input placeholder='meter' style={{ width: 60}} value={performance.meter}onChange={e=>{setPerformance({...performance, meter: e.target.value})}}></input>
      rep: <input placeholder='rep' style={{ width: 60}} value={performance.rep}onChange={e=>{setPerformance({...performance, rep: e.target.value})}}></input>
      cal: <input placeholder='cal' style={{ width: 60}} value={performance.cal}onChange={e=>{setPerformance({...performance, cal: e.target.value})}}></input>
      sec: <input placeholder='sec' style={{ width: 60}} value={performance.sec}onChange={e=>{setPerformance({...performance, sec: e.target.value})}}></input>
      <button onClick={()=>{Functions.createPerformance(performance, setAuth, setUpdate)}}>add performance</button>
    </div>
  );
}

