import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import Uploader from './Uploader'
import FinishProfile from './FinishProfile'
import CompanyName from './CompanyName'
import CompanyDescriptionText from './CompanyDescriptionText'
import CompanyAddress from './CompanyAddress'
import MapComponent from './MapComponent'
import GoogleMap from './GoogleMap'

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            showDescription: true,
            showOnline: false,
            showPhotosSection: true,
            showCommentsSection: false,
            showOtherSection: false,
            showMap: false,
            showFinishProfile: true,
            showSimpleMap: false,
            showBankBubble: true,
            showBioBubble: true,
            showPaymentBubble: true,
            showMapBubble: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
        this.setNewDescription = this.setNewDescription.bind(this)
        this.setNewAddress = this.setNewAddress.bind(this)
        this.toggleShowMap = this.toggleShowMap.bind(this)
        this.toggleShowFinishProfile = this.toggleShowFinishProfile.bind(this)
        this.setPaymentInfo = this.setPaymentInfo.bind(this)
        this.setBankInfo = this.setBankInfo.bind(this)
        this.findOnMap = this.findOnMap.bind(this)
        this.checkProfileCompleteness = this.checkProfileCompleteness.bind(this)
        this.checkDescriptionCompleteness = this.checkDescriptionCompleteness.bind(this)
        this.checkBankInfoCompleteness = this.checkBankInfoCompleteness.bind(this)
        this.checkPaymentCompleteness = this.checkPaymentCompleteness.bind(this)
        this.checkHeadquarterCompleteness = this.checkHeadquarterCompleteness.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                console.log("data: ", data);
                this.checkProfileCompleteness(data)
            }
        )
    }
    async checkProfileCompleteness(data) {
        if (this.checkDescriptionCompleteness(data)) {
            console.log("description complete");
            this.setState({
                showBioBubble: false
            })
        }
        if (this.checkPaymentCompleteness(data)) {
            console.log("payment complete");
            this.setState({
                showPaymentBubble: false
            })
        }
        if (this.checkBankInfoCompleteness(data)) {
            console.log("Bank complete");
            this.setState({
                showBankBubble: false
            })
        }
        if (this.checkHeadquarterCompleteness(data)) {
            console.log("headquarters complete");
            this.setState({
                showMapBubble: false
            })
        }
        if (
            this.checkHeadquarterCompleteness(data) &&
            this.checkBankInfoCompleteness(data) &&
            this.checkPaymentCompleteness(data) &&
            this.checkDescriptionCompleteness(data)
        ) {
            console.log("profile complete!");
            this.setState({
                showFinishProfile: false
            })
        }
        this.setState({
            id: data.id,
            company_legal_name: data.company_legal_name,
            company_score: data.company_score,
            company_image_url: data.company_image_url
        })
    }
    checkPaymentCompleteness(data) {
        if (
            data.payment_card_number &&
            data.payment_card_expiration_month &&
            data.payment_card_expiration_year &&
            data.payment_card_ccv
        ) {
            console.log("payment complete!");
            this.setState({
                payment_card_number: data.payment_card_number,
                payment_card_expiration_month: data.payment_card_expiration_month,
                payment_card_expiration_year: data.payment_card_expiration_year,
                payment_card_ccv: data.payment_card_ccv
            })
            return true
        }
    }
    checkBankInfoCompleteness(data) {
        console.log("data received by checkBankInfo: ", data);
        if (data.bank_account_number && data.bank_iban) {
            console.log("bank complete!");
            this.setState({
                bank_account_number: data.bank_account_number,
                bank_iban: data.bank_iban
            })
            return true
        }
    }
    checkHeadquarterCompleteness(data) {
        if (
            data.headquarter_google_maps_place_id &&
            data.headquarter_formatted_address &&
            data.headquarter_latitude &&
            data.headquarter_longitude
        ) {
            console.log("headquarters complete!");
            this.setState({
                headquarter_google_maps_place_id: data.headquarter_google_maps_place_id,
                headquarter_formatted_address: data.headquarter_formatted_address,
                headquarter_latitude: data.headquarter_latitude,
                headquarter_longitude: data.headquarter_longitude
            })
            return true
        }
    }
    checkDescriptionCompleteness(data) {
        if (data.company_description) {
            console.log("decription complete!");
            this.setState({ company_description: data.company_description })
            return true
        }
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
    setBankInfo(data){
        console.log("data received at setBanktInfo: ", data);
        this.setState({
            bank_account_number: data.bank_account_number,
            bank_iban: data.bank_iban,
            showBankBubble: false
        }, () => console.log("state after setBanktInfo: ", this.state))
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        })
    }
    hideUploader() {
        this.setState({
            uploaderIsVisible: false
        })
    }
    setImage(company_image_url) {
        this.setState({
            uploaderIsVisible: false,
            company_image_url: company_image_url
        })
    }
    toggleShowBio() {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }
    setNewDescription(companyDescription) {
        axios.post("/company-description.json", {companyDescription: companyDescription})
            .then(({data}) => {
                this.setState({
                    company_description: data.companyDescription
                })
            })
    }
    setNewAddress(companyAddress) {
        this.setState({
            headquarter_formatted_address: companyAddress
        })
    }
    toggleShowMap() {
        console.log("toggleShowMap happening");
        this.toggleShowBio()
        this.toggleShowFinishProfile()
        this.setState({
            showMap: !this.state.showMap,
            showSimpleMap: false
        })
    }
    toggleShowFinishProfile() {
        this.setState({ showFinishProfile: !this.state.showFinishProfile })
    }
    findOnMap() {
        this.setState({ showSimpleMap: !this.state.showSimpleMap })
    }
    render() {
        const {
            id,
            company_legal_name,
            company_image_url,
            company_description,
            showDescription,
            uploaderIsVisible,
            showPhotosSection,
            showCommentsSection,
            showOtherSection,
            headquarter_formatted_address,
            showMap,
            showFinishProfile,
            showSimpleMap
        } = this.state
        if ( !this.state.id ) {
            return null;
        }
        console.log("profile state: ", this.state);
        const MainPage = styled.div`
            position: relative;
            width: 100vw;
            top: 100px;
            margin-bottom: 20px;`
        const CompanyLogo = styled.img`
            position: relative;
            width: 200px;
            height: 200px;
            object-fit: cover;
            object-position: center;
            border-radius: 4px;
            left: 50%;
            transform: translateX(-50%);`
        return (
            <MainPage id="main-profile-page">
                <CompanyLogo className="shadow" src={company_image_url}></CompanyLogo>
                <CompanyName />
                { headquarter_formatted_address &&
                    <CompanyAddress
                        headquarter_formatted_address={headquarter_formatted_address}
                        toggleShowMap={this.toggleShowMap}
                        findOnMap={this.findOnMap}
                    /> }
                { showSimpleMap &&
                    <GoogleMap
                        placeId={ this.state.headquarter_google_maps_place_id }
                        toggleShowMap={this.toggleShowMap}
                    /> }
                { showMap && <MapComponent setNewAddress={this.setNewAddress} toggleShowMap={this.toggleShowMap}/> }
                { (company_description && showDescription) && <CompanyDescriptionText setNewDescription={ this.setNewDescription }/> }
                { showFinishProfile &&
                    <FinishProfile
                        setNewDescription={ this.setNewDescription }
                        setNewAddress={ this.setNewAddress }
                        setPaymentInfo={ this.setPaymentInfo }
                        setBankInfo={ this.setBankInfo }
                        showBankBubble={ this.state.showBankBubble }
                        showBioBubble={ this.state.showBioBubble }
                        showPaymentBubble={ this.state.showPaymentBubble }
                        showMapBubble={ this.state.showMapBubble }
                    /> }
            </MainPage>
        )
    }
}

export default Profile
