import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = new App();

/**************** createDom ***********************/
const data = {
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
};
const expected =
    <dl>
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
    </dl>;

    const data2 = {
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
const expected2 =
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
    expect(app.createDom(data2)).toEqual(expected2);
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
        grandpa: {type: "object", title: "", properties: {
                "papa": {
                    type: "string", title: "I'm Papito"},
                "mama": {
                    type: "object", title: "", properties: {
                        "child": {
                            type: "string", title: "I'm a child"}}}}}
    }
};
const expectedKeys = [`title`, `done`, `selection`, `grandpa.papa`, `grandpa.mama.child`];

it('Get schema replace keys', () => {
    expect(app.schemaReplaceKeys(schema)).toEqual(expectedKeys);
});
