import React, {useState} from 'react'
import ActionButton from './ActionButton'
import { axiosDeleteData, axiosPostData, axiosPutData } from '../Api/Api'



const SingleGoal = ({goal, category, setFilteredGoals, filteredGoals, date, setIfDataChanged, color}) => {
    const [isEdited, setIsEdited] = useState(true)
    const [goalContent, setGoalContent] = useState(goal.content)
 
    const handleEdit = async(id) => {
        setIsEdited(!isEdited)
        if (goalContent.length > 0) {
            const data = {
                'id': id,
                'content': goalContent,
              }
              await axiosPutData(`${category}/edit-goal`, data)
        } else {
            handleDelete(id)
        } 
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
    const handleEnter = (e) => { 
    if (e.target.value.length > 0) {
        if (e.key === 'Enter') {
        return handleEdit(goal.id)
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

  return (
    <div 
    className='flex justify-between w-full bg-white hover:bg-orange-50 rounded-md m-0.5'
    
    >
        <div className='mx-2 '>
            <span className={`${goal.status === 1 ? 'goal-done' : 'goal-active'}`}>
                 {`${goal.status === 0 ? '○' : '●'}`}
            </span>
        </div>
        <div className='w-[90%] '>
        {isEdited ? 
            <span 
                className={`${goal.status === 1 ? 'goal-done' : 'text-black'} hover:cursor-pointer`}
                onClick={()=>handleStatusChange(goal.id, goal.status)}
            >
                {goalContent}
            </span>
            :
            <input                 
                onChange={(e)=>setGoalContent(e.target.value)}
                value={goalContent}
                onKeyDown={handleEnter}
                onBlur={()=>handleEdit(goal.id)}
                className='input-field'
            ></input>}
        </div>
        <div className='flex flex-row m-1 mr-2 items-baseline' >
            {isEdited ? 
            <ActionButton icon={'/edit.svg'} onClick={(e)=>setIsEdited(!isEdited)} title={'edit'} />
            :
            <ActionButton icon={'/edit.svg'} onClick={()=>handleEdit(goal.id)} title={'edit'} />
            }
            <ActionButton icon={'/move.svg'} onClick={(e)=>handlePass(goal.id)} title={'move'} />
            <ActionButton icon={'/delete.svg'} onClick={(e)=>handleDelete(goal.id)} title={'delete'} /> 
        </div>

    </div>
  )
}

export default SingleGoal
