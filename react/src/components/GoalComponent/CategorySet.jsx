import React, {useEffect, useState} from 'react'
import GoalDisplayComponent from './GoalDisplayComponent'
import { axiosGetInitData } from '../Api/Api';


const CategorySet = ({categories, date, data, setIfDataChanged}) => {
    const [categoryStates, setCategoryStates] = useState({});
    const [initData, setInitData] = useState([])
    const [toggled, setToggled] = useState(true) 


    const toggleCategory = (category) => {
        setCategoryStates(prevState => ({
            ...prevState,
        [category]: !prevState[category]
    }));
    };
    
    useEffect (()=>{ 
        setInitData(data)
    }, [data])


  return (
    <div className='border-b-8 border-[#ffae22] mb-4 overflow-hidden sm:overflow-auto'>
            <button onClick={()=>setToggled(!toggled)} className='text-xs ml-1' >
                    {date}
            </button> 
      <div className={toggled ? `w-auto mx-1` : 'hidden'}> 
            <p className='text-xs opacity-40 hover:opacity-100 duration-300'></p>
                <div className='categories_container'>
                    {
                    categories.map((category, index)=>(
                        <div 
                        key={category} 
        //fix THIS ASAP
                        className='sm:w-[200px] md:w-[300px] lg:w-[330px] xl:w-[380px] flex flex-col border border-[#FFDDA1] bg-white mb-1 rounded-lg hover:border '
                        >
                            <span 
                            className='goal-category rounded-t-md  text-sm ' 
                            onClick={()=>toggleCategory(category)}
                            >{category}</span>
                            <div className={`rounded-b-lg overflow-auto duration-200 ${!categoryStates[category] ? 'min-h-[150px]' : 'h-1'}`} >
                                <GoalDisplayComponent 
                                goals={initData} 
                                date={date} 
                                category={category.toLowerCase()}
                                setIfDataChanged={setIfDataChanged}/>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
    </div>
  )
}

export default CategorySet
