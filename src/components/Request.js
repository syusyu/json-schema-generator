import React, {Component} from "react";
import {render} from "react-dom";

class Request extends Component {
    render() {
        const {responseBody, actions} = this.props;
        return (
            <div class="request">
                <div>
                    <input type="text" name="url" size="100" />
                    <a href="#" onClick={actions.runApi}>Run</a>
                    <input type="button" name="send" value="SEND" />
                </div>
                <div class="request-parameter">
                    <div class="request-parameter__body">
                        Request Body:<br />
                        <textarea cols="50" rows="10"></textarea>
                    </div>
                    <div class="request-parameter__header">
                        Request Header:<br />
                        <textarea cols="50" rows="10"></textarea>
                    </div>
                </div>
            </div>
        );
    };
}

export default Request;

