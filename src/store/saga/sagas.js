import { call, put, takeEvery } from 'redux-saga/effects';
import { addRoute } from '../pointsSlice';
import fetchRoute from '../../api';

function* fetchRouteData({ payload: { startPoints, endPoints } }) {
  try {
    const response = yield call(fetchRoute, { startPoints, endPoints });
    const result = yield response.json();

    yield put(addRoute(result?.routes?.[0]?.geometry?.coordinates));
  } catch (e) {
    yield put({type: "ROUTE_FETCH_FAILED", message: e.message});
  }
}

function* mySaga() {
  yield takeEvery("ROUTE_FETCH_REQUESTED", fetchRouteData);
}

export default mySaga;
