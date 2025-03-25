import { all } from 'redux-saga/effects';
import { interviewSaga } from './interviewSaga';
import authSaga from './authSaga';
import { googleDriveSaga } from './googleDriveSaga';
function* rootSaga() {
  yield all([
    interviewSaga(),
    authSaga(),
    googleDriveSaga(),
  ]);
};

export default rootSaga;

