import Line from '../line/Line'
import Select from 'react-select';
import Functions from './analysis_functions'
import { useEffect, useState } from 'react'
import {Paper, Box, Typography }from '@mui/material';


function Component() {

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
    if(selectedMovement && selectedMember) Functions.getPerformanceByMovement(selectedMember.id, selectedMovement.id, setLineDate)
  },[selectedMovement, selectedMember])

  
 

  return (
    <Box sx={{m: 3}} > 
      <Paper elevation={3} >
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', pt: 1}}>
          <Typography sx={{flexBasis: '100%', textAlign: 'center', fontWeight: 'bold', my: 1}} variant='h4'>Analysis</Typography>
          <Box sx={{ width: 200, mr: 1}}>
            <Select placeholder={'Select member'} defaultValue={selectedMember} onChange={setSelectedMember} options={members}/>
          </Box>
          <Box sx={{ width: 200}}>
            <Select placeholder={'Select movement'} defaultValue={selectedMovement} onChange={setSelectedMovement} options={movements}/>
          </Box>
        </Box>
        <Box sx={{ p:1}}>
          {lineData ? <Line lineData={lineData}/> : <></>}
        </Box>
      </Paper>
    </Box>
  );
}

export default Component;