import Home from './components/home/Home'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import Gym from './components/gym/Gym'
import Movement from './components/movement/Movement'
import Workout from './components/workout/Workout'
import CalendarMember from './components/calender_member/CalendarMember'
import Analysis from './components/analysis/Analysis'
import { Routes, Route } from "react-router-dom"
import Header from './components/header/Header'
import { AppContext } from './utils/reactContexts.js'
import { useState } from 'react'

import Test from './components/calendar_creation/CalendarCreation'




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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarMember />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/movement" element={<Movement />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
