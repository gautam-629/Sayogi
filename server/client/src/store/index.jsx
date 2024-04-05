import { configureStore } from '@reduxjs/toolkit'
import authSlice from './AuthSlice';
import activate from './ActivateSlice';
import serRequestSlice from './ServiceRequest';
import Notification from './Notification';
export const store = configureStore({
  reducer: {
    auth:authSlice,
    activate:activate,
    serviceRequests:serRequestSlice,
    notification:Notification
  },
})