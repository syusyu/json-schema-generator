import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = new App();

/**************** createDom ***********************/
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

it('Create DOM', () => {
    expect(app.createDom(data)).toEqual(expected);
});

/**************** schemaReplaceKeys ***********************/
const schema = {
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
                        "oki": {
                            type: "string", title: "I'm a child"
                        },
                        "rio": {
                            type: "array",
                            items: {
                                properties: {
                                    "apple": {
                                        type: "string", title: "I like an apple"
                                    },
                                    "orange": {
                                        type: "string", title: "I like an orange"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
const expectedKeys = [`title`, `done`, `selection`, `grandpa.papa`, `grandpa.mama.oki`, `grandpa.mama.rio`];

it('Get schema replace keys', () => {
    expect(app.schemaReplaceKeys(schema, '')).toEqual(expectedKeys);
});

/**************** schemaGroup ***********************/
const replaceKeys = ['k1', 'k3.k31', 'k3.k33.k331', 'k3.k33.k333'];
const replaceKeys2 = ['k2', 'k3.k31', 'k3.k32', 'k3.k33.k331'];
const replaceKeys3 = ['k3.k33.k331', 'k3.k33.k332', 'k3.k33.k333', 'k3.k33.k334'];
const replaceKeys4 = [];
const replaceKeys5 = null;

const expectedReplaceData = {
    "_schemaGroup1": 1,
    "k2": "v2",
    "k3": {
        "_schemaGroup2": 2,
        "k32": "v32",
        "k33": [
            {
                "_schemaGroup3": 3,
                "k332": "v332",
            },
            {
                "_schemaGroup4": 4,
                "k334": "v334",
            }
        ]
    }
};
const expectedReplaceData2 = {
    "k1": "v1",
    "_schemaGroup1": 1,
    "k3": {
        "_schemaGroup2": 2,
        "k33": [
            {
                "_schemaGroup3": 3,
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
                "_schemaGroup1": 1
            },
            {
                "_schemaGroup2": 2
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

let idxObj = {idx: 0};
it('Replace data by keys', () => {
    idxObj.idx = 0;
    expect(app.replaceDataBySchemaGroup(data, '', replaceKeys, idxObj)).toEqual(expectedReplaceData);
    idxObj.idx = 0;
    expect(app.replaceDataBySchemaGroup(data, '', replaceKeys2, idxObj)).toEqual(expectedReplaceData2);
    idxObj.idx = 0;
    expect(app.replaceDataBySchemaGroup(data, '', replaceKeys3, idxObj)).toEqual(expectedReplaceData3);
    idxObj.idx = 0;
    expect(app.replaceDataBySchemaGroup(data, '', replaceKeys4, idxObj)).toEqual(expectedNonReplaceData);
    idxObj.idx = 0;
    expect(app.replaceDataBySchemaGroup(data, '', replaceKeys5, idxObj)).toEqual(expectedNonReplaceData);
});



