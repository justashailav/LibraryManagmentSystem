import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthencated: false,
  },
  reducers: {
    register(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    registerSuccess(state, action) {
      (state.loading = false), (state.message = action.payload.message);
    },
    registerFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    otpVerification(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    otpVerificationSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.isAuthencated = true),
        (state.user = action.payload.user);
    },
    otpVerificationFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    login(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    loginSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.isAuthencated = true),
        (state.user = action.payload.user);
    },
    loginFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    logout(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    logoutSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload),
        (state.isAuthencated = false),
        (state.user = null);
    },
    logoutFailed(state, action) {
      (state.loading = false),
        (state.error = action.payload),
        (state.message = null);
    },
    getUser(state){
        state.loading=true,
        state.error=null,
        state.message=null
    },
    getUserSuccess(state,action){
        state.loading=false,
        state.user=action.payload.user,
        state.isAuthencated=true
    },
    getUserFailed(state){
        state.loading=false,
        state.error=null,
        state.isAuthencated=false
    },
    forgotPassword(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    forgotPasswordSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload)
    },
    forgotPasswordFailed(state, action) {
      (state.loading = false),
      (state.error = action.payload)
    },
    resetPassword(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    resetPasswordSuccess(state, action) {
      (state.loading = false),
      (state.message = action.payload.message),
      (state.user = action.payload.user),
      (state.isAuthencated=true)
    },
    resetPasswordFailed(state, action) {
      (state.loading = false),
      (state.error = action.payload)
    },
    updatePassword(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    updatePasswordSuccess(state, action) {
      (state.loading = false),
      (state.message = action.payload.message)
      
    },
    updatePasswordFailed(state, action) {
      (state.loading = false),
      (state.error = action.payload)
    },
    resetAuthSlice(state){
        state.error=null,
        state.loading=false,
        state.message=null,
        state.user=state.user,
        state.isAuthencated=state.isAuthencated
    },
  },
});

export const resetAuthSlice=()=>(dispatch)=>{
    dispatch(authSlice.actions.resetAuthSlice())
}

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.register());
  await axios.post("library-managment-system-backend.vercel.app/register", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(error.response.data.message));
    });
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerification());
  console.log("OTP Verification Request:", { email, otp });
  await axios.post(
    "library-managment-system-backend.vercel.app/verify-otp",
    { email, otp },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      console.log("OTP Verification Success:", res.data);
      dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      console.error("OTP Verification Failed:", error.response?.data || error.message);
      dispatch(
        authSlice.actions.otpVerificationFailed(error.response.data.message)
      );
    });
};

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerification());
  await axios.post("library-managment-system-backend.vercel.app/login", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailed(error.response.data.message));
    });
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logout());
<<<<<<< HEAD
  await axios.get("library-managment-system-backend.vercel.app/logout", {
=======
  await axios("https://librarysystem-u6q7.onrender.com", {
>>>>>>> 23aa5e6904ae7e70bda4a0089fb8a4a830ef02f0
    withCredentials: true,
  })
    .then((res) => {
      dispatch(authSlice.actions.logoutSuccess(res.data));
      dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispatch(authSlice.actions.logoutFailed(error.response.data.message));
    });
};

export const getUser = () => async (dispatch) => {
    dispatch(authSlice.actions.getUser());
<<<<<<< HEAD
    await axios.get("library-managment-system-backend.vercel.app/me", {
=======
    await axios("https://librarysystem-u6q7.onrender.com", {
>>>>>>> 23aa5e6904ae7e70bda4a0089fb8a4a830ef02f0
      withCredentials: true,
    })
      .then((res) => {
        dispatch(authSlice.actions.getUserSuccess(res.data));
      })
      .catch((error) => {
        dispatch(authSlice.actions.getUserFailed(error.response.data.message));
      });
};
export const forgotPassword=(email)=>async(dispatch)=>{
  dispatch(authSlice.actions.forgotPassword());
  await axios.post("library-managment-system-backend.vercel.app/password/forgot", {email}, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.forgotPasswordFailed(error.response.data.message));
    });
}
export const resetPassword=(data,token)=>async(dispatch)=>{
  dispatch(authSlice.actions.resetPassword());
  await axios.put(`library-managment-system-backend.vercel.app/password/reset/${token}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.resetPassword(error.response.data.message));
    });
}
export const updatePassword=(data)=>async(dispatch)=>{
  dispatch(authSlice.actions.updatePassword());
  await axios.put("library-managment-system-backend.vercel.app/password/update", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.updatePasswordFailed(error.response.data.message));
    });
}
export default authSlice.reducer
