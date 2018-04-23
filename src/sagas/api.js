/**
 * @param request should contains 'url' at least.
 * @returns {Promise<any>}
 */
export function runApi(request) {
    console.log('### runApi is called. request=' + JSON.stringify(request));
    var myRequest = new Request(request.url, makeInit(request));
    return fetch(myRequest).then(res => res.json()).catch(error => {console.error(error)});
};

export const makeInit = (request) => {
    var result = {
        method: request.method || 'GET',
        headers: makeHeaders(request),
        mode: 'cors',
        cache: 'no-cache' };
    return request.body ? Object.assign({body: request.body}, result) : result;
};

export const makeHeaders = (request) => {
    var result = new Headers();
    result.append('Content-Type', 'application/json');
    if (request.headers) {
        for (const [key, value] of Object.entries(request.headers)) {
            result.append(key, value);
        };
    }
    return result;
};
