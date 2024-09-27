import React, {useState, useEffect} from 'react'
import { axiosGetDataWithPayload } from '../Api/Api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, PieChart, Pie } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, AreaChart, Area, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Rectangle, Legend} from 'recharts';
import { formatDate  } from '../Api/Helpers'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Gemini, { dashboard_message } from '../AI/Gemini';
 

const Dashboard = () => {
    const [data, setData] = useState([])
    const [pieData, setPieData] = useState([])
    const [goalsData, setGoalsData] = useState([])
    const [doneGoalsdata, setDoneGoalsData] = useState([])
    const [goalsByDay, setGoalsByDay] = useState([])
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
            'Very Bad': 0,
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
                    moodCounts['Very Bad']++
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
        const goalsChartData = Object.keys(response).map(category=>({
            category: category,
            length: response[category].length,
        }));
        setGoalsData(goalsChartData)

        //Counts the Data for Done Goals VS Undone
        const doneGoalsChartsData = Object.keys(response).map((category)=>{
            const goals = response[category];
            const categoryLength = response[category].length
            let doneCount = 0;
            let notDoneCount = 0;
            goals.forEach((goal)=>{
                if (goal.status === 0) {
                    doneCount++;
                }else {
                    notDoneCount++
                }
            });
            return {
                category: category,
                notDoneCount: doneCount,
                doneCount: notDoneCount,
                length: categoryLength,
            }
        })
        setDoneGoalsData(doneGoalsChartsData)


        //sets data for Goals on time period
        const goalsTimeFrame = {} 
        const dateAmount = Object.keys(response).map((category)=>{
            response[category].map((key)=>{
                if (goalsTimeFrame[key.date]) {
                    if (key.status === 1) {
                        goalsTimeFrame[key.date].doneGoals++;
                    }else{
                        goalsTimeFrame[key.date].notDoneGoals++;
                    }
                }else{
                    goalsTimeFrame[key.date] = {
                        doneGoals: key.status === 1 ? 1 : 0,
                        notDoneGoals: key.status === 0 ? 1 : 0,
                    }
                } 
            })
        })    
        const chartData = Object.entries(goalsTimeFrame).map(([date, counts])=>({
            date: date,
            done: counts.doneGoals,
            notDone: counts.notDoneGoals
        }))
        chartData.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        setGoalsByDay(chartData) 
}


    useEffect(()=>{
        fetchMoodData()
        fetchGoalsData()
    },[startDate, endDate])



  return (
    <div className='main-container'>
        <div className='wrapper flex flex-col'>
            <span className='text-lg text-bold flex items-center justify-center mt-2'>InfoBoard</span>
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
            <div className='m-5 bggreen p-2 rounded-md w-[90%] sm:w-[70%] mx-auto '>
                <Gemini 
                message={dashboard_message(pieData, goalsByDay)} 
                />
            </div> 
            <div className='first-row flex md:flex-row w-[90%] flex-col justify-center items-center mx-auto '> 
                <div className='flex-grow cell flex-col w-[300px] h-[400px] sm:w-[450px]'>
                    <div className='flex flex-col'>
                        <span className='text-bold'>Mood Radar Visual</span>
                        <span className='text-sm'>The data is in %. Current mood values total is {data.length} </span>
                    </div>
                    <ResponsiveContainer >
                        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={pieData} >
                        <Tooltip />
                        <PolarGrid />
                        <PolarAngleAxis dataKey="status" />
                        <Radar name="mood" dataKey="amount" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-5 h-5 '/>
                <div className='flex-grow cell flex flex-col w-[300px] h-[400px] sm:w-[400px]'>
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
                            outerRadius={65}
                            innerRadius={40}
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
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='third_row flex flex-row justify-center my-5'>
                <div className='cell flex flex-col w-[300px] h-[400px] sm:w-[90%]'>
                    <span className='text-bold'>Goals chart</span>
                    <span className='text-sm'>Done VS Undone</span>
                    <ResponsiveContainer >
                    <LineChart
                    width={500}
                    height={400}
                    data={goalsByDay}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                        <CartesianGrid strokeDasharray="0" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey=''/>
                        <Tooltip />
                        <Legend/>
                        <Line type="monotone" dataKey="done" name='Done' stroke={COLORS[2]} strokeWidth={3} />
                        <Line type="monotone" dataKey="notDone" name='To Do' stroke={COLORS[4]} strokeWidth={3} />
                         
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='fourth_row flex flex-row justify-center my-5'>
                <div className='cell flex flex-col w-[300px] h-[400px] sm:w-[90%]'>
                    <span className='text-bold'>Goals Column chart</span>
                    <span className='text-sm'>Done VS Undone</span>
                    <ResponsiveContainer >
                    <BarChart
                    width={500}
                    height={300}
                    data={doneGoalsdata}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="0" />
                    <XAxis dataKey="category" />
                    <YAxis dataKey='length'/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="doneCount" name='Done' fill={COLORS[2]} activeBar={<Rectangle  />} />
                    <Bar dataKey="notDoneCount" name='To Do' fill={COLORS[4]} activeBar={<Rectangle />} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Dashboard
