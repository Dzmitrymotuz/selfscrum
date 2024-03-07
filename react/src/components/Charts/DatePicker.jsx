import React, {useState, useEffect} from 'react'
import { formatDate  } from '../Api/Helpers'


const DatePicker = ({date, setDate}) => {
    // const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()-7))))
    // const [endDate, setEndDate] = useState(formatDate(new Date()))


    useEffect(()=>{
        
    }, [])

  return (
    <div>
      Pick a date
    </div>
  )
}

export default DatePicker
