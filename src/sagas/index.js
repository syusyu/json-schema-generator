import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {RUN_API} from "../actions/index"

function* callApi(action) {
    try {
        yield call(delay, 3000);
        // const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({"bar2": "bar2"});
    } catch (e) {
        yield put({type: "CALL_API_FAILED", message: e.message});
    }
}

function* rootSaga() {
    yield takeEvery(RUN_API, callApi);
}

export default rootSaga;