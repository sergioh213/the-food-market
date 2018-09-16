import React from 'react'

function Logo(props) {
    var darkStyle
    if (props.black) {
        darkStyle = { color: '#232323' }
    } else {
        darkStyle = {}
    }
    return (
        <div id="logo">
            <div className="registration-header" id="small">THE</div>
            <div className="registration-header">FOOD</div>
            <div className="registration-header">MARKET</div>
            <div style={darkStyle} id="registration-subheader">Connecting Producers and Retailers around the World</div>
        </div>
    )
}

export default Logo
