import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';
import { RootState } from '../../store';

interface AuthState {
  session: Session | null;
  error: string | null;
}

const initialState: AuthState = {
  session: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkSession: (state) => {},
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    subscribeToAuthChanges: (state) => {},
    unsubscribeFromAuthChanges: (state) => {},
  },
})

// Selectors
export const hasSessionSelector = (state: RootState) => Boolean(state.auth.session !== null);

export default authSlice.reducer;

export const {
  checkSession,
  setSession,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges
} = authSlice.actions;
