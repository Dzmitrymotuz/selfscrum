import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'

const Registration = ({...props}) => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [password_confirmation, setPasswordConfirmation] = useState(null)
    const [message, setMessage] = useState(null)
    const navigateTo = useNavigate()


    const handleSignup = async(e) => {
        
    }   


  return (
    <section>
        <div className='main-container pt-10'>
            <form onSubmit={(e) => handleSignup(e)}>
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <p>Signup</p>
                {message ? <div className='text-sm bg-[#303030] p-1 '>{message}</div>
                    : ''}
                <div className='flex flex-col p-10 m-10 mt-0'> 
                    <input name='name' placeholder='name' className='input my-2 border-2 border-black p-1' onChange={(e)=>setName(e.target.value)}/>
                    <input name='email' placeholder='email' className='input my-2 border-2 border-black p-1' onChange={(e)=>setEmail(e.target.value)}/>
                    <input name='password' placeholder='password' type='password' className='input my-2 border-2 border-black p-1' onChange={(e)=>setPassword(e.target.value)}/>
                    <input name='password-confirmation' type='password' placeholder='password confirmation' className='input my-2 border-2 border-black p-1' onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                    <button type='submit' className='my-2 border-2 border-black p-1 btn mt-2'>Submit</button>
                </div>
                <div className='min-h-screen'/>
            </div>
            </form>
        </div>
    </section>

  )
}

export default Registration
