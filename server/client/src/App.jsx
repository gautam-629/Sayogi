import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ServiceReceiver from './pages/History/ServiceReceiver';
import ServiceProvider from './pages/History/ServiceProvider';
import Service from './pages/History/Service';
import useSocketConnection from './hooks/useSocketConnection';
import Dashboard from './Admin/Dashboard';
import Users from './Admin/Users';
import UpdateUser from './Admin/UpdateUser';
import HiredUser from './Admin/HiredUser';
import PaymentDetail from './Admin/paymentDetail';

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './pages/payment/Payment';
import PaymetnSucess from './pages/payment/PaymetnSucess';
import UserDetail from './Admin/UserDetail';

const App = () => {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    async function getStripApiKey() {
      const { data } = await axios.get('http://localhost:5000/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripApiKey();

  }, [])

  useSocketConnection();
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    <>
      <BrowserRouter>
        <ToastContainer />
        <div className=' absolute top-4 right-8 flex'>
          <Navbar />
        </div>
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
          <Route path='/requestdetail' element={
            <ProtectedProtectedRoute>
              <RequestDetail />
            </ProtectedProtectedRoute>
          }
          />
          <Route path='/servicereceiver' element={
            <ProtectedProtectedRoute>
              <ServiceReceiver />
            </ProtectedProtectedRoute>
          }

          />
          <Route path='/serviceprovider' element={
            <ProtectedProtectedRoute>
              <ServiceProvider />
            </ProtectedProtectedRoute>
          } />
          <Route path='/servicehistory' element={
            <ProtectedProtectedRoute>
              <Service />
            </ProtectedProtectedRoute>
          } />
          <Route path='/paymentsucess' element={<PaymetnSucess />} />

          {/* payment */}
          {
            stripeApiKey &&
            <Route path='/payment' element={
              <ProtectedProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedProtectedRoute>
            } />
          }


          {/* Admin Routes */}
          <Route path='/dashboard' element={
            <AdminProtectedProtectedRoute>
              <Dashboard />
            </AdminProtectedProtectedRoute>
          }
          />
          <Route path='/users' element={
            <AdminProtectedProtectedRoute>
              <Users />
            </AdminProtectedProtectedRoute>
          }
          />
          <Route path='/updateuser' element={
            <AdminProtectedProtectedRoute>
              <UpdateUser />
            </AdminProtectedProtectedRoute>
          }
          />
          <Route path='/hiredUser' element={
            <AdminProtectedProtectedRoute>
              <HiredUser />
            </AdminProtectedProtectedRoute>
          }
          />
          <Route path='/paymentdetail' element={
            <AdminProtectedProtectedRoute>
              <PaymentDetail />
            </AdminProtectedProtectedRoute>
          }
          />
          <Route path='/adminuserdetail' element={
            <AdminProtectedProtectedRoute>
              <UserDetail />
            </AdminProtectedProtectedRoute>
          }
          />
        </Routes>

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


const AdminProtectedProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  if (!isAuth) {
    return <Navigate to="/authenticate" />
  }
  else if (isAuth && user?.activated && user?.role === 'admin') {
    return children;
  }
  else if (isAuth && !user?.Activated) {
    return <Navigate to="/activate" />
  }

}
