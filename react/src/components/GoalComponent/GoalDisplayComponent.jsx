import React, { useEffect, useState, useRef } from 'react'
import { axiosDeleteData, axiosPostData, axiosPutData, axiosGetInitData } from '../Api/Api'


const GoalDisplayComponent = ({ goals, category, date, setIfDataChanged}) => {
    const [filteredGoals, setFilteredGoals] = useState([])
    const inputRef = useRef()
    const [hidden, setHidden] = useState(true) 

    const fetchInitialData = async() => {
      const data = await axiosGetInitData(date)
      setFilteredGoals(data[category])
    }
    const handleEdit = () => {
      
    }
    const handlePass = async(id) => {
      const fixedDate = new Date(date)
      fixedDate.setDate(fixedDate.getDate()+1)
      const newDate = fixedDate.toISOString().split('T')[0]
      const data = {
        'id': id,
        'date': newDate,
      }
      await axiosPutData(`${category}/pass-to-next`, data)
      setFilteredGoals(filteredGoals.filter(item=>item.id != id))
      setIfDataChanged(prevState=>!prevState)
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
    <div className={``}>
      {filteredGoals && filteredGoals.map((goal)=>( 
        <div key={goal.id} className='flex flex-row'>
          <div className='w-[5px] mr-5 ml-2'>
            <span className={`${goal.status === 1 ? 'text-[#FFB703]' : 'text-black'}`}>
                 {`${goal.status === 0 ? '○' : '●'}`}
            </span>
          </div>
          <div className='flex justify-between w-[100%] '>
            <div className='m-0 flex-grow'>
              <span 
                className={`${goal.status === 1 ? 'text-[#FFB703]' : 'text-black'} hover:cursor-pointer`}
                onClick={()=>handleStatusChange(goal.id, goal.status)}
              >
                  {goal.content}
              </span>
            </div>
            
            <div 
            className='hover:cursor-pointer flex justify-center flex-shrink-0 mr-0 w-4' 
            alt='edit'
            onClick={(e)=>handleEdit(goal.id)}>
              <img 
              className='opacity-20 hover:opacity-100 transition ease-in-out duration-200 w-4'
              src='/edit.svg'
              title='edit'/>
            </div>
            <div 
            className=' w-[30px] hover:cursor-pointer  flex-shrink-0' 
            alt='delete'
            onClick={(e)=>handleDelete(goal.id)}>
              <img 
              className='opacity-20 hover:opacity-100 transition ease-in-out duration-200 w-7 mr-3'
              src='/delete.svg'
              title='delete'/>
            </div>
            <div 
            className=' w-[10px] hover:cursor-pointer flex justify-center flex-shrink-0 mr-2' 
            alt='passNext'
            onClick={(e)=>handlePass(goal.id)}>
              <img 
              className='opacity-20 hover:opacity-100 transition ease-in-out duration-200'
              src='/move.svg'
              title='move'/>
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
        <input className='my-1 mt-3 mr-10 h-[27px] w-[100%] border border-[#FFDDA1] focus:border-[#FB8500] outline-none' ref={inputRef} onKeyDown={handleEnter}></input>
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
