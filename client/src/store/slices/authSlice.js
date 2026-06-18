import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: true,
  isAuthenticated: !!storedToken,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginSuccess: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
      state.loading = false;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    tokenExpired: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  logoutSuccess,
  setUser,
  setError,
  tokenExpired,
} = authSlice.actions;

export default authSlice.reducer;