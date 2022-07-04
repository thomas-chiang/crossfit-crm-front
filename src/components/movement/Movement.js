import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './movement_functions'
import {Card, Button, Box, TextField} from '@mui/material'


function Component() {
 
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [movements, setMovements] = useState([])
  const [newMovement, setNewMovement] = useState('')




  useEffect(() => {
    Functions.getMovements(setMovements)
  },[update])
  
  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      <Card sx={{ p: 1, m: 1 }}>
          <TextField sx={{m:1}} size='small' label="Movement name" variant="outlined" value={newMovement} onChange={e=>setNewMovement(e.target.value)}/>
          <Box sx={{display: 'flex', justifyContent: 'right'}}>
            <Button sx={{ m: 1, bottom: 0}} size='small' variant='contained' onClick={()=>{Functions.createMovement(newMovement, setUpdate, setAuth)}} >create</Button>
          </Box>
      </Card>
      {movements.map((movement, index)=> 
        <MovementBox key={index} id={movement.id} movement={movement} setUpdate={setUpdate} setAuth={setAuth} />
      )}
    </Box>
  );
}

export default Component;

function MovementBox({id, movement, setUpdate, setAuth}) {

  const [movementName, setMovementName] = useState(movement.name)

  return (
    <Card sx={{ p: 1, m: 1 }}>
      <TextField size='small' variant="outlined" value={movementName} sx={{m:1}} onChange={e=>setMovementName(e.target.value)}/>
      <Box sx={{display: 'flex', justifyContent: 'right'}}>
        <Button sx={{ m: 1, bottom: 0}} size='small' variant='contained' onClick={()=>Functions.updateMovement(id, movementName, setUpdate, setAuth)} >update</Button>
        <Button sx={{ m: 1, bottom: 0}} size='small' variant='contained' onClick={()=>Functions.deleteMovement(id, setUpdate, setAuth)} color='secondary'>delete</Button>
      </Box>
    </Card>
  )
}