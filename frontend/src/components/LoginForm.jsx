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

  const clearErrors = () => {
    setError("");
    setPassError("");
    setEmailUserError("");
  }

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
      const responseData = err.response.data;

      if (responseData.subject === "emailuser") {
        clearErrors();
        setEmailUserError(responseData.message);
      }

      if (responseData.subject === "password") {
        clearErrors();
        setPassError(responseData.message);
      }

      if (!responseData.subject) {
        clearErrors();
        setError(responseData.message);
      }

      console.log(err);
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
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>
            <input 
              type='text' 
              placeholder='Email or Username' 
              value={form.emailuser} 
              onChange={(e) => setForm({...form, emailuser: e.target.value})}
            />
            </div>
            <span className="error-msg">{emailUserError}</span>
          </div>

          <div className="field">
            <div className="input-box">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9Zm-8-2a3 3 0 0 1 6 0v2H9Zm4 9.7V18h-2v-1.3a2 2 0 1 1 2 0Z"/></svg>
              <input 
                type='password' 
                placeholder='Password'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
              </div>
              <span className="error-msg">{passError}</span>
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