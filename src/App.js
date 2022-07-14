import Home from './components/home/Home'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import Gym from './components/gym/Gym'
import Movement from './components/movement/Movement'
import Workout from './components/workout/Workout'
import CalendarMember from './components/calender_member/CalendarMember'
import Analysis from './components/analysis/Analysis'
import Leaderboard from './components/leaderboard/Leaderboard'
import { Routes, Route, Navigate } from "react-router-dom"
import Header from './components/header/Header'
import { AppContext } from './utils/reactContexts.js'
import { useState } from 'react'
import Analysis2 from './components/analysis2/Analysis2'


import { Box } from '@mui/material'




function App() {

  const [update, setUpdate] = useState(true)
  const [user, setUser] = useState(null)
  const contextValue = {
    update,
    setUpdate,
    user,
    setUser
  }

  return (
    <AppContext.Provider value={contextValue}>
      
      <Box sx={{background: `url(${require('./gym.jpeg')})  center center fixed`, backgroundSize: 'cover', width: 1, height: 1, minHeight: "100vh"}}>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar" element={<CalendarMember />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/movement" element={<Movement />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/analysis" element={<Analysis2 />} />
          <Route path="/test" element={<Analysis />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
