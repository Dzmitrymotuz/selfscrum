import React, {useState, useEffect} from 'react'
import { axiosGetDataWithPayload } from '../Api/Api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, PieChart, Pie } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';



const Dashboard = () => {
    const [data, setData] = useState([])
    const [pieData, setPieData] = useState([])
    const [goalsData, setGoalsData] = useState([])

    const [startDate, setStartDate] = useState('2024-02-26')
    const [endDate, setEndDate] = useState('2024-03-06')

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
            'Very Good': 0 }
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
            return {status, amount}
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
    },[])



  return (
    <div className='main-container'>
        <div className='wrapper flex flex-col'>
            <div className='first-row flex flex-row justify-center'>
                <div className='cell flex flex-col border border-blue-300'>
                    <span>Mood Diagram</span>
                    <LineChart width={400} height={400} data={data}>
                        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey=''/>
                    </LineChart>
                </div>
                <div className='cell flex flex-col border border-red-500'>
                    <span>Goals Piechart</span>
                    <PieChart width={400} height={400}>
                    <Pie
                        dataKey="length"
                        isAnimationActive={false}
                        data={goalsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        label={({category, value}) => `${category}: ${value}`}
                    />
                    </PieChart>
                </div>
            </div>
            <div className='second_row flex flex-row justify-center my-5'>
                <div className='border-2 flex-col justify-center w-[300px] h-[400px] sm:w-[800px]'>
                    <span>Mood Visual</span>
                    <ResponsiveContainer >
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={pieData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="status" />
                        <PolarRadiusAxis />
                        <Radar name="mood" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard
