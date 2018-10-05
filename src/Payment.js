import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { savePaymentInfo } from './redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

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
        this.setState({ mounted: true })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        axios.post("/savePaymentInfo.json", this.state)
            .then(({data}) => {
                this.props.dispatch(savePaymentInfo(data.payment_info));
                setTimeout(() => {
                    this.props.toggleShowPayment()
                }, 1300)
            })
    }
    render() {
        if (!this.state.mounted && this.props) {
            return null
        }
        const Message = styled.div`
            font-size: 16px;
            color: lightgrey;
            margin-top: 30px;
            text-align: center;`
        const CloseX = styled.div`
            float: right;
            color: lightgrey;
            font-size: 18px;
            cursor: pointer;

            &:hover{
                color: black;
                transform: scale(1.2);
                font-weight: 400;
            }
            `
        return (
            <div id="payment">
                <Message>Add your payment information</Message>
                <div className="shadow" id="payment-style">
                    <CloseX onCLick={this.props.toggleShowPayment}>x</CloseX>
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

export default connect(mapStateToProps)(Payment)
