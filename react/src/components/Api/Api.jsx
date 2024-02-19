import React from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;

export async function fetch_initial_data () {
    try {
        const response = await fetch(`${apiUrl}/init`);
        const data = await response.json();
        
        return data;
    }catch (e) {
        console.error(e);
    }
}
export const axiosGetInitData = async(date) => {
    try {
        const response = await axios.get(`${apiUrl}/init`, 
        { params: {date}})
        return response.data
    }catch (e) {
        console.error(e);
    }
}

//Abstract fetchData, used with addition of string adress as a prop
export async function fetchData(endpoint) {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`);
        const data = await response.json();
        return data
    }catch (e) {
        console.error(e);
    }
}
export const axiosGetDataWithPayload = async(endpoint, payload) => {
    try {
        const response = await axios.get(`${apiUrl}/${endpoint}`, {params: payload})
        const data = response.data
        return data
    }catch (e) {
        console.error(e)
    }
}
//Abstract postData, used with addition of string adress as a prop
export const axiosPostData = async(endpoint, data) => {
    try {
        const response = await axios.post(`${apiUrl}/${endpoint}`, data)
        // console.log(response.data.message)
        // console.log(new Date().toLocaleDateString())
    }catch (e) {
        console.error(e);
    }
}

export const axiosDeleteData = async(endpoint, data) => {
    try {
        const response = await axios.delete(`${apiUrl}/${endpoint}/${data.id}`)
        // console.log(response.data)
    }catch (e) {
        console.error(e);
    }
}


const Api = () => {
    return null
}

export default Api
