import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate  } from '../Api/Helpers';
import './Report.css';
import Select from 'react-select'
import { axiosGetDataWithPayload } from '../Api/Api';
import SingleGoal from '../GoalComponent/SingleGoal';
import Paginator from '../Helpers/Paginator';

const categories = [
    { value: 'coding', label: 'Coding' },
    { value: 'work', label: 'Work' },
    { value: 'career', label: 'Career' },
    { value: 'home', label: 'Home' },
    { value: 'health', label: 'Health' },
  ]

const Report = () => {
    const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()-7))))
    const [endDate, setEndDate] = useState(formatDate(new Date()))

    const [goals, setGoals] = useState([])
    const handleGoals = async() => {
        const payload = {
            startDate: startDate,
            endDate: endDate,
        }
        // const response = axiosGetDataWithPayload(`${selectedOption}/get-range`)
        const response = await axiosGetDataWithPayload(`init-${selectedOption}`, payload)
        setGoals(response.goals)
        // console.log(response)
    }

    const [selectedOption, setSelectedOption] = useState(categories[0].value);


    useEffect(()=>{
        handleGoals()
    }, [selectedOption, startDate, endDate])


  return (
    <div className='main-container '> 
        <div className='border-b-2 border-slate-300 text-lg mx-4 pt-2 '>
            <span className=''>One space to manage your Goals</span>
        </div>
        <div className='zero-row border-0 rounded-sm mx-2 bg-gray-50 shadow-sm'>
            <div className='p-4 my-4 flex justify-start md:justify-start items-center'>
                <div className='flex flex-col md:grid md:grid-cols-4 grid-flow-col gap-2 '>
                    <div className='filter w-auto m-1 flex flex-col'>
                        <span className='text-xs'>Select start date</span>
                        <DatePicker 
                        className='w-[150px]' 
                        selected={startDate} 
                        onChange={date => setStartDate(formatDate(date))}
                        />
                    </div>
                    <div className='filter w-auto m-1 flex flex-col'>
                        <span className='text-xs'>Select end date</span>
                        <DatePicker 
                        className='w-[150px]'
                        selected={endDate} 
                        onChange={date => setEndDate(formatDate(date))}
                        />
                    </div>
                    <div className='filter w-auto m-1 flex flex-col'>
                        <span className='text-xs'>Select category</span> 
                        <Select 
                        onChange={(e)=>setSelectedOption(e.value)}
                        className='w-[150px]' 
                        options={categories}/>
                    </div> 
                </div>
            </div>
        </div>
        <div className='bluebg top-row p-1 border-0 rounded-sm mx-2 shadow-sm '>
            <div className='mt-1 rounded-lg py-5 px-2'>
                <span className='text-sm p-1 m-1 bg-gray-100 rounded-md shadow-inner text-white bgorange'>Goals for {selectedOption} category:</span>
                <div className='w-auto'> 
                    <table className='w-full '>
                        <thead>
                            <tr className=''>
                                <th className='w-3/5 md:w-4/5 '>Goals ({goals.length})</th>
                                <th className='w-2/5 md:w-1/5'>Date</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {goals && goals.map((goal)=>(
                                // <Paginator>
                                <tr key={goal.id} className=' hover:bg-gray-100 rounded-lg '> 
                                        <td> 
                                            <SingleGoal 
                                            goal={goal}
                                            category={selectedOption}
                                            filteredGoals={goals}
                                            setFilteredGoals={setGoals}
                                            date={goal.date}
                                            /> 
                                        </td>
                                        <td className='text-xs py-1 sm:text-base bg-white rounded-md px-1 sm:py-0 flex justify-center mx-3 my-0.5'>
                                            {goal.date}
                                        </td>  
                                </tr>
                                // </Paginator>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Report
