import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage';
import SignupPage from '../pages/SignupPage';


function Router() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Homepage/>}/> 
                <Route path='/signup' element = {<SignupPage/>}/> 
            </Routes>
        </BrowserRouter>
  )
}

export default Router;