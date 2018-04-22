import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {RUN_API, receiveData} from "../actions/index"
import {runApi} from "./api";

// const data = {
//     "title": "THIS iS A SAMPLE PAGE!",
//     "done": false,
//     "selection": 1,
//     "store": {
//         "name": "API store",
//         "branches": [
//             {"city": "Tokyo", "year": "10 years", "people": [
//                     {"name": "Oka", "age": 40}, {"name": "Oka2", "age": 42}]},
//             {"city": "SG", "year": "5 years", "people": [
//                     {"name": "Non", "age": 39}, {"name": "Non2", "age": 41}]}]}};

function* callApi(action) {
    try {
        // yield call(delay, 1000);
        // const request = {url: 'http://5ac7331ac884c50014441b16.mockapi.io/api/v1/items', method: 'GET'};
        console.log('###action=' + JSON.stringify(action));
        const request = {url: action.payload.url, method: action.payload.method};
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