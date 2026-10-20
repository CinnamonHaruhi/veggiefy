import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [ form, setForm ] = useState({
    emailuser: "",
    password: "",
  });

  const [ error, setError ] = useState("");
  const [ passError, setPassError ] = useState("");
  const [ emailUserError, setEmailUserError ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const res = await axios.post("http://localhost:5000/login", form);
      const userData = res.data;
      setUser(userData);
      

      if (parseInt(userData.user.role_id) === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }
  
  return (
    <section className="form-panel">
      <div className="form-panel-inner">
        <h1 className="welcome-title">Welcome Back!</h1>
        <p className="welcome-sub">Log in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="input-box">
            <input 
              type='text' 
              placeholder='Email or Username' 
              value={form.emailuser} 
              onChange={(e) => setForm({...form, emailuser: e.target.value})}
            />
            </div>
          </div>

          <div className="field">
            <div className="input-box">
              <input 
                type='password' 
                placeholder='Password'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
              </div>
              <span className="error-msg">{error}</span>
          </div>

          <div className="options-row">
            <label className="switch-label">
              <input type="checkbox" id="remember" name="remember"/>
              <span className="switch" aria-hidden="true"></span>
              <span className="switch-text">Remember Me</span>
            </label>
            <a href="" id="forgotLink" className="text-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary btn-lg">Log In</button>
        </form>
      </div>
    </section>
  )
}

export default LoginForm