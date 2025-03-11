import { all } from 'redux-saga/effects';
import { interviewSaga } from './interviewSaga';

function* rootSaga() {
  yield all([
    interviewSaga(),
  ]);
};

export default rootSaga;

