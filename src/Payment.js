import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class Payment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showOnline: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    handleChange(e) {
        console.log("handleChange happening");
        this.setState({
            [ e.target.name ]: e.target.value
        }, () => {
            // console.log(e.target.name, e.target.value);
        })
    }
    handleSubmit(e){
        console.log("submit happening");
        e.preventDefault()
        axios.post("/saveBankInfo.json", this.state)
            .then(({data}) => {
                console.log("data as received: ", data.payment_info);
                this.setState({
                    payment_card_ccv: data.payment_info.payment_card_ccv,
                    payment_card_expiration_month: data.payment_info.payment_card_expiration_month,
                    payment_card_expiration_year: data.payment_info.payment_card_expiration_year,
                    payment_card_number: data.payment_info.payment_card_number,
                }, () => {
                    console.log("State before sending it back to FinishProfile: ", this.state);
                    this.props.setBankInfo(this.state)
                    this.props.toggleShowBank()
                })
            })
    }
    render() {
        if (!this.state.id) {
            return null
        }
        const Message = styled.div`
            font-size: 16px;
            color: lightgrey;
            margin-top: 30px;
            text-align: center;`
        return (
            <div id="payment">
                <Message>Add your payment information</Message>
                <div className="shadow" id="payment-style">
                    <div className="payment-title">Your payment information</div>
                    <div className="payment-subtitle">We accept</div>
                    <div id="payment-logo-wrapper">
                        <img className="credit-card-logos" id="mastercard-logo" src="/content/mastercard-logo2.png" alt=""/>
                        <img className="credit-card-logos" src="/content/visa-logo.png" alt=""/>
                    </div>
                    <div className="payment-title" id="card-details">Card Details</div>
                    <form id="payment-form" onSubmit={ this.handleSubmit }>
                        <div className="payment-subtitle">Card number</div>
                        <input onChange={ this.handleChange } id="card-number-input" name="card_number" placeholder="" type="number"/>
                        <div id="payment-bottom-wrapper">
                            <div id="payment-input-left-side" className="payment-input-wrapper">
                                <div className="payment-subtitle">Expiration date?</div>
                                <input onChange={ this.handleChange } type="number" placeholder="Month" name="expiration_month" min="1" max="12" />
                                <input onChange={ this.handleChange } type="number" placeholder="Year" name="expiration_year" min="2018" />
                            </div>
                            <div className="payment-input-wrapper">
                                <div className="payment-subtitle">CCV</div>
                                <input onChange={ this.handleChange } name="CCV" placeholder="CCV" type="number"/>
                            </div>
                        </div>
                        <div id="payment-button-wrapper">
                            <button id="payment-left-button" onClick={ this.props.toggleShowPayment } type="button" className="button">Cancel</button>
                            <button className="button">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Payment
