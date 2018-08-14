import React from 'react'

// <Link to="/login">Log in</Link>

function Header(props) {
    return (
        <div id="header">
            <div className="main-header-pane">
                <div className="main-header-pane-gradiant"></div>
            </div>
            <div className="main-header-top">{props.text}</div>
        </div>
    )
}

export default Header
