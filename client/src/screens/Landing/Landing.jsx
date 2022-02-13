import React from 'react'
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <div className="landing-page">
      <div className="img-placeholder">
      </div>
      <h1 className="logo-placeholder">Bootcamper</h1>
      <Link to="/sign-up">
        <button>Sign Up</button>
      </Link>
      <Link to="/sign-in">
        <button>Log In</button>
      </Link>
      <h6>Help | Contact</h6>
    </div>
  )
}
