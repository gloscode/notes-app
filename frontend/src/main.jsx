import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from '../components/Navbar'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)