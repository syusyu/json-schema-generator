import React, {Component} from "react";

class Request extends Component {
    render() {
        const {url, method, body, headers, actions} = this.props;
        return (
            <div className="request">
                <div>
                    <input type="text" value={url} size="100" onChange={e => actions.changeUrl(e.target.value)} />
                    <select value={method} onChange={e => actions.changeMethod(e.target.value)}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select>
                    <a href="#" onClick={() => actions.runApi({url: url, method: method, body: body, headers: headers})}>RUN</a>
                </div>
                <div className="request-parameter">
                    <div className="request-parameter__body">
                        Request Body:<br/>
                        <textarea cols="50" rows="10" onChange={e => actions.changeBody(e.target.value)}></textarea>
                    </div>
                    <div className="request-parameter__header">
                        Request Header:<br/>
                        <textarea cols="50" rows="10" onChange={e => actions.changeHeaders(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
        );
    };
}

export default Request;


