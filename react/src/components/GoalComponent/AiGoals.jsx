import React from 'react'
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { axiosPostData } from '../Api/Api';
import { formatDate  } from '../Api/Helpers';



const AiGoals = ({data, getAiHelpers, setIfDataChanged, aiDataLoadReady}) => {
    const [text, setText] = useState('Suggestions will appear here')
    const [componentloading, setComponentLoading] = useState(false)

    const message = `Here is data for user goals in a time period with goals categories. 
        Data: ${JSON.stringify(data)}.
        Analyze it and suggest complementing goals for the nearest future.
        avoid broad and vague suggestions
        return result strictly in this structure - 
        category: suggested goal
        be very  consize and only send back suggested goals - nothing else
        result must be in a JSON format
        `
        
        async function run(message) {
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
            setIfDataChanged=(prevState=>!prevState)
        }
        // console.log(aiDataLoadReady)
    
    useEffect(() => {
        aiDataLoadReady && run(message)
    }, [aiDataLoadReady]);


    return (
    <div className='flex flex-col'>
            <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
            {!componentloading ? 
                <button 
                    onClick={(e) => run(message)}
                    className='ss-btn mt-5'
                >
                    click
                </button>
                :
                <button 
                    className='ss-btn mt-5 animate-bounce '
                >
                    Recieving your results!
                </button>
            }
        </div>
    )
}



export default AiGoals
