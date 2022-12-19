import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

  const [titleInput, setTitleInput] = useState("")
  const [descInput, setDescInput] = useState("")
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (titleInput === "" || descInput === ""){
      setDisabled(true)
    }
    else if (titleInput !== "" && descInput !== ""){
      setDisabled(false)
    }
  }, [titleInput, descInput])
  


  const sendRequest = async ()=>{
    const response = await axios.post("http://localhost:3000", {
      title: titleInput,
      description: descInput
    }).catch((err)=> console.log(err))

    const data = response.data;
    return data;
  }

  const formSubmit = (e)=>{
    e.preventDefault()
    sendRequest()

    toast.success('Note Added!!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTitleInput("")
    setDescInput("")
  }

  return (
    <form onSubmit={formSubmit} className='container my-5'>
      <h1 className='text-white' style={{textDecoration: "underline"}}>Notes App</h1>
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

export default Form