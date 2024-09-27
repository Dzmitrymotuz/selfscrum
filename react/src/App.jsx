import { useState } from 'react'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import WelcomeWindow from './components/WelcomeWindow'
import NavBar from './components/NavBar/NavBar'
import Calendar from './components/Calendar.jsx/Calendar'
import SingleDay from './components/SingleDay'
import Login from './components/User/Login'
import Registration from './components/User/Registration'
import { AuthProvider } from './components/Context/AuthContext'
import Page404 from './components/Page404'
import Main from './components/Main'
import Dashboard from './components/Charts/Dashboard'
import Report from './components/Report/Report'
import WheelOFLife from './components/WheelOfLife/WheelOFLife'
import Notes from './components/Notes/Notes'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/goals' element={<WelcomeWindow/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/date/*' element={<SingleDay/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/report' element={<Report/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/wheel' element={<WheelOFLife/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/*' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
