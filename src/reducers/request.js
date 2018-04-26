import {
    RUN_API, RECEIVE_DATA,
    CHANGE_URL, CHANGE_METHOD, CHANGE_REQUEST_BODY, CHANGE_REQUEST_HEADERS, CHANGE_JSON_SCHEMA
} from "../actions/index"

const pureJsonSchema = "{" +
    '"title": "",' +
    '"type": "object",' +
    '"required": ["title"],' +
    '"properties": {' +
    '"title": {"type": "string" , "default": "A new task"},' +
    '"done": {"type": "boolean", "default": false},' +
    '"selection": {"type": "integer" },' +
    '"store": {' +
    '"type": "object", "title": "", "properties": {' +
    '"name": {"type": "string"},' +
    '"branches": {"type": "array", "title": "", "items": {"type": "object", "properties": {' +
    '"city": {"type": "string"},' +
    '"year": {"type": "string"},' +
    '"people": {"type": "array", "title": "", "items": {"type": "object", "properties": {' +
    '"name": {"type": "string"},' +
    '"age": {"type": "integer"}}}}}}}}}}}';


const initialState = {
    url: 'http://5ac7331ac884c50014441b16.mockapi.io/api/v1/stores/1',
    method: 'GET',
    requestBody: '{"id": 100, "name": "created by app"}',
    responseBody: {},
    jsonSchema: JSON.stringify(JSON.parse(pureJsonSchema), null, '\t')
};

export default function request(state = initialState, action) {
    switch (action.type) {
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
