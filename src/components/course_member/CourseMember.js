import moment from 'moment'
import { CalendarContext } from '../../utils/reactContexts'
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_member_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import {Paper, Typography, Card, Button, Divider, Box, TextField, TextareaAutosize, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'


function Component({id}) {

  const calendarContext = useContext(CalendarContext)
  let courseInfo = calendarContext.arr.find(item => item.id === id)

  const [auth, setAuth] = useState(true) // auth handler

  useEffect(() => {
    courseInfo = calendarContext.arr.find(item => item.id === id)
  },[calendarContext.update])

  const [open, setOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState(null)
  const handleClickOpen = (id) => {
    setOpen(true);
    setWorkoutId(id)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [workoutWithMovements, setWorkoutWithMovements] = useState(null)
  useEffect(() =>{
    Functions.getWorkout(workoutId, setWorkoutWithMovements)
  },[workoutId])


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between',  alignItems: 'baseline'}}>
        <Typography sx={{ display: 'inline' }} variant="h5" >{courseInfo.title} </Typography>
        <Box sx={{display: 'inline-flex'}}>
          <Typography  variant="subtitle2" >Coaches: </Typography> 
          {courseInfo.coaches?.map((coach, index) => <Typography  key={index} variant="subtitle2">&nbsp;<i>{coach.name}{index !== courseInfo.coaches.length -1 ? ',' : ''}</i></Typography> )}
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography variant="subtitle2" >Time: {moment(courseInfo.start).local().format('YYYY/MM/DD H:mm A')} - {moment(courseInfo.end).local().format('YYYY/MM/DD H:mm A')}</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography  variant="subtitle2" >Size: <i>{courseInfo.size_enrolled}/{courseInfo.size}</i></Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }}/>
          <Typography  variant="subtitle2" >Point: <i>{courseInfo.point}</i></Typography>
        </Box> 
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', my: 1}}>
        {courseInfo.workouts?.map((workout, index) => <Box key={index}>
          <Button variant="contained" sx={{ mr:1}}  onClick={()=>(handleClickOpen(workout.id))} > {workout.name}</Button>
          <Dialog fullWidth	maxWidth={'xl'} open={open && workoutId == workout.id} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <Paper elevation={3} sx={{ p: 2, m: 2 }}>
              <Box sx={{display: 'flex', justifyContent: 'space-between',  alignItems: 'baseline'}}>
                <Typography sx={{ display: 'inline' }} variant="h5" > {workout.name} </Typography>
              </Box>
              {workoutWithMovements?.movements.map((movement, index)=>
                <Box key={index} sx={{display: 'flex', alignItems: 'stretch'}}> 
                <Typography sx={{ width: 1/5, display: 'flex', alignItems: 'center', justifyContent: 'right', mr: 1}}>{movement.name}</Typography>
                <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={movement.kg}/>
                <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={movement.rep} />
                <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={movement.meter} />
                <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={movement.cal} />
                <TextField disabled={true} sx={{mt:1, width: 100}} size='small' type='number' label="sec" variant="outlined" value={movement.sec} />
              </Box>
              )}
              <Box sx={{flexGrow: 1, display: "flex", alignItems: 'center', mt:1}}>
                <TextareaAutosize minRows={1.9} disabled={true} placeholder="note" style={{ width: "100%" }} value={workout.note} />
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'right', mt:1}}>
                <Button color='secondary' variant='contained' onClick={handleClose}>Cancel</Button>
              </Box>
            </Paper>
          </Dialog>
        </Box> )}
        <Box sx={{flexGrow: 1, display: "flex", alignItems: 'center'}}>
          <TextareaAutosize minRows={1.9} disabled={true} placeholder="note" style={{ width: "100%" }} value={courseInfo.note} />
        </Box>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'stretch', flexWrap: 'wrap'}}>
        {courseInfo.members?.map((member, index) => <Card key={index} sx={{ p: 1, mr: 1, mt: 1 }}>
          <Typography sx={{ m: 1}} variant="subtitle1" >{member.name}</Typography>
          <Typography sx={{ m: 1}} variant="subtitle1" >Status:<i> {member.enrollment == 1 ? 'enrolled' : member.enrollment > 1 ? 'waiting' : 'canceled'}</i></Typography>
        </Card>      
        )}
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'right', mt: 1}}>
        <Button sx={{mr:1}} variant='contained' onClick={()=>Functions.handleEnrollButton(id, calendarContext, setAuth)}>Enroll</Button>
        <Button sx={{mr:1}} color='secondary' variant='contained' onClick={()=>Functions.handleQuitButton(id, calendarContext, setAuth)}>Quit</Button>
        <Button color='secondary' variant='contained' onClick={()=>Functions.handleCancelButton(id, calendarContext)}>Cancel</Button>
      </Box>
    </Paper> 
  )
}

export default Component;