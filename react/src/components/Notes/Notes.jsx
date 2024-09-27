import React, {useState, useEffect} from 'react'
import { axiosGetDataWithPayload, axiosDeleteData, axiosPostData, axiosPutData } from '../Api/Api'

const Notes = () => {
  const [notes, setNotes] = useState([])


  const fetchInitialData = async() => {
    const data = await axiosGetDataWithPayload('get-notes', )
    console.log(data)
    setNotes(data)
  }

  useEffect(()=>{
    fetchInitialData()
  },[])


  return (
    <div className='main-container'>
      <span className='font-bold text-lg flex justify-center'>Notes</span>
      <div className='w-[300px] h-[400px] bggreen bordergreen rounded-md'>
        {notes && JSON.stringify(notes.message)}
      </div>
    </div>
  )
}

export default Notes
