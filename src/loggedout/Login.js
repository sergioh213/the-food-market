import React, {Component} from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            error: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post("/login", this.state)
            .then((res) => {
                if (res.data.error) {
                    this.setState({
                        error: res.data.error
                    })
                } else {
                    location.replace("/")
                }
            })
    }

    render() {
        return (
            <div id="login">
            <Logo />
                <div id="registration-style-div">
                    {
                        this.state.error
                            ? <div id="registration-error-box">ERROR:<br />{this.state.error}</div>
                            : null
                    }
                    <form id="registration-form" onSubmit={ this.handleSubmit }>
                        <div id="input-box">
                            <div className="registration-input-box">
                                <input onChange={ this.handleChange } name="email" placeholder='Email' type='email'/>
                            </div>
                            <div className="registration-input-box">
                                <input id="no-bottom-border" onChange={ this.handleChange } name="password" placeholder='Password' type='password'/>
                            </div>
                        </div>
                        <div className="registration-input-box">
                            <button id="submit-button-registration">Login</button>
                        </div>
                    </form>
                    <Link to="/create-account"><button id="signup-button-registration">Create an account</button></Link>
                </div>
            </div>
        )
    }
}

export default Login
