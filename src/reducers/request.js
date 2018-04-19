import {RUN_API_MOCK} from "../actions/index"
import {RECEIVE_DATA} from "../actions";

// const initialState = {responseBody: '{"baz": "baz"}'}
const initialState = {};

export default function request(state = initialState, action) {
    switch (action.type) {
        case RUN_API_MOCK:
            return {responseBody: "{'foo': 'bar'}"};
        case RECEIVE_DATA:
            console.log('###receive.action=' + JSON.stringify(action));
            return {responseBody: action.payload};
        default:
            return state;
    }
}
