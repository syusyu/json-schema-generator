import {RUN_API} from '../constants/ActionTypes'

const initialState = {responseBody: '{"baz": "baz"}'}

export default function request(state = initialState, action) {
    switch (action.type) {
        case RUN_API:
            return {responseBody: "{'foo': 'bar'}"}
        default:
            return state;
    }
}
