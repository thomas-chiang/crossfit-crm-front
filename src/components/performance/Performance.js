import { useState, useEffect }  from 'react'
import Functions from './performance_functions'
import  { Navigate } from 'react-router-dom' // auth handler

function Component({performance, setUpdate}) {

  const [auth, setAuth] = useState(true) // auth handler  
  const [updatedPerformance, setUpdatedPerformance] = useState(performance)

  useEffect(() => {
    Functions.getPerformanceWithMovementWorkoutName(performance, setUpdatedPerformance)
  },[performance])


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <>
      {performance.workout_name}/{performance.name}:
      <div>
        kg:<input style={{width: 60}} type="number" value={updatedPerformance.kg} onChange={e=>setUpdatedPerformance({...updatedPerformance, kg:e.target.value})}></input>
        rep:<input style={{width: 60}} type="number" value={updatedPerformance.rep} onChange={e=>setUpdatedPerformance({...updatedPerformance, rep:e.target.value})}></input>
        meter:<input style={{width: 60}} type="number" value={updatedPerformance.meter} onChange={e=>setUpdatedPerformance({...updatedPerformance, meter:e.target.value})}></input>
        cal:<input style={{width: 60}} type="number" value={updatedPerformance.cal} onChange={e=>setUpdatedPerformance({...updatedPerformance, cal:e.target.value})}></input>
        sec:<input style={{width: 60}} type="number" value={updatedPerformance.sec} onChange={e=>setUpdatedPerformance({...updatedPerformance, sec:e.target.value})}></input>
        <button onClick={()=>Functions.updatePerformance(updatedPerformance, setAuth, setUpdate)}>Update</button>
        <button onClick={()=>Functions.deletePerformance(updatedPerformance, setAuth, setUpdate)}>Delete</button>
      </div>
      
    </>
  );
}

export default Component;
