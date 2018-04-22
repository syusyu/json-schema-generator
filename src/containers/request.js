import Request from '../components/Request'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeUrl, changeMethod, runApiMock, runApi} from '../actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({changeUrl, changeMethod, runApiMock, runApi}, dispatch)
    }
}

export default connect(
    (store) => (store.request),
    mapDispatchToProps
)(Request)
