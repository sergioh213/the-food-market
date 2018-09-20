import React, {Component} from 'react'
import axios from './axios'
import { Link } from 'react-router-dom'
import Login from './Login'
import Logo from './Logo'
import styled from 'styled-components'
import RegistrationChoice from './RegistrationChoice'

class Landing extends Component {
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

        axios.post("/registration", this.state)
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
        const Title = styled.div`
            text-align: center;
            font-size: 40px;
            font-weight: 400;
            color: lightgrey;
            margin-bottom: 30px;`
        return (
            <div id="landing">
                <Logo />
                <Title>Register As</Title>
                <RegistrationChoice />
            </div>
        )
    }
}

export default Landing
