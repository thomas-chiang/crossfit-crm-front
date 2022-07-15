import moment from 'moment'
import { CalendarContext, AppContext } from '../../utils/reactContexts'
import { useContext, useState, useEffect }  from 'react'
import Functions from './course_member_functions'
import  { Navigate } from 'react-router-dom' // auth handler
import {Paper, Typography, Card, Button, Divider, Box, CardMedia, TextareaAutosize, Dialog} from '@mui/material'


function Component({id}) {
  const setAlert =  useContext(AppContext).setAlert

  const calendarContext = useContext(CalendarContext)
  let courseInfo = calendarContext.arr.find(item => item.id === id)

  const [auth, setAuth] = useState(true) // auth handler
  const [disable, setDisable] = useState(false)
  const [distinctMovements, setDistinctMovements] = useState([])

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
    Functions.getDistinctWorkoutMovements(workoutId, setDistinctMovements)
  },[workoutId])


  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Paper elevation={5} sx={{ p: 2, mb: 2 }}>
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
            <Paper elevation={5} sx={{ p: 2, m: 2 }}>
              <Box sx={{display: 'flex',   alignItems: 'center'}}>
                <Box sx={{m:1, fontWeight: 'bold'}}> {workout.name || ''}:</Box>
                {workout.round ? <Box sx={{m:1}}> {workout.round} round(s)</Box> : <></> }
                {workout.extra_count ? <Box sx={{m:1}}> {workout.extra_count} extra count(s)</Box> : <></> }
                {workout.minute ? <Box sx={{m:1}}> {workout.minute} minute(s)</Box> : <></> }
                {workout.extra_sec ? <Box sx={{m:1}}> {workout.extra_sec} extra sec(s)</Box> : <></> }
                
              </Box>
              <Divider sx={{mt: 1}}/>
              <Box sx={{display: 'flex'}}>
                    <Box>
                      {workoutWithMovements?.movements.map((movement, index)=>
                      <Box key={index} sx={{display: 'flex', alignItems: 'stretch'}}>
                        <Box sx={{m:1, width: 150, textAlign: 'end'}}>{movement.name}:</Box>
                        {movement?.kg ? <Box sx={{m:1}}>{movement?.kg} kg(s)</Box> : <></>}
                        {movement?.rep ? <Box sx={{m:1}}>{movement?.rep} rep(s)</Box> : <></>}
                        {movement?.meter ? <Box sx={{m:1}}>{movement?.meter} meter(s)</Box> : <></>}
                        {movement?.cal ? <Box sx={{m:1}}>{movement?.cal} cal(s)</Box> : <></>}   
                      </Box>
                      )}
                    </Box>
                    <Divider orientation="vertical" sx={{ m: 1, }} flexItem />
                    <Box sx={{display: 'flex', alignItems: 'start', flexWrap: 'wrap', width: 310}}>
                      {distinctMovements.map((movement, index)=> 
                        <MovementBox key={index} id={movement.id} movement={movement}  />
                      )}
                    </Box>
                  </Box>
                  <Divider sx={{mt: 1}}/>
              {/* {workoutWithMovements?.movements.map((movement, index)=>
              <Box key={index} sx={{display: 'flex', alignItems: 'stretch'}}> 
                <Box sx={{m:1, width: 150, textAlign: 'end'}}>{movement.name}:</Box>
                {movement.kg ? <Box sx={{m:1}}>{movement.kg} kg(s)</Box> : <></>}
                {movement.rep ? <Box sx={{m:1}}>{movement.rep} rep(s)</Box> : <></>}
                {movement.meter ? <Box sx={{m:1}}>{movement.meter} meter(s)</Box> : <></>}
                {movement.cal ? <Box sx={{m:1}}>{movement.cal} cal(s)</Box> : <></>}  
              </Box>
              )} */}
              <Box sx={{flexGrow: 1, display: "flex", alignItems: 'center', mt:1}}>
                <TextareaAutosize minRows={1.9} disabled={true} placeholder="note" style={{ width: "100%" }} value={workout.note || ''} />
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
        <Button disabled={disable} sx={{mr:1}} variant='contained' onClick={()=>Functions.handleEnrollButton(id, calendarContext, setAuth, setDisable, setAlert)}>Enroll</Button>
        <Button disabled={disable} sx={{mr:1}} color='secondary' variant='contained' onClick={()=>Functions.handleQuitButton(id, calendarContext, setAuth, setDisable, setAlert)}>Quit</Button>
        <Button color='secondary' variant='contained' onClick={()=>Functions.handleCancelButton(id, calendarContext)}>Cancel</Button>
      </Box>
    </Paper> 
  )
}

export default Component





function MovementBox({id, movement, setUpdate, setAuth}) {

  const [updateingMovement, setUpdateingMovement] = useState({
    name: movement.name,
    demo_link: movement.demo_link,
    id,
  })
  const [disable, setDisable] = useState(false)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setUpdateingMovement({
      name: movement.name,
      demo_link: movement.demo_link,
      id,
    })
  },[movement])
  //console.log(updateingMovement)

  //console.log(movement.embed_link)

  return (
    <Paper elevation={5} sx={{ m: 1,  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer',}} onClick={()=>setPlay(!play)}>
      <Box sx={{mx: 1}}>
        <Typography >{updateingMovement.name}</Typography>
      </Box>
    
      { movement.demo_link ? 
      <Box sx={{flexBasis: '100%'}} >
        {play 
        ?
          <iframe
            frameBorder="0"
            src={`${movement.embed_link}?autoplay=1&mute=1&showinfo=0&modestbranding=1&rel=0`}
            allow='autoplay'
            muted
            style={{height: 140}}
          />
        :
          <CardMedia
            sx={{ mb: 0.5}}
            component="img"
            height="100"
            image={`https://img.youtube.com/vi/${movement.youtube_id}/0.jpg`}
          />
        }
      </Box>  
      : <></>}
    </Paper>
  )
}