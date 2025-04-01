import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { enableMapSet } from 'immer';

enableMapSet();

export type FormState = 'questions' | 'userInputs' | 'iframe' | string;

export interface AppState {
  isLoading: boolean;
  errorMessage: string;
  formState: FormState;
  openTabs: Map<string, string>;
  isMobileView: boolean;
}

const initialState: AppState = {
  isLoading: false,
  errorMessage: '',
  formState: 'userInputs',
  openTabs: new Map(),
  isMobileView: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<AppState['formState']>) => {
      state.formState = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<AppState['isLoading']>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<AppState['errorMessage']>) => {
      state.errorMessage = action.payload;
    },
    setOpenTabs: (state, action: PayloadAction<string>) => {
      state.openTabs.set(action.payload, action.payload);
    },
    removeOpenTab: (state, action: PayloadAction<string>) => {
      state.openTabs.delete(action.payload);
    },
    setClearOpenTabs: (state) => {
      state.openTabs = new Map();
    },
    closeOpenTab: (state, action: PayloadAction<string>) => {
      state.openTabs.delete(action.payload);
    },
    setAppInitialState: () => {
      return { ...initialState };
    },
    setIsMobileView: (state, action: PayloadAction<boolean>) => {
      state.isMobileView = action.payload;
    },
  },
});

// Selectors
export const getFormState = (state: RootState) => state.app.formState;
export const getIsLoading = (state: RootState) => state.app.isLoading;
export const getAppErrorMessage = (state: RootState) => state.app.errorMessage;
export const onQuestions = (state: RootState) => state.app.formState === 'questions';
export const onUserInputs = (state: RootState) => state.app.formState === 'userInputs';
export const onIframeSelector = (state: RootState) => state.app.formState === 'iframe';
export const getOpenTabs = (state: RootState) => state.app.openTabs;
export const getOpenTabsArray = (state: RootState) => Array.from(state.app.openTabs.entries());
export const getIsMobileView = (state: RootState) => state.app.isMobileView;

export const { 
  setFormState, 
  setIsLoading, 
  setErrorMessage, 
  setOpenTabs,
  setClearOpenTabs,
  closeOpenTab,
  setAppInitialState,
  removeOpenTab,
  setIsMobileView
} = appSlice.actions;

export default appSlice.reducer;
