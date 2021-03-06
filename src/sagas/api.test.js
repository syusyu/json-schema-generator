import {runApi, makeHeaders, makeInit, validateJSON} from "./api";

const expectedHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'k1': 'v1'
};
describe('Make headers', () => {
    it('normal', () => {
        expect(makeHeaders({requestHeaders: '{"k1": "v1"}'})).toEqual(expectedHeaders);

    });
});

describe('Make init', () => {
    var expected = {
        body: '{"k1": "v1"}',
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache' };
   it('normal', () => {
       let actual = makeInit({method: 'POST', requestBody: '{"k1": "v1"}'});
       delete actual.headers;
       expect(actual).toEqual(expected);
   });
});

describe('Validate json', () => {
    const cases = [
        ['{}', true], ['{"a": "b"}', true], ['{a: b}', false], ['', false], ['{a:', false], ['{"k1": "v1"}', true]
    ];
    cases.forEach(([k, v]) => {
        it(k, () => {
            expect(validateJSON(k)).toEqual(v);
        });
    });
});
