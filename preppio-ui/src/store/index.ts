import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import resumeReducer from './slices/resumeSlice'
import jobDescriptionReducer from './slices/jobDescriptionSlice';
import tuneReducer from './slices/tuneSlice';
import appReducer from './slices/appSlice';
import rootSaga from './sagas';
import interviewReducer from './slices/interviewSlice';
import authReducer from './slices/authSlice';
import googleDriveReducer from './slices/googleDriveSlice';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    googleDrive: googleDriveReducer,
    jobDescription: jobDescriptionReducer,
    interview: interviewReducer,
    resume: resumeReducer,
    tune: tuneReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
