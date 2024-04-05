import { createSlice } from "@reduxjs/toolkit";
import { api, STATUSES } from "../config/index";
import { toast } from "react-toastify";
import axios from "axios";
const sucessNotify = (msg) => toast.success(`${msg}`);
const initialState = {
  isAuth: false,
  token: {
    accessToken: "",
    refreshToken: "",
  },
  user: null,
  otp: {
    phoneNumber: "",
    hash: "",
  },
  errMessage: "",
  status: STATUSES.IDLE,
  users: [],
  serviceSeeker: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtp: (state, action) => {
      const { phoneNumber, hash } = action.payload;
      state.otp.phoneNumber = phoneNumber;
      state.otp.hash = hash;
    },
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setStatusMessage(state, action) {
      const { message } = action.payload;
      state.errMessage = message;
    },
    setToken(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.token.accessToken = accessToken;
      state.token.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setServiceSeeker(state, action) {
      state.serviceSeeker = action.payload;
    },
  },
});

export const {
  setAuth,
  setOtp,
  setStatus,
  setStatusMessage,
  setToken,
  setUsers,
  setServiceSeeker,
} = authSlice.actions;
export default authSlice.reducer;

export function sendOtpRequest(phoneNumber) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await api.post("/api/sendotp", phoneNumber);
       sucessNotify(`Your Otp code is ${data.otp}`)
      dispatch(setOtp(data));
     
      dispatch(setStatus(STATUSES.SUCESS));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setStatusMessage(error.response.data));
    }
  };
}

export function verifyOtpRequest(verifyData) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await api.post("/api/verifyotp", verifyData);
      dispatch(setAuth(data));
      console.log(data);
      dispatch(setStatus(STATUSES.SUCESS));
      dispatch(setToken(data));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setStatusMessage(error.response.data));
    }
  };
}

export function createProfile(data, token) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    console.log("Hit");
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      const res = await axiosInstance.post("/api/serviceSeeker/create", data);
      dispatch(setAuth(res.data));
      dispatch(setStatus(STATUSES.SUCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function fetchallServiceSeeker(title) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.get(
        `/api/serviceSeeker/getall?title=${title ?? ""}`
      );
      dispatch(setUsers(res.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function fetchsingleServiceSeeker(id) {
  return async function (dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.get(`/api/serviceSeeker/getsingle/${id}`);
      dispatch(setServiceSeeker(res.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
