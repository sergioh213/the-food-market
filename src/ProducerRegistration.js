import React, {Component} from 'react'
import axios from './axios'
import { Link } from 'react-router-dom'
import Logo from './Logo'

class ProducerRegistration extends Component {
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
            // console.log(this.state);
        })
        console.log('hey');
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("running handleSubmit()", this.state);

        axios.post("/new-producer.json", this.state)
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
                <Logo />
                <div id="registration-style-div">
                <div id="account-type-title">Producer</div>
                    {
                        this.state.error
                        ? <div id="registration-error-box">ERROR:<br />{this.state.error}</div>
                        : null
                    }
                    <form id="registration-form" onSubmit={ this.handleSubmit }>
                        <div id="input-box">
                            <div className="registration-input-box">
                                <input onChange={ this.handleChange } name="company_legal_name" placeholder='Company full legal name' type='text'/>
                            </div>
                            <div className="registration-input-box">
                                <input onChange={ this.handleChange } name="email" placeholder='Email' type='email'/>
                            </div>
                            <div className="registration-input-box">
                                <input id="no-bottom-border" onChange={ this.handleChange } name="password" placeholder='Password' type='password'/>
                            </div>
                        </div>
                        <button id="submit-button-registration">Create account</button>
                    </form>
                    <Link to="/"><button id="signup-button-registration">Already have an account?</button></Link>
                </div>
            </div>
        )
    }
}

export default ProducerRegistration
