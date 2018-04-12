import React, {Component} from "react";
import {render} from "react-dom";

import Form from "react-jsonschema-form";

const SCHEMA_GROUP = '_schemaGroup';

const data_sample = {
    "k1": "v1",
    "k2": "v2",
    "k3": {
        "k31": "v31",
        "k32": "v32",
        "k33": [
            {
                "k331": "v331",
                "k332": "v332",
            },
            {
                "k333": "v333",
                "k334": "v334",
            }
        ]
    }
};

const schema_sample = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        grandpa: {
            type: "object", title: "", properties: {
                "papa": {
                    type: "string", title: "I'm Papito"
                },
                "mama": {
                    type: "object", title: "", properties: {
                        "child": {
                            type: "string", title: "I'm a child"
                        }
                    }
                }
            }
        }
    }

};

const log = (type) => console.log.bind(console, type);


let elem_final = [];
let elem_parts = <div><span>Yes!</span></div>;
let elem_form = <Form schema={schema_sample} onChange={log("changed")} onSubmit={log("submitted")}
                      onError={log("errors")}/>;

elem_final.push(elem_parts);
elem_final.push(elem_form);

class App extends Component {
    createDom(data) {
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                elements.push(this.createDom(e));
            }
            return elements;
        } else {
            return this.doCreateDom(data);
        }
    };
    doCreateDom(data) {
        let elements = [];
        for (let key of Object.keys(data)) {
            let val = data[key];
            elements.push(React.createElement('dt', null, key));
            if (key.startsWith(SCHEMA_GROUP)) {
                elements.push(React.createElement('dd', null, val));
            } else {
                elements.push(React.createElement('dd', null, this.isArrayOrObject(val) ? this.createDom(val) : val));
            }
        }
        return React.createElement('dl', null, elements);
    };


    schemaReplaceKeys(data, keyPrefix) {
        let props = data.properties;
        let result = [];
        for (let key of Object.keys(props)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            let val = props[key];
            if (this.isSchemaTypeObject(val)) {
                result.push(...this.schemaReplaceKeys(val, wholeKey));
            } else {
                result.push(wholeKey);
            }
        }
        return result;
    };


    replaceDataBySchemaGroup(data, keyPrefix, keysForReplace, idxObj) {
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                elements.push(this.doReplaceDataBySchemaGroup(e, keyPrefix, keysForReplace, idxObj));
            }
            return elements;
        } else {
            return this.doReplaceDataBySchemaGroup(data, keyPrefix, keysForReplace, idxObj);
        }
    };
    doReplaceDataBySchemaGroup(data, keyPrefix, keysForReplace, idxObj) {
        let result = {};
        let isPrevReplacable = false;
        for (let key of Object.keys(data)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            let val = data[key];
            if (keysForReplace && keysForReplace.includes(wholeKey)) {
                let idx = isPrevReplacable ? idxObj.idx : ++idxObj.idx;
                let keysOfSchemaGroup = result[SCHEMA_GROUP + idx];
                result[SCHEMA_GROUP + idx] = keysOfSchemaGroup ? [...keysOfSchemaGroup, wholeKey] : [wholeKey];
                isPrevReplacable = true;
            } else {
                isPrevReplacable = false;
                result[key] = this.isArrayOrObject(val) ? this.replaceDataBySchemaGroup(val, wholeKey, keysForReplace, idxObj) : val;
            }
        }
        return result;
    };

    filterSchemaProps(data, filters, keyPrefix, addsForcibly) {
        if (!filters) {
            return data;
        }
        let result = {};
        for (let key of Object.keys(data)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            wholeKey = wholeKey.replace(/properties./g, '');

            let val = data[key];
            if (filters.includes(wholeKey)) {
                result[key] = val;
            } else if (this.containsStartsWith(wholeKey, filters) || key === 'properties') {
                result[key] = this.filterSchemaProps(val, filters, wholeKey, key !== 'properties');
            } else if (addsForcibly) {
                result[key] = val;
            }
        }
        return result;
    };

    containsStartsWith(wholeKey, filters) {
        for (let filter of filters) {
            if (filter.startsWith(wholeKey)) {
                return true;
            }
        }
        return false;
    };

    isArrayOrObject(val) {
        return (val && typeof val === 'object') || Array.isArray(val);
    };
    isObject(val) {
        return val && typeof val === 'object' && !Array.isArray(val);
    };
    isSchemaTypeObject(val) {
        return val && val.type === 'object';
    }

    render() {
        return (
            <div>
                {this.createDom(data_sample)}
            </div>
        );
    };
}

export default App;

