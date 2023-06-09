import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const inputRef = useRef();

  const goToSearch = (e) =>  {
    e.preventDefault();
    location.href = `/search?query=${inputRef.current.value}`
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Notes App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
          </ul>
          <form onSubmit={goToSearch} className="d-flex" role="search">
            <input ref={inputRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button type='submit' className="btn btn-outline-light">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar