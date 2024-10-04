import React, {useContext, useEffect, useState} from 'react'
import { axiosGetDataWithPayload } from './Api/Api'
import { formatDate  } from './Api/Helpers'
import MoodComponent from './MoodComponent/MoodComponent'
import CategorySet from './GoalComponent/CategorySet'
import DayWord from './DayWord/DayWord'

export const categories = ['Coding', 'Work', 'Career', 'Home', 'Health', ]


const WelcomeWindow = () => {
const [yesterdayData, setYesterdayData] = useState([])
const [initData, setInitData] = useState([])
const [tomorrowData, setTomData] = useState([])
const [today, setToday] = useState(formatDate(new Date())) 
const [tomorrow, setTommorow] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()+1))))
const [yesterday, setYesterday] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()-1))))
const [ifDataChanged, setIfDataChanged] = useState(true)


const [loading, setLoading] = useState(true)

const lastFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubstract = dayOfWeek >= 5 ? dayOfWeek-5 : dayOfWeek+2;
    const lastFridayDate = new Date(today);
    lastFridayDate.setDate(today.getDate() - daysToSubstract)
    console.log(formatDate(lastFridayDate)) 
    setYesterday(formatDate(lastFridayDate))
    setIfDataChanged(!ifDataChanged)
}


const fetchDailyData = async() => {
    const data = await axiosGetDataWithPayload('dayload', {yesterday, today, tomorrow});
    setYesterdayData(data.yesterday) 
    setInitData(data.today)
    setTomData(data.tomorrow)
    setLoading(false)
    // console.log(data)
}


useEffect (()=>{ 
    fetchDailyData()
}, [ifDataChanged])



  return (
    <div className='main-container'>
        <div className=''>
            <div className='grid place-items-center pt-0 text-lg'>
                <span className=''>
                    Today is <span className='text-bold'>{new Date().toDateString()}</span>
                </span>
                <div className='flex flex-row justify-between mx-5 mt-[-15px] '>
                    <MoodComponent date={today}/>
                </div> 
            </div>
                <div className='flex flex-row justify-between '>
                    <div className='mx-1 text-sm'>
                        <button onClick={()=>lastFriday()}>
                            Last Friday
                        </button>
                    </div> 
                    <div className='mx-10 max-w-[300px] max-h-[200px] text-sm flex-col'>
                        <DayWord/>
                    </div> 
                </div>
 
            {/* <div className='bg-black w-[100%] h-[1px] opacity-5 mb-3'/>   */}
        </div>
        
        {loading ?
            <div className='text-lg flex justify-center animate-bounce'>
                Loading...
            </div>
            :
        <div 
        className='flex test flex-col sm:flex-row items-top justify-start mx-auto max-w-[1200px]'>
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
        </div>}
    </div>
  )
}

export default WelcomeWindow
