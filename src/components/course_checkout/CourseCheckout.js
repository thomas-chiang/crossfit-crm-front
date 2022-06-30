import moment from 'moment'
import { CalendarContext } from '../../utils/reactContexts'
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_checkout_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import {Paper, Typography, Card, Button, Divider, Box, TextField} from '@mui/material'

function Component({id}) {

  const calendarContext = useContext(CalendarContext)
  let courseInfo = calendarContext.arr.find(item => item.id === id)

  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth handler
  const [members, setMembers] = useState([])
  const [email, setEmail] = useState('')

  useEffect(() => {
    courseInfo = calendarContext.arr.find(item => item.id === id)
  },[calendarContext.update])

  useEffect(()=>{
    Functions.getCourseEnrolledmembers(id, setMembers)
  },[update])
  
  //console.log(email)

  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Paper elevation={3} sx={{ p: 2, my: 2 }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between',  alignItems: 'baseline'}}>
        <Typography sx={{ display: 'inline' }} variant="h4" >{courseInfo.title} </Typography>
        <Box sx={{display: 'inline-flex'}}>
          <Typography  variant="subtitle2" >Course ID: {id} </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography  variant="subtitle2" >Coaches: </Typography> 
          {courseInfo.coaches?.map((coach, index) => <Card key={index} sx={{ px: 0.5, mx: 0.5 }}><Typography  variant="subtitle2">{coach.name}</Typography> </Card>)}
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography variant="subtitle2" >Time: {moment(courseInfo.start).local().format('YYYY/MM/DD H:mm A')}</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography variant="subtitle2" >Point: {courseInfo.point}</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography  variant="subtitle2" >Workouts:</Typography>
          {courseInfo.workouts?.map((workout, index) => <Card key={index} sx={{ px: 0.5, mx: 0.5 }}><Typography  variant="subtitle2">{workout.name}</Typography> </Card>)}
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
        </Box> 
      </Box> 
      <Box sx={{display: 'flex', alignItems: 'stretch', flexWrap: 'wrap'}}>
        {members.map((member, index) => <Card key={index} sx={{ p: 1, m: 1 }}>
          <Typography sx={{ m: 1}} variant="subtitle1" >{member.name}</Typography>
          <Typography sx={{ m: 1}} variant="subtitle1" >{member.enrollment == 1 ? 'enrolled' : 'canceled or waiting'}</Typography>
          <Button sx={{ m: 1}} size='small' variant='contained' onClick={()=>{Functions.checkoutMemberById(id, member.id, member.enrollment, setUpdate, setAuth)}}>checkout</Button>
          <Button sx={{ m: 1}} size='small' color='secondary' variant='contained' onClick={()=>{Functions.quitMemberById(id, member.id, member.enrollment, setUpdate, setAuth)}}>quit</Button>
        </Card>)}
        <Card sx={{ p: 1, m: 1, display: 'flex',flexDirection: 'column', justifyContent: 'space-between' }}>
          <TextField size='small' type='email' label="email" variant="outlined" value={email} onChange={e=>setEmail(e.target.value)}/>
          <Box sx={{display: 'flex', justifyContent: 'right'}}>
            <Button sx={{ m: 1, bottom: 0}} size='small' variant='contained' onClick={()=>{Functions.enrollMemberByEmail(id, email, setUpdate, setAuth)}} >enroll</Button>
          </Box>
        </Card>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'right'}}>
        <Button color='secondary' variant='contained' onClick={()=>Functions.handleCancelButton(id, calendarContext)}>Cancel</Button>
      </Box>
    </Paper> 
  )
}

export default Component;