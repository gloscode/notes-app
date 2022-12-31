import React from 'react'

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-white">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead">
                The page you're looking for doesn't exist.
            </p>
            <a href="/" className="btn btn-outline-light">Go Home</a>
        </div>
    </div>
  )
}

export default NotFound