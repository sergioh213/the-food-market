import React, {Component} from 'react'
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
import Cookies from './Cookies'
import { HashRouter, Route, Link } from 'react-router-dom'
import ThanksMessage from './ThanksMessage'
import axios from './axios'
import styled from 'styled-components'

class Welcome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMessage: false,
            showThanks: false,
            clientAccepted: false
        }
        this.acceptCookies = this.acceptCookies.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
        axios.get("/user-cookies.json").then(resp => {
            console.log("get resp: ", resp);
            if (resp.data.hasAccepted) {
                this.setState({
                    showMessage: false,
                    clientAccepted: true
                })
            } else {
                this.setState({
                    showMessage: true
                })
            }
        })
    }
    async acceptCookies(){
        await this.setState({ clientAccepted: true })
        await axios.post("/user-cookies.json", this.state).then(resp => {
            console.log("post resp: ", resp);
            if (resp.data.hasAccepted) {
                this.setState({
                    showMessage: false,
                    showThanks: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            showThanks: false
                        })
                    }, 1500)
                })
            }
        })
    }
    render() {
        if (!this.state.mounted) {
            return null
        }
        return (
            <div id="Welcome">
                <Accounts />
                <HashRouter>
                    <div id="routers-div">
                        <Route exact path="/" render={() => {
                            return (
                                <div>
                                <BackgroundRegistration login darker/>
                                <Login />
                                </div>
                            )}}></Route>
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
                        <Route exact path="/create-account" render={() => {
                            return (
                                <div>
                                <BackgroundRegistration landing/>
                                <Landing />
                                </div>
                            )}}></Route>
                    </div>
                </HashRouter>
                { this.state.showMessage && <Cookies acceptCookies={this.acceptCookies}/> }
                { this.state.showThanks && <ThanksMessage />}
            </div>
        )
    }
}

export default Welcome
