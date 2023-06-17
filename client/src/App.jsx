import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlideBar from './components/shared/slidebar/SlideBar';
import Navbar from './components/shared/Navbar/Navbar';
import Activate from './pages/auth/Activate/Activate';
import Authenticate from './pages/auth/Authenticate/Authenticate';
import { ToastContainer } from 'react-toastify';
import ServiceRequest from './pages/ServiceRequest';
import Loader from './components/shared/Loader/Loader';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className='grid grid-cols-12 px-1'>
        <div className='col-span-3'>
          <SlideBar />
        </div>
        <div className='col-span-9 px-5'>
          <Navbar />
          <Routes>
            <Route path='/authenticate' element={
              <GuestRoute>
                <Authenticate />
              </GuestRoute>
            } />
            <Route path='/activate' element={
               <ProtectedProtectedRoute>
                <Activate />
               </ProtectedProtectedRoute>
            } />
            <Route path='/servicerequest' element={
              <ProtectedProtectedRoute>
                <ServiceRequest />
              </ProtectedProtectedRoute>
            }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App

const GuestRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  if (isAuth && !user?.Activated) {
    return <Navigate to="/activate" />
  }
  else {
    return children;
  }
}
const ProtectedProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  if (isAuth && user?.activated) {
    <Navigate to="/servicerequest" />
  }
  else {
    return <Navigate to={"/authenticate"} />
  }
}
