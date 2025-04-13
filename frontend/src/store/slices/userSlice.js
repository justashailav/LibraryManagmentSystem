import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    fetchAllRequest(state) {
      state.loading = true;
    },
    fetchAllRequestSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllRequestFailed(state) {
      state.loading = false;
    },
  },
});

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchAllRequest());
  await axios
    .get("http://localhost:3000/api/v1/all", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userSlice.actions.fetchAllRequestSuccess(res.data.users));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.fetchAllRequestFailed(error.response.data.message)
      );
    });
};
export default userSlice.reducer