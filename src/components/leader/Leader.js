import { useEffect, useState } from 'react'
import Functions from './leader_functions'
import {Paper, Typography, Card, Button, Divider, Box, TextField, TextareaAutosize, Dialog} from '@mui/material'
import moment from 'moment'


function Component({leader}) {

  const [performances, setPerformances] = useState(null)

  useEffect(()=>{
    Functions.getLeader(leader, setPerformances)
  },[])

  console.log(leader)

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

   

  if(performances) return (
    <Paper sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center', mt: 1, mr: 1}}>
      <Box sx={{m:1}}>{performances[0]?.user_name}:</Box> 
      <Box sx={{m:1}}><Button variant="contained" size='small' onClick={()=>(handleClickOpen(performances[0].id))} >{(leader.score).toFixed(2)}</Button></Box>
      <Dialog fullWidth	maxWidth={'xl'} open={open && workoutId == performances[0].id} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
        <Paper elevation={5} sx={{ p: 2, m: 2 }}>
          <Box sx={{display: 'flex', justifyContent: 'right', mb: 1}}>
            <Typography variant="subtitle2" >Time: {moment(performances[0].start).local().format('YYYY/MM/DD H:mm A')} - {moment(performances[0].end).local().format('YYYY/MM/DD H:mm A')}</Typography>
          </Box>
          <Box sx={{display: 'flex',   alignItems: 'center'}}>
            <Typography sx={{mr: 1,  width: 1/3 }} variant="h5" > {performances[0].user_name} / {performances[0].workout_name}: </Typography>
            <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="round" variant="outlined" value={performances[0]?.round || ''}/>
            <TextField disabled={true} sx={{mr:1, mt:1, width: 150}} size='small' type='number' label="extra_count" variant="outlined" value={performances[0]?.extra_count || ''} />
            <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="minute" variant="outlined" value={performances[0]?.minute || ''} />
            <TextField disabled={true} sx={{ mt:1, width: 120}} size='small' type='number' label="extra_sec" variant="outlined" value={performances[0]?.extra_sec || ''} />
          </Box>
          <Divider sx={{mt: 1}}/>
          {performances?.map((performance, index)=>
            <Box key={index} sx={{display: 'flex', alignItems: 'stretch'}}> 
            <Typography sx={{ width: 1/5, display: 'flex', alignItems: 'center', justifyContent: 'right', mr: 1}}>{performance.movement_name}</Typography>
            <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="kg" variant="outlined" value={performance.kg || ''}/>
            <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="rep" variant="outlined" value={performance.rep || ''} />
            <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="meter" variant="outlined" value={performance.meter || ''} />
            <TextField disabled={true} sx={{mr:1, mt:1, width: 100}} size='small' type='number' label="cal" variant="outlined" value={performance.cal || ''} />
          </Box>
          )}
          <Box sx={{display: 'flex', justifyContent: 'right', mt:1}}>
            <Button color='secondary' variant='contained' onClick={handleClose}>Cancel</Button>
          </Box>
        </Paper>
      </Dialog>
    </Paper>
  );
}

export default Component;