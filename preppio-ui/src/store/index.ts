import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice'
import jobDescriptionReducer from './jobDescriptionSlice';
import tuneReducer from './tuneSlice';
import appReducer from './appSlice';
export const store = configureStore({
  reducer: {
    app: appReducer,
    resume: resumeReducer,
    jobDescription: jobDescriptionReducer,
    tune: tuneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
