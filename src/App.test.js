import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Return two', () => {
  const app = new App();
  const res = app.return_two();
  expect(res).toEqual(2);
});

it('Adjust api response', () => {
    const app = new App();
    const res = app.adjust_api_result();
    expect(res).toEqual(<div id="api-root">Root!</div>);
});

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
    const app = new App();
    expect(app.createDom(data)).toEqual(expected);
});

