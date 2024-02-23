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
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/*' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
