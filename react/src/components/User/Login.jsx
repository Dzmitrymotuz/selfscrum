import React, { useEffect, useState } from 'react'
// import { login } from '../Api/Api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Login = ({ ...props}) => {
    const {login, isAuth, logout} = useAuth()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const navigateTo = useNavigate()


    const handleLogin = (e) => {
        const payload = {
                    email: email,
                    password: password, 
                }
        e.preventDefault()
        login('login', payload);
    }

    useEffect(()=>{
        // console.log(isAuth)
    },[])


  return (
    <div className='main-container '>
    {!isAuth ? <section>
        <div className='flex flex-col items-center justify-center pt-10'>
            <div className='pad-container p-10 h-[20rem] '>
                <p className='text-bold text-[#E77728] text-center mb-10'>Login</p>
                {message ? <div className='text-sm bg-[#303030] p-1 '>{message}</div> : ''}
                <div className='flex flex-col p-0 m-0'>
                    <input name='email' placeholder='email' className='input my-2 ' onChange={(e)=>setEmail(e.target.value)}/>
                    <input name='password' placeholder='password' type='password' className='input ' onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={(e)=>handleLogin(e)} className='ss-btn mt-4'>Login</button>
                </div>
            </div>
        </div>
        <div className='min-h-screen'/>
    </section> 
    :
    <div className='flex flex-col items-center  pt-10'>
        <div className='pad-container p-10 h-[20rem] flex flex-col'>
            <div className='flex-col text-center'>
                <p>Hello there! </p>
                <p>You're currently logged as </p>
                <span className='text-bold'>{localStorage.getItem('user')}</span>
            </div>
            <button className='ss-btn mt-20' onClick={logout}>Logout</button>
        </div>
            <div className='h-[100vh] '></div>
    </div>
    
     }
    </div>
  )
}

export default Login
