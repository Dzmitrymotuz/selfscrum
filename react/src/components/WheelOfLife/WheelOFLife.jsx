import React, { useState } from 'react'
import { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


 
const WheelOFLife = () => {
    const fields = [
        'Finances',
        'Career',
        'Health',
        'Recreation',
        'Home/Work',
        'Friends',
        'Family',
        'Learning',
        'Spirituality',
    ]

    const [formData, setFormData] = useState({})

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    const handleInputChange = (e, field) => {
        e.preventDefault() 
        setFormData({...formData, field: field, value: e.target.value})
        console.log(formData)
    }


  return (
    <div className='main-container'>
        <form onSubmit={(e)=>handleFormSubmit(e)}>
            <div className='w-auto h-auto pt-10'>
                {fields.map((field, index)=>(
                    <div 
                        key={index}
                        name={field}
                        className='bgpurple flex m-1 p-1'
                        >
                            {field}
                            <div className='mx-5 center'>
                                <input className='h-6 required'
                                onChange={(e)=>handleInputChange(e, field)}/>
                            </div>
                    </div>
                ))}
                <div>
                    <button 
                    className='ss-btn' 
                    type='submit' 
                    >
                        Get results 
                    </button>
                </div>
            </div>
        </form>
        <div className='flex-grow cell flex-col w-[300px] h-[300px] sm:w-[450px]'>
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="field" />
            <PolarRadiusAxis />
            <Radar name="wheel" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
        {/* <ResponsiveContainer >
            <RadarChart cx="50%" cy="50%" outerRadius="50%" data={formData} >
            <PolarGrid />
            <PolarAngleAxis dataKey="status" />
            <Radar name="mood" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
            </RadarChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  )
}

export default WheelOFLife
