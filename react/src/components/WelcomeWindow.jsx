import React, {useEffect, useState} from 'react'
import { axiosGetInitData, axiosGetDataWithPayload } from './Api/Api'
import { formatDate  } from './Api/Helpers'
import GoalDisplayComponent from './GoalComponent/GoalDisplayComponent'
import MoodComponent from './MoodComponent/MoodComponent'
import CategorySet from './GoalComponent/CategorySet'

export const categories = ['Coding', 'Work', 'Career', 'Home', 'Health', ]

const WelcomeWindow = () => {
const [yesterdayData, setYesterdayData] = useState([])
const [initData, setInitData] = useState([])
const [tomorrowData, setTomData] = useState([])
const [today, setToday] = useState(formatDate(new Date())) 
const [tomorrow, setTommorow] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()+1))))
const [yesterday, setYesterday] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()-1))))

const [ifDataChanged, setIfDataChanged] = useState(true)

const fetchDailyData = async() => {
    const data = await axiosGetDataWithPayload('dayload', {yesterday, today, tomorrow});
    setYesterdayData(data.yesterday) 
    setInitData(data.today)
    setTomData(data.tomorrow)
    // console.log(data)
}

useEffect (()=>{ 
    fetchDailyData()
}, [ifDataChanged])


  return (
    <div className='main-container '>
        <div className=''>
            <div className='grid place-items-center pt-5 text-lg'>
                <span>Today is <span className='text-bold'>{new Date().toDateString()}</span></span>
            </div>
            <div className='flex flex-row justify-center mx-5 mt-[-15px]'>
                <MoodComponent date={today}/>
            </div> 
            <div className='bg-black w-[100%] h-[1px] opacity-5 mb-3'/> 
        </div>
        <div className='flex flex-col sm:flex-row items-top justify-start mx-auto max-w-[1200px]'>
            <CategorySet 
                categories={categories} 
                date={yesterday}
                data={yesterdayData}
                setIfDataChanged={setIfDataChanged}
                position='yesterday'
            /> 
            <CategorySet 
                categories={categories} 
                date={today}
                data={initData}
                setIfDataChanged={setIfDataChanged}
                position='today'
            /> 
            <CategorySet 
                categories={categories} 
                date={tomorrow}
                data={tomorrowData}
                setIfDataChanged={setIfDataChanged}
                position='tomorrow'
            />  
        </div>
    </div>
  )
}

export default WelcomeWindow
