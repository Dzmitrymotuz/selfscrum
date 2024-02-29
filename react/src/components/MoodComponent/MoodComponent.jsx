import React, {useRef, useEffect, useState} from 'react'
import {axiosPostData, axiosGetDataWithPayload } from '../Api/Api'

const MoodComponent = ({date}) => {
    const moodRef = useRef()
    const [currentMood, setCurrentMood] = useState()
    const [bgColor, setBgColor] = useState('#FFDDA1')

    const handleMood = async(e) => {
        const moodValue = e.target.value
        await axiosPostData('mood-change', {'mood_value': moodValue, 'date': date})
        getInitMood()
    }
    const getInitMood = async() => {
        const initMood = await axiosGetDataWithPayload('get-mood', {})
        setCurrentMood(initMood.mood.mood)
    }
    const handleColor = (color) => {
      switch(color) {
        case 0:
          setBgColor('#ff5100')
          break;
        case 1:
          setBgColor('#d97575')
          break;
        case 2:
          setBgColor('#ff82a8')
          break;
        case 3:
          setBgColor('#ffc7f8')
          break;
        case 4:
          setBgColor('#e8c7ff')
          break;
        case 5:
          setBgColor('#c7cdff')
          break;
      }
    }
    
    useEffect(()=>{
        getInitMood()
        handleColor(currentMood)
    },[currentMood])

  return (
    <div className={`py-3 px-1 flex items-center`} >
      <div className='w-6 h-6 rounded-md' style={{backgroundColor:bgColor}}/>
      <span className={`m-1`} >Mood:</span>
        <select 
        ref={moodRef}
        className='rounded-md p-1'
        placeholder='Rate your mood'
        style={{backgroundColor:bgColor}}
        onChange={(e)=> handleMood(e)}
        value={currentMood}
        >
            <option value='5'>Very Good</option>
            <option value='4'>Somewhat Good</option>
            <option value='3'>Medium</option>
            <option value='2'>below average</option>
            <option value='1'>Bad</option>
            <option value='0'>I want to die</option>
        </select>
    </div>
  )
}

export default MoodComponent
