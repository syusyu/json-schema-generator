import React, {Component} from "react";

class Request extends Component {
    render() {
        const {responseBody, actions} = this.props;
        return (
            <div className="request">
                <div>
                    <input type="text" name="url" size="100" />
                    <a href="#" onClick={actions.runApiMock}>Mock RUN</a>
                    &nbsp;&nbsp;
                    <a href="#" onClick={actions.runApi}>RUN</a>
                </div>
                <div className="request-parameter">
                    <div className="request-parameter__body">
                        Request Body:<br />
                        <textarea cols="50" rows="10"></textarea>
                    </div>
                    <div className="request-parameter__header">
                        Request Header:<br />
                        <textarea cols="50" rows="10"></textarea>
                    </div>
                </div>
            </div>
        );
    };
}

export default Request;


