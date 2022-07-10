import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './member_functions'
import {Paper, Typography, Card, Button, Box, Radio, TextField} from '@mui/material'


function Component() {
 
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [members, setMembers] = useState([])

  useEffect(() => {
    Functions.getUsersByRole(1, setMembers)
  },[update])
  
  //console.log(members)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'start', alignContent: 'flex-start'}}>
      {members.map((member, index)=> 
        <MemberBox key={index} member={member} setUpdate={setUpdate} setAuth={setAuth} />
      )}
    </Box>
  );
}

export default Component;

function MemberBox({member, setUpdate, setAuth}) {

  const [point, setPoint] = useState(member.point)
  const [addingPoint, setAddingPoint] = useState(0)
  const [deductingPoint, setDeductingPointPoint] = useState(0)

  console.log(member)

  useEffect(()=>{
    
  })

  return (
    <Card sx={{ p: 1, m: 1}}>
      <Box sx={{mb:2, display: 'flex', justifyContent: 'space-between'}}>
        {member.name}: 
        <Box>
          {member.point ? member.point : 0}
           <i style={{color:'green'}}> - {member.point_to_be_deducted ? member.point_to_be_deducted : 0}</i>
        </Box>  
      </Box>
      {/* <Box sx={{display: 'flex', alignItems:'center', mt: 1}}>
        <TextField sx={{ width: 120, mr: 1}} type='number' label="Point" size='small' variant="outlined" value={point} onChange={e=>setPoint(e.target.value)}/>
        <Button sx={{ height: 40}}variant="contained" size='small' onClick={()=>Functions.updatePoint(member.id, point,setUpdate, setAuth)}>update</Button>
      </Box> */}
      <Box sx={{display: 'flex', alignItems:'center', mt: 1}}>
        <TextField sx={{ width: 120, mr: 1}} type='number' label="Point added" size='small' variant="outlined" value={addingPoint} onChange={e=>setAddingPoint(e.target.value)}/>
        <Button sx={{ height: 40}}variant="contained" size='small' onClick={()=>Functions.insertPoint(member.id, addingPoint, setUpdate, setAuth)}>add</Button>
      </Box>
      <Box sx={{display: 'flex', alignItems:'center', mt: 1}}>
        <TextField sx={{ width: 120, mr: 1}} type='number' label="Point deducted" size='small' variant="outlined" value={deductingPoint} onChange={e=>setDeductingPointPoint(e.target.value)}/>
        <Button color='secondary' sx={{ height: 40}}variant="contained" size='small' onClick={()=>Functions.insertPoint(member.id, -deductingPoint,setUpdate, setAuth)}>deduct</Button>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'right'}}>
        <Button sx={{ mt: 1, bottom: 0}} size='small' variant='contained' 
          color={member.valid == 1 ? 'secondary' : 'primary'}
          onClick={()=>Functions.updateValidStatus(member.id, member.valid == 1 ? 0 : 1 ,setUpdate, setAuth)}
        >
          {member.valid == 1 ? 'invalidate' : 'validate'}
        </Button>
      </Box>
    </Card>
  )
}