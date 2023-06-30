import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../config';
import axios from 'axios';
const initialState = {
  notifications:[],
  status: STATUSES.IDLE,
  notification:{}
};

const serviceRequestSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setNotifications(state, action) {
        state.notifications = action.payload;
      },
  }
})

export const { setNotification, setStatus,setNotifications } = serviceRequestSlice.actions;
export default serviceRequestSlice.reducer;


export function createNotification(reciverID,serviceRequest, token) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
          common: {
            'Authorization': `Bearer ${token}`,
          },
        },
      });
      const requestData = {
        reciverID:reciverID,
        serviceRequest:serviceRequest
      };
      const res = await axiosInstance.post('api/notification/create', requestData);
      dispatch(setNotification(res.data));
      dispatch(setStatus(STATUSES.SUCESS))
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR))
    }

  }
}

export function fetchNotification(token) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
              common: {
                'Authorization': `Bearer ${token}`,
              },
            },
          });
      const res = await axiosInstance.get('/api/notification/getNotification');
      dispatch(setNotifications(res.data));
      dispatch(setStatus(STATUSES.IDLE))

    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  }
}

