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

const data = {
    "k1": "v1",
    "k2": {
        "k21": "v21"
    }
};

let elem_final = [];
let elem_parts = <div><span>Yes!</span></div>;
let elem_form = <Form schema={schema}
                        onChange={log("changed")}
                        onSubmit={log("submitted")}
                        onError={log("errors")}/>;

elem_final.push(elem_parts);
elem_final.push(elem_form);

class App extends Component {
    adjust_api_result() {
        return <div id="api-root">Root!</div>;
    };

    createDom(data) {
        if (!data) return null;

        let contents = [];
        for (let key of Object.keys(data)) {
            let val = data[key];
            contents.push(React.createElement('dt', null, key));
            contents.push(React.createElement('dd', null, val && typeof val != "object" ? val : this.createDom(val)));
        }
        let dl = React.createElement('dl', null, contents);
        return dl;
    };

    return_two() {
        return 2;
    }
    render() {
        return (
            <div>
                {this.adjust_api_result()}
                {elem_final}
            </div>
        );
    };
}

export default App;
