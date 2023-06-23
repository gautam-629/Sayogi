import { configureStore } from '@reduxjs/toolkit'
import authSlice from './AuthSlice';
import activate from './ActivateSlice';
import serviceSeekerSlide from './serviceSeekerSlide';
import serRequestSlice from './ServiceRequest';
export const store = configureStore({
  reducer: {
    auth:authSlice,
    activate:activate,
    serviceSeekers:serviceSeekerSlide,
    serviceRequest:serRequestSlice
  },
})