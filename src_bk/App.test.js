import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = new App();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('Adjust api response', () => {
    const res = app.adjust_api_result();
    expect(res).toEqual(<div id="api-root">Root!</div>);
});

/**************** createDom ***********************/
const data = {
    "k1": "v1",
    "k2": {
        "k21": "v21"
    }
};
const expected =
    <dl>
      <dt>k1</dt>
        <dd>v1</dd>
      <dt>k2</dt>
        <dd>
          <dl>
              <dt>k21</dt>
                <dd>v21</dd>
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

// it('Get schema replace keys', () => {
//     expect(app.schemaReplaceKeys(schema)).toEqual(expectedKeys);
// });
