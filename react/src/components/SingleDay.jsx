import React, {useEffect, useState} from 'react'
import { axiosGetInitData } from './Api/Api'
import { formatDate  } from './Api/Helpers'
import GoalDisplayComponent from './GoalComponent/GoalDisplayComponent'
import MoodComponent from './MoodComponent/MoodComponent'
import { useParams } from 'react-router-dom'



const SingleDay = () => {
const categories = ['Coding', 'Work', 'Career', 'Home', 'Health', ]
const [initData, setInitData] = useState([])
const params = useParams()

const [categoryStates, setCategoryStates] = useState({});
const toggleCategory = (category) => {
    setCategoryStates(prevState => ({
        ...prevState,
        [category]: !prevState[category]
    }));
    console.log(categoryStates)
};


useEffect (()=>{
    const fetchInitialData = async() => {
        const data = await axiosGetInitData(params['*'])
        setInitData(data)
    } 
    fetchInitialData()
}, [])

  return (
    <div className='main-container'>
        <div className='flex flex-col'>
            <div className='grid place-items-center pt-5 mb-5 rounded-md'>
                <span className='bgorange text-white rounded-md px-2 py-1 text-xl' >{params['*']}</span>
            </div>
            <div className='flex justify-center items-center'>
                <MoodComponent date={params['*']}/>
            </div>
        </div>
        <div className='flex flex-row justify-center'>
        <div className=' w-[600px] mr-5'> 
            <div className='categories_container'>
                {
                    categories.map((category, index)=>(
                        <div key={category} className='flex flex-col border mb-1 rounded-sm'>
                            <span 
                            className='rounded-t-sm bgorange goal-category text-sm ' 
                            onClick={()=>toggleCategory(category)}
                            >{category}</span>                            
                            <div className={`rounded-b-lg overflow-auto duration-200 ${!categoryStates[category] ? 'min-h-[150px]' : 'h-1'}`}>
                                <GoalDisplayComponent 
                                    goals={initData} 
                                    date={params['*']} 
                                    category={category.toLowerCase()}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default SingleDay
