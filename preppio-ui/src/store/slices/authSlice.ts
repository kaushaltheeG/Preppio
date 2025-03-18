import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session, User } from '@supabase/supabase-js';
import { RootState } from '../../store';

interface AuthState {
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
    checkSession: (state) => {},
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logoutUser: {
      reducer: (state) => {}, // No state change needed
      prepare: () => ({ payload: null }),
    },
    subscribeToAuthChanges: (state) => {},
    unsubscribeFromAuthChanges: (state) => {},
  },
})

// Selectors
export const hasSessionSelector = (state: RootState): boolean => Boolean(state.auth.session !== null);
export const getLoggedInUser = (state: RootState): User | null => state.auth.user;


export const {
  checkSession,
  setSession,
  setUser,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
