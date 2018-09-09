import React from 'react'
import ProducerRegistration from './ProducerRegistration'
import TransporterRegistration from './TransporterRegistration'
import WholesellerRegistration from './WholesellerRegistration'
import RetailerRegistration from './RetailerRegistration'
import RebuyerRegistration from './RebuyerRegistration'
import Landing from './Landing'
import Login from './Login'
import Nav from './Nav'
import Accounts from './Accounts'
import { HashRouter, Route, Link } from 'react-router-dom'

// <Link to="/login">Log in</Link>

function Welcome() {
    return (
        <div id="Welcome">
        <Accounts />
            <HashRouter>
                <div id="routers-div">
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/producer" component={ProducerRegistration}></Route>
                    <Route exact path="/transporter" component={TransporterRegistration}></Route>
                    <Route exact path="/wholeseller" component={WholesellerRegistration}></Route>
                    <Route exact path="/retailer" component={RetailerRegistration}></Route>
                    <Route exact path="/re-buyer" component={RebuyerRegistration}></Route>
                    <Route exact path="/create-account" component={Landing}></Route>
                </div>
            </HashRouter>
        </div>
    )
}

export default Welcome
