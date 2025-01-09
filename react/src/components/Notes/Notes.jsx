import React, {useState, useEffect, useRef} from 'react'
import { axiosGetDataWithPayload, axiosDeleteData, axiosPostData, axiosPutData } from '../Api/Api'
import { formatDate  } from '../Api/Helpers' 
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Notes = () => {
  const [notes, setNotes] = useState([])
  const titleRef = useRef() 
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isEditing, setIsEditing] = useState(null);
  const fetchInitialData = async() => {
    const data = await axiosGetDataWithPayload('notes', ) 
    setNotes(data.message)
  }
  const addNote = async(e) => {
    const contentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
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
  const handleEdit = (note) => {
    setIsEditing(note.id); 
    titleRef.current.value = note.title; 
      if (note.note && note.note !== "undefined") {
      const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(note.note)));
      setEditorState(contentState); 
    } else {
      setEditorState(EditorState.createEmpty());
    }
  };
  const saveEdit = async (id) => {
    const contentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const updatedNote = {
      id,
      title: titleRef.current.value,
      content: contentRaw,
    };
    await axiosPutData(`notes/${id}`, updatedNote);
    fetchInitialData();
    cancelEdit();
  }; 
  const cancelEdit = () => {
    setIsEditing(null); 
    setEditorState(EditorState.createEmpty());
    titleRef.current.value = '';
  };
  
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
    <div className='main-container flex flex-col items-center'>
      <div className='w-full sm:w-[60%] mt-10'>
        <div className=''>
          <p className='text-sm ml-5 text-gray-400'>Note title</p>
          <input 
          className='mx-5 flex-grow border-2 rounded-md  border-orange-100' 
          ref={titleRef}></input>
          <p className='text-sm ml-5 text-gray-400'>Note content</p>
          <div className="mx-5 min-h-[100px]  bg-white rounded-md flex-grow border-2 border-orange-100 p-2 ">
            <Editor editorState={editorState} onChange={handleEditorChange} />
          </div>
        </div>
        {isEditing ? (
          <div className='flex mx-5 justify-end'>
            <button className="ss-btn m-2 w-auto" onClick={() => saveEdit(isEditing)}>
              Save
            </button>
            <button className="ss-btn m-2 w-auto" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <div className='flex mx-5 justify-end'>
            <button className="m-2 ss-btn w-auto" onClick={addNote}>
              Add
            </button>
          </div>
          
        )}
      </div>

      <span className='font-bold text-lg flex justify-center'>Notes</span>
      <div className='grid grid-cols-1 w-full sm:w-[60%] '>
        {notes && 
          notes.map((note)=>(
          <div key={note.id} className='bgorange rounded-md p-2 m-1'> 
            <div className='flex flex-row justify-between'>
              <div className='text-xs'> 
                {/* {notes.status == 'undone' ? <div>0</div> : <div>1</div>} */}
              </div>
              <div className='bg-main ml-2 font-bold text-gray-100'>
                  {note.title}
              </div> 
              <div className='space-x-2'>
                <button
                      className="ss-btn text-xs"
                      onClick={() => handleEdit(note)}
                    >
                      Edit
                    </button>
                  <button className='ss-btn text-xs'
                  onClick={()=>deleteNote(note.id)}>
                    X
                  </button>
            </div>
          </div> 
          <div className='bg-gray-100 rounded-md p-2 mt-2'>
            {JSON.parse(note.note).blocks.map((block, index) => (
                    <div key={index}>{block.text}</div> 
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
