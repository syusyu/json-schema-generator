import {RUN_API_MOCK, RECEIVE_DATA, UPDATE_JSON_SCHEMA} from "../actions/index"

const initialState = {responseBody: {}, jsonSchema: {
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
        case RECEIVE_DATA:
            console.log('###receive.action=' + JSON.stringify(action));
            return {...state, responseBody: action.payload};
        case UPDATE_JSON_SCHEMA:
            console.log('###updateJsonSchema.action=' + JSON.stringify(action));
            return {...state, jsonSchema: action.payload ? JSON.parse(action.payload.replace(/\t/g, '')) : {}};
        default:
            return state;
    }
}
