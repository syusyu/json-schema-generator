import {runApi, makeHeaders, makeInit, validateJSON} from "./api";

const headers = new Headers();
headers.append('k1', 'v1');
headers.append('Content-Type','application/json');

describe('Make headers', () => {
    it('normal', () => {
        const actualHeaders = makeHeaders({requestHeaders: '{"k1": "v1"}'});
        for (const k of Object.keys(actualHeaders)) {
            expect(actualHeaders[k]).toEqual(headers.get(k));
        };
        expect(Object.keys(actualHeaders).length).toEqual(2);

    });
});

describe('Make init', () => {
    var expected = {
        body: '{"k1": "v1"}',
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache' };
   it('normal', () => {
       let actual = makeInit({requestBody: '{"k1": "v1"}'});
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
