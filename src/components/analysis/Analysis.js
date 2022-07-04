import Line from '../line/Line'
import Select from 'react-select';
import Functions from './analysis_functions'
import { useEffect, useState } from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import {Paper, Box }from '@mui/material';


function Component() {

  const [auth, setAuth] = useState(true) // auth handler
  const [movements, setMovements] = useState([])
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [lineData, setLineDate] = useState(null)
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    Functions.getMovements(setMovements)
    Functions.getUsersByRole(1, setMembers)
  },[])

  useEffect(() => {
    //if(selectedMovement) Functions.getPerformanceByUserMovement(selectedMovement.id, setLineDate, setAuth)
    if(selectedMovement && selectedMember) Functions.getPerformanceByMovement(selectedMember.id, selectedMovement.id, setLineDate, setAuth)
  },[selectedMovement, selectedMember])

  //console.log(lineData)
  // console.log(selectedMovement)
 

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3}} > 
    <Paper elevation={3} >
      <Box sx={{display: 'flex', justifyContent: 'left',p: 1}}>
        <Box sx={{ width: 200, mr: 1}}>
          <Select placeholder={'Select member'} defaultValue={selectedMember} onChange={setSelectedMember} options={members}/>
        </Box>
        <Box sx={{ width: 300}}>
          <Select placeholder={'Select movement'} defaultValue={selectedMovement} onChange={setSelectedMovement} options={movements}/>
        </Box>
      </Box>
      {lineData ? <Line lineData={lineData}/> : <></>}
    </Paper>
    </Box>
  );
}

export default Component;