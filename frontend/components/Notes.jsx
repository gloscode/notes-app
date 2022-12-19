import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notes = () => {

  
  const [notes, setNotes] = useState();

  const fetchNotes = async ()=>{
    const response = await axios.get('http://localhost:3000').catch((err)=>console.log(err))
    const data = await response.data;

    data.map((item)=>{
      localStorage.setItem(`${item.title}`, `${item._id}`)
    })

    return data;
  }

  useEffect(() => {
    fetchNotes().then((data)=>{setNotes(data)})
  }, [])
  

  const deleteNote = async (data)=>{
    const id = data._id;

    const response = await axios.delete(`http://localhost:3000/${id}`).catch((err)=>console.log(err))
    const fetchedData = await response.data;
    localStorage.removeItem(`${data.title}`)
    window.location.reload();
    
    return fetchedData;
  }

  return (
    <div className='container my-5'>
        <h1 className='text-white mb-5' style={{textDecoration: "underline"}}>{!(notes?.length === 0)?"All Notes":"Notes Not Found!!!"}</h1>
        <div className='d-flex gap-4 flex-wrap'>
          {notes && notes.map((data)=>{
              return (
                <div key={data._id} className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <Link to={`/${data._id}`} className='link-dark'><h5 className="card-title">{data.title}</h5></Link>
                    <p className="card-text">{data.description}</p>
                    <div className="button d-flex gap-2">
                    <Link to={`/edit/${data._id}`} className="btn btn-outline-dark">Edit</Link>
                    <button onClick={()=> deleteNote(data)} className="btn btn-outline-danger">Delete</button>
                    </div> 
                </div>
                </div>
              )
          })}
        </div>
    </div>
  )
}

export default Notes