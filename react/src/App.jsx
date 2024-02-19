import { useState } from 'react'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import WelcomeWindow from './components/WelcomeWindow'
import NavBar from './components/NavBar/NavBar'
import Calendar from './components/Calendar.jsx/Calendar'
import SingleDay from './components/SingleDay'
import Login from './components/User/Login'
import Registration from './components/User/Registration'

function App() {

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<WelcomeWindow/>}/>
        <Route path='/date/*' element={<SingleDay/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
