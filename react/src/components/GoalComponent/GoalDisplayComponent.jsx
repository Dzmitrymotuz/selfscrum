import React, { useEffect, useState, useRef } from 'react'
import { axiosDeleteData, axiosPostData, fetch_initial_data, axiosGetInitData } from '../Api/Api'


const GoalDisplayComponent = ({ goals, category, date}) => {

    const [filteredGoals, setFilteredGoals] = useState([])
    const inputRef = useRef()
    const [hidden, setHidden] = useState(true) 



    const fetchInitialData = async() => {
      const data = await axiosGetInitData(date)
      setFilteredGoals(data[category])
    }
    const handleAddition = async(e) => {
      const value = inputRef.current.value
      inputRef.current.value = ''
      const data = {
        'category': category,
        'goal': value,
        'status': 0,
        'date': date,
      }
      await axiosPostData(`${category}/add-goal`, data)
      fetchInitialData()
    }
    const handleEnter = (e) => {
      
      if (e.target.value.length > 0) {
        if (e.key === 'Enter') {
          return handleAddition(e)
        }
      }
      
    } 
    const handleDelete = async(id) => {
      const data = {
        'id': id,
      }
      await axiosDeleteData(`${category}/delete`, data)
      setFilteredGoals(filteredGoals.filter(item=>item.id != id))
    }
    const handleStatusChange = async(id, status) => {
      const updated_status = status === 0 ? 1 : 0;
      const data = {
        'id': id,
        'status': updated_status,
        'date': date,
      }
      await axiosPostData(`${category}/status-change`, data)
      setFilteredGoals(filteredGoals.map(item=>(item.id === id ? {...item, status:updated_status} : item)))
    }

    useEffect(()=>{
      goals[category] && setFilteredGoals(goals[category])
    },[goals, category, date])

  return (
    <div className='h-[150px] overflow-auto'>
      {filteredGoals && filteredGoals.map((goal)=>( 
        <div key={goal.id} className='flex flex-row w-[100%] justify-start'>
          <div className='w-[5px] mr-5 ml-2'>
            <span className={`${goal.status === 1 ? 'text-[#2e9d45]' : 'text-black'}`}>
                 {`${goal.status === 0 ? '○' : '✔️'}`}
            </span>
          </div>
          <div className='flex justify-between w-[100%]'>
            <div className=''>
              <span 
                className={`${goal.status === 1 ? 'text-[#2e9d45]' : 'text-black'} hover:cursor-pointer`}
                onClick={()=>handleStatusChange(goal.id, goal.status)}
              >
                  {goal.content}
              </span>
            </div>
            <div 
            className='ml-[15px] hover:cursor-pointer' 
            alt='delete'
            onClick={(e)=>handleDelete(goal.id)}>
              <span className=' border-2 mx-2 px-1 opacity-10 hover:opacity-100 transition ease-in-out duration-500'>
                  X
              </span>
            </div>
          </div>
        </div>
      ))}
      <div>
      {!hidden ? 
        <div className='flex justify-start mb-5'>
        <div 
        className='mx-1.5 my-1 mt-1.5 hover:cursor-pointer'
        onClick={()=>setHidden(!hidden)}
        >
          <span className='opacity-30 hover:opacity-100 transition ease duration-400'>
          ━
          </span>
        </div>
        <input className='my-1 mr-10 w-[100%] border-2 border-[#FFDDA1]' ref={inputRef} onKeyDown={handleEnter}></input>
      </div>
      :
      <div onClick={()=>setHidden(!hidden)}
      className='hover:cursor-pointer hover:text-black flex justify-center text-[20px] text-[#c6c6c6c6]'
      >+</div>
      } 
    </div>
    </div>
  )
}

export default GoalDisplayComponent
