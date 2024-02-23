import React, {useEffect, useState, useReducer, UseRef} from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const NavBar = () => {
  const [isHidden, setIsHidden] = useState(false)

  const {logout, isAuth} = useAuth()

  return (
    <>
    {!isAuth ? 
    <div className='navbar-container w-[10px]'>
    <img 
      onClick={()=>setIsHidden(!isHidden)}
      src='/toggle.svg' 
      className='w-5 ml-10 top-1 fixed opacity-20 hover:opacity-100 transition ease duration-500'/>
        <Link to='/login'> 
          <img src='/login-user.svg' title='login' className='w-8 mx-2 my-3 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/register'> 
          <img src='/add-user.svg' title='register' className='w-8 mx-2 my-3 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/login' onClick={logout}> 
          <img src='/logout-user.svg' title='logout' className='w-8 mx-2 my-3 hover:rotate-45 transition ease duration-300'/>
        </Link>
      </div>
  :
  <div className='navbar-container w-[10px]'>
      <img 
      onClick={()=>setIsHidden(!isHidden)}
      src='/toggle.svg' 
      className='w-5 ml-10 top-1 fixed opacity-20 hover:opacity-100 transition ease duration-500'/>
        <Link to='/goals'>
          <img src='/goal.svg' title='Daily goals' className='w-8 mx-2 my-3 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/calendar'> 
          <img src='/calendar.svg' title='calendar' className='w-8 mx-2 my-3 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/login'> 
          <img src='/login-user.svg' title='login' className='w-8 mx-2 my-3 hover:rotate-45 transition ease duration-300'/>
        </Link>
  </div>}
  </>
  )
}

export default NavBar
