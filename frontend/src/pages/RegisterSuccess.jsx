import React from 'react'
import { Link } from 'react-router-dom'
import FontLinks from '../components/FontLinks'

const RegisterSuccess = () => {
  return (
    <>
      <FontLinks/>

      <main className="register-wrap">
        <section className="register-card" role="status" aria-live="polite">

          <svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true" style={{display: "block", margin: "0 auto 14px"}}>
            <circle cx="24" cy="24" r="24" fill="#22a752"/>
            <path d="M13 25l8 8 14-16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <div className="card-brand">
            <img src="veggiefy-logo.png" alt="Veggiefy logo"/>
            <span className="wordmark">Veggiefy</span>
          </div>

          <h1 className="card-title">Registration Successful</h1>
          <p className="card-sub">Thank you for registering! Your account is ready. You can now log in and place your advance orders.</p>

          <Link to="/Login"><button type="button" className="btn-primary">Log In</button></Link>
      </section>
    </main>
  </>
  )
}

export default RegisterSuccess