import { configureStore } from '@reduxjs/toolkit'
import authSlice from './AuthSlice';
import activate from './ActivateSlice';
export const store = configureStore({
  reducer: {
    auth:authSlice,
    activate:activate
  },
})