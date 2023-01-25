import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isTabBar: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    tabBarOn(state) {
      state.isTabBar = true;
    },
    tabBarOf(state) {
      state.isTabBar = false;
    },
  },
});

export const { login, logout, tabBarOn, tabBarOf } = authSlice.actions;

export const authReducer = authSlice.reducer;
