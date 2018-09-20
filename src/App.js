import React, {Component} from 'react'
import axios from './axios'
import Profile from './Profile'
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
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    toggleShowChat() {
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
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Profile} />
                        <Route exact path='/user/:id' component={Opp} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
