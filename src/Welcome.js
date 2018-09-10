import React from 'react'
import ProducerRegistration from './ProducerRegistration'
import TransporterRegistration from './TransporterRegistration'
import WholesalerRegistration from './WholesalerRegistration'
import RetailerRegistration from './RetailerRegistration'
import RebuyerRegistration from './RebuyerRegistration'
import Landing from './Landing'
import Login from './Login'
import Nav from './Nav'
import BackgroundRegistration from './BackgroundRegistration'
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
                    <Route exact path="/producer" render={() => {
                        return (
                            <div>
                                <BackgroundRegistration producer/>
                                <ProducerRegistration />
                            </div>
                    )}}></Route>
                    <Route exact path="/transporter" render={() => {
                        return (
                            <div>
                                <BackgroundRegistration transporter/>
                                <TransporterRegistration />
                            </div>
                    )}}></Route>
                    <Route exact path="/wholeseller" render={() => {
                        return (
                            <div>
                                <BackgroundRegistration wholesaler/>
                                <WholesalerRegistration />
                            </div>
                    )}}></Route>
                    <Route exact path="/retailer" render={() => {
                        return (
                            <div>
                                <BackgroundRegistration retailer/>
                                <RetailerRegistration />
                            </div>
                    )}}></Route>
                    <Route exact path="/re-buyer" render={() => {
                        return (
                            <div>
                                <BackgroundRegistration rebuyer/>
                                <RebuyerRegistration />
                            </div>
                    )}}></Route>
                    <Route exact path="/create-account" component={Landing}></Route>
                </div>
            </HashRouter>
        </div>
    )
}

export default Welcome
