import React, { useEffect, useState } from 'react';
import GoalDisplayComponent from './GoalDisplayComponent';
import { axiosPostData, axiosGetInitData } from '../Api/Api';

const CategorySet = ({ categories, date, data, setIfDataChanged, position, aiData }) => {
  const [categoryStates, setCategoryStates] = useState({});
  const [initData, setInitData] = useState([]);
  const [toggled, setToggled] = useState(true);
  const [color, setColor] = useState('');
  const [aiGoals, setAiGoals] = useState({});

  

  const toggleCategory = (category) => {
    setCategoryStates((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const applyColor = (position) => {
    switch (position) {
      case 'yesterday':
        setColor('#8A37D2');
        break;
      case 'today':
        setColor('#FF871F');
        break;
      case 'tomorrow':
        setColor('#32989A');
        break;
      default:
        setColor('#FFDDA1');
        break;
    }
  };

  const fetchInitialData = async() => {
        const data = await axiosGetInitData(date)
        setInitData(data)
  };
  
  const addAiGoal = async (goal, category) => {
    const aiGoaldata = {
      category: category,
      goal: goal,
      status: 0,
      date: date,
    };
    const response = await axiosPostData(`${category}/add-goal`, aiGoaldata);
    if (response.status === 200) {
    const updatedAiGoals = { ...aiGoals, [category]: null };
    setAiGoals(updatedAiGoals);
    fetchInitialData(category)
    deleteAiGoal(category)
  } else {
    console.log('response: ', response)
  }
  
}
  
  const deleteAiGoal = (categoryName) => {
    const category = categoryName.toLowerCase()
    const updatedAiGoals = { ...aiGoals, [category]: null };
    setAiGoals(updatedAiGoals);
  }

  useEffect(() => {
    setInitData(data);
    setAiGoals(aiData || {}); 
    applyColor(position);
  }, [data, aiData]);

  return (
    <div
      className="border-b-8 mb-4 overflow-hidden sm:overflow-auto"
      style={{ borderColor: color }}
    >
      <div onClick={() => setToggled(!toggled)} className="flex justify-between cursor-pointer">
        <button className="text-xs ml-1">
          <span className="font-semibold">{position[0].toUpperCase() + position.slice(1)}: </span>
          {date}
        </button>
        <img
          src="/up-black.svg"
          className={`w-3 mx-0 ${toggled ? '' : 'rotate-180'}`}
        />
      </div>
      <div className={toggled ? `w-auto mx-1` : 'hidden'}>
        <p className="text-xs opacity-40 hover:opacity-100 duration-300"></p>
        <div className="categories_container">
          {categories.map((category, index) => (
            <div
              key={category}
              className="sm:w-[200px] md:w-[300px] lg:w-[330px] xl:w-[380px] flex flex-col border mb-1 rounded-b-sm rounded-t-sm "
            >
              <span
                className={`goal-category text-sm flex flex-row justify-between`}
                style={{ backgroundColor: color, borderColor: color }}
                onClick={() => toggleCategory(category)}
              >
                {category}
                <img
                  src="/up-white.svg"
                  className={`w-3 mx-1 ${categoryStates[category] ? 'rotate-180' : ''} hover:cursor-pointer`}
                />
              </span>
              <div>
{/* Ai Data Starts */}
                {aiGoals[category.toLowerCase()] && (
                  <div>
                    <div
                      className={`flex justify-between w-full text-white px-2 hover:cursor-pointer hover:bg-blue-900 transition ease-in-out delay-150 rounded-md my-0.5 
                        ${ aiGoals[category.toLowerCase()].added ? "bg-blue-500" : "bg-orange-500" }
                        hover:bg-orange-500`}                      
                    >
                      <div                       
                        onClick={() => addAiGoal(aiGoals[category.toLowerCase()], category.toLowerCase())}
                      >
                        <span className=" mr-2 text-xs p-0.5 rounded-full bg-white text-orange-500">AI</span>
                        <span className={`hover:cursor-pointer`}>
                          {aiGoals[category.toLowerCase()]}
                        </span>  
                      </div> 
                      <div>
                        <span 
                        className='bg-red-500 px-1 pb-1 rounded items-center w-5 hover:bg-gray-500 z-50'
                        onClick={()=>deleteAiGoal(category)}>
                          x
                          </span>
                      </div> 
                    </div>
                  </div>
                )} 
{/* Ai Data Ends */}
              </div>
              <div className={`overflow-auto duration-200 bg-gray-50 ${!categoryStates[category] ? 'min-h-[100px]' : 'h-0'}`}>
                <GoalDisplayComponent
                  goals={initData}
                  date={date}
                  category={category.toLowerCase()}
                  setIfDataChanged={setIfDataChanged}
                  color={color}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySet;
