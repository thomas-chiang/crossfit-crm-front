import Select from 'react-select';
import Functions from './leaderboard_functions'
import { useEffect, useState } from 'react'
import {Paper, Typography, Card, Button, Divider, Box, TextField, TextareaAutosize, Dialog} from '@mui/material'
import Leader from '../leader/Leader'
import Bar from '../bar/Bar'

function Component() {

  const [workouts, setWorkouts] = useState([])
  const [selectedWorkouts, setSelectedWorkouts] = useState([])
  const [leaderboards, setLeaderboards] = useState([])

  useEffect(() => {
    Functions.getWorkouts(setWorkouts)
  },[])

  useEffect(() => {
    if(selectedWorkouts.length > 0) Functions.getLeaderboardByWorkouts(selectedWorkouts,setLeaderboards)
    if(selectedWorkouts.length == 0) setLeaderboards([])
  },[selectedWorkouts])

  //console.log(leaderboards)



  // Dialog
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

 
  return (
    <Box sx={{p: 3}} > 
      <Paper elevation={3} >
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', pt: 1}}>
          <Typography sx={{flexBasis: '100%', textAlign: 'center', fontWeight: 'bold', my: 1}} variant='h4'>Leaderboard</Typography>
          <Box sx={{ mx: 1, mb: 2, width: 1/2}}>
            <Select isMulti placeholder={'Select workouts'} defaultValue={selectedWorkouts} onChange={setSelectedWorkouts} options={workouts}/>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',}}>
          {leaderboards.length > 0 ? leaderboards.map((workout, index) =>
            <Paper elevation={3} key={index} sx={{ m: 1, mb: 3, p: 1, width: 3/10 }}>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', m: 1}}>
                <Button variant='contained' onClick={()=>(handleClickOpen(workout?.id))}>{workout?.name}</Button>
              </Box>
              <Dialog fullWidth	maxWidth={'xl'} open={open && workoutId == workout?.id} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
                <Paper elevation={3} sx={{ p: 2, m: 2 }}>
                  <Box sx={{display: 'flex',   alignItems: 'center'}}>
                    <Typography sx={{mr: 1,  width: 1/3 }} variant="h5" > {workout.name}: </Typography>
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="round" variant="outlined" value={workout?.round || ''}/>
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 150}} size='small' type='number' label="extra_count" variant="outlined" value={workout?.extra_count || ''} />
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="minute" variant="outlined" value={workout?.minute || ''} />
                    <TextField disabled={true} sx={{ mt:1, width: 120}} size='small' type='number' label="extra_sec" variant="outlined" value={workout?.extra_sec || ''} />
                  </Box>
                  <Divider sx={{mt: 1}}/>
                  {workoutWithMovements?.movements.map((movement, index)=>
                  <Box key={index} sx={{display: 'flex', alignItems: 'stretch'}}> 
                    <Typography sx={{ width: 1/5, display: 'flex', alignItems: 'center', justifyContent: 'right', mr: 1}}>{movement.name}</Typography>
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={movement.kg || ''}/>
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={movement.rep || ''} />
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={movement.meter || ''} />
                    <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={movement.cal || ''} />
                  </Box>
                  )}
                  <Box sx={{flexGrow: 1, display: "flex", alignItems: 'center', mt:1}}>
                    <TextareaAutosize minRows={1.9} disabled={true} placeholder="note" style={{ width: "100%" }} value={workout?.note || ''} />
                  </Box>
                  <Divider sx={{mt: 1}}/>
                  {workout.leaders.length > 0 ? 
                  <Box sx={{display: "flex", flexWrap: 'wrap', alignItems: 'center', width: 600}}> 
                    <Box sx={{mt: 1, mr: 1, width: 1}}>Top 10:</Box>
                    {workout.leaders.map((leader, index)=> 
                        <Leader leader={leader} key={index}/>
                    )}
                  </Box>
                  : <></>}
                  <Box sx={{display: 'flex', justifyContent: 'right', mt:1}}>
                    <Button color='secondary' variant='contained' onClick={handleClose}>Cancel</Button>
                  </Box>
                </Paper>
              </Dialog>
              
              {workout.leaders.length > 0 
              ? <Bar barData={{
                labels: workout.labels,
                datasets: workout.datasets
              }}/>
              : <></>}
              

              
            </Paper>):<></>}
        </Box>
      </Paper>
    </Box>
  );
}

export default Component;