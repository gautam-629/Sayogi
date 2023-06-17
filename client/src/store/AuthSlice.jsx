import { createSlice } from "@reduxjs/toolkit";
import {api,STATUSES} from '../config/index';
const initialState={
    isAuth:false,
    user:null,
    otp:{
        phoneNumber:'',
        hash:'',
    },
    errMessage:'',
    status: STATUSES.IDLE
};

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setOtp:(state,action)=>{
            const{phoneNumber,hash}=action.payload;
            state.otp.phoneNumber=phoneNumber;
            state.otp.hash=hash;
          },
          setAuth:(state,action)=>{
            const{user}=action.payload;
            state.user=user;
            if(user===null){
             state.isAuth=false;
            }
            else{
             state.isAuth=true;
            }
         },
          setStatus(state, action) {
            state.status = action.payload;
         },
         setStatusMessage(state, action) {
            const { message } = action.payload
            state.errMessage = message;
         }
    }
})

export const {setAuth,setOtp,setStatus,setStatusMessage}=authSlice.actions;
 export default authSlice.reducer;

 export function sendOtpRequest(phoneNumber) {
    return async function (dispatch, getState) {
           dispatch(setStatus(STATUSES.LOADING));
       try {
          const res = await api.post('/api/sendotp',phoneNumber);
          dispatch(setOtp(res.data))
          console.log(res.data)
          dispatch(setStatus(STATUSES.SUCESS));
 
       } catch (error) {
          dispatch(setStatus(STATUSES.ERROR));
          dispatch(setStatusMessage(error.response.data));
       }
    }
 }


 export function verifyOtpRequest(verifyData) {
   return async function (dispatch, getState) {
          dispatch(setStatus(STATUSES.LOADING));
      try {
         const res = await api.post('/api/verifyotp',verifyData);
         dispatch(setAuth(res.data))
         console.log(res.data)
         dispatch(setStatus(STATUSES.SUCESS));

      } catch (error) {
         dispatch(setStatus(STATUSES.ERROR));
         dispatch(setStatusMessage(error.response.data));
      }
   }
}
 