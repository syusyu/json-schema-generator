import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = new App();


/**************** createElement ***********************/
const data = {
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
const expected =
    <dl>
        <dt>k1</dt>
        <dd>v1</dd>
        <dt>k2</dt>
        <dd>v2</dd>
        <dt>k3</dt>
        <dd>
            <dl>
                <dt>k31</dt>
                <dd>v31</dd>
                <dt>k32</dt>
                <dd>v32</dd>
                <dt>k33</dt>
                <dd>
                    <dl>
                        <dt>k331</dt>
                        <dd>v331</dd>
                        <dt>k332</dt>
                        <dd>v332</dd>
                    </dl>
                    <dl>
                        <dt>k333</dt>
                        <dd>v333</dd>
                        <dt>k334</dt>
                        <dd>v334</dd>
                    </dl>
                </dd>
            </dl>
        </dd>
    </dl>;

it('Create Element', () => {
    expect(app.createElement(data)).toEqual(expected);
});

/**************** extractSchemaReplaceKeys ***********************/
const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        store: {
            type: "object", title: "", properties: {
                "name": {type: "string"},
                "branches": {type: "array", items: {type: "object", properties: {
                            "city": {type: "string"},
                            "year": {type: "string"},
                            "people": {type: "array", items: {type: "object", properties: {
                                        "name": {type: "string"},
                                        "age": {type: "integer"}}}}}}}}}}};
const schema2 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        store: {
            type: "object", title: "", properties: {
                "name": {type: "string"},
                "branches": {type: "array", items: [{"type": "string"}]}}}}};


const expectedKeys = ['title', 'done', 'selection', 'store.name', 'store.branches.city', 'store.branches.year', 'store.branches.people.name', 'store.branches.people.age'];
const expectedKeys2 = ['title', 'done', 'selection', 'store.name', 'store.branches'];

describe('Get schema replace keys', () => {
    it('schema1', () => {
        expect(app.extractSchemaReplaceKeys(schema)).toEqual(expectedKeys);
    });
    it('schema2', () => {
        expect(app.extractSchemaReplaceKeys(schema2)).toEqual(expectedKeys2);
    });
});

/**************** schemaGroup ***********************/
const replaceKeys = ['k1', 'k3.k31', 'k3.k33.k331', 'k3.k33.k333'];
const replaceKeys2 = ['k2', 'k3.k31', 'k3.k32', 'k3.k33.k331'];
const replaceKeys3 = ['k3.k33.k331', 'k3.k33.k332', 'k3.k33.k333', 'k3.k33.k334'];
const replaceKeys4 = [];
const replaceKeys5 = null;

const expectedReplaceData = {
    "_schemaGroup1": ['k1'],
    "k2": "v2",
    "k3": {
        "_schemaGroup2": ['k3.k31'],
        "k32": "v32",
        "k33": [
            {
                "_schemaGroup3": ['k3.k33.k331'],
                "k332": "v332",
            },
            {
                "_schemaGroup4": ['k3.k33.k333'],
                "k334": "v334",
            }
        ]
    }
};
const expectedReplaceData2 = {
    "k1": "v1",
    "_schemaGroup1": ['k2'],
    "k3": {
        "_schemaGroup2": ['k3.k31', 'k3.k32'],
        "k33": [
            {
                "_schemaGroup3": ['k3.k33.k331'],
                "k332": "v332",
            },
            {
                "k333": "v333",
                "k334": "v334",
            }
        ]
    }
};

const expectedReplaceData3 = {
    "k1": "v1",
    "k2": "v2",
    "k3": {
        "k31": "v31",
        "k32": "v32",
        "k33": [
            {
                "_schemaGroup1": ['k3.k33.k331', 'k3.k33.k332']
            },
            {
                "_schemaGroup2": ['k3.k33.k333', 'k3.k33.k334']
            }
        ]
    }
};

const expectedNonReplaceData = {
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

describe('Replace data by keys', () => {
    let idxObj = {idx: 0};
    it('Schema group 1', () => {
        idxObj.idx = 0;
        expect(app.replaceDataBySchemaGroup(data, '', replaceKeys, idxObj)).toEqual(expectedReplaceData);
    });
    it('Schema group 2', () => {
        idxObj.idx = 0;
        expect(app.replaceDataBySchemaGroup(data, '', replaceKeys2, idxObj)).toEqual(expectedReplaceData2);
    });
    it('Schema group 3', () => {
        idxObj.idx = 0;
        expect(app.replaceDataBySchemaGroup(data, '', replaceKeys3, idxObj)).toEqual(expectedReplaceData3);
    });
    it('Schema group 4', () => {
        idxObj.idx = 0;
        expect(app.replaceDataBySchemaGroup(data, '', replaceKeys4, idxObj)).toEqual(expectedNonReplaceData);
    });
    it('Schema group 5', () => {
        idxObj.idx = 0;
        expect(app.replaceDataBySchemaGroup(data, '', replaceKeys5, idxObj)).toEqual(expectedNonReplaceData);
    });
});

/**************** Filter schema properties ***********************/
const filterKeys = ['title', 'done', 'selection', 'store.name', 'store.branches.city', 'store.branches.year', 'store.branches.people.name', 'store.branches.people.age'];
const filterKeys2 = ['selection'];
const filterKeys3 = ['store.name'];
const filterKeys4 = ['store.branches.year', 'store.branches.people.age'];
const filterKeys5 = ['title', 'done', 'selection', 'store.name', 'store.branches'];
const filterKeys6 = ['store.branches'];

const expectedSchema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        store: {
            type: "object", title: "", properties: {
                "name": {type: "string"},
                "branches": {type: "array", items: {type: "object", properties: {
                            "city": {type: "string"},
                            "year": {type: "string"},
                            "people": {type: "array", items: {type: "object", properties: {
                                        "name": {type: "string"},
                                        "age": {type: "integer"}}}}}}}}}}};
const expectedSchema2 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        selection: {type: "integer", title: "Select!"}}};
const expectedSchema3 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        store: {
            type: "object", title: "", properties: {
                "name": {type: "string"}}}}};
const expectedSchema4 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        store: {
            type: "object", title: "", properties: {
                "branches": {type: "array", items: {type: "object", properties: {
                            "year": {type: "string"},
                            "people": {type: "array", items: {type: "object", properties: {
                                        "age": {type: "integer"}}}}}}}}}}};

const expectedSchema5 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"},
        store: {
            type: "object", title: "", properties: {
                "name": {type: "string"},
                "branches": {type: "array", items: [{"type": "string"}]}}}}};
const expectedSchema6 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        store: {
            type: "object", title: "", properties: {
                "branches": {type: "array", items: [{"type": "string"}]}}}}};

describe('Filter schema', () => {
    it('filter', () => {
        expect(app.filterSchemaProps(schema, filterKeys, '', true)).toEqual(expectedSchema);
    });
    it('filter2', () => {
        expect(app.filterSchemaProps(schema, filterKeys2, '', true)).toEqual(expectedSchema2);
    });
    it('filter3', () => {
        expect(app.filterSchemaProps(schema, filterKeys3, '', true)).toEqual(expectedSchema3);
    });
    it('filter4', () => {
        expect(app.filterSchemaProps(schema, filterKeys4, '', true)).toEqual(expectedSchema4);
    });
    it('filter5', () => {
        expect(app.filterSchemaProps(schema2, filterKeys5, '', true)).toEqual(expectedSchema5);
    });
    it('filter6', () => {
        expect(app.filterSchemaProps(schema2, filterKeys6, '', true)).toEqual(expectedSchema6);
    });
 });

/**************** Process data for making DOM ***********************/
const realData = {
    "title": "THIS iS A SAMPLE PAGE!",
    "done": false,
    "selection": 1,
    "grandpa": {
        "papa": "Hisito!",
        "mama": {
            "oki": "Yes, OKI!",
            "rio": [
                {"apple": "Fuji!"},
                {"fruit": {"name": "Ehime Orange!"}}]}}};
const realSchema = {
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
                    type: "object", title: "", properties: {
                        "rio": {
                            type: "array",
                            items: {
                                properties: {
                                    "fruit": {type: "object", properties: {
                                            name: {type: "string"}}}}}}}}}}}};
const schemaGroup = {
    title: "Todo", type: "object", required: ["title"], properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        selection: {type: "integer", title: "Select!"}
    }
};
const schemaGroup1= {
    title: "Todo", type: "object", required: ["title"], properties: {
        grandpa: {
            type: "object", title: "", properties: {
                "mama": {
                    type: "object", title: "", properties: {
                        "rio": {
                            type: "array", items: {
                                properties: {
                                    "fruit": {
                                        type: "object", properties: {
                                            name: {type: "string"}}}}}}}}}}}};
const expectedReplacedData = {
    "_schemaGroup1": {schema: schemaGroup},
    "grandpa": {
        "papa": "Hisito!",
        "mama": {
            "oki": "Yes, OKI!",
            "rio": [
                {"apple": "Fuji!"},
                {"fruit": {
                    "_schemaGroup2": {schema: schemaGroup1}}}]}}};


const realData2_array = {
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
const realSchema2 = {
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
                    type: "array", title: "", properties: {
                        "oki": {type: "string"},
                        "rio": {
                            type: "array",
                            items: {
                                properties: {
                                    "fruit": {type: "object", properties: {
                                            name: {type: "string"}}}}}}}}}}}};
const schemaGroup2= {
    title: "Todo", type: "object", required: ["title"], properties: {
        grandpa: {
            type: "object", title: "", properties: {
                "mama": {
                    type: "array", title: "", properties: {
                        "oki": {type: "string"}}}}}}};
const schemaGroup3= {
    title: "Todo", type: "object", required: ["title"], properties: {
        grandpa: {
            type: "object", title: "", properties: {
                "mama": {
                    type: "array", title: "", properties: {
                        "rio": {
                            type: "array", items: {
                                properties: {
                                    "fruit": {
                                        type: "object", properties: {
                                            name: {type: "string"}}}}}}}}}}}};
const expectedReplacedData2 = {
    "_schemaGroup1": {schema: schemaGroup},
    "grandpa": {
        "papa": "Hisito!",
        "mama": [
            {"_schemaGroup2": {schema: schemaGroup2}},
            {"rio": [
                {"apple": "Fuji!"},
                {"fruit": {
                        "_schemaGroup3": {schema: schemaGroup3}}}]}]}};


describe('Process data for making DOM', () => {
    it('object data', () => {
        expect(app.processDataForDom(realData, realSchema)).toEqual(expectedReplacedData);
    });
    it('array data', () => {
        expect(app.processDataForDom(realData2_array, realSchema2)).toEqual(expectedReplacedData2);
    });
})
