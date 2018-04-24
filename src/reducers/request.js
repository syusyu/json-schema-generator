import {RUN_API, RUN_API_MOCK, RECEIVE_DATA,
    CHANGE_URL, CHANGE_METHOD, CHANGE_REQUEST_BODY, CHANGE_REQUEST_HEADERS, CHANGE_JSON_SCHEMA} from "../actions/index"

const initialState = {
    url: 'http://5ac7331ac884c50014441b16.mockapi.io/api/v1/items',
    method: 'GET',
    responseBody: {},
    jsonSchema:
        'title: "",¥n' +
        'type: "object",¥n' +
        'required: ["title"],¥n' +
        'properties: {¥n' +
        '¥ttitle: {type: "string" , default: "A new task"},¥n' +
        '¥tdone: {type: "boolean", default: false},¥n' +
        '¥tselection: {type: "integer" },¥n' +
        '¥tstore: {¥n' +
        '¥t¥ttype: "object", title: "", properties: {¥n' +
        '¥t¥t"name": {type: "string", },¥n' +
        '¥t¥t"branches": {type: "array", title: "", items: {type: "object", properties: {¥n' +
        '¥t¥t"city": {type: "string"},¥n' +
        '¥t¥t"year": {type: "string"},¥n' +
        '¥t¥t"people": {type: "array", title: "", items: {type: "object", properties: {¥n' +
        '¥t¥t"name": {type: "string"},¥n' +
        '¥t¥t"age": {type: "integer"}}}}}}}}}}}'
    };

export default function request(state = initialState, action) {
    switch (action.type) {
        case RUN_API_MOCK:
            return {...state, responseBody: "{'foo': 'bar'}"};
        case RUN_API:
            return {...state};
        case RECEIVE_DATA:
            return {...state, responseBody: action.payload};
        case CHANGE_URL:
            return {...state, url: action.payload};
        case CHANGE_METHOD:
            return {...state, method: action.payload};
        case CHANGE_REQUEST_BODY:
            return {...state, requestBody: action.payload};
        case CHANGE_REQUEST_HEADERS:
            return {...state, requestHeaders: action.payload};
        case CHANGE_JSON_SCHEMA:
            return {...state, jsonSchema: action.payload};
        default:
            return state;
    }
}
