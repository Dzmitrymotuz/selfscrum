import React, { useState } from 'react'
import { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


 
const WheelOFLife = () => {
    const fields = [
        'Finances',
        'Career',
        'Health',
        'Recreation',
        'Environment',
        'Friends',
        'Family',
        'Learning',
        'Spirituality',
    ]

    const [formData, setFormData] = useState({})

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const radarData = Object.entries(selectedValue).map(([field, value])=>({field, value}))
        setFormData(radarData)
    }

    const [selectedValue, setSelectedValue] = useState({});

    const handleRadioChange = (e, field) => {
        const integer = parseInt(e.target.value)
        setSelectedValue({...selectedValue, [field]: integer});
      };


  return (
    <div className='main-container'>
        <div className='flex justify-center items-center'>
            <span className='items-center text-xl border-b-2 border-[#e3e3e3] mb-2 pt-5 font-bold'>The Wheel of Life</span>
        </div>
        <div className='p-5 bggreen rounded mx-2 '>
            <span className='text-sm'>
            <span className=''>The Wheel of Life is a popular self-assessment tool used in coaching, counseling, and personal development to help individuals evaluate and balance different areas of their lives. It's often represented as a circular chart divided into sections, each representing a different aspect or dimension of life.
            The Wheel of Life typically includes various life domains such as:</span>
            <br/><span className='text-[#e04419] font-bold'>Finances:</span> Evaluates financial stability, budgeting, and satisfaction with income.
            <br/><span className='text-[#e04419] font-bold'>Career:</span> Assesses job satisfaction, growth opportunities, and work-life balance.
            <br/><span className='text-[#e04419] font-bold'>Health:</span> Focuses on physical well-being, fitness, and lifestyle habits.
            <br/><span className='text-[#e04419] font-bold'>Recreation:</span> Considers leisure activities and hobbies for relaxation and enjoyment.
            <br/><span className='text-[#e04419] font-bold'>Environment:</span> Examines living surroundings and community support.
            <br/><span className='text-[#e04419] font-bold'>Friends:</span> Reviews quality of social connections and support networks.
            <br/><span className='text-[#e04419] font-bold'>Family:</span> Evaluates relationships and harmony within the family unit.
            <br/><span className='text-[#e04419] font-bold'>Learning:</span> Focuses on personal and professional development through education and growth opportunities.
            <br/><span className='text-[#e04419] font-bold'>Spirituality:</span> Reflects on beliefs, values, and inner fulfillment derived from spiritual practices.
            </span>
        </div>
        <form onSubmit={(e)=>handleFormSubmit(e)}>
            <div className='pt-5 flex-col justify-center'>
                {fields.map((field, index)=>(
                    <div 
                        key={index}
                        name={field}
                        className='bgorange rounded-md text-white my-1 mx-2 p-1 min-w-[220px] '
                        >
                            <span className='mx-0 '>{field}</span>
                            <div className='bggreen'>
                                {[...Array(10)].map((_, index)=>(
                                    <label key={index}>
                                    <input
                                    className='mx-1'
                                        type='radio'
                                        name={field}
                                        value={index}
                                        checked={selectedValue[field] === index}
                                        onChange={(e)=>handleRadioChange(e, field)}
                                    />
                                    </label>
                                ))}
                            </div>
                    </div>
                ))}
                <div className='flex justify-center'>
                    <button 
                    className='ss-btn w-full mx-2' 
                    type='submit' 
                    >
                        Get results 
                    </button>
                </div>
            </div>
        </form>
        <div className='flex justify-center m-5'>
            <div className=' w-[300px] h-[300px] sm:w-[450px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="field"  />
                    <PolarRadiusAxis domain={[0, 10]} display="none"/>
                    <Radar name="wheel" dataKey="value" stroke="#e04419" fill="#e04419" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default WheelOFLife
