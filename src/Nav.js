import React, {Component} from 'react'

function Nav() {
    return (
        <div className="big-momma-component">
            <div id="navheader">
                {/*<div className="nav-item">
                  <a href="/signers">SIGNER'S LIST</a>
                </div>*/}
                <div className="nav-item">
                  <a href="/profile">PROFILE</a>
                </div>
                <div className="nav-item">
                  <a href="https://sergio-petition.herokuapp.com/logIn">PETITION</a>
                </div>
                {/*<div className="nav-item">
                  <a href="/chat">CHAT</a>
                </div>*/}
                <div className="nav-item">
                  <a href="/friends">FRIENDS</a>
                </div>
                {/*<div className="nav-item">
                  <a href="/online-now">ONLINE NOW</a>
                </div>*/}
                <div className="nav-item">
                  <a href="/logout">LOGOUT</a>
                </div>
            </div>
        </div>
    )
}

export default Nav
