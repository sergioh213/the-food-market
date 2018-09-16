import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class BankInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    submitInfo() {

    }
    render() {
        const MainDiv = styled.div`
            position: relative;
            text-align: left;
            background-color: white;
            display: inline-block;
            width: 510px;
            height: auto;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            padding: 20px;
            margin-top: 15px;`
        return (
            <div>
            <div id="payment">
                <MainDiv className="shadow">
                    <div className="payment-title">Your bank account information</div>
                    <div className="payment-title" id="card-details">Account Details</div>
                    <form id="payment-form" onSubmit={ this.handleSubmit }>
                        <div className="payment-subtitle">Account number</div>
                        <input onChange={ this.handleChange } id="card-number-input" name="bank_account_number" placeholder="Account number" type="number"/>
                        <div id="payment-bottom-wrapper">
                            <div id="payment-input-left-side" className="payment-input-wrapper">
                                <div className="payment-subtitle">IBAN</div>
                                <input onChange={ this.handleChange } type="text" placeholder="IBAN" name="bank_iban" />
                            </div>
                        </div>
                        <div id="payment-button-wrapper">
                            <button id="payment-left-button" type="button" className="button">Cancel</button>
                            <button className="button">Save</button>
                        </div>
                    </form>
                </MainDiv>
            </div>
            </div>
        )
    }
}

export default BankInfo
