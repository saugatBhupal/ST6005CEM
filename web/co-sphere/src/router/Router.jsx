import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage';


function Router() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Homepage/>}/> 
            </Routes>
        </BrowserRouter>
  )
}

export default Router;