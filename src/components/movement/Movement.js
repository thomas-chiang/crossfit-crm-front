import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './movement_functions'
import {Card, Button, Box, TextField, Paper} from '@mui/material'


function Component() {
 
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [movements, setMovements] = useState([])
  const [newMovement, setNewMovement] = useState({
    name: '',
    demo_link: ''
  })




  useEffect(() => {
    Functions.getMovements(setMovements)
  },[update])
  
  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3, display: 'flex', alignItems: 'stretch', flexWrap: 'wrap'}}>
      <Paper elevation={3} sx={{ m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{display: 'flex'}}>
          <TextField size='small' label="Movement name" variant="outlined" value={newMovement.name} sx={{m:1, flexBasis: '100%'}} onChange={e=>setNewMovement({...newMovement, name: e.target.value})}/>
        </Box>
        <Box sx={{display: 'flex'}}>
          <TextField size='small' label="Youtube link" variant="outlined" value={newMovement.demo_link} sx={{m:1, flexBasis: '100%'}} onChange={e=>setNewMovement({...newMovement, demo_link: e.target.value})}/>
        </Box>   
        <Box sx={{display: 'flex',  justifyContent: 'right', flexBasis: '100%', alignItems: 'end', mt: 1,}}>
          <Button sx={{ m: 1, bottom: 0}} size='small' variant='contained' onClick={()=>{Functions.createMovement(newMovement, setUpdate, setAuth)}} >create</Button>
        </Box>
      </Paper>
      {movements.map((movement, index)=> 
        <MovementBox key={index} id={movement.id} movement={movement} setUpdate={setUpdate} setAuth={setAuth} />
      )}
    </Box>
  );
}

export default Component;

function MovementBox({id, movement, setUpdate, setAuth}) {

  const [updateingMovement, setUpdateingMovement] = useState({
    name: movement.name,
    demo_link: movement.demo_link,
    id,
  })

  useEffect(() => {
    setUpdateingMovement({
      name: movement.name,
      demo_link: movement.demo_link,
      id,
    })
  },[movement])
  //console.log(updateingMovement)

  return (
    <Paper elevation={3} sx={{ m: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Box sx={{display: 'flex'}}>
        <TextField size='small' label="Movement name" variant="outlined" value={updateingMovement.name} sx={{m:1, flexBasis: '100%'}} onChange={e=>setUpdateingMovement({...updateingMovement, name: e.target.value})}/>
      </Box>
      <Box sx={{display: 'flex'}}>
        <TextField size='small' label="Youtube link" variant="outlined" value={updateingMovement.demo_link} sx={{m:1, flexBasis: '100%'}} onChange={e=>setUpdateingMovement({...updateingMovement, demo_link: e.target.value})}/>
      </Box>   
      { movement.demo_link ? 
      <Box sx={{flexBasis: '100%'}}>
        <iframe
          frameBorder="0"
          src={`${movement.embed_link}?autoplay=0&mute=1&showinfo=0&modestbranding=1&rel=0`}
          allow='autoplay'
          muted
        />
      </Box>  
      : <></>}
      <Box sx={{display: 'flex',  justifyContent: 'right', flexBasis: '100%', alignItems: 'end', mt: 1,}} >
        <Button sx={{ mr: 1, mb: 1, bottom: 0}} size='small' variant='contained' onClick={()=>Functions.updateMovement(updateingMovement, setUpdate, setAuth)} >update</Button>
        <Button sx={{ mr: 1, mb: 1, bottom: 0}} size='small' variant='contained' onClick={()=>Functions.deleteMovement(id, setUpdate, setAuth)} color='secondary'>delete</Button>
      </Box>
    </Paper>
  )
}