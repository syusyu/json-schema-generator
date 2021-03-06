import React, {Component} from "react";
import Form from "react-jsonschema-form";
import {validateJSON} from "../../utils/JSONUtilities";

const SCHEMA_GROUP = '_schemaGroup';

const data_sample = {};
const data_sample3 = {
    "title": "THIS iS A SAMPLE PAGE!",
    "done": false,
    "selection": 1,
    "store": {
        "name": "API store",
        "branches": [
            {"city": "Tokyo", "year": "10 years", "people": [
                    {"name": "Oka", "age": 40}, {"name": "Oka2", "age": 42}]},
            {"city": "SG", "year": "5 years", "people": [
                    {"name": "Non", "age": 39}, {"name": "Non2", "age": 41}]}]}};
const data_sample2 = {
    "title": "THIS iS A SAMPLE PAGE!",
    "done": false,
    "selection": 1,
    "store": {
        "name": "API store",
        "branches": ["Tokyo", "Singapore"]}};

const schema_sample2 = {
    title: "",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "", default: "A new task"},
        done: {type: "boolean", title: "", default: false},
        selection: {type: "integer", title: ""},
        store: {
            type: "object", title: "", properties: {
                "branches": {type: "array", items: {type: "object", properties: {
                            "people": {type: "array", items: {type: "object", properties: {
                                        "age": {type: "integer"}}}}}}}}}}};
const schema_sample = {};
const schema_sample3 = {
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
                                        "age": {type: "integer"}}}}}}}}}}};

const uiSchema = {
    "ui:title": "",
    "ui:options":  {
        addable: false,
        removable: false
    }
};
const log = (type) => console.log.bind(console, type);



class SchemaUI extends Component {
    build(data, schemaTxt) {
        let processedData = validateJSON(schemaTxt) ? this.processDataForDom(data, JSON.parse(schemaTxt)) : data;
        return this.createElement(processedData, data);
    }

    createElement(data, wholeData) {
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                elements.push(this.doCreateElement(e, wholeData));
            }
            return elements;
        } else {
            return this.doCreateElement(data, wholeData);
        }
    };
    doCreateElement(data, wholeData) {
        let elements = [];
        for (let key of Object.keys(data)) {
            let val = data[key];
            if (key.startsWith(SCHEMA_GROUP)) {
                // console.log('####### schema=' + JSON.stringify(val.schema) + ' ##### data=' + JSON.stringify(val.data));
                elements.push(React.createElement('dt', {className: "schema"}, ''));
                elements.push(React.createElement('dd', null,
                    <Form schema={val.schema} formData={val.data} uiSchema={uiSchema}></Form>));
            } else {
                elements.push(React.createElement('dt', null, key));
                elements.push(React.createElement('dd', null, this.isArrayOrObject(val) ? this.createElement(val, wholeData) : (val ? val : '--')));
            }
        }
        return React.createElement('dl', null, elements);
    };
    doCreateTableElement(data, wholeData) {
        let elements = [];
        for (let key of Object.keys(data)) {
            let val = data[key];
            if (key.startsWith(SCHEMA_GROUP)) {
                elements.push(React.createElement('th', {className: "schema"}, ''));
                elements.push(React.createElement('td', null,
                    <Form schema={val.schema} formData={val.data} uiSchema={uiSchema}></Form>));
            } else {
                elements.push(React.createElement('th', null, key));
                elements.push(React.createElement('td', null, this.isArrayOrObject(val) ? this.createElement(val, wholeData) : (val ? val : '--')));
            }
        }
        return React.createElement('table', null, React.createElement('tr', null, elements));
    };


    processDataForDom(data, schema) {
        let keysReplacedBySchema = this.extractSchemaReplaceKeys(schema);
        let dataReplacedBySchemaGroup = this.replaceDataBySchemaGroup(data, '', keysReplacedBySchema);
        return this.insertSchemaIntoData(dataReplacedBySchemaGroup, schema, data);
    }
    insertSchemaIntoData(data, schema, wholeData) {
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                elements.push(this.doInsertSchemaIntoData(e, schema, wholeData));
            }
            return elements;
        } else {
            return this.doInsertSchemaIntoData(data, schema, wholeData);
        }
    };
    doInsertSchemaIntoData(data, schema, wholeData) {
        let result = {};
        for (let key of Object.keys(data)) {
            let val = data[key];
            if (key.startsWith(SCHEMA_GROUP)) {
                let keys = val.map(e => Object.keys(e)[0]);
                result[key] = {schema: this.filterSchemaProps(schema, keys, '', true), data: this.filterData(wholeData, val)};
            } else {
                result[key] = this.isArrayOrObject(val) ? this.insertSchemaIntoData(val, schema, wholeData) : val;
            }
        }
        return result;
    };

    extractSchemaReplaceKeys(data, keyPrefix) {
        let props = this.extractProps(data);
        if (!props) {
            return null;
        }
        let result = [];
        for (let key of Object.keys(props)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            let val = props[key];
            if (this.isSchemaTypeArrayOrObject(val)) {
                let subElements = this.extractSchemaReplaceKeys(val, wholeKey);
                if (subElements) {
                    result.push(...subElements);
                } else {
                    result.push(wholeKey);
                }
            } else {
                result.push(wholeKey);
            }
        }
        return result;
    };
    extractProps(data) {
        if (this.isSchemaTypeObject(data)) {
            return data.properties;
        }
        if (this.isSchemaTypeArray(data)) {
            if (data.properties) {
                return data.properties;
            }
            if (data.items && data.items.properties) {
                return data.items.properties;
            }
        }
        return null;
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
                result[SCHEMA_GROUP + idx] = keysOfSchemaGroup ? [...keysOfSchemaGroup, {[wholeKey]: val}] : [{[wholeKey]: val}];
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
            wholeKey = wholeKey.replace(/properties./g, '').replace(/.items./g, '.');

            let val = data[key];
            if (filters.includes(wholeKey)) {
                result[key] = val;
            } else if (this.isFilterStartsWithKey(wholeKey, filters) || key === 'properties' || key === 'items') {
                result[key] = this.filterSchemaProps(val, filters, wholeKey, (key !== 'properties' && key !== 'items'));
            } else if (addsForcibly) {
                result[key] = val;
            } else if (key === 'type') {
                result[key] = val;
            }
        }
        return result;
    };

    filterData(data, filters, keyPrefix) {
        if (!filters) {
            return data;
        }
        if (Array.isArray(data)) {
            let elements = [];
            for (let e of data) {
                let element = this.doFilterData(e, filters, keyPrefix);
                if (!this.isEmpty(element)) {
                    elements.push(element);
                }
            }
            return elements;
        } else {
            return this.doFilterData(data, filters, keyPrefix);
        }
    };
    doFilterData(data, filters, keyPrefix) {
        let result = {};
        for (let key of Object.keys(data)) {
            let wholeKey = keyPrefix ? keyPrefix + '.' + key: key;
            let val = data[key];
            if (this.isFilterIncludesEntry(wholeKey, val, filters)) {
                result[key] = val;
            } else if (this.isFilterStartsWithEntryKey(wholeKey, filters) ) {
                let child = this.filterData(val, filters, wholeKey);
                if (!this.isEmpty(child)) {
                    result[key] = child;
                }
            }
        }
        return result;
    };

    isEmpty(obj) {
        if (!obj) {
            return true;
        }
        let strObj = JSON.stringify(obj);
        return strObj === JSON.stringify({}) || obj.length === 0;
    };

    isFilterIncludesEntry(wholeKey, val, filters) {
        for (let filter of filters) {
            let filterKey = Object.keys(filter)[0];
            let filterVal = filter[filterKey];
            if (filterKey === wholeKey && val === filterVal) {
                return true;
            }
        }
        return false;
    };
    isFilterStartsWithEntryKey(wholeKey, filters) {
        for (let filter of filters) {
            let filterKey = Object.keys(filter)[0];
            if (filterKey.startsWith(wholeKey)) {
                return true;
            }
        }
        return false;
    };
    isFilterStartsWithKey(wholeKey, filters) {
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
    };
    isSchemaTypeObject(val) {
        return val && val.type === 'object';
    };
    isSchemaTypeArray(val) {
        return val && val.type === 'array';
    };

    render() {
        const {responseBody, jsonSchema, actions} = this.props;
        return (
            <div>
                <div>
                    {this.build(responseBody, jsonSchema)}
                </div>
                <div>
                    JSON Schema:<br />
                    <textarea cols="110" rows="60" value={jsonSchema}
                              onChange={e => actions.changeJsonSchema(e.target.value)}></textarea>
                </div>
            </div>
        );
    };
}

export default SchemaUI;

