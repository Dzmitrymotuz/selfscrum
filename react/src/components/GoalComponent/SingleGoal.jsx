import React, {useState} from 'react'
import ActionButton from './ActionButton'
import { axiosDeleteData, axiosPostData, axiosPutData, axiosGetInitData } from '../Api/Api'



const SingleGoal = ({goal, category, handleStatusChange}) => {
    const [isEdited, setIsEdited] = useState(true)
    const [goalContent, setGoalContent] = useState(goal.content)
 
    const handleEdit = async(id) => {
        setIsEdited(!isEdited)
        const data = {
          'id': id,
          'content': goalContent,
        }
        await axiosPutData(`${category}/edit-goal`, data)
      }
      const handleEnter = (e) => { 
        if (e.target.value.length > 0) {
          if (e.key === 'Enter') {
            return handleEdit(goal.id)
          }
        } 
      } 

  return (
    <div className='flex flex-row justify-between'>
      {isEdited ? 
        <span 
        className={`${goal.status === 1 ? 'text-[#FFB703]' : 'text-black'} hover:cursor-pointer`}
        onClick={()=>handleStatusChange(goal.id, goal.status)}
        >
        {goalContent}
        </span>
        :
        <input                 
        onChange={(e)=>setGoalContent(e.target.value)}
        value={goalContent}
        onKeyDown={handleEnter}
        ></input>}
        <div className='flex flex-row mr-0' >
            <ActionButton icon={'/edit.svg'} onClick={(e)=>setIsEdited(!isEdited)} title={'edit'} />
        </div>

    </div>
  )
}

export default SingleGoal
