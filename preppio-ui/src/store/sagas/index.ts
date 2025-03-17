import { all } from 'redux-saga/effects';
import { interviewSaga } from './interviewSaga';
import authSaga from './authSaga';

function* rootSaga() {
  yield all([
    interviewSaga(),
    authSaga(),
  ]);
};

export default rootSaga;

