import React from 'react'
import LoginForm from '../components/LoginForm'
import BrandPanel from '../components/brandpanel/BrandPanel'
import FontLinks from '../components/FontLinks'

const Login = ({setUser}) => {
  return (
    <>
     <FontLinks/>
      <main className="login-layout">
        <LoginForm setUser={setUser}/>
        <BrandPanel/>
      </main>
    </>
  )
}

export default Login