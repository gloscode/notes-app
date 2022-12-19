import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Form from '../components/Form'
import Notes from '../components/Notes';
import Note from '../components/Note';
import Edit from '../components/Edit';
import Search from '../components/Search';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/:id' element={<Note/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
  )
}

export default App