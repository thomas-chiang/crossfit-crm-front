import { useState, useEffect, useContext }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './public_workouts_functions'
import Select from 'react-select';
import { AppContext } from '../../utils/reactContexts'
import PublicWorkout from '../public_workout/PublicWorkout'
import {Paper, Button, Box, TextField, TextareaAutosize, Alert, Typography} from '@mui/material'



function Component() {
 
  const appContext = useContext(AppContext)
  const [passDownUpdate, setPassDownUpdate] = useState(Date())
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [disable, setDisable] = useState(false)
  const [alert, setAlert] = useState(null)
  useEffect(() => {
    const timeId = setTimeout(() => setAlert(null), 2000)
    return () => clearTimeout(timeId)   
  }, [alert]);



  // all workouts
  const [workouts, setWorkouts] = useState([])

  // create workout
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    round: '' ,
    extra_count: '',
    minute: '',
    extra_sec: '',
    note: ''
  })
  
  const [movementOptions, setMovementOptions] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [movementDetail, setMovementDetail] = useState ({
    kg: '',
    rep: '',
    meter: '',
    cal: '',
    //sec: ''
  })
  const [movementArr, setMovementArr] = useState([])
  
  // workouts


  useEffect(() => {
    Functions.getWorkoutsWithMovements(setWorkouts)
    // Functions.getMovementOptions(setMovementOptions)
  },[update, appContext.update, passDownUpdate])

  useEffect(() => {
    Functions.getMovementOptions(setMovementOptions)
  },[selectedMovement])


  const customStyles = {
    control: base => ({
      ...base,
      height: 40,
      width: 200,
    })
  }


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3,mb: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'stretch'}}>
      {workouts.map((workout, index)=>
        <PublicWorkout key={index} movementOptions={movementOptions} workout={workout} setPassDownUpdate={setPassDownUpdate} passDownUpdate={passDownUpdate}/>
      )}
    </Box>
  )
}

export default Component;

