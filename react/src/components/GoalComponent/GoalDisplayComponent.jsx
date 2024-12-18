import React, { useEffect, useState, useRef } from 'react'
import { axiosPostData, axiosGetInitData, axiosPutData } from '../Api/Api'
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
    useEffect(()=>{
      goals[category] && setFilteredGoals(goals[category],
      )
    },[goals, category, date])

    const dragStart = (e, goal) => {
      e.dataTransfer.setData('goal', JSON.stringify(goal)); 
      
    }
    const dragOver = (e) => {
      e.preventDefault()
      console.log('Drag over: ', category, date)
    }
    const dropGoal = async(e) => {
      e.preventDefault()
      const goal = JSON.parse(e.dataTransfer.getData('goal'))
      console.log(goal.id)
      handlePass(goal)
    }
    const handlePass = async(goal) => {
      const data = {
          'id': goal.id,
          'date': date,
      }
      await axiosPutData(`${category}/pass-to-next`, data)
      setFilteredGoals(filteredGoals.filter(item=>item.id != goal.id))
      setIfDataChanged(prevState=>!prevState)
      }


  return (
    <>
    <div className={`min-h-[150px]`} 
    onDragOver={dragOver}
    onDrop={dropGoal}
    >
      {filteredGoals && filteredGoals.map((goal)=>( 
        <div 
          key={goal.id} 
          id={goal.id}
          className='flex flex-row '
          draggable={true}
          onDragStart={(e)=>dragStart(e,goal)}
          >
              <SingleGoal  
                goal={goal} 
                category={category} 
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
