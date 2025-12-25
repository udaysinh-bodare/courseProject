import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
      </Routes>
    </>
  )
}

export default App