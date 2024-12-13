import React from 'react'
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { axiosPostData } from '../Api/Api';
import { formatDate  } from '../Api/Helpers';


const DayWord = () => {
    const [text, setText] = useState('Word of the day will appear here')
    const [loading, setLoading] = useState(false)
    const message = 'Give me a random advanced English word and its Russian equivalent. The answer structure is strictly this (without words word or translation): word: translation: . Do not use any bold or curve text - just use plain string'

    const refurbish = (data) => {
            data = data.split('|').map(str=>str.trim()).filter(str=>str)
            let result = {
                word: '',
                meaning: '',
                translation: '',
            };
            console.log(data)

            for (let i=0;i<data.length;i++) {
                if (data[i].startsWith('word:')){ 
                    result.word = data[i+1];
                }
                if (data[i].startsWith('meaning:')){
                    result.meaning = data[i+1];
                }
                if (data[i].startsWith('translation:')){
                    result.translation = data[i+1];
                }
            }
            // console.log(result)
            return result;
        }

    async function run(message) {
        setLoading(!loading)
        const API_KEY = import.meta.env.VITE_API_AI_KEY;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = message
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        setLoading(false)
        console.log(text)
        axiosPostData('wordoftheday', {
            'text': text,
            'date': formatDate(new Date())
        })
        return setText(text)
    }
    

    useEffect(()=>{
        // run(message)
    }, [])

  return (
    <div className='flex-grow text-sm w-auto hover:cursor-pointer hover:bg-opacity-80 bg-orange-500 text-white rounded-md p-1 m-1' onClick={()=>run(message)}>
        {text}
    </div>
  )
}

export default DayWord
