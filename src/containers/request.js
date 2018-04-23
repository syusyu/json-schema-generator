import Request from '../components/Request'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeUrl, changeMethod, changeBody, changeHeaders, runApiMock, runApi} from '../actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({changeUrl, changeMethod, changeBody, changeHeaders, runApiMock, runApi}, dispatch)
    }
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(Request)
