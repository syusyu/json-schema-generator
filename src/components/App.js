import React from 'react'
import Request from './Request'
import SchemaUI from './response/SchemaUI'

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

