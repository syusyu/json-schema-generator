import SchemaUI from '../components/response/SchemaUI'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {updateJsonSchema, UPDATE_JSON_SCHEMA} from "../actions";


const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e) => dispatch({
            type: UPDATE_JSON_SCHEMA, jsonSchema: e.target.value
        })
    };
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(SchemaUI)
