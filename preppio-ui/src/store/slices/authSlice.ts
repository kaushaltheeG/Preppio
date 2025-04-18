import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Session, User } from '@supabase/supabase-js';
import { RootState } from '../types';

export interface AuthState {
  session: Session | null;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  session: null,
  error: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logoutUser: () => {
      return { ...initialState };
    },
  },
})

// Selectors
export const hasSessionSelector = (state: RootState): boolean => Boolean(state.auth.session !== null);
export const getLoggedInUser = (state: RootState): User | null => state.auth.user;
export const getGoogleAccessToken = (state: RootState): string => state.auth.session?.provider_token || '';
export const getRefreshToken = (state: RootState): string | null => state.auth.session?.refresh_token || null;
export const getSessionToken = (state: RootState): string | null => state.auth.session?.access_token || null;


// Actions
export const checkSession = createAction('auth/checkSession');
export const subscribeToAuthChanges = createAction('auth/subscribeToAuthChanges');
export const unsubscribeFromAuthChanges = createAction('auth/unsubscribeFromAuthChanges');
export const {
  setSession,
  setUser,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
