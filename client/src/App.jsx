import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlideBar from './components/shared/slidebar/SlideBar';
import Navbar from './components/shared/Navbar/Navbar';
import Activate from './pages/auth/Activate/Activate';
import Authenticate from './pages/auth/Authenticate/Authenticate';
const App = () => {
  return (
    <BrowserRouter>
      <div className='grid grid-cols-12 px-1'>
        <div className='col-span-3'>
          <SlideBar />
        </div>
        <div className='col-span-9 px-5'>
          <Navbar/>
          <Routes>
              <Route path='/authenticate' element={<Authenticate/>}/>
              <Route path='/activate' element={<Activate/>}/>
          </Routes>
        </div>
      </div>
      
    </BrowserRouter>

  )
}

export default App