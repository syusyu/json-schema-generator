import { createAction } from "redux-actions";

export const RUN_API_MOCK = 'RUN_API_MOCK';
export const RUN_API = 'RUN_API';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const runApiMock = createAction(RUN_API_MOCK);
export const runApi = createAction(RUN_API);
export const receiveData = createAction(RECEIVE_DATA);


