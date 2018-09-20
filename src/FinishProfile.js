import React, {Component} from 'react'
import axios from './axios'
import BubbleOptions from './BubbleOptions'
import CompanyDescriptionField from './CompanyDescriptionField'
import Payment from './Payment'
import BankInfo from './BankInfo'
import styled from 'styled-components'
import MapComponent from './MapComponent'

class FinishProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPayment: false,
            showBank: false,
            showBio: false,
            showHeadquarters: false,
            showBankBubble: true,
            showBioBubble: true,
            showPaymentBubble: true,
            showHeadquartersBubble: true
        }

        this.toggleShowMenus = this.toggleShowMenus.bind(this)
        this.toggleShowHeadquarters = this.toggleShowHeadquarters.bind(this)
        this.toggleShowPayment = this.toggleShowPayment.bind(this)
        this.toggleShowBank = this.toggleShowBank.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setPaymentInfo = this.setPaymentInfo.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    setPaymentInfo(data) {
        console.log("data received at setPaymentInfo: ", data);
        this.setState({
            payment_card_number: data.payment_card_number,
            payment_card_expiration_month: data.payment_card_expiration_month,
            payment_card_expiration_year: data.payment_card_expiration_year,
            payment_card_ccv: data.payment_card_ccv,
            showPaymentBubble: false
        }, () => console.log("state after setPaymentInfo: ", this.state))
    }
    toggleShowMenus(itemId){
        if (itemId == 1) {
            this.toggleShowHeadquarters()
        } else if (itemId == 2) {
            this.toggleShowPayment()
        } else if (itemId == 3) {
            this.toggleShowBank()
        } else if (itemId == 4) {
            this.toggleShowBio()
        }
    }
    toggleShowHeadquarters(){
        this.setState({
            showHeadquarters: !this.state.showHeadquarters,
            showPayment: false,
            showBank: false,
            showBio: false
        })
    }
    toggleShowPayment(){
        this.setState({
            showPayment: !this.state.showPayment,
            showHeadquarters: false,
            showBank: false,
            showBio: false
        })
    }
    toggleShowBank(){
        this.setState({
            showBank: !this.state.showBank,
            showPayment: false,
            showHeadquarters: false,
            showBio: false
        })
    }
    toggleShowBio(){
        this.setState({
            showBio: !this.state.showBio,
            showPayment: false,
            showBank: false,
            showHeadquarters: false,
        })
    }
    render() {
        const { showHeadquarters, showPayment, showBank, showBio } = this.state
        if (!this.state.id) {
            return null
        }
        const Message = styled.div`
            font-size: 16px;
            color: #6ACC58;
            margin-top: 10px;
            text-align: center;`
        return (
            <div>
                <Message>Please complete your profile</Message>
                <BubbleOptions
                    toggleShowMenus={ this.toggleShowMenus }
                    showPaymentBubble={ this.state.showPaymentBubble }
                />
                { showBio && <CompanyDescriptionField setNewDescription={ this.props.setNewDescription }/> }
                { showHeadquarters && <MapComponent saveAddress={this.props.saveAddress}/> }
                { showPayment && <Payment toggleShowPayment={ this.toggleShowPayment } setPaymentInfo={ this.setPaymentInfo } /> }
                { showBank && <BankInfo /> }
            </div>
        )
    }
}

export default FinishProfile
