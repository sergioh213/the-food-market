import React, {Component} from 'react'
import axios from './axios'
import CompanyProfile from './CompanyProfile'
import MarketPlace from './MarketPlace'
import UserProfile from './UserProfile'
import HelpApp from './HelpApp/HelpApp'
import CompanyTypePage from './HelpApp/CompanyTypePage'
import NavBar from './NavBar'
import MainPage from './MainPage'
import styled from 'styled-components'
import Chat from './Chat'
import Opp from './Opp/Opp'
import { BrowserRouter, Route, Link, HashRouter } from 'react-router-dom'
import { getProfile, getFacilities, getAllCompanies, getAllUsers, setMatches } from './redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        dimBackground: state.dimBackground,
        productionFacilities: state.productionFacilities,
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    async componentDidMount() {
        await this.setState({ mounted: true })
        await this.props.dispatch(getProfile());
        await this.props.dispatch(getFacilities());
        await this.props.dispatch(getAllCompanies());
        await this.props.dispatch(getAllUsers());
    }
    render() {
        const LoadingScreen = styled.div`
        top: 35%;
        position: fixed;
        left: 0;
        right: 0;
        width: 100vw;
        text-align: center;
        `
        const LoadingGif = styled.img`
        width: 100px;
        object-fit: cover;
        object-position: center;
        `
        if (
            !this.state.mounted ||
            !this.props.profile ||
            !this.props.dimBackground ||
            !this.props.productionFacilities
        ) {
            return (
                <LoadingScreen>
                    <h3>Loading workspace</h3>
                    <LoadingGif src="/content/loading.gif" alt=""/>
                </LoadingScreen>
            )
        }
        const Main = styled.div`
        padding: 18px;
        padding-top: 0;
        max-width: 1076px;
        margin: 0 auto;
        `
        return (
            <Main id="app">
                <NavBar />
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={MainPage} />
                        <Route exact path='/profile' component={UserProfile} />
                        <Route exact path='/company' component={CompanyProfile} />
                        <Route exact path='/marketplace' component={MarketPlace} />
                        <Route exact path='/user/:id' component={Opp} />
                        <Route exact path='/help' component={HelpApp} />
                        <Route path='/help/:subpage' component={HelpApp} />
                    </div>
                </BrowserRouter>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(App)
