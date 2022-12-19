import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Note = () => {

  const {id} = useParams();
  const [note, setNote] = useState();

  const fetchNotes = async ()=>{
    const response = await axios.get(`http://localhost:3000/${id}`).catch((err)=>console.log(err))
    const data = await response.data;
    return data;
  }

  useEffect(() => {
    fetchNotes().then((data)=>{setNote(data)})
  }, [])

  return (
    <div className='container text-white'>
        <h1 className='my-4'>{note?.title}</h1>
        <p className='my-4'>{note?.description}</p>
    </div>
  )
}

export default Note