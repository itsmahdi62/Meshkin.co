// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setName } from "../user/userSlice";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      });

      if (response.status !== "success") {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      dispatch(setName(data.data.user.name));
      // console.log(data);
      // console.log(data.data.user.name);
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (userData, { dispatch }) => {
    // Make API call to register user
    // Dispatch signupSuccess or signupFailure based on API response
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to signup");
      }

      const data = await response.json();
      dispatch(setName(data.data.user.name));
      // console.log(data);
      // console.log(data.data.user.name);
      return data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(signupAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
