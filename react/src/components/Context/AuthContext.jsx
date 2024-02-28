import React, { createContext, useContext, useState } from 'react'
import { axiosPostData } from '../Api/Api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token'))

    const login = async(address, payload) => {
        try{
            const response = await axiosPostData(address, payload)
            const token = response.data.token
            // console.log(response.data.user)
            setToken(token)
            if (token) {
                setToken(token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', response.data.user.name);
                setIsAuth(true);
            }else{
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsAuth(false);
            }
        }catch (e) {
            console.error(e);
        }
    }
    
      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        // localStorage.removeItem('ACCESS_TOKEN');
        setToken(null)
        setIsAuth(false)
      };

    return (
        <AuthContext.Provider value={{token, login, logout, isAuth}}>
            {children}
        </AuthContext.Provider>
    )
}



