import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {RUN_API, receiveData} from "../actions/index"
import {runApi} from "./api";

function* callApi(action) {
    try {
        // yield call(delay, 1000);
        console.log('### saga.action=' + JSON.stringify(action));
        const request = {url: action.payload.url, method: action.payload.method, requestBody: action.payload.requestBody, requestHeaders: action.payload.requestHeaders};
        const data = yield call(runApi, request);
        yield put(receiveData(data));
    } catch (e) {
        yield put({type: "CALL_API_FAILED", message: e.message});
    }
}

function* rootSaga() {
    yield takeEvery(RUN_API, callApi);
}

export default rootSaga;