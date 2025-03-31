import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../types';

const APP_STATE_KEY = 'preppio_app_state';

export const loadStateFromSessionStorage = (): Partial<RootState> => {
  try {
    const serializedState = sessionStorage.getItem(APP_STATE_KEY);
    if (serializedState === null) {
      return {};
    }
    const state = JSON.parse(serializedState);
    return {
      app: {
        ...state.app,
        openTabs: new Map(Object.entries(state.app?.openTabs || {}))
      },
      interview: state.interview || {},
      // resume: state.resume || {},
      // jobDescription: state.jobDescription || {},
      // tune: state.tune || {}
    };
  } catch (err) {
    console.error('Error loading state from session storage:', err);
    return {};
  }
};

const sessionStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  const state = store.getState() as RootState;
  
  try {
    const serializedState = JSON.stringify({
      app: {
        ...state.app,
        openTabs: Object.fromEntries(state.app.openTabs)
      },
      interview: state.interview,
      // resume: state.resume,
      // jobDescription: state.jobDescription,
      // tune: state.tune
    });
    sessionStorage.setItem(APP_STATE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to session storage:', err);
  }

  return result;
};

export const clearSessionStorage = (): void => {
  try {
    sessionStorage.removeItem(APP_STATE_KEY);
  } catch (err) {
    console.error('Error clearing session storage:', err);
  }
};

export default sessionStorageMiddleware;
