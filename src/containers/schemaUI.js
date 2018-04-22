import SchemaUI from '../components/response/SchemaUI'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {changeJsonSchema} from "../actions";

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({changeJsonSchema}, dispatch)
    };
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(SchemaUI)
