import { useState, useEffect }  from 'react'
import Functions from './performance_creation_functions'
import  { Navigate } from 'react-router-dom' // auth handler

function Component({course_id, user_id, workout_id, workout_name, setUpdate}) {

  const [auth, setAuth] = useState(true) // auth handler  
  const [performances, setPerformances] = useState({
    course_id,
    user_id,
    workout_id,
    kg: 0,
    rep: 0,
    meter: 0,
    cal: 0,
    sec: 0,
  })

  //console.log(performances)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <>
     {workout_name}:
     kg:<input style={{width: '3em'}} type="number" value={performances.kg} onChange={e=>setPerformances({...performances, kg:e.target.value})}></input>
      rep:<input style={{width: '3em'}} type="number" value={performances.rep} onChange={e=>setPerformances({...performances, rep:e.target.value})}></input>
      meter:<input style={{width: '3em'}} type="number" value={performances.meter} onChange={e=>setPerformances({...performances, meter:e.target.value})}></input>
      cal:<input style={{width: '3em'}} type="number" value={performances.cal} onChange={e=>setPerformances({...performances, cal:e.target.value})}></input>
      sec:<input style={{width: '3em'}} type="number" value={performances.sec} onChange={e=>setPerformances({...performances, sec:e.target.value})}></input>
      <button onClick={()=>Functions.createPerformance(performances, setAuth, setUpdate)}>Create</button>
    </>
  );
}

export default Component;
