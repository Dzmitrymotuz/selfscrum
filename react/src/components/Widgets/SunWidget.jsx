import React, {useEffect, useState} from 'react'

const SunWidget = () => {
    const [time, setTime] = useState(new Date())
    const [position, setPosition] = useState(time.getHours() * 100 / 24)
    const [check, setCheck] = useState(false)

    // [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100]
 

    useEffect(()=>{ 
        // const intervalId = setInterval(()=>{
        //     setPosition(prevState=>{
        //     if (prevState >= 100) {
        //         sl([0])
        //         return 0
        //     }else{                
        //         return prevState+=4
        //     }})
        // }, 10000)
        // return ()=>clearInterval(intervalId)  
        setPosition(time.getHours() * 100 / 24)
        const interval = setInterval(()=>{
            setCheck(!check)
        }, 1000 * 60);
        
        return ()=>
        {   
        clearInterval(interval);
        }
    }, [check])

  return (
    <div className='relative w-[100%] h-[ bg-blue-100'>
        <div className='flex flex-col'>
        {`${time.getHours()} : ${time.getMinutes()}`}
            <div>{position}</div> 
        </div>
        <div 
        className={`absolute w-5 h-5 bg-yellow-400 rounded-full`}
        style={{left: `${position}%`}}
        />  
    </div>
  )
}

export default SunWidget
