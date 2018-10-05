import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { saveBankInfo } from './redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class BankInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    handleChange(e) {
        console.log("handleChange happening");
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    handleSubmit(e){
        console.log("submit happening");
        e.preventDefault()
        axios.post("/saveBankInfo.json", this.state)
            .then(({data}) => {
                console.log("data receive after saving bank info: ", data);
                this.props.dispatch(saveBankInfo(data.bank_info));
                setTimeout(() => {
                    this.props.toggleShowBank()
                }, 1300)
            })
    }
    render() {
        if (!this.props && this.state.mounted) {
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
                <Message>Add the bank account information where you want incoming transfers to be deposited</Message>
                <div className="shadow" id="bank-style">
                    <CloseX onCLick={this.props.toggleShowBank}>x</CloseX>
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
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(BankInfo)
