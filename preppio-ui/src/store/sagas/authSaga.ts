import { call, put, take, takeLatest, fork, cancel } from 'redux-saga/effects';
import { eventChannel, Task } from 'redux-saga';
import { supabase } from '../../services/supabase';
import { Session } from '@supabase/supabase-js';
import { EventChannel } from 'redux-saga';
import {
  setSession,
  checkSession,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges
} from '../slices/authSlice';

function* handleCheckSession() {
  try {
    const { data: { session } } = yield call([supabase.auth, 'getSession']);
    yield put(setSession(session));
  } catch (error) {
    console.error('Error checking session:', error);
  }
}

function createAuthChannel() {
  return eventChannel(emit => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      emit(session);
    });
    
    return () => subscription.unsubscribe();
  });
}

function* watchAuthStateChange() {
  const channel: EventChannel<Session | null> = yield call(createAuthChannel);

  try {
    while (true) {
      const session: Session | null = yield take(channel);
      yield put(setSession(session));
    }
  } finally {
    channel.close();
  }
}

function* authSaga() {
  // Start watching for session checks
  yield takeLatest(checkSession.type, handleCheckSession);
  
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