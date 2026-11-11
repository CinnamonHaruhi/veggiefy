import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    } else {
      if (user.role_id == 1) {
        navigate("admin/dashboard");
      }

      if (user.role_id == 2) {
        navigate("/my-dashboard");
      }
    }
  }, []);

  return (
    <div></div>
  )
}

export default Home