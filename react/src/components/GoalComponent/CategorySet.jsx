import React, { useEffect, useState } from 'react';
import GoalDisplayComponent from './GoalDisplayComponent';
import { axiosPostData } from '../Api/Api';

const CategorySet = ({ categories, date, data, setIfDataChanged, position }) => {
  const [categoryStates, setCategoryStates] = useState({});
  const [initData, setInitData] = useState([]);
  const [toggled, setToggled] = useState(true);
  const [color, setColor] = useState('');
  const [aiGoals, setAiGoals] = useState({});
  const [approvedGoals, setApprovedGoals] = useState({});
  

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

  const addAiGoal = async (goal, category) => {
    const aiGoaldata = {
      category: category,
      goal: goal,
      status: 0,
      date: date,
    };
    // const response = await axiosPostData(`${category}/add-goal`, aiGoaldata); 
    
    const updatedAiGoals = { ...aiGoals, [category]: null };
    setAiGoals(updatedAiGoals);
    const approved = {...approvedGoals, 
        
        goal: goal,
        category: category
        }
    setApprovedGoals(approved)
    console.log(approvedGoals)
  };
  const deleteAiGoal = () => {
    const updatedAiGoals = { ...aiGoals, [category]: null };
    setAiGoals(updatedAiGoals);
  }

  useEffect(() => {
    setInitData(data);
    setAiGoals(data.aidata || {}); 
    applyColor(position);
  }, [data]);

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
                      className={`flex justify-between w-full text-white px-2 hover:cursor-pointer rounded-md my-0.5 
                        ${ aiGoals[category.toLowerCase()].added ? "bg-orange-500" : "bg-green-500" }
                        hover:bg-orange-500`}                      
                      onClick={() => addAiGoal(aiGoals[category.toLowerCase()], category.toLowerCase())}
                    >
                      <div>
                        <span className="goal-active mr-2">○</span>
                        <span className={`hover:cursor-pointer`}>
                          {aiGoals[category.toLowerCase()]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
{/* Ai Data Ends */}
              </div>
              <div className={`overflow-auto duration-200 bg-gray-50 ${!categoryStates[category] ? 'min-h-[150px]' : 'h-0'}`}>
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
