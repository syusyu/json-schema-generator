import {Request} from '../components/Request'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {runApi} from '../actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({runApi}, dispatch)
    }
}

export default connect(
    (store) => ({responseBody: store.responseBody}),
    mapDispatchToｚProps
)(Request)
