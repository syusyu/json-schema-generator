import {runApi, makeHeaders, makeInit} from "./api";

const headers = new Headers();
headers.append('k1', 'v1');
headers.append('Content-Type','application/json');

describe('Make headers', () => {
    it('normal', () => {
        const actualHeaders = makeHeaders({headers: {'k1': 'v1'}});
        actualHeaders.entries((k, v) => {
            expect(v).toEqual(headers.get(k));
        })
        expect(actualHeaders.values().length).toEqual(headers.values().length);

    });
});

describe('Make init', () => {
    var expected = {
        body: {'k1': 'v1'},
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache' };
   it('normal', () => {
       let actual = makeInit({body: {'k1': 'v1'}});
       delete actual.headers;
       expect(actual).toEqual(expected);
   });
});