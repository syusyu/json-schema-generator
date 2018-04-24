import React, {Component} from "react";

class Request extends Component {
    render() {
        const {url, method, requestBody, requestHeaders, actions} = this.props;
        return (
            <div className="request">
                <div>
                    <input type="text" value={url} size="100" onChange={e => actions.changeUrl(e.target.value)} />
                    <select value={method} onChange={e => actions.changeMethod(e.target.value)}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select>
                    <a href="#" onClick={() =>
                        actions.runApi({url: url, method: method, requestBody: requestBody, requestHeaders: requestHeaders})}>RUN</a>
                </div>
                <div className="request-parameter">
                    <div className="request-parameter__body">
                        Request Body:<br/>
                        <textarea id="request-body" cols="50" rows="10" value={requestBody}
                                  disabled={method !== 'POST'} defaultValue="ddd"
                                  onChange={e => actions.changeRequestBody(e.target.value)}></textarea>
                    </div>
                    <div className="request-parameter__header">
                        Request Header:<br/>
                        <textarea cols="50" rows="10" value={requestHeaders}
                                  onChange={e => actions.changeRequestHeaders(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
        );
    };
}

export default Request;


