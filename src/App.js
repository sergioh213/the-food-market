import React, {Component} from 'react'
import axios from './axios'
import Profile from './Profile'
import styled from 'styled-components'
import Chat from './Chat'
import Opp from './Opp/Opp'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { getProfile } from './redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile
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
        this.setState({ mounted: true })
    }
    render() {
        if (!this.state.mounted) {
            return null
        }
        const Main = styled.div`
            padding: 18px;
            padding-top: 30px;
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
