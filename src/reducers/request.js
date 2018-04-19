import {RUN_API_MOCK, RECEIVE_DATA, UPDATE_JSON_SCHEMA} from "../actions/index"

const initialState = {responseBody: {}, jsonSchema: {}};

export default function request(state = initialState, action) {
    switch (action.type) {
        case RUN_API_MOCK:
            return {responseBody: "{'foo': 'bar'}"};
        case RECEIVE_DATA:
            console.log('###receive.action=' + JSON.stringify(action));
            return {responseBody: action.payload};
        case UPDATE_JSON_SCHEMA:
            console.log('###updateJsonSchema.jsonSchema=' + JSON.stringify(action));
            return {...state, jsonSchema: action.jsonSchema};
        default:
            return state;
    }
}
