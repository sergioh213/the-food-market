import React, {Component} from 'react'
import axios from './axios'
import Nav from './Nav'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Chat from './Chat'
import Opp from './Opp'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChat: false
        }

        this.toggleShowChat = this.toggleShowChat.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    toggleShowChat() {
        console.log("toggleShowChat happening. showChat: ", this.state.showChat);
        this.setState({
            showChat: !this.state.showChat
        }, console.log("showChat changed to: ", this.state.showChat))
    }
    render() {
        if (!this.state.id) {
            return null
        }
        return (
            <div id="app">
                <Nav />
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Profile} />
                        <Route exact path='/edit-profile' component={EditProfile} />
                        <Route exact path='/user/:id' component={Opp} />
                    </div>
                </BrowserRouter>
                { !this.state.showChat && <div id="chat-button" className="effect1" onClick={ this.toggleShowChat }><i id="chat-logo-on-button" className="far fa-comment"></i></div> }
                { this.state.showChat && <Chat toggleShowChat={ this.toggleShowChat } /> }
            </div>
        )
    }
}

export default App
