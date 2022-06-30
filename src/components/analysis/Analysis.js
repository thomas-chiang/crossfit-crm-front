import Line from '../line/Line'
import Select from 'react-select';
import Functions from './analysis_functions'
import { useEffect, useState } from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Paper from '@mui/material/Paper';


function Component() {

  const [auth, setAuth] = useState(true) // auth handler
  const [movements, setMovements] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [lineData, setLineDate] = useState(null)

  useEffect(() => {
    Functions.getMovements(setMovements)
  },[])

  useEffect(() => {
    if(selectedMovement) Functions.getPerformanceByUserMovement(selectedMovement.id, setLineDate, setAuth)
  },[selectedMovement])

  //console.log(lineData)
  // console.log(selectedMovement)
 

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Paper elevation={3} style={{margin: 50, padding: 50}}>
      <div style={{justifyContent: 'center', display: 'flex'}}>
        <Select 
          placeholder={<div>Select a movement to check your performance history</div>}
          defaultValue={selectedMovement}
          onChange={setSelectedMovement}
          options={movements}
        />
      </div>
      {lineData ? <Line lineData={lineData}/> : <></>}
    </Paper>
  );
}

export default Component;