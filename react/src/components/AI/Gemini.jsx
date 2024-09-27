import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dashboard_message = (a,b) => { 
    return `Here is a mood of a person for a time priod, in percent. 
    Analyze it briefly and give some summary. 
    Use no more 10 sentences in respond. 
    Adress person as 'You'.
    Give some advices on how to improve person's mood only if their mood is bad most of the time.
    If person's mood is mostly high - cheer them rather than support!
    Try to focus on more positive sides.
    Do not use symbol *!
    Data: ${JSON.stringify(a)}
    Add some analyzis on the amount of done/undone goals here (show some numbers, always show total of done vs total of undone) ${JSON.stringify(b)}
    Give 1-2 advices on how to be more productive as well`
}
export const wheeloflife_message = (a) => { 
    return `Here is some data of a user who did the Wheel of Life excersise.
    Analyze it and give feed back.
    Data: ${JSON.stringify(a)}.
    Adress user as 'you' in your respond.
    Never use a symbol * or bold text.
    Address each field separately.
    If low - give advice on improvement. 
    `
}


const Gemini = ({message}) => {
    const [text, setText] = useState('Click "Summary" to get your awesome stats!')
    const [loading, setLoading] = useState(false)

     async function run(message) {
        setLoading(!loading)
        const API_KEY = import.meta.env.VITE_API_AI_KEY;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = message
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setLoading(false)
        // console.log(prompt)
        return setText(text)
      }


  return (
    <div className='flex flex-col'>
            <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
            {!loading ? 
                <button 
                    onClick={(e) => run(message)}
                    className='ss-btn mt-5'
                >
                    Summary
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

export default Gemini
