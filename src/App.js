import React, {Component} from "react";
import {render} from "react-dom";

import Form from "react-jsonschema-form";

const SCHEMA_GROUP = '_schemaGroup';

const data_sample = {
    title: "THIS iS A SAMPLE PAGE!",
    done: false,
    selection: 1,
    grandpa: {
        "papa": "Hisito!",
        "mama": [
            {"oki": "Yes, OKI!"},
            {"rio": [
                    {"apple": "Fuji!"},
                    {"fruit": {name: "Ehime Orange!"}}]}]}};

const schema_sample = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        grandpa: {
            type: "object",
            title: "",
            properties: {
                "mama": {
                    type: "array", title: "", items: {
                        "oki": {type: "string", title: "I'm OKI"},
                        "rio": {
                            type: "array",
                            items: {
                                "fruit": {type: "object", properties: {
                                        name: {type: "string"}}}}}}}}}}};

const log = (type) => console.log.bind(console, type);


let elem_final = [];
let elem_parts = <div><span>Yes!</span></div>;
let elem_form = <Form schema={schema_sample} onChange={log("changed")} onSubmit={log("submitted")}
                      onError={log("errors")}/>;

elem_final.push(elem_parts);
elem_final.push(elem_form);

class App extends Component {
    createDom(data, schema) {
        data = schema ? this.processDataForDom(data, schema) : data;
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                elements.push(this.doCreateDom(e));
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
                console.log('####### schema=' + JSON.stringify(val));
                elements.push(React.createElement('dd', null, <Form schema={val} />));
            } else {
                elements.push(React.createElement('dd', null, this.isArrayOrObject(val) ? this.createDom(val) : val));
            }
        }
        return React.createElement('dl', null, elements);
    };


    processDataForDom(data, schema) {
        let keysReplacedBySchema = this.extractSchemaReplaceKeys(schema);
        let dataReplacedBySchemaGroup = this.replaceDataBySchemaGroup(data, '', keysReplacedBySchema);
        return this.insertSchemaIntoData(dataReplacedBySchemaGroup, schema);
    }
    insertSchemaIntoData(data, schema) {
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                elements.push(this.doInsertSchemaIntoData(e, schema));
            }
            return elements;
        } else {
            return this.doInsertSchemaIntoData(data, schema);
        }
    };
    doInsertSchemaIntoData(data, schema) {
        let result = {};
        for (let key of Object.keys(data)) {
            let val = data[key];
            if (key.startsWith(SCHEMA_GROUP)) {
                result[key] = this.filterSchemaProps(schema, val, '', true);
            } else {
                result[key] = this.isArrayOrObject(val) ? this.insertSchemaIntoData(val, schema) : val;
            }
        }
        return result;
    };

    extractSchemaReplaceKeys(data, keyPrefix) {
        let props = this.extractProps(data);
        let result = [];
        for (let key of Object.keys(props)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            let val = props[key];
            if (this.isSchemaTypeArrayOrObject(val)) {
                result.push(...this.extractSchemaReplaceKeys(val, wholeKey));
            } else {
                result.push(wholeKey);
            }
        }
        return result;
    };
    extractProps(data) {
        let result = {};
        if (this.isSchemaTypeObject(data)) {
            result = data.properties;
        } else if (this.isSchemaTypeArray(data)) {
            result = data.properties;
            result = result ? result : data.items;
            if (result) {
                result = result.properties ? result.properties : result;
            }
        }
        if (!result) {
            console.error('data is NOT object nor array. data=' + JSON.stringify(data));
        }
        return result;
    }


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
                idxObj = idxObj ? idxObj : {idx: 0};
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
            wholeKey = wholeKey.replace(/properties\./g, '').replace(/\.items\./g, '\.');

            let val = data[key];
            if (filters.includes(wholeKey)) {
                result[key] = val;
            } else if (this.containsStartsWith(wholeKey, filters) || key === 'properties' || key === 'items') {
                result[key] = this.filterSchemaProps(val, filters, wholeKey, (key !== 'properties' && key !== 'items'));
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
    isSchemaTypeArrayOrObject(val) {
        return val && (val.type === 'object' || val.type === 'array');
    }
    isSchemaTypeObject(val) {
        return val && val.type === 'object';
    }
    isSchemaTypeArray(val) {
        return val && val.type === 'array';
    }

    render() {
        return (
            <div>
                {this.createDom(data_sample, schema_sample)}
            </div>
        );
    };
}

export default App;

