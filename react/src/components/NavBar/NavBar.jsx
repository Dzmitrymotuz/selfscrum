import React, {useEffect, useState, useReducer, UseRef} from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const NavBar = () => {
  const [isHidden, setIsHidden] = useState(false)

  const {logout} = useAuth()

  return (
    <>
    {isHidden ? 
    <div className='navbar-container w-[120px]'>
      <img 
      onClick={()=>setIsHidden(!isHidden)}
      src='/toggle.svg' 
      className='w-5 left-[110px] top-1 fixed opacity-20 hover:opacity-100 transition ease duration-500'/>
      <div className='flex flex-col justify-start items-start pl-[5px]'>
        <Link to='/'>
          <button  className='navlink' >Today</button>
        </Link>
        <Link to='/calendar'> 
          <button className='navlink'>Calendar</button>
        </Link>
      </div>
    </div>
  :
  <div className='navbar-container w-[10px]'>
      <img 
      onClick={()=>setIsHidden(!isHidden)}
      src='/toggle.svg' 
      className='w-5 ml-10 top-1 fixed opacity-20 hover:opacity-100 transition ease duration-500'/>
        <Link to='/'>
          <img src='/goal.svg' className='w-8 mx-2 my-2 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/calendar'> 
          <img src='/calendar.svg' className='w-8 mx-2 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/login'> 
          <img src='/delete-full.svg' className='w-8 mx-2 rotate-45 hover:bg-yellow-400 hover:rotate-90 transition ease duration-300'/>
        </Link>
        <Link to='/register'> 
          <img src='/delete-full.svg' className='w-8 mx-2 rotate-12 hover:bg-red-300 hover:rotate-45 transition ease duration-300'/>
        </Link>
        <Link to='/login' onClick={logout}> 
          <img src='/delete-full.svg' className='w-8 mx-2 rotate-90 opacity-70 hover:bg-green-300 hover:rotate-180 transition ease duration-300'/>
        </Link>
  </div>}
  </>
  )
}

export default NavBar
