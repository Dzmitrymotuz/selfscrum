import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
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

    const [color, setColor] = useState(9)

    const nextMonth = () => {
        return setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1))
    }
    const prevMonth = () => {
        return setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1))
    }
    const handleClick = (value) => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        const day = value + 1
        const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
        navigate(`/date/${dateString}`) 
    } 
    


    useEffect(()=>{
        const monthlyData = async() => {
            const payload = {
                'year': currentDate.getFullYear(),
                'month': currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1),
            }
            const data = await axiosGetDataWithPayload('calendar', payload)
            setMonthData(data.organized_data) 
        }
        monthlyData() 
    }, [currentDate])


    const render = (monthData) => {
        const days = []

        for (let i=0;i<firstDayOfMonth;i++) {
            days.unshift(<div key={i-31} className=''></div>)
        }


        for (let i=0;i<allDaysInMonth;i++) {
            const day = i+1
            const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth()+1) : (currentDate.getMonth()+1)}-${day < 10 ? '0'+day:day}`
            
            days.push(
                <div  
                key={i}
                className={`min-h-[70px] sm:min-h-[140px] bgmain m-1 rounded-md pumpkinborder text-left p-1 opacity-80 hover:opacity-100  hover:scale-105 duration-200`}
                onClick={()=>handleClick(i)}
                >
                    <div className='text-sm text-right'>
                        <span className='textpumpkin rounded-md py-0 px-1'> {`${day}`} </span>
                    </div>
                    <div className='flex flex-col px-2 '>
                    {
                        monthData[dayKey] ? Object.keys(monthData[dayKey]).map((item, i) =>
                        (    
                            <div key={i} className='flex justify-between'>
                                {item != 'mood' ? <span className='hidden sm:block'>{item}: </span> : ''}
                                {item != 'mood' ? <span>{monthData[dayKey][item].length}</span> : ''}
                                {/* {item === 'mood' ? <div className={`w-full h-3 bg-red-300`}>{monthData[dayKey][item][0].mood}</div> : ''} */}
                            </div>
                        )) : 
                        <div className='hidden sm:block text-center opacity-20'>
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
    <div className='flex justify-center '>
        <div className='ml-[50px] max-w-[75rem] w-[90%]'>
            <div className='textpumpkin flex justify-center items-center font-bold pt-5 mb-5'>
            <img 
                src='/move.svg' 
                onClick={()=>prevMonth()}
                className='w-6 rotate-180 mr-7 cursor-pointer'/>
            <span className='mt-0 items-center'>{currentDate.toDateString()}</span>
            <img 
                src='/move.svg' 
                onClick={()=>nextMonth()}
                className='w-6 ml-7 cursor-pointer'/>
            </div>
            <div className='flex justify-between mx-10 text-2xl'>
                
                
            </div>
            <div className='grid grid-cols-7 gap-1  p-1 '>
                {WEEKDAYS.map((day)=>(
                    <div 
                    key={day}
                    className='pumpkinborder textpumpkin bgmain rounded-md text-center p-1'
                    >{day}</div>
                ))}
                {monthData && render(monthData)}
                {/* {console.log(monthData)} */}
            </div>
        </div> 
    </div>
  );
}

export default Calendar;
