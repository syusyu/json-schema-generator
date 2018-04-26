import Request from '../components/Request'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeUrl, changeMethod, changeRequestBody, changeRequestHeaders, runApi} from '../actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({changeUrl, changeMethod, changeRequestBody, changeRequestHeaders, runApi}, dispatch)
    }
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(Request)
