import React, {Component} from 'react'
import axios from './axios'
import Nav from './Nav'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    // componentDidMount() {
    //     axios.get("/user").then(
    //         ({data}) => {
    //             this.setState(data)
    //         }
    //     )
    // }
    render() {
        // if (!this.state.id) {
        //     return (
        //         <div id="loading-screen">
        //             <h3 id="loading-message">Loading...</h3>
        //             <img id="loading-img" src="/content/progressBar.gif" />
        //         </div>
        //     )
        // }
        return (
            <div id="app">
                <Nav />
                <BrowserRouter>
                    <div>
                        <Route exact path='/' render={ () => (
                            <div>logged in experience</div>
                        ) } />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App
