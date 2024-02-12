import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
      method: "POST",
      maxBodyLength: Infinity,
      // url: "127.0.0.1:8000/api/v1/users/login",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: data,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userCredentials) => {
    const request = await axios.post("http://127.0.0.1:8000/api/v1/users/login", {
      maxBodyLength: Infinity,
      // url: "127.0.0.1:8000/api/v1/users/login",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: userCredentials,
    });
    const response = request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const initialState = {
  user: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = "";
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.err = "An Error Occured...";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
