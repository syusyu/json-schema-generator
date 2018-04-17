import React, {Component} from "react";
import {render} from "react-dom";

class Request extends Component {
    render() {
        return (
            <div>
                <div>
                    <input type="text" name="url" size="100" />
                    <input type="button" name="send" value="SEND" />
                </div>
                <div>
                    Request Body:<br />
                    <textarea cols="50" rows="10"></textarea><br />

                    Request Header:<br />
                    <textarea cols="50" rows="10"></textarea>
                </div>
            </div>
        );
    };
}

export default Request;
