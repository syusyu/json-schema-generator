import React from 'react'
import Request from '../containers/request'
import SchemaUI from '../containers/schemaUI'

const App = () => {
    return (
        <div style={styles.contents}>
            <div style={styles.request}>
                <Request/>
            </div>
            <div style={styles.response}>
                <SchemaUI/>
            </div>
        </div>
    )
}

export default App

const styles = {
    contents: {
        padding: '10px'
    },
    request: {
    },
    response: {
    }
};

