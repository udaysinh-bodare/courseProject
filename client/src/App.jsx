import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App