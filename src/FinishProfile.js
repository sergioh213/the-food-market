import React, {Component} from 'react'
import axios from './axios'
import BubbleOptions from './BubbleOptions'
import CompanyDescriptionField from './CompanyDescriptionField'
import Payment from './Payment'
import BankInfo from './BankInfo'
import styled from 'styled-components'
import MapComponent from './MapComponent'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {}
}
class FinishProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPayment: false,
            showBank: false,
            showBio: false,
            showMap: false
        }

        this.toggleShowMenus = this.toggleShowMenus.bind(this)
        this.toggleShowMap = this.toggleShowMap.bind(this)
        this.toggleShowPayment = this.toggleShowPayment.bind(this)
        this.toggleShowBank = this.toggleShowBank.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    toggleShowMenus(itemId){
        if (itemId == 1) {
            this.toggleShowMap()
        } else if (itemId == 2) {
            this.toggleShowPayment()
        } else if (itemId == 3) {
            this.toggleShowBank()
        } else if (itemId == 4) {
            this.toggleShowBio()
        }
    }
    toggleShowMap(){
        this.setState({
            showMap: !this.state.showMap,
            showPayment: false,
            showBank: false,
            showBio: false
        })
    }
    toggleShowPayment(){
        this.setState({
            showPayment: !this.state.showPayment,
            showMap: false,
            showBank: false,
            showBio: false
        })
    }
    toggleShowBank(){
        this.setState({
            showBank: !this.state.showBank,
            showPayment: false,
            showMap: false,
            showBio: false
        })
    }
    toggleShowBio(){
        this.setState({
            showBio: !this.state.showBio,
            showPayment: false,
            showBank: false,
            showMap: false,
        })
    }
    render() {
        const { showMap, showPayment, showBank, showBio } = this.state
        if (!this.state.mounted) {
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
                />
                { showBio && <CompanyDescriptionField setNewDescription={ this.props.setNewDescription } toggleShowDescriptionField={this.toggleShowBio}/> }
                { showMap && <MapComponent toggleShowMap={this.toggleShowMap}/> }
                { showPayment && <Payment toggleShowPayment={ this.toggleShowPayment } setPaymentInfo={ this.props.setPaymentInfo } /> }
                { showBank && <BankInfo toggleShowBank={ this.toggleShowBank } /> }
            </div>
        )
    }
}

export default connect(mapStateToProps)(FinishProfile)
