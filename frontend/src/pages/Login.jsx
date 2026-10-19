import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [ form, setForm ] = useState({
    emailuser: "",
    password: "",
  });

  const [ error, setError ] = useState("");
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
      setError("Invalid email or password");
    }
  }
  
  return (
    <>
      <h2>Welcome Back!</h2>
      <p>Log in to your account</p>
      <p>{error}</p>

      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='Email or Username' 
          value={form.emailuser} 
          onChange={(e) => setForm({...form, emailuser: e.target.value})}
        />
        <input 
          type='password' 
          placeholder='Password'
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button>Log in</button>
      </form>
    </>
  )
}

export default Login