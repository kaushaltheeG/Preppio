import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice'
import jobDescriptionReducer from './jobDescriptionSlice';
import tuneReducer from './tuneSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    jobDescription: jobDescriptionReducer,
    tune: tuneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
