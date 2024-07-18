import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../types/types";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ data: any }>) => {
      console.log("USER = ", action.payload.data);
      state.user = action.payload.data.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.data.token,
        })
      );
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
