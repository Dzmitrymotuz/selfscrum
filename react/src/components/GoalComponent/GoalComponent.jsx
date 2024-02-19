import React, {useState, useRef} from 'react'
import { axiosPostData } from '../Api/Api'

const GoalComponent = ({category, setFilteredGoals}) => {
    const inputRef = useRef()
    const [hidden, setHidden] = useState(true)

    const handleAddition = (e) => {
        const value = inputRef.current.value
        setFilteredGoals(prevGoals => [...prevGoals, { id: Math.random(), content: value, status: 0 }])
        inputRef.current.value = ''
        const data = {
          'category': category,
          'goal': value,
          'status': 0,
        }
        axiosPostData(`${category}/add-goal`, data)
    }
    const handleEnter = (e) => {
      
      if (e.target.value.length > 0) {
        if (e.key === 'Enter') {
           return handleAddition(e)
        }
      }
      
    }

  return (
    <div>
      {!hidden ? 
        <div className='flex justify-between'>
        <div 
        className='mx-1.5 hover:cursor-pointer'
        onClick={()=>setHidden(!hidden)}
        >
          <span className=''>
          → 
          </span>
        </div>
        <input className='w-[95%] border-2' ref={inputRef} onKeyDown={handleEnter}></input>
      </div>
      :
      <div onClick={()=>setHidden(!hidden)}
      className='hover:cursor-pointer hover:text-black flex justify-center text-[20px] text-[#c6c6c6c6]'
      >+</div>
      }
      
    </div>
  )
}

export default GoalComponent
