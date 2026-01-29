import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "@/types/dashboard.types";

export interface User {
  email: string;
  name: string;
  userId: string;
  role: UserRole;
  organizationId?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface DecodedToken {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
  exp: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) => {
      if (!action.payload.accessToken) return;
      
      try {
        const decoded = jwtDecode<DecodedToken>(action.payload.accessToken);
        
        state.user = {
          userId: decoded.userId,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
          organizationId: decoded.organizationId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken || state.user?.refreshToken,
        };
        state.isAuthenticated = true;
      } catch (error) {
        console.error("Invalid token:", error);
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken"); // Optional: clear local storage if used
    },
  },
});

export const { logOut, setUser } = authSlice.actions;
export default authSlice.reducer;

