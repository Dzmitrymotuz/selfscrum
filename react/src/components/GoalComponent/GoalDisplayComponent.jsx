import React, { useEffect, useState, useRef } from 'react'
import { axiosDeleteData, axiosPostData, axiosPutData, axiosGetInitData } from '../Api/Api'
import ActionButton from './ActionButton'
import SingleGoal from './SingleGoal'


const GoalDisplayComponent = ({ goals, category, date, setIfDataChanged, color}) => {
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
      if (value.length > 0) {
        const data = {
          'category': category,
          'goal': value,
          'status': 0,
          'date': date,
        }
        await axiosPostData(`${category}/add-goal`, data)
        fetchInitialData()
      } else {
        setHidden(!hidden)
      }
      
    }
    const handleEnter = (e) => { 
      if (e.target.value.length > 0) {
        if (e.key === 'Enter') {
          return handleAddition(e)
        }
      } 
    } 

    // const handleStatusChange = async(id, status) => {
    //   const updated_status = status === 0 ? 1 : 0;
    //   const data = {
    //     'id': id,
    //     'status': updated_status,
    //     'date': date,
    //   }
    //   await axiosPostData(`${category}/status-change`, data)
    //   setFilteredGoals(filteredGoals.map(item=>(item.id === id ? {...item, status:updated_status} : item)))
    // }

    useEffect(()=>{
      goals[category] && setFilteredGoals(goals[category])
    },[goals, category, date])

  return (
    <>
    <div className={``}>
      {filteredGoals && filteredGoals.map((goal)=>( 
        <div key={goal.id} className='flex flex-row '>
            <SingleGoal  
              goal={goal} 
              category={category} 
              // handleStatusChange={handleStatusChange} 
              setFilteredGoals={setFilteredGoals}
              filteredGoals={filteredGoals}
              date={date}
              setIfDataChanged={setIfDataChanged}
              color={color}
              /> 
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
        <input 
        className='input-field' 
        ref={inputRef} 
        onKeyDown={handleEnter}
        onBlur={handleAddition}></input>
      </div>
      :
      <div onClick={()=>setHidden(!hidden)}
      className='hover:cursor-pointer hover:text-black flex justify-center text-[20px] text-[#c6c6c6c6]'
      >+</div>
      } 
    </div>
    </div>
    </>
  )
}

export default GoalDisplayComponent
