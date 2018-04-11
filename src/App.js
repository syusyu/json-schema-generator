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
            elements.push(React.createElement('dd', null, this.isArrayOrObject(val) ? this.createDom(val) : val));
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
    }
    doReplaceDataBySchemaGroup(data, keyPrefix, keysForReplace, idxObj) {
        let result = {};
        let isPrevReplacable = false;
        for (let key of Object.keys(data)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            let val = data[key];
            if (keysForReplace && keysForReplace.includes(wholeKey)) {
                let idx = isPrevReplacable ? idxObj.idx : ++idxObj.idx;
                result[SCHEMA_GROUP + idx] = idx;
                isPrevReplacable = true;
            } else {
                isPrevReplacable = false;
                result[key] = this.isArrayOrObject(val) ? this.replaceDataBySchemaGroup(val, wholeKey, keysForReplace, idxObj) : val;
            }
        }
        return result;
    }


    filterSchemaProps(data, filter, keyPrefix, isInsideProperties) {
        let result = {};
        for (let key of Object.keys(data)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            if (this.isPropertyRemoved(wholeKey, filter, isInsideProperties)) {
                continue;
            }
            let val = data[key];
            result[key] = this.isObject(val) ? this.filterSchemaProps(val, filter, wholeKey, this.isInsidePropertiesOn(key, isInsideProperties)) : val;
        }
        return result;
    };

    isPropertyRemoved(wholeKey, filter, isInsideProperties) {
        return isInsideProperties && (!filter || !filter.includes(wholeKey));
    };
    isInsidePropertiesOn(key, isInsideProperties) {
        return isInsideProperties || key === 'properties'
    }

    isArrayOrObject(val) {
        return (val && typeof val === 'object') || Array.isArray(val);
    };
    isObject(val) {
        return val && typeof val === 'object';
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
