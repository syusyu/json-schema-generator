import {SchemaUI} from '../components/response/SchemaUI'
import {connect} from 'react-redux'


export default connect(
    (store) => ({responseBody: store.responseBody})
)(SchemaUI)
