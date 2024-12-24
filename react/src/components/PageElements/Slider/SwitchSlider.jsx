import React from 'react'
import styles from "./SwitchSlider.module.css"

export const SwitchSlider = ({ onToggle}) => { 
    return ( 
        <div className='h-[100px] w-[300px] relative'>
            <input 
            className={styles.slider_input} 
            type="checkbox" 
            id="ai-toggle"
            onChange={(e)=>onToggle(e.target.checked)}
            />
            <label 
            className={styles.slider_background} 
            htmlFor="ai-toggle"/> 
        </div>
    )
}
export default SwitchSlider