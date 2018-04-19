import Request from '../components/Request'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {runApiMock, runApi} from '../actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({runApiMock, runApi}, dispatch)
    }
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(Request)
