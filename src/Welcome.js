import React from 'react'
import Registration from './Registration'
import Login from './Login'
import Nav from './Nav'
import Pane1 from './Pane1'
import { HashRouter, Route, Link } from 'react-router-dom'

// <Link to="/login">Log in</Link>

function Welcome() {
    return (
        <div id="Welcome">
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration}></Route>
                    <Route exact path="/login" component={Login}></Route>
                </div>
            </HashRouter>
            <Pane1 />
        </div>
    )
}

export default Welcome
