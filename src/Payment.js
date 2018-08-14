import React, {Component} from 'react'
import axios from './axios'

class Payment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showOnline: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                // console.log("data as the component mounts: ", data);
                this.setState(data)
            }
        )
    }
    handleSubmit(){
        axios.post("/payment-info", this.state.payment_info)
        console.log("payment info submitted, switching state. Show: ", );
    }
    handleCancel() {
        this.props.toggleShowPayment()
        this.props.toggleShowReservation()
    }
    render() {
        return (
            <div id="payment">
                <div className="payment-title">Your payment information</div>
                <div className="payment-subtitle">We accept</div>
                <div id="payment-logo-wrapper">
                    <img className="credit-card-logos" id="mastercard-logo" src="/content/mastercard-logo2.png" alt=""/>
                    <img className="credit-card-logos" src="/content/visa-logo.png" alt=""/>
                </div>
                <div className="payment-title" id="card-details">Card Details</div>
                <form id="payment-form" onSubmit={ this.handleSubmit }>
                    <div className="payment-subtitle">Card number</div>
                    <input id="card-number-input" name="card_number" placeholder="" type="number"/>
                    <div id="payment-bottom-wrapper">
                        <div id="payment-input-left-side" className="payment-input-wrapper">
                            <div className="payment-subtitle">Expiration date?</div>
                            <input type="number" placeholder="Month" name="expiration_month" min="1" max="12" />
                            <input type="number" placeholder="Year" name="expiration_year" min="2018" />
                        </div>
                        <div className="payment-input-wrapper">
                            <div className="payment-subtitle">CCV</div>
                            <input name="CCV" placeholder="CCV" type="number"/>
                        </div>
                    </div>
                    <div id="payment-button-wrapper">
                        <button id="payment-left-button" onClick={ this.handleCancel } type="button" className="button">Cancel</button>
                        <button className="button">Save</button>
                    </div>
                </form>
                {/*<button type="button" className="button" onClick={ this.props.toggleShowPayment }>Cancel</button>*/}
            </div>
        )
    }
}

export default Payment
