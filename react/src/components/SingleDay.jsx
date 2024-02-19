import React, {useEffect, useState} from 'react'
import { axiosGetInitData } from './Api/Api'
import { formatDate  } from './Api/Helpers'
import GoalDisplayComponent from './GoalComponent/GoalDisplayComponent'
import MoodComponent from './MoodComponent/MoodComponent'
import { useParams } from 'react-router-dom'



const SingleDay = () => {
const categories = ['Work', 'Coding', 'Career', 'Home', 'Health', ]
const [initData, setInitData] = useState([])
const params = useParams()


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
            <div className='grid place-items-center pt-5 mb-5'>
                <span >{params['*']}</span>
            </div>
            <div className='flex justify-center items-center'>
                {/* <MoodComponent/> */}
            </div>
        </div>
        <div className='flex flex-row justify-center'>
        <div className=' w-[600px] mr-5'> 
            <div className='categories_container'>
                {
                    categories.map((category, index)=>(
                        <div key={category} className='flex flex-col mb-0 '>
                            <span className='goal-category rounded-t-md '>{category}</span>
                            <div className='rounded-b-lg '>
                                <GoalDisplayComponent goals={initData} date={params['*']} category={category.toLowerCase()}/>
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
