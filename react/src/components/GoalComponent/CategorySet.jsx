import React, { useEffect, useState} from 'react'
import GoalDisplayComponent from './GoalDisplayComponent'



const CategorySet = ({categories, date, data, setIfDataChanged, position}) => {
    const [categoryStates, setCategoryStates] = useState({});
    const [initData, setInitData] = useState([])
    const [toggled, setToggled] = useState(true) 
    const [color, setColor] = useState('')    

    const toggleCategory = (category) => {
        setCategoryStates(prevState => ({
            ...prevState,
        [category]: !prevState[category]
    }));
    };


    const applyColor = (position) => {
        switch (position) {
            case ('yesterday'):
                setColor('#8A37D2')
                break;
            case ('today'):
                setColor('#FF871F')
                break;
            case ('tomorrow'):
                setColor('#32989A')
                break; 
            default:
                setColor('#FFDDA1')
                break;
        }
    }
        
    useEffect (()=>{ 
        setInitData(data)
        applyColor(position)
    }, [data])

  return (
    <div 
        className='border-b-8 mb-4 overflow-hidden sm:overflow-auto'
        style={{borderColor: color}}
    >
        <div 
            onClick={()=>setToggled(!toggled)}
            className='flex justify-between cursor-pointer'>
            <button className='text-xs ml-1' >
                <span className='font-semibold'>{position[0].toUpperCase()+position.slice(1)}: </span>
                    {date}
            </button> 
            <img 
            src='/up-black.svg'
            className={`w-3 mx-0 ${toggled ? '' : 'rotate-180'}`}/>
        </div>
      <div className={toggled ? `w-auto mx-1` : 'hidden'}> 
            <p className='text-xs opacity-40 hover:opacity-100 duration-300'></p>
                <div className='categories_container '>
                    {
                    categories.map((category, index)=>(
                        <div 
                        key={category} 
                        className='sm:w-[200px] md:w-[300px] lg:w-[330px] xl:w-[380px] flex flex-col border mb-1 rounded-b-sm rounded-t-sm '
                        > 
                            <span 
                            className={`goal-category text-sm flex flex-row justify-between`}
                            style={{backgroundColor: color, borderColor: color}}
                            onClick={()=>toggleCategory(category)}
                            >
                                {category}
                                <img 
                                src='/up-white.svg'
                                className={`w-3 mx-1 ${categoryStates[category] ? 'rotate-180' : ''} hover:cursor-pointer`}
                                />
                            </span>
                             
                            <div className={`overflow-auto duration-200 bg-gray-50  ${!categoryStates[category] ? 'min-h-[150px]' : 'h-0'}`} >
                                <GoalDisplayComponent 
                                goals={initData} 
                                date={date} 
                                category={category.toLowerCase()}
                                setIfDataChanged={setIfDataChanged}
                                color={color}/>
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
