import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ ...props}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const navigateTo = useNavigate()


  return (
    <div className='main-container '>
    {!false ? <section>
        <div className='flex flex-col items-center justify-center pt-10'>
            <p>Login Page</p>
            {message ? <div className='text-sm bg-[#303030] p-1 '>{message}</div> : ''}
            <div className='flex flex-col p-0 m-0'>
                <input name='email' placeholder='email' className='input my-2 border-2 border-black p-1' onChange={(e)=>setEmail(e.target.value)}/>
                <input name='password' placeholder='password' type='password' className='input border-2 border-black p-1' onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={(e)=>handleLogin(e)} className='border-2 border-black mt-2'>Login</button>
            </div>
        </div>
        <div className='min-h-screen'/>
    </section> 
    :
    <div className='flex flex-col items-center  m-3 p-3'>Hello there. You're currently logged as {user.name}
        <button className='' onClick={logout}>Logout</button>
        <div className='h-[100vh]'></div>
    </div>
    
     }
    </div>
  )
}

export default Login
