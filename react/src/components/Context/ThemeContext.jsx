import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ColorScheme = () => useContext(ThemeContext)

export const ThemeProvider = ({children}) => {
    const [useDarkMode, setUseDarkMode] = useState(true)

    const changeSheme = () => {
        setUseDarkMode(!useDarkMode)
    }
}


export default ThemeContext
