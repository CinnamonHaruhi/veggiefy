import React from 'react'
import LoginForm from '../components/LoginForm'
import BrandPanel from '../components/BrandPanel'

const Login = ({setUser}) => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Rozha+One&display=swap" rel="stylesheet"/>
      <main className="login-layout">
        <LoginForm setUser={setUser}/>
        <BrandPanel/>
      </main>
    </>
  )
}

export default Login