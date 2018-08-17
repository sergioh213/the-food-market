import React, {Component} from 'react'
import axios from './axios'
import { Link } from 'react-router-dom'

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
        }, () => {
            console.log(this.state);
        })
        console.log('hey');
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("running handleSubmit()", this.state);

        axios.post("/login", this.state)
            .then((res) => {
                console.log(res.data.error);
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
            <div id="registration">
                <div id="registration-style-div">
                    <div id="registration-header">Log in</div>
                    {
                        this.state.error
                            ? <div id="registration-error-box">ERROR:<br />{this.state.error}</div>
                            : null
                    }
                    <form id="registration-form" onSubmit={ this.handleSubmit }>

                        <div className="registration-input-box">
                            <input onChange={ this.handleChange } name="email" placeholder='Email' type='email'/>
                        </div>
                        <div className="registration-input-box">
                            <input onChange={ this.handleChange } name="password" placeholder='Password' type='password'/>
                        </div>
                        <div className="registration-input-box">
                            <button id="submit-button-login">Submit</button>
                        </div>
                    </form>
                    <div id="log-in">Not a member yet? <Link to="/">Sign up</Link></div>
                </div>
            </div>
        )
    }
}

export default Login
