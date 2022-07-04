import styles from './profile.module.css'
import { useContext, useEffect, useState } from 'react'
import Functions from './personal_info_functions';
import  { Navigate } from 'react-router-dom'
import { AppContext } from '../../utils/reactContexts'
import {Paper, Typography, Card, Button} from '@mui/material'

function Component() {
  
  const appContext = useContext(AppContext)

  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(true)
  const [logout, setLogout] = useState(false)
  const [ownedGyms, setOwnedGyms] = useState([])

  useEffect(() => {
    Functions.getUserProfile(setUser,setAuth, appContext)
    //Functions.getOwnedGyms(setOwnedGyms)
  },[])


  if (!auth) return <Navigate to='/login'/>
  if (logout) return <Navigate to='/'/>
  if (user) return (
    <div style={{padding: 50}}>
      <Paper elevation={3} sx={{ padding: 5 }} >
        <Typography variant="h6" sx={{margin: 0.5}} >Name: {user.name}</Typography>
        <Typography variant="h6"  sx={{margin: 0.5}}>Email: {user.email}</Typography>
        <Typography variant="h6"  sx={{margin: 0.5}}>Gender: {user.gender === 1 ? 'Male' : 'Female'}</Typography>
        <Typography variant="h6"  sx={{margin: 0.5}}>Role: {user.role === 1 ? 'Normal Member' : user.role === 2 ? 'Coach' : 'Gym Owner'}</Typography>
        {/* {user.role === 3 && ownedGyms.length > 0 
          ? <> 
            <Typography variant="h6"  sx={{margin: 0.5}}>Gyms owned:</Typography>
            <div style={{display: 'flex'}}>
              {ownedGyms.map((gym, index) => 
                <div key={index}>
                  <Card sx={{ padding: 1, margin: 1 }} raised={true}>{gym.name} </Card>
                </div>
              )}
            </div> 
          </>
           : <>
            <Typography variant="h6"  sx={{margin: 0.5}}>Gyms:</Typography>
            <div style={{display: 'flex'}}>
              {user.gyms.map((gym, index) => 
                <div key={index}>
                  <Card sx={{ padding: 1, margin: 1 }} raised={true}>{gym.name} </Card>
                </div>
              )}
            </div> 
          </>
        } */}
        {user.role === 1 
          ? <>
            <Typography sx={{margin: 0.5}}variant="h6" >Points avaliable: {user.point}<i style={{color:'green'}}> - {user.point_to_be_deducted} (upcoming courses)</i></Typography>
          </> 
          : <></>}
        <div style={{display: 'flex', justifyContent: 'right', marginTop: 20}}>
          <Button variant="contained" onClick={()=>{Functions.logout(setLogout, appContext)}}>Log out</Button>
        </div>
      </Paper>
    </div>
  );
}

export default Component;