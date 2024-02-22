import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex-col'>
        <div>404</div>
        <Link to='/main'>
            Main page 
        </Link>
      </div>
    </div>
  )
}

export default Page404
