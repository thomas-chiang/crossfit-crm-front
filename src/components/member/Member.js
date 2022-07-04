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

  //console.log(point)

  return (
    <Card sx={{ p: 1, m: 1}}>
      <Typography>{member.name}</Typography>
      <Box sx={{display: 'flex', alignItems:'center', mt: 1}}>
        <TextField sx={{ width: 80, mr: 1}} type='number' label="Point" size='small' variant="outlined" value={point} onChange={e=>setPoint(e.target.value)}/>
        <Button sx={{ height: 40}}variant="contained" size='small' onClick={()=>Functions.updatePoint(member.id, point,setUpdate, setAuth)}>update</Button>
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