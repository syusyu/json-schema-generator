import React, {Component} from "react";
import {render} from "react-dom";

import Form from "react-jsonschema-form";

const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        grandpa: {type: "object", title: "", properties: {
            "papa": {
                type: "string", title: "I'm Papito"},
            "mama": {
                type: "object", title: "", properties: {
                    "child": {
                        type: "string", title: "I'm a child"}}}}}
    }
};

const log = (type) => console.log.bind(console, type);

class App extends Component {
    render() {
        return (
            <Form schema={schema}
                  onChange={log("changed")}
                  onSubmit={log("submitted")}
                  onError={log("errors")}/>
        );
    };
}

export default App;
