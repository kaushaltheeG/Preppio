import { call, put, take, takeLatest, fork, cancel } from 'redux-saga/effects';
import { eventChannel, Task } from 'redux-saga';
import { supabase } from '../../services/supabase';
import { Session } from '@supabase/supabase-js';
import { EventChannel } from 'redux-saga';
import {
  setSession,
  setUser,
  checkSession,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges,
  logoutUser,
} from '../slices/authSlice';
import { setAppInitialState } from '../slices/appSlice';
import { setJobDescriptionInitialState } from '../slices/jobDescriptionSlice';
import { setResumeInitialState } from '../slices/resumeSlice';
import { setTuneInitialState } from '../slices/tuneSlice';
import { setInterviewInitialState } from '../slices/interviewSlice';
import { setGoogleDriveInitialState } from '../slices/googleDriveSlice';

function* handleCheckSession() {
  try {
    const { data: { session } } = yield call([supabase.auth, 'getSession']);
    yield put(setSession(session));
    yield put(setUser(session?.user || null));
  } catch (error) {
    console.error('Error checking session:', error);
  }
}

function* handleLogout() {
  yield call([supabase.auth, 'signOut'], {scope: 'local'});
  yield put(setAppInitialState());
  yield put(setJobDescriptionInitialState());
  yield put(setResumeInitialState());
  yield put(setTuneInitialState());
  yield put(setInterviewInitialState());
  yield put(setGoogleDriveInitialState());
}

function createAuthChannel() {
  return eventChannel(emit => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      emit({ session });
    });
    
    // Ensure subscription exists before returning the unsubscribe function
    if (data && data.subscription) {
      return () => data.subscription.unsubscribe();
    }
    
    // Return a no-op function if no subscription exists
    return () => {};
  });
}

function* watchAuthStateChange() {
  const channel: EventChannel<Session | null> = yield call(createAuthChannel);
  try {
    while (true) {
      const { session }: { session: Session | null } = yield take(channel);
      yield put(setSession(session));

      const loggedInUserData = (session && session.user) || null;
      yield put(setUser(loggedInUserData));
    }
  } finally {
    channel.close();
  }
}

function* authSaga() {
  // Start watching for session checks
  yield takeLatest(checkSession.type, handleCheckSession);
  // Logout user
  yield takeLatest(logoutUser.type, handleLogout);
  
  // Start auth state watching immediately
  let authTask: Task = yield fork(watchAuthStateChange);
  
  // Handle subsequent subscribe/unsubscribe requests
  while (true) {
    yield take(unsubscribeFromAuthChanges.type);
    if (authTask) {
      yield cancel(authTask);
    }

    yield take(subscribeToAuthChanges.type);
    authTask = yield fork(watchAuthStateChange);
  }
}

export default authSaga;