import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Form from '../components/Form'
import Notes from '../components/Notes';
import Note from '../components/Note';
import Edit from '../components/Edit';
import Search from '../components/Search';
import NotFound from './notfound';

const App = () => {
  return (
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Notes/>}/>
        <Route path='/create' element={<Form/>}/>
        <Route path='/notes/:id' element={<Note/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
  )
}

export default App