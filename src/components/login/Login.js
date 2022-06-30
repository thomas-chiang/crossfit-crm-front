import { useState, useContext } from 'react'
import Functions from './login_functions';
import { AppContext } from '../../utils/reactContexts'
import  { useNavigate } from 'react-router-dom'
import {Paper, Typography, Card, Button, Box, Radio, TextField} from '@mui/material'


function Component() {

  const appContext = useContext(AppContext)
  const [role, setRole] = useState(null)
  const [signUp, setSignUp] = useState(false)
  const [gender, setGender] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
 

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10}}>
      <Paper elevation={3} sx={{ height: 'auto', width: 'auto', p: 5 }}>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {signUp 
            ?
              <>
                <Typography variant="h4">SIGN UP</Typography>
                <TextField sx={{m: 1}} size='small' label='Name' variant='outlined' value={name} onChange={e => setName(e.target.value)}></TextField>
                <Box sx={{display: 'flex', alignItems: 'center'}}> 
                  <Radio checked={gender == 1} onChange={e => setGender(e.target.value)} value={1} name="gender"/><Typography variant="button"> male </Typography>
                  <Radio checked={gender == 0} onChange={e => setGender(e.target.value)} value={0} name="gender"/><Typography variant="button"> female </Typography>
                </Box>
              </>
            : 
              <Typography sx={{m: 1}} variant="h4">SIGN IN</Typography>
          }
          
          <Box sx={{display: 'flex', alignItems: 'center'}}> 
            <Radio checked={role == 1} onChange={e => setRole(e.target.value)} value={1} name="role"/><Typography variant="button"> member </Typography>
            <Radio checked={role == 2} onChange={e => setRole(e.target.value)} value={2} name="role"/><Typography variant="button"> coach </Typography>
            <Radio checked={role == 3} onChange={e => setRole(e.target.value)} value={3} name="role"/><Typography variant="button"> gym owner </Typography>
          </Box>
          <TextField sx={{m: 1}} size='small' type='email' label='Email' variant='outlined' value={email} onChange={e => setEmail(e.target.value)}></TextField>
          <TextField sx={{m: 1}} size='small' type='password' autoComplete="on" label='Password' variant='outlined' value={password} onChange={e => setPassword(e.target.value)}></TextField>
        </form>
        <Box sx={{display: 'flex', justifyContent: 'center'}} >
          <Button sx={{m: 1}} variant='contained' type="button"
            onClick={()=>{
              signUp 
              ? Functions.handleSignUp(role, name, email, password, gender, appContext, navigate)
              : Functions.handleSignIn(role, email, password, appContext, navigate)
            }} >{signUp ? 'Sign up' : 'Sign in'}
          </Button>
          <Button color='secondary' variant='contained' sx={{m: 1}} onClick={()=>setSignUp(!signUp)} >{signUp ? 'Sign in?' : 'Sign up?'}</Button>
        </Box>
      </Paper>
    </Box>
    
  )
}

export default Component;