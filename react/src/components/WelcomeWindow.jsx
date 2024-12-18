import React, {useContext, useEffect, useState} from 'react'
import { axiosGetDataWithPayload } from './Api/Api'
import { formatDate  } from './Api/Helpers'
import MoodComponent from './MoodComponent/MoodComponent'
import CategorySet from './GoalComponent/CategorySet'
import DayWord from './DayWord/DayWord'
import AiGoals from './GoalComponent/AiGoals'

export const categories = ['Coding', 'Work', 'Career', 'Home', 'Health', ]


const WelcomeWindow = () => {
const [yesterdayData, setYesterdayData] = useState([])
const [initData, setInitData] = useState([])
const [tomorrowData, setTomData] = useState([])
const [today, setToday] = useState(formatDate(new Date())) 
const [tomorrow, setTommorow] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()+1))))
const [yesterday, setYesterday] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()-1))))
const [ifDataChanged, setIfDataChanged] = useState(true)

const [allData, setAllData] = useState([])
const [aiDataLoadReady, setAiDataLoadReady] = useState(false)
const [aiData, setAiData] = useState([])

const getAiHelpers = async(aiData) => {
    setAiData(aiData)
    setAiDataLoadReady(false)
}

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
    if(aiData.length===0){
        setAiDataLoadReady(true)  
      }
    setAllData(data)
    setYesterdayData(data.yesterday) 
    setInitData(data.today)
    setTomData(data.tomorrow)
    setLoading(false) 
}


useEffect (()=>{ 
    fetchDailyData() 
}, [ifDataChanged])



  return (
    <div className='main-container'>
        <div className=''>
            <div className='grid place-items-center pt-0 text-lg '>
                <span className=''>
                    Today is <span className='text-bold'>{new Date().toDateString()}</span>
                </span>
                <div className='flex flex-row justify-between mx-5 mt-[-15px] '>
                    <MoodComponent date={today}/>
                </div>  
                <div className='flex flex-row h-450px]'>
                    <button
                    className='flex-grow text-sm w-auto hover:cursor-pointer hover:bg-opacity-80 bg-orange-500 text-white rounded-md p-1 m-1'
                    onClick={()=>lastFriday()}>
                        Last Friday
                    </button>
                        <DayWord/> 
                    {initData && 
                        <AiGoals 
                            data={allData} 
                            getAiHelpers={getAiHelpers}
                            setIfDataChanged={setIfDataChanged} 
                            aiDataLoadReady={aiDataLoadReady}
                            /> 
                    }
                </div> 
            </div>
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
                    aiData={aiData}
                />  
        </div>}
    </div>
  )
}

export default WelcomeWindow
