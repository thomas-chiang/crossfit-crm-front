import { useState, useEffect }  from 'react'
import  { Navigate } from 'react-router-dom' // auth handler
import Functions from './public_movement_functions'
import {Card, Button, Box, Typography, Paper, CardMedia} from '@mui/material'


function Component() {
 
  const [update, setUpdate] = useState(Date())
  const [auth, setAuth] = useState(true) // auth
  const [movements, setMovements] = useState([])
  const [newMovement, setNewMovement] = useState({
    name: '',
    demo_link: ''
  })
  const [disable, setDisable] = useState(false)




  useEffect(() => {
    Functions.getMovements(setMovements)
  },[update])
  
  if (!auth) return <Navigate to='/login'/> // auth handler
  return (
    <Box sx={{m: 3, mb: 0, display: 'flex', alignItems: 'stretch', flexWrap: 'wrap'}}>
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
    <Paper elevation={5} sx={{ m: 1,  display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Box sx={{mx: 1}}>
        <Typography variant="h6">{updateingMovement.name}</Typography>
      </Box>
    
      { movement.demo_link ? 
      <Box sx={{flexBasis: '100%'}}>
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
            sx={{cursor: 'pointer'}}
            onClick={()=>setPlay(true)}
            component="img"
            height="140"
            image={`https://img.youtube.com/vi/${movement.youtube_id}/0.jpg`}
          />
        }
        
        
      </Box>  
      : <></>}
    </Paper>
  )
}