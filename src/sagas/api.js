/**
 * @param request should contains 'url' at least.
 * @returns {Promise<any>}
 */
export function runApi(request) {
    const params = makeInit(request);
    console.log('### runApi.param=' + JSON.stringify(params));
    return fetch(request.url, params).then(res => res.json()).catch(error => {console.error(error)});
};

export const makeInit = (request) => {
    const body = request.requestBody;
    let result = {
        method: request.method || 'GET',
        headers: makeHeaders(request),
        body: body,
        mode: 'cors',
        cache: 'no-cache' };
    if (!body || !validateJSON(body) || result.method === 'GET') {
        delete result.body;
    }
    return result;
};


export const makeHeaders = (request) => {
    let result = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let headersTxt = request.requestHeaders;
    if (!headersTxt || !validateJSON(headersTxt)) {
        return result;
    }

    const headers = JSON.parse(headersTxt);
    for (let key of Object.keys(headers)) {
        result[key] = headers[key];
    };
    return result;
};

export const validateJSON = (text) => {
    let result = true;
    try {
        JSON.parse(text);
    } catch (e) {
        result = false;
    }
    return result;
};

