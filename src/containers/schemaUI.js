import SchemaUI from '../components/response/SchemaUI'
import {connect} from 'react-redux'


export default connect(
    (store) => (store.request)
)(SchemaUI)
