import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config 
    },
    function (error) {
        return Promise.reject(error);
      }
)

// const instance = axios.create({
//     baseURL: apiUrl,
//     timeout:1000,
//     headers: {'X-Custom-Header': 'foobar'}
// })
// export const fetchcsrfToken = async() => {
//     try {
//         await axios.get(`http://127.0.0.1:8000/sanctum/csrf-cookie`)
//         const csrfCookie = Cookies.get('XSRF-TOKEN')
//         console.log(document.cookie);
//         console.log(csrfCookie)
//         if (csrfCookie) {
//             Cookies.set('XSRF-TOKEN', csrfCookie, { secure: true, sameSite: 'Lax'})
//             console.log('cookies set')
//         }
//     }catch(e){
//         console.error('Cookie error ', e)
//     }
// }
// fetchcsrfToken()

// axios.defaults.withCredentials = true

// axios.interceptors.request.use(function (config) {
//     // console.log('Request sent: ', config)
//     const token = Cookies.get('XSRF-TOKEN')
//     const laravel_token = Cookies.get('laravel_session')
//     // console.log(`Session:${laravel_token}, Token: ${token}`)
//     if (token) {
//         config.headers['X-XSRF-TOKEN'] = token
//         console.log('token added')
//     }
//     return config;
// }, function (error){
//     return Promise.reject(error)
// })


//Helpers



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
        return response
        // console.log(response.data)
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
