import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {

  const {id} = useParams();
  const [disabled, setDisabled] = useState(false)
  const [titleInput, setTitleInput] = useState("")
  const [descInput, setDescInput] = useState("")
  const [note, setNote] = useState()

  const fetchNotes = async ()=>{
    const response = await axios.get(`http://localhost:3000/${id}`).catch((err)=>console.log(err))
    const data = await response.data;
    return data;
  }

  useEffect(() => {
    fetchNotes().then((data)=>{setNote(data)})
  }, [])

  useEffect(() => {
    if (titleInput === "" || descInput === ""){
      setDisabled(true)
    }
    else if (titleInput !== "" && descInput !== ""){
      setDisabled(false)
    }
  }, [titleInput, descInput])

  const sendRequest = async ()=>{
    const response = await axios.patch(`http://localhost:3000/${id}`, {
      title: titleInput,
      description: descInput
    }).catch((err)=> console.log(err))

    const data = response.data;
    return data;
  }

  const formSubmit = (e)=>{
    e.preventDefault()
    sendRequest()

    toast.success('Note Updated!!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <form onSubmit={formSubmit} className='container my-5'>
      <h1 className='text-white' style={{textDecoration: "underline"}}>Editing: {note?.title}</h1>
      <div className="my-5">
      <div className="mb-3">
          <label className='text-white mb-2' htmlFor="title">Title</label>
          <input value={titleInput} onChange={(e)=>{setTitleInput(e.target.value)}} type="text" className="form-control" id="title"/>
      </div>
      <div className="mb-3">
          <label className='text-white mb-2' htmlFor="description">Description</label>
          <textarea value={descInput} onChange={(e)=>{setDescInput(e.target.value)}} rows="5" className="form-control mb-3" id="description"></textarea>
      </div>
      <button disabled={disabled} type='submit' className="btn btn-outline-light">Submit</button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </div>
    </form>
  )
}

export default Edit