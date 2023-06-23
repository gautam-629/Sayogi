import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../config';
import { api } from '../config';
import axios from 'axios';
const initialState = {
  serviceSeeker: [],
  status: STATUSES.IDLE
};

const serviceSeekerSlice = createSlice({
  name: 'serviceSeekers',
  initialState,
  reducers: {
    setServiceSeeker(state, action) {
      state.serviceSeeker = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }

  }
})

export const { setServiceSeeker, setStatus } = serviceSeekerSlice.actions;
export default serviceSeekerSlice.reducer;



export function createProfile(data, token) {
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
      const res = await axiosInstance.post('/api/serviceSeeker/create', data);
      dispatch(setServiceSeeker(res.data));
      dispatch(setStatus(STATUSES.SUCESS))
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR))
    }

  }
}

export function fetchallServiceSeeker() {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.get('/api/serviceSeeker/getall');
      dispatch(setServiceSeeker(res.data));
      dispatch(setStatus(STATUSES.SUCESS))

    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  }
}

export function fetchsingleServiceSeeker(id) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.get(`/api/serviceSeeker/getsingle/${id}`);
      dispatch(setServiceSeeker(res.data));
      dispatch(setStatus(STATUSES.SUCESS))

    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  }
}


