/**
 * @param request should contains 'url' at least.
 * @returns {Promise<any>}
 */
export function runApi(request) {
    const params = makeInit(request);
    var data = new FormData();
    return fetch(request.url, params).then(res => res.json()).catch(error => {console.error(error)});
};

export const makeInit = (request) => {
    let result = {
        method: request.method || 'GET',
        headers: makeHeaders(request),
        mode: 'cors',
        cache: 'no-cache' };
    const body = request.requestBody;
    if (body && validateJSON(body)) {
        let data = new FormData();
        data.append("json", body);
        result = Object.assign({body: data}, result);
    }
    return result;
    // return body && validateJSON(body) ? Object.assign({body: body}, result) : result;

};


export const makeHeaders = (request) => {
    let result = JSON.parse('{"Content-Type": "application/json"}');
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

