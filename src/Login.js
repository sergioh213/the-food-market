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
            <div className="registration">
                {/*<div className="contex-box">*/}
                    <h1 className="header">Log In</h1>
                {/*</div>*/}
                
                {
                    this.state.error
                        ? <div className="contex-box"><div id="error">ERROR:<br />{this.state.error}</div></div>
                        : null
                }

                <form id="login-form" onSubmit={ this.handleSubmit }>

                    <div className="contex-box">
                        <input onChange={ this.handleChange } name="email" placeholder=' Email' type='text'/>
                    </div>
                    <div className="contex-box">
                        <input onChange={ this.handleChange } name="password" placeholder=' Password' type='text'/>
                    </div>
                    <div className="contex-box">
                        <button>Submit</button>
                    </div>
                </form>

                <div className="contex-box">
                    <h3>Not a member yet? <a href="/welcome">Sign up</a></h3>
                </div>
            </div>
        )
    }
}

export default Login
