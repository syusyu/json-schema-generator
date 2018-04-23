import { createAction } from "redux-actions";

export const CHANGE_URL = 'CHANGE_URL';
export const CHANGE_METHOD = 'CHANGE_METHOD';
export const CHANGE_BODY = 'CHANGE_BODY';
export const CHANGE_HEADERS = 'CHANGE_HEADERS';
export const CHANGE_JSON_SCHEMA = 'CHANGE_JSON_SCHEMA';
export const RUN_API_MOCK = 'RUN_API_MOCK';
export const RUN_API = 'RUN_API';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const runApiMock = createAction(RUN_API_MOCK);
export const runApi = createAction(RUN_API);
export const receiveData = createAction(RECEIVE_DATA);
export const changeUrl = createAction(CHANGE_URL);
export const changeMethod = createAction(CHANGE_METHOD);
export const changeBody = createAction(CHANGE_BODY);
export const changeHeaders = createAction(CHANGE_HEADERS);
export const changeJsonSchema = createAction(CHANGE_JSON_SCHEMA);


