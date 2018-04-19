import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {RUN_API, receiveData} from "../actions/index"

function* callApi(action) {
    try {
        yield call(delay, 1000);
        // const user = yield call(Api.fetchUser, action.payload.userId);
        const data = {"bar2": "bar2"};
        yield put(receiveData(data));
    } catch (e) {
        yield put({type: "CALL_API_FAILED", message: e.message});
    }
}

function* rootSaga() {
    yield takeEvery(RUN_API, callApi);
}

export default rootSaga;