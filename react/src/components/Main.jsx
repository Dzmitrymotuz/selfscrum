import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className='main-container '>
      <div className='flex flex-col sm:flex-row justify-center items-centerh-screen'>
        <div className='pillow'>
          <div className='m-10 h-[150px]'>
            Hello! Already a user?
          </div>
          <Link className='ss-btn' to='/login'>
            <span className='text-bold'>Login</span>
          </Link>
        </div>
        <div className='pillow'>
          <div className='m-10 h-[150px]'>
              Or Sign Up!
          </div>
          <Link className='ss-btn w-[100%]' to='/register'>
            <span className='text-bold'>Sign Up</span>
          </Link>
          </div>
      </div>
    </div>
  )
}

export default Main
