import React from 'react'

const ActionButton = ({icon, title, onClick}) => {
    
  return (
    <div 
    className='hover:cursor-pointer flex justify-center items-center flex-shrink-0 mr-0' 
    onClick={onClick}>
        <img 
        className='w-4 h-4 opacity-40 hover:opacity-100 transition ease-in-out duration-200'
        src={icon}
        title={title}/>
    </div>
  )
}

export default ActionButton


{/* <div 
            className=' w-[10px] hover:cursor-pointer flex justify-center flex-shrink-0 mr-1' 
            alt='passNext'
            onClick={(e)=>handlePass(goal.id)}>
              <img 
              className='opacity-20 hover:opacity-100 transition ease-in-out duration-200'
              src='/move.svg'
              title='move'/>
            </div>
            <div 
            className='hover:cursor-pointer flex justify-center flex-shrink-0  w-4' 
            alt='edit'
            onClick={(e)=>handleEdit(goal.id)}>
              <img 
              className='opacity-20 hover:opacity-100 transition ease-in-out duration-200'
              src='/edit.svg'
              title='edit'/>
            </div>
            <div 
            className=' w-[30px] hover:cursor-pointer flex justify-center flex-shrink-0' 
            alt='delete'
            onClick={(e)=>handleDelete(goal.id)}>
              <img 
              className='opacity-20 hover:opacity-100  transition ease-in-out duration-200 w-7'
              src='/delete.svg'
              title='delete'/>
            </div> */}