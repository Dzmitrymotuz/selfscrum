import React, {useState, useEffect, useRef} from 'react'
import { axiosGetDataWithPayload, axiosDeleteData, axiosPostData, axiosPutData } from '../Api/Api'
import { formatDate  } from '../Api/Helpers' 
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Notes = () => {
  const [notes, setNotes] = useState([])
  const titleRef = useRef()
  // const contentRef = useRef()

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isEdited, setIsEdited] = useState(true) 
  const handleEdit = async(id) => {
      setIsEdited(!isEdited)
      if (editorState.getCurrentContent().hasText()) {
          const contentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
          const data = {
              'id': id,
              'content': contentRaw,
            }
            await axiosPutData(`${category}/edit-goal`, data)
      } else {
          handleDelete(id)
      }
    }


  const fetchInitialData = async() => {
    const data = await axiosGetDataWithPayload('notes', ) 
    setNotes(data.message)
  }
  const addNote = async(e) => {
    const contentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    // console.log(contentRaw)
    const data = {
      'title': titleRef.current.value,
      'content': contentRaw,
      'date': formatDate(new Date()),
    }
    await axiosPostData('notes', data);
    fetchInitialData();
    setEditorState(EditorState.createEmpty());   
    titleRef.current.value = ''
  }
  const deleteNote = async(id) => {
    axiosDeleteData(`notes`, {id});
    setNotes((prevNotes)=>prevNotes.filter(note=>note.id!==id));
  }
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  }
  useEffect(()=>{
    fetchInitialData()
  },[])


  return (
    <div className='main-container'>
      <div className='flex-wrap border-2'>
        <div className=''>
          <p className='text-sm ml-5 text-gray-400'>Note title</p>
          <input 
          className='mx-5  min-w-[200px] w-[90%]  flex-grow border-2 border-orange-100' 
          ref={titleRef}></input>
          <p className='text-sm ml-5 text-gray-400'>Note content</p>
          <div className="mx-5 min-h-[150px] w-[90%] bg-white  flex-grow border-2 border-orange-100 p-2 ">
            <Editor editorState={editorState} onChange={handleEditorChange} />
          </div>
        </div>
        
        <button className='ss-btn m-2 w-auto'
          onClick={(e)=>addNote(e)}>
          Add
        </button>
      </div>

      <span className='font-bold text-lg flex justify-center'>Notes</span>
      <div className='grid grid-cols-1'>
        {notes && 
          notes.map((note)=>(
          <div key={note.id} className='bggreen rounded-md p-2 m-1'> 
            <div className='flex flex-row justify-between'>
              <div className='text-xs'>
                {note.id}
                {/* {notes.status == 'undone' ? <div>0</div> : <div>1</div>} */}
              </div>
              <div className='bg-main ml-2 font-bold'>
                  {note.title}
              </div> 
              <div>
                <button className='ss-btn text-xs'
                onClick={()=>deleteNote(note.id)}>
                  X
                </button>
            </div>
          </div> 
          <div className='cell mt-2'>
            {JSON.parse(note.note).blocks.map((block, index) => (
                    <div key={index}>{block.text}</div> // Each block as a new div
                  ))}          
          </div>
          <div className='text-xs text-right m-1 opacity-30'>
            {note.date}
          </div>
          </div>
            )
          ) 
        }
      </div>
      
    </div>
  )
}

export default Notes
