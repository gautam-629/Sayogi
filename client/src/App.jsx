import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlideBar from './components/shared/slidebar/SlideBar';
import Navbar from './components/shared/Navbar/Navbar';
import Activate from './pages/auth/Activate/Activate';
import Authenticate from './pages/auth/Authenticate/Authenticate';
import { ToastContainer } from 'react-toastify';
import ServiceRequest from './pages/ServiceRequest/ServiceRequest';
import Loader from './components/shared/Loader/Loader';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLoadingWithRefresh } from './hooks/UseLoadingWIthRefresh';
import CreateAccount from './pages/ServiceSeekerAccount/CreateAccount';
import AllServiceSeeker from './pages/ServiceSeekerAccount/AllServiceSeeker';
import ServiceSeekerProfile from './pages/ServiceSeekerAccount/ServiceSeekerProfile';
import Home from './pages/Home/Home';
import RequestDetail from './pages/ServiceReceiver/RequestDetail';
const App = () => {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    <>
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
                <GuestRouter>
                  <Authenticate />
                </GuestRouter>
              } />
              <Route path='/activate' element={
                <SemiProtected>
                  <Activate />
                </SemiProtected>
              } />
              <Route path='/servicerequest' element={
                <ProtectedProtectedRoute>
                  <ServiceRequest />
                </ProtectedProtectedRoute>
              }
              />
              <Route path='/createaccount' element={
                <ProtectedProtectedRoute>
                  <CreateAccount />
                </ProtectedProtectedRoute>
              } />
              <Route path='/getallserviceseeker' element={<AllServiceSeeker />} />
              <Route path='/getserviceseekerprofile/:id' element={<ServiceSeekerProfile />} />
              <Route path='/' element={<Home />} />
              <Route path='/requestdetail' element={<RequestDetail />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}
export default App;

const GuestRouter = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  if (isAuth && user?.activated) {
    return <Navigate to="/" />
  }
  else {
    return children;
  }
}

const SemiProtected = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  console.log(isAuth, user?.activated)
  if (isAuth && !user.activated) {
    return children;
  }
  if (!isAuth) {
    return <Navigate to="/authenticate" />
  }
  else {
    return <Navigate to="/" />
  }
}

const ProtectedProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  if (!isAuth) {
    return <Navigate to="/authenticate" />
  }
  else if (isAuth && user?.activated) {
    return children;
  }
  else if (isAuth && !user?.Activated) {
    return <Navigate to="/activate" />
  }

}
