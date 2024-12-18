import React from 'react'
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { axiosPostData } from '../Api/Api';
import { formatDate  } from '../Api/Helpers';



const AiGoals = ({data, getAiHelpers, aiDataLoadReady}) => {
    const [text, setText] = useState()
    const [componentloading, setComponentLoading] = useState(false)

    const message = `Here is data for user goals in a time period with goals categories. 
        Data: ${JSON.stringify(data)}.
        Analyze it and suggest complementing goals for the nearest future.
        avoid broad and vague suggestions
        sugest only goals that achivable in a day or in an hour, not something that takes weeks
        if category does not contain any goal - suggest something based on that category
        return result strictly in this structure - 
        category: suggested goal
        be very  consize and only send back suggested goals - nothing else
        result must be in a JSON format
        `
        
        async function run(message) {
            if (aiDataLoadReady === true) {
                setComponentLoading(!componentloading)
                const API_KEY = import.meta.env.VITE_API_AI_KEY;
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-pro"});
                const prompt = message
                const result = await model.generateContent(prompt);
                const response = result.response;
                const text = response.text();
                setComponentLoading(false)
                setText(text)
                const parseData = JSON.parse(text)  
                getAiHelpers(parseData)   
            } else {
                console.log(aiDataLoadReady, 'Data already exists: ', text)
            }
            
        }
    
    useEffect(() => {
        aiDataLoadReady && run(message)
    }, [aiDataLoadReady]);


    return (
    <div className='flex flex-col'> 
            <div>
                <button className='bg-blue-500 rounded-full m-1 p-1 w-[30px] h-[30px] text-white text-xs hover:text-orange-500 hover:bg-gray-500 transition ease-in delay'
                onClick={(e) => run(message)}>
                    AI
                </button>
                {
                    aiDataLoadReady === false && 
                    <span className='opacity-30 position-fixed bg-blue-500 rounded-full p-1 px-5 w-[30px] h-[30px] text-white text-xs'>
                           Ai data loaded
                    </span>
                }  
            </div>
            
        </div>
    )
}



export default AiGoals
