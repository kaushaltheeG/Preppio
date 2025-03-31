import { configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './slices/appSlice';
import rootSaga from './sagas';
import interviewReducer from './slices/interviewSlice';
import authReducer from './slices/authSlice';
import googleDriveReducer from './slices/googleDriveSlice';
import sessionStorageMiddleware, { loadStateFromSessionStorage } from './middleware/sessionStorageMiddleware';
import { RootState } from './types';

const sagaMiddleware = createSagaMiddleware();
const preloadedState: Partial<RootState> = loadStateFromSessionStorage();

export const store: Store<RootState> = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    googleDrive: googleDriveReducer,
    interview: interviewReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(sagaMiddleware, sessionStorageMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
