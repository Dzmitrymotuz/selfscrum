import React, {useState, useEffect} from 'react'
import { axiosGetDataWithPayload } from '../Api/Api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, PieChart, Pie } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Cell } from 'recharts';
import { formatDate  } from '../Api/Helpers'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





const Dashboard = () => {
    const [data, setData] = useState([])
    const [pieData, setPieData] = useState([])
    const [goalsData, setGoalsData] = useState([])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d952c9']

    const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setDate(new Date().getDate()-7))))
    const [endDate, setEndDate] = useState(formatDate(new Date()))

    const fetchMoodData = async() => {
        const response = await axiosGetDataWithPayload('get-mood-range', {
            startDate: startDate,
            endDate: endDate,
        })
        const ass_arr = Object.keys(response.mood_object).map((key)=>({
            date: key,
            mood: response.mood_object[key]
        }))
        setData(ass_arr)
        //Counts data for piechart
        const moodCounts = { 
            'I want to die': 0,
            'Bad': 0,
            'Below Average': 0,
            'Ok': 0,
            'Somewhat Good': 0,
            'Very Good': 0 
        }

        for (const date in response.mood_object) {
            const mood = response.mood_object[date]
            switch (mood) {
                case 0:
                    moodCounts['I want to die']++
                    break
                case 1:
                    moodCounts['Bad']++
                    break
                case 2:
                    moodCounts['Below Average']++
                    break
                case 3:
                    moodCounts['Ok']++
                    break
                case 4:
                    moodCounts['Somewhat Good']++
                    break
                case 5:
                    moodCounts['Very Good']++
                    break
            }
        }  
        const result = Object.entries(moodCounts).map(([status, amount])=>{
            return {status: status, 
                    amount: amount * 100 / ass_arr.length}
        })
        setPieData(result)
    }
    const fetchGoalsData = async() => {
        const response = await axiosGetDataWithPayload('get-goals-range', {
            startDate: startDate,
            endDate: endDate,
        })
        const doneChartData = Object.keys(response).map(category=>({
            category: category,
            length: response[category].length,
        }));
        setGoalsData(doneChartData)
    }


    useEffect(()=>{
        fetchMoodData()
        fetchGoalsData()
    },[startDate, endDate])



  return (
    <div className='main-container'>
        <div className='wrapper flex flex-col'>
            <span className='text-lg text-bold flex items-center justify-center mt-5'>InfoBoard</span>
            <div className='zero-row w-auto flex justify-center mt-5'>
                <div className='filter w-auto h-[100px] m-1 flex flex-col'>
                <span className='text-xs'>Select start date</span>
                    <DatePicker 
                    selected={startDate} 
                    onChange={date => setStartDate(formatDate(date))}
                    />
                </div>
                <div className='filter w-auto h-[100px] m-1 flex flex-col'>
                    <span className='text-xs'>Select end date</span>
                    <DatePicker 
                    selected={endDate} 
                    onChange={date => setEndDate(formatDate(date))}
                    />
                </div>
            </div>
            <div className='first-row flex md:flex-row w-[90%] flex-col justify-center items-center mx-auto'> 
                <div className='flex-grow cell flex-col w-[300px] h-[300px] sm:w-[450px]'>
                    <div className='flex flex-col'>
                        <span className='text-bold'>Mood Radar Visual</span>
                        <span className='text-sm'>The data is in %. Current mood values total is {data.length} </span>
                    </div>
                    <ResponsiveContainer >
                        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={pieData} >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="status" />
                        {/* <PolarRadiusAxis domain={[0, data.length]} /> */}
                        <Radar name="mood" dataKey="amount" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-5 h-5 '/>
                <div className='flex-grow cell flex flex-col w-[300px] h-[300px] sm:w-[400px]'>
                    <span className='text-bold'>Goals Piechart</span>
                    <span className='text-sm'>Always remember about balance </span>
                    <ResponsiveContainer > 
                        <PieChart width={400} height={400}>
                        <Pie
                            dataKey="length"
                            isAnimationActive={false}
                            data={goalsData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={50}
                            label={({category, value}) => `${category.toUpperCase()}: ${value}`}
                        >
                        {goalsData.map((entry, index)=> (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer> 
                </div>
            </div>
            <div className='second_row flex flex-row justify-center my-5'>
                <div className='cell flex flex-col w-[300px] h-[400px] sm:w-[90%]'>
                    <span className='text-bold'>Mood Diagram</span>
                    <span className='text-sm'>How you doing? </span>
                    <ResponsiveContainer >
                        <LineChart width={500} height={400} data={data}>
                            <Line type="monotone" dataKey="mood" stroke={COLORS[0]} strokeWidth={3} />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 5]} tickCount={6}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard
