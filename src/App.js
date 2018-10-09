import React, {Component} from 'react'
import axios from './axios'
import Profile from './Profile'
import styled from 'styled-components'
import Chat from './Chat'
import Opp from './Opp/Opp'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { getProfile, getFacilities } from './redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        dimBackground: state.dimBackground,
        productionFacilities: state.productionFacilities
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChat: false
        }
    }
    componentDidMount() {
        this.props.dispatch(getProfile());
        this.props.dispatch(getFacilities());
        this.setState({ mounted: true })
    }
    render() {
        if (!this.state.mounted || (!this.props.profile && this.props.dimBackground && this.props.productionFacilities)) {
            return null
        }
        const Main = styled.div`
            padding: 18px;
            padding-top: 30px;
            max-width: 1076px;
            margin: 0 auto;
            `
        return (
            <Main id="app">
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Profile} />
                        <Route exact path='/user/:id' component={Opp} />
                    </div>
                </BrowserRouter>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(App)
