import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from './axios'
import styled from 'styled-components'
import Uploader from './Uploader'
import FinishProfile from './FinishProfile'
import CompanyName from './CompanyName'
import CompanyDescriptionText from './CompanyDescriptionText'
import CompanyAddress from './CompanyAddress'
import GoogleMap from './GoogleMap'
import MapComponent from './MapComponent'
import CompanyDescriptionField from './CompanyDescriptionField'
import BottomProfileSection from './BottomProfileSection/BottomProfileSection'
import { toggleShowChat } from './redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        profileComplete: state.profileComplete
    }
}

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            showDescription: true,
            showDescriptionField: false,
            showOnline: false,
            showPhotosSection: true,
            showCommentsSection: false,
            showOtherSection: false,
            showMap: false,
            showSimpleMap: false,
            showBankBubble: true,
            showBioBubble: true,
            showPaymentBubble: true,
            showMapBubble: true,
            showBottom: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.toggleShowDescription = this.toggleShowDescription.bind(this)
        this.toggleShowDescriptionField = this.toggleShowDescriptionField.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
        this.toggleShowMap = this.toggleShowMap.bind(this)
        this.findOnMap = this.findOnMap.bind(this)
        this.toggleShowBottom = this.toggleShowBottom.bind(this)
        this.toggleShowChat = this.toggleShowChat.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
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
    toggleShowDescription() {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }
    toggleShowDescriptionField(){
        this.setState({
            showDescriptionField: !this.state.showDescriptionField
        })
    }
    toggleShowMap() {
        this.toggleShowDescription()
        this.setState({
            showMap: !this.state.showMap,
            showSimpleMap: false
        })
    }
    findOnMap() {
        this.setState({ showSimpleMap: !this.state.showSimpleMap })
    }
    toggleShowBottom() {
        this.setState({ showBottom: !this.state.showBottom })
    }
    toggleShowChat() {
        this.props.dispatch(toggleShowChat());
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
            showSimpleMap,
            showBottom,
        } = this.state
        if ( !this.props.profile ) {
            return null;
        }
        const MainPage = styled.div`
            position: relative;
            width: 100%;
            text-align: center;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            `
        const CentralPanel = styled.div`
            position: relative;
            width: 60%;
            text-align: center;
            height: 100%;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            `
        const CompanyLogo = styled.img`
            position: relative;
            width: 200px;
            height: 200px;
            object-fit: cover;
            object-position: center;
            border-radius: 4px;
            `
        const LeftPanel = styled.div`
            padding: 20px;
            width: 20%;
            height: 100%;
            margin-right: 10px;
            background-color: rgba(251, 251, 251, 1);
            `
        const RightPanel = styled.div`
            width: 20%;
            height: 100%;
            margin-left: 10px;
            `
        const RightPanelTopBox = styled.div`
            background-color: rgba(251, 251, 251, 1);
            padding: 20px;
            width: 100%;
            `
        const RightPanelBottomBox = styled.div`
            margin-top: 10px;
            width: 100%;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            `
        return (
            <div>
                <MainPage id="main-profile-page">
                    <LeftPanel
                        className="shadow"
                        onClick={ this.toggleShowBottom }
                    >ddfd</LeftPanel>
                    <CentralPanel className="shadow">
                        <CompanyLogo className="shadow" src={this.props.profile.company_image_url}></CompanyLogo>
                        <CompanyName />
                        { this.props.profile.headquarter_formatted_address &&
                            <CompanyAddress
                                toggleShowMap={this.toggleShowMap}
                                findOnMap={this.findOnMap}
                            /> }
                        { showSimpleMap &&
                            <GoogleMap
                                placeId={ this.props.profile.headquarter_google_maps_place_id }
                                toggleShowMap={this.toggleShowMap}
                            /> }
                        { showMap && <MapComponent toggleShowMap={this.toggleShowMap}/> }
                        { (this.props.profile.company_description && showDescription) &&
                                <CompanyDescriptionText
                                    toggleShowDescriptionField={ this.toggleShowDescriptionField }
                                /> }
                        { this.state.showDescriptionField &&
                            <CompanyDescriptionField
                                toggleShowDescriptionField={ this.toggleShowDescriptionField }
                            /> }
                        { !this.props.profileComplete && <FinishProfile /> }
                        </CentralPanel>
                        <RightPanel className="shadow">
                            <RightPanelTopBox className="shadow"
                                onClick={this.toggleShowChat}>
                                <div>Chat</div>
                                <div>text</div>
                            </RightPanelTopBox>
                            <RightPanelBottomBox className="shadow">
                                <div>Photos</div>
                                <div>text</div>
                            </RightPanelBottomBox>
                        </RightPanel>
                </MainPage>
                { showBottom &&
                    <BottomProfileSection toggleShowBottom={this.toggleShowBottom}/>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Profile)
