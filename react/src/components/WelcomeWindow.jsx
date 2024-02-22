import React, {useEffect, useState} from 'react'
import { axiosGetInitData } from './Api/Api'
import { formatDate  } from './Api/Helpers'
import GoalDisplayComponent from './GoalComponent/GoalDisplayComponent'
import MoodComponent from './MoodComponent/MoodComponent'



const WelcomeWindow = () => {
const categories = ['Coding', 'Work', 'Career', 'Home', 'Health', ]
const [initData, setInitData] = useState([])
const [tomData, setTomData] = useState([])
const [today, setToday] = useState(formatDate(new Date()))


const [tomorrow, setTommorow] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()+1))))



useEffect (()=>{
    const fetchInitialData = async() => {
        const data = await axiosGetInitData(today)
        setInitData(data)
    }
    fetchInitialData()
    const fetchTomorrowData = async() => {
        const data = await axiosGetInitData(tomorrow)
        setTomData(data)
    }
    fetchTomorrowData()


}, [])

  return (
    <div className='main-container '>
        <div className=''>
            <div className='grid place-items-center pt-5'>
                <span >Today is {new Date().toDateString()}</span>
            </div>
            <div className='flex flex-row justify-center'>
                <MoodComponent/>
            </div> 
        </div>
        <div className='flex flex-row justify-center'>
        <div className=' w-[400px] mx-5'> 
            <div className='categories_container'>
                {
                    categories.map((category, index)=>(
                        <div key={category} className='flex flex-col border border-[#FFDDA1] bg-white mb-1 rounded-xl hover:border'>
                            <span className='goal-category rounded-t-md '>{category}</span>
                            <div className='rounded-b-lg '>
                                <GoalDisplayComponent goals={initData} date={today} category={category.toLowerCase()}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className=' w-[400px]'>
            <div className='categories_container'>
                    {
                    categories.map((category, index)=>(
                        <div key={category} className='flex flex-col border border-[#EDB230] bg-white mb-1 rounded-xl'>
                            <span className='tommorow-goal-category rounded-t-md'>{category}</span>
                            <div className='rounded-b-lg'>
                                <GoalDisplayComponent goals={tomData} date={tomorrow} category={category.toLowerCase()}/>
                            </div>
                        </div>
                    ))
                    }
                </div> 
            </div>
      </div>
    </div>
  )
}

export default WelcomeWindow
