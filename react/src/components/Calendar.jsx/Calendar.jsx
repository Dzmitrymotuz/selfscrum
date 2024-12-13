import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { axiosGetDataWithPayload } from '../Api/Api';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


const getDaysinMonth = (year, month) => {
    return new Date(year, month +1, 0).getDate()
}
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
}


const Calendar = () => { 
    const [monthData, setMonthData] = useState()
    const navigate = useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date()) 
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())
    const allDaysInMonth = getDaysinMonth(currentDate.getFullYear(), currentDate.getMonth())
    const month = currentDate.getMonth()+1

    const [mood, setMood] = useState('')
    const [moodData, setMoodData] = useState([])

    const nextMonth = () => {
        return setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1))
    }
    const prevMonth = () => {
        return setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1))
    }
    const handleClick = (value) => {
        const year = currentDate.getFullYear()
        const day = value + 1
        const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
        navigate(`/date/${dateString}`) 
    } 
    const handleMood = (value) => {
        switch (value) {
            case 0:
                return <div className='w-4 h-4 bg-[#ff583c]'/>
            case 1:
                return <div className='w-4 h-4 bg-[#ff609b]'/>
            case 2:
                return <div className='w-4 h-4 bg-[#f37eeb]'/>
            case 3:
                return <div className='w-4 h-4 bg-[#b2adff]'/>
            case 4:
                return <div className='w-4 h-4 bg-[#79c9ff]'/>
            case 5:
                return <div className='w-4 h-4 bg-[#4bdeff]'/>
            default:
                return <div className='w-4 h-4 bg-[#010101]'/>
        }
    }


    useEffect(()=>{
        const monthlyData = async() => {
            const month = currentDate.getMonth()+1
            const payload = {
                'year': currentDate.getFullYear(),
                'month': month < 10 ? '0' + month : month,
            }
            const data = await axiosGetDataWithPayload('calendar', payload)
            setMonthData(data.organized_data)
            
            //getting mood values
            const moodDataValues = {}
            Object.entries(data.organized_data).forEach(([date, data]) => {
                if (data.mood && data.mood.length > 0) {
                    moodDataValues[date] = data.mood[0].mood
                }
            })
            setMoodData(moodData)
        }
        monthlyData() 
    }, [currentDate])


    const render = (monthData) => {
        const days = []

        for (let i=0;i<firstDayOfMonth;i++) {
            days.unshift(<div key={i-31} className=' opacity-20 rounded-md m-1 p-1 min-h-[70px] sm:min-h-[140px]'></div>)
        }


        for (let i=0;i<allDaysInMonth;i++) {
            const day = i+1
            const dayKey = `${currentDate.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0'+day:day}`
//DAYS CANVASES
            days.push(
                <div  
                key={i}
                className={`min-h-[70px] sm:min-h-[140px] m-1 rounded-md text-left p-1 opacity-80 hover:opacity-100  hover:scale-105 duration-200
                ${currentDate.getDate() < day ? ' bggreen bgmiddlegray' : ''} 
                ${currentDate.getDate() === day ? ' bgorange bglightgray text-white ' : ''} 
                ${currentDate.getDate() > day ? ' bgpurple bgdarkgray text-white' : ''}`}
                onClick={()=>handleClick(i)}
                >
                    <div className='text-sm w-auto flex justify-between rounded text-right'>
{/* mood component */}
                        {
                        monthData[dayKey] ? Object.keys(monthData[dayKey]).map((item, i) => 
                            (    
                                item === 'mood'? 
                                <div 
                                key={i} 
                                className={`${mood} hiddens sm:flex items-center mx-1`}
                                >
                                    {handleMood(monthData[dayKey][item][0].mood)}
                                </div> 
                                :
                                ''
                            )) 
                        :
                            <div className='w-3 h-3 mt-1 opacity-0'>
                            </div>}
                            <span className={`rounded-md py-0 px-1 font-bold text-md 
                            ${currentDate.getDate() < day ? 'textgreen ' : ''} 
                            ${currentDate.getDate() === day ? 'textorange  borderorange ' : ''} 
                            ${currentDate.getDate() > day ? 'textpurple' : ''}`}> {`${day}`} </span>
                    </div>
                        <div className='flex flex-col'>
                        {
                    monthData[dayKey] ? Object.keys(monthData[dayKey]).map((item, i) =>
                        (    
                            <div key={i} className={`block sm:flex justify-between text-black px-2 rounded-sm
                            ${currentDate.getDate() < day ? ' bggreen bgmiddlegray text-white' : ''} 
                            ${currentDate.getDate() === day ? 'bglightgray text-white' : ''} 
                            ${currentDate.getDate() > day ? ' bgpurple bgdarkgray text-white' : ''}
                            `}>
                                {item != 'mood' ? <span className='hidden sm:block'>{item}: </span> : ''}
                                {item != 'mood' ? <span>{monthData[dayKey][item].length}</span> : ''}
                            </div>
                        )) : 
                        <div className='hidden sm:block text-center opacity-40 text-white'>
                            No data
                        </div>
                        }
                    </div>
                </div>
            )
        }
        return days
    }    


  return (
    <div className='flex justify-center bg-[#ababab]'>
        <div className='ml-[50px] max-w-[75rem] w-[90%]'>
            <div className='flex justify-center items-center font-bold pt-5 mb-5'>
            <img 
                src='/move.svg' 
                onClick={()=>prevMonth()}
                className='w-8 rotate-180 mr-7 cursor-pointer'/>
            <span className='mt-0 items-center'>{currentDate.toDateString()}</span>
            <img 
                src='/move.svg' 
                onClick={()=>nextMonth()}
                className='w-8 ml-7 cursor-pointer '/>
            </div>
            <div className='flex justify-between mx-10 text-2xl'>
                
            </div>
            <div className='grid grid-cols-7 gap-1  p-1 '>
                {WEEKDAYS.map((day)=>(
                    <div 
                    key={day}
                    className='bglightgray text-white rounded-md text-center p-1'
                    >{day}</div>
                ))}
                {monthData && render(monthData)}
            </div>
        </div> 
    </div>
  );
}

export default Calendar;
