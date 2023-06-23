import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../config';
import { api } from '../config';
import axios from 'axios';
const initialState = {
  serviceRequest: [],
  status: STATUSES.IDLE
};

const serviceRequestSlice = createSlice({
  name: 'serviceRequest',
  initialState,
  reducers: {
    setServiceRequest(state, action) {
      state.serviceRequest = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }

  }
})

export const { setServiceRequest, setStatus } = serviceRequestSlice.actions;
export default serviceRequestSlice.reducer;



export function createServiceRequest(data, token) {
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
      const res = await axiosInstance.post('/api/servicerequest/create', data);
      dispatch(setServiceRequest(res.data));
      dispatch(setStatus(STATUSES.SUCESS))
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR))
    }

  }
}

export function fetchallServiceRequest() {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.get('/api/servicerequest/getall');
      dispatch(serviceRequestSlice(res.data));
      dispatch(setStatus(STATUSES.SUCESS))

    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  }
}

