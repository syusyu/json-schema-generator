import {RUN_API, RUN_API_MOCK, RECEIVE_DATA, CHANGE_URL, CHANGE_METHOD, CHANGE_JSON_SCHEMA} from "../actions/index"

const initialState = {
    url: 'http://5ac7331ac884c50014441b16.mockapi.io/api/v1/items',
    method: 'GET',
    responseBody: {},
    jsonSchema: {
        title: "",
        type: "object",
        required: ["title"],
        properties: {
            title: {type: "string" , default: "A new task"},
            done: {type: "boolean", default: false},
            selection: {type: "integer" },
            store: {
                type: "object", title: "", properties: {
                    "name": {type: "string", },
                    "branches": {type: "array", title: "", items: {type: "object", properties: {
                                "city": {type: "string"},
                                "year": {type: "string"},
                                "people": {type: "array", title: "", items: {type: "object", properties: {
                                            "name": {type: "string"},
                                            "age": {type: "integer"}}}}}}}}}}}};

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
        case CHANGE_JSON_SCHEMA:
            return {...state, jsonSchema: action.payload ? JSON.parse(action.payload.replace(/\t/g, '')) : {}};
        default:
            return state;
    }
}
