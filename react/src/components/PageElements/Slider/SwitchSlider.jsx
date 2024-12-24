import React from 'react'
import styles from "./SwitchSlider.module.css"

export const SwitchSlider = ({isOn, onToggle}) => { 
    return ( 
        <div >
            <input 
            className={styles.slider_input} 
            type="checkbox" 
            id="ai-toggle"
            isOn={isOn}
            onChange={(e)=>onToggle(e.target.checked)}
            />
            <label 
            className={styles.slider_background} 
            htmlFor="ai-toggle"/> 
        </div>
    )
}
export default SwitchSlider