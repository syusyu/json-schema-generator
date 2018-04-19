import SchemaUI from '../components/response/SchemaUI'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {updateJsonSchema} from "../actions";


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({updateJsonSchema}, dispatch)
    }
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(SchemaUI)
