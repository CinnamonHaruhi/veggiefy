import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [ form, setForm ] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      //const res = await axios.post("http://localhost:5000/register", form);
      console.log(form);

      navigate("/login");
    
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <main className="register-wrap">
      <section className="register-card">
        <div className="card-brand">
          <img src="logo.svg" alt="Veggiefy logo"/>
          <span className="wordmark">Veggiefy</span>
        </div>

        <h1 className="card-title">Create Account</h1>
        <p className="card-sub">For customers who want to place advance orders</p>
        <form onSubmit={handleSubmit} noValidate={true}>
          <div className="field">
            <div className="input-box pill">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>
              <input 
                type="text" 
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
              />
            </div>
            <span className="error-msg"></span>
          </div>

        <div className="field">
          <div className="input-box pill">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7L4.500 7.500v.1L12 13l7.500-5.400v-.1Z"/></svg>
            <input 
              type="email" 
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              />
          </div>
          <span className="error-msg"></span>
        </div>

        <div className="field">
          <div className="input-box pill">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.600 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1 11.400 11.400 0 0 0 .57 3.600 1 1 0 0 1-.25 1Z"/></svg>
            <input 
              type="tel" 
              placeholder="Phone Number (e.g. 09171234567)"
              value={form.phoneNo}
              onChange={(e) => setForm({...form, phoneNo: e.target.value})}
            />
          </div>
          <span className="error-msg" id="phoneError" role="alert"></span>
        </div>

        <div className="field">
          <div className="input-box pill">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9Zm-8-2a3 3 0 0 1 6 0v2H9Zm4 9.700V18h-2v-1.300a2 2 0 1 1 2 0Z"/></svg>
            <input 
              type="password" 
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>
          <span className="hint">At least 8 characters, with letters and numbers.</span>
          <span className="error-msg"></span>
        </div>

        <div className="field">
          <div className="input-box pill">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9Zm-8-2a3 3 0 0 1 6 0v2H9Zm4 9.700V18h-2v-1.300a2 2 0 1 1 2 0Z"/></svg>
            <input 
              type="password" 
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            />
          </div>
          <span className="error-msg"></span>
        </div>

        <button type="submit" className="btn-primary">Register</button>
        </form> 

        <p className="switch-page small">Already have an account? <Link to="/login" className="text-link">Log In</Link></p>
      </section>
    </main>
  )
}

export default Register