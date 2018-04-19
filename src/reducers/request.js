import {RUN_API_MOCK} from "../actions/index"

const initialState = {responseBody: '{"baz": "baz"}'}

export default function request(state = initialState, action) {
    switch (action.type) {
        case RUN_API_MOCK:
            return {responseBody: "{'foo': 'bar'}"}
        default:
            return state;
    }
}
