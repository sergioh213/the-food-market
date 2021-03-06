import React, {Component} from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom'
import axios from './axios'
import styled from 'styled-components'
import LogoUploader from './LogoUploader'
import FacilityImagesUploader from './bottomProfileSection/FacilityImagesUploader'
import FinishProfile from './FinishProfile'
import CompanyName from './CompanyName'
import TypeOfCompanyButton from './TypeOfCompanyButton'
import CompanyDescriptionText from './CompanyDescriptionText'
import CompanyAddress from './CompanyAddress'
import GoogleMap from './GoogleMap'
import DimBackground from './DimBackground'
import MapComponent from './MapComponent'
import CompanyScore from './CompanyScore'
import CompanyDescriptionField from './CompanyDescriptionField'
import BottomProfileSection from './bottomProfileSection/BottomProfileSection'
import {
    toggleShowChat,
    saveCompanyLogo,
    toggleShowLogoUploader,
    toggleShowFacilityImagesUploader,
    openFacility,
    openFacilityForm
} from './redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        profileComplete: state.profileComplete,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        dimBackground: state.dimBackground,
        productionFacilities: state.productionFacilities,
        otherCompanies: state.otherCompanies
    }
}

class CompanyProfile extends Component {
    constructor() {
        super()

        this.state = {
            showDescription: true,
            showDescriptionField: false,
            showOnline: false,
            showUploader: false,
            showPhotosSection: true,
            showCommentsSection: false,
            showOtherSection: false,
            showMap: false,
            showSimpleMap: false,
            showBankBubble: true,
            showBioBubble: true,
            showPaymentBubble: true,
            showMapBubble: true,
            showBottom: true,
            tab: false,
            temporaryArrayOfInvoices: [
                {
                    id: 1,
                    file_name: "MPO_billing"
                },
                {
                    id: 2,
                    file_name: "apples_and_more_receipt"
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
        this.toggleShowDescription = this.toggleShowDescription.bind(this)
        this.toggleShowDescriptionField = this.toggleShowDescriptionField.bind(this)
        this.setImage = this.setImage.bind(this)
        this.toggleShowLogoUploader = this.toggleShowLogoUploader.bind(this)
        this.toggleShowFacilityImagesUploader = this.toggleShowFacilityImagesUploader.bind(this)
        this.toggleShowMap = this.toggleShowMap.bind(this)
        this.findOnMap = this.findOnMap.bind(this)
        this.toggleShowFacilityForm = this.toggleShowFacilityForm.bind(this)
        this.toggleChat = this.toggleChat.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
        this.toggleFacility = this.toggleFacility.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    toggleShowLogoUploader() {
        this.props.dispatch(toggleShowLogoUploader())
    }
    toggleShowFacilityImagesUploader() {
        this.props.dispatch(toggleShowFacilityImagesUploader())
    }
    setImage(company_image_url) {
        this.toggleShowLogoUploader()
        this.props.dispatch(saveCompanyLogo(company_image_url))
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
    toggleShowFacilityForm() {
        this.props.dispatch(openFacilityForm())
    }
    toggleChat() {
        this.props.dispatch(toggleShowChat());
    }
    toggleTab(){
        this.setState({ tab: !this.state.tab })
    }
    toggleFacility(facility) {
        this.props.dispatch(openFacility(facility))
    }
    render() {
        const {
            id,
            company_legal_name,
            company_image_url,
            company_description,
            showDescription,
            showUploader,
            showPhotosSection,
            showCommentsSection,
            showOtherSection,
            headquarter_formatted_address,
            showMap,
            showSimpleMap,
            showBottom,
        } = this.state
        if ( (!this.props.profile && !this.props.productionFacilities) || !this.state.mounted ) {
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
            position: relative;
            width: 20%;
            height: 100%;
            margin-right: 10px;
            `
        const ProductionFacilities = styled.div`
            position: relative;
            width: 100%;
            margin-right: 10px;
            background-color: rgba(251, 251, 251, 1);
            padding: 20px;
            `
        const RightPanel = styled.div`
            position: relative;
            width: 20%;
            height: 100%;
            margin-left: 10px;
            `
        const RightPanelBottomBox = styled.div`
            margin-top: 10px;
            position: relative;
            width: 100%;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            height: 40%;
            `
        const ChatButton = styled.div`
            position: relative;
            background-color: #5EB648;
            bottom: 0;
            width: 100%;
            height: 30px;
            border-radius: 4px;
            margin-top: 10px;
            color: white;
            padding-top: 6px;
            cursor: pointer;

            &:hover{
                background-color: #6ACC58;
            }
            `
        const RightPanelTopBox = styled.div`
            background-color: rgba(251, 251, 251, 1);
            ${() => {
                if (!this.state.tab) {
                    return "padding: 20px;"
                } else {
                    return "padding: 20px 10px 20px 10px;"
                }
            } }
            width: 100%;
            height: 50%;
            `
        const TabsBox = styled.div`
            height: 35px;
            padding: none;
            border-radius: 7px 7px 0 0;
            position: relative;
            `
        const UsersTab = styled.div`
            background-color: ${() => {
                if (!this.state.tab) {
                    return "rgba(251, 251, 251, 1)"
                } else {
                    return "lightgrey"
                }
            }};
            display: inline-block;
            height: 100%;
            width: 50%;
            cursor: pointer;
            border-radius: 7px 7px 0 0;
            padding-top: 5px;

            &:hover{
                background-color: ${() => {
                    if (!this.state.tab) {
                        return "rgba(251, 251, 251, 1)"
                    } else {
                        return "rgba(229, 229, 229, 1)"
                    }
                }};
            }
            `
        const ChatTab = styled.div`
            background-color: ${() => {
                if (this.state.tab) {
                    return "rgba(251, 251, 251, 1)"
                } else {
                    return "lightgrey"
                }
            }};
            display: inline-block;
            height: 100%;
            width: 50%;
            cursor: pointer;
            border-radius: 7px 7px 0 0;
            padding-top: 5px;

            &:hover{
                background-color: ${() => {
                    if (this.state.tab) {
                        return "rgba(251, 251, 251, 1)"
                    } else {
                        return "rgba(229, 229, 229, 1)"
                    }
                }};
            }
            `
        const TabRightOverlap = styled.div`
            position: absolute;
            left: 50%;
            transform: translateX(-100%);
            bottom: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 30px 20px;
            border-color: transparent transparent rgba(251, 251, 251, 1) transparent;
            line-height: 0px;
            _border-color: #000000 #000000 rgba(251, 251, 251, 1) #000000;
            _filter: progid:DXImageTransform.Microsoft.Chroma(color='#000000');
            `
        const TabLeftOverlap = styled.div`
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 30px 0 0 20px;
            border-color: transparent transparent transparent rgba(251, 251, 251, 1);
            line-height: 0px;
            _border-color: #000000 #000000 #000000 rgba(251, 251, 251, 1);
            _filter: progid:DXImageTransform.Microsoft.Chroma(color='#000000');
            `
        const Facility = styled.div`
            background-color: lightgrey;
            width: 100%;
            margin-top: 10px;
            padding: 3px;
            padding-left: 7px;
            padding-right: 10px;
            text-align: left;
            font-size: 14px;
            cursor: pointer;
            align-items: center;
            display: flex;
            justify-content: space-between;

            &:hover{
                transform: scale(1.1);
            }
            `
        const AddNewFacility = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            align-item: center;
            padding-bottom: 6px;
            cursor: pointer;

            &:hover{
                transform: scale(1.1);
            }
            `
        const Line = styled.div`
            border-bottom: 1px solid lightgrey;
            `
        const AddFacilityIcon = styled.div`
            position: relative;
            display: inline-block;
            color: white;
            width: 30px;
            height: 24px;
            background-color: #5EB648;
            font-size: 18px;
            border-radius: 100%;
            `
        const AddFacilityText = styled.div`
            display: inline-block;
            font-size: 14px;
            text-align: left;
            font-weight: 400;
            padding-left: 5px;
            `
        const DeployFacility = styled.i`
            display: inline-block;
            font-weight: bold;
            float: right;
            `
        const SmallMessage = styled.div`
            font-size: 14px;
            color: grey;
            margin-top: 4px;
            `
        const OtherCompany = styled.div`
            background-color: lightgrey;
            display: flex;
            margin-bottom: 5px;
            border-radius: 15px 0 0 15px;
            `
        const OtherCompaniesLogo = styled.img`
            display: inline-block;
            margin-right: 10px;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            object-fit: cover;
            object-position: center;
            `
        const OtherCompanyName = styled.div`
            display: inline-block;
            font-weight: 400;
            font-size: 14px;
            padding-right: 5px;
            display: flex;
            align-items: center;
            `
        const FileWrapper = styled.div`
            display: flex;
            margin-bottom: 5px;
            `
        const FileBox = styled.div`
            background-color: lightgrey;
            display: flex;
            border-radius: 15px 0 0 15px;
            width: 100%;
            cursor: pointer;

            &:hover{
                transform: scale(1.05);
            }
            `
        const PdfIconWrapper = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
            width: 25px;
            height: 25px;
            border-radius: 100%;
            background-color: grey;
            `
        const FileName = styled.div`
            position: relative;
            display: inline-block;
            font-weight: 400;
            font-size: 12px;
            display: flex;
            align-items: center;
            `
        const PdfIcon = styled.i`
            color: white;
            `
        const DownloadIconWrapper = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            height: 25px;
            cursor: pointer;

            &:hover{
                transform: scale(1.2);
            }
            `
        const DownloadPdfIcon = styled.i`
            display: inline-block;
            color: grey;
            `
        return (
            <div>
                <MainPage id="main-profile-page">
                    <LeftPanel>
                        <ProductionFacilities className="shadow">
                            <AddNewFacility onClick={ this.toggleShowFacilityForm }>
                                <AddFacilityIcon>+</AddFacilityIcon><AddFacilityText>Add new production facility</AddFacilityText>
                            </AddNewFacility>
                            <Line></Line>
                            { (this.props.productionFacilities && this.props.productionFacilities.length) ?
                                this.props.productionFacilities.map(facility => {
                                    return (
                                        <Facility
                                            key={facility.id}
                                            onClick={() => this.toggleFacility(facility)}
                                        >{facility.facility_name}
                                            <DeployFacility className="fas fa-angle-down"></DeployFacility>
                                        </Facility>
                                    )
                                }) :
                                <SmallMessage>Your list of facilities will be shown here</SmallMessage>
                            }
                        </ProductionFacilities>
                        <CompanyScore />
                    </LeftPanel>
                    <CentralPanel className="shadow">
                        <TypeOfCompanyButton />
                        <CompanyLogo
                            className="shadow"
                            onClick={this.toggleShowLogoUploader}
                            src={this.props.profile.company_image_url}
                        ></CompanyLogo>
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
                        <RightPanel>
                            <TabsBox onClick={this.toggleTab}>
                                { this.state.tab && <TabRightOverlap></TabRightOverlap> }
                                { !this.state.tab && <TabLeftOverlap></TabLeftOverlap> }
                                <UsersTab>Users</UsersTab>
                                <ChatTab>Invoices</ChatTab>
                            </TabsBox>
                            { !this.state.tab ?
                                <BrowserRouter>
                                    <RightPanelTopBox className="shadow">
                                        { this.props.otherCompanies &&
                                            this.props.otherCompanies.map((company, i) => {
                                                if (i <= 4) {
                                                    return (
                                                        <a href={`/user/${company.id}`} key={company.id}>
                                                        <OtherCompany>
                                                        <OtherCompaniesLogo src={company.company_image_url}></OtherCompaniesLogo><OtherCompanyName>{company.company_legal_name}</OtherCompanyName>
                                                        </OtherCompany>
                                                        </a>
                                                    )
                                                }
                                                // <Link to={`/user/${company.id}`} key={company.id}>
                                                //     <OtherCompany key={company.id}>
                                                //         <OtherCompaniesLogo src={company.company_image_url}></OtherCompaniesLogo><OtherCompanyName>{company.company_legal_name}</OtherCompanyName>
                                                //     </OtherCompany>
                                                // </Link>
                                            })
                                        }
                                    </RightPanelTopBox>
                                </BrowserRouter> :
                                <RightPanelTopBox className="shadow">
                                    { this.state.temporaryArrayOfInvoices ?
                                        this.state.temporaryArrayOfInvoices.map(file => {
                                            return (
                                                <FileWrapper key={file.id}>
                                                    <FileBox>
                                                        <PdfIconWrapper>
                                                            <PdfIcon className="far fa-file-pdf"></PdfIcon>
                                                        </PdfIconWrapper>
                                                        <FileName>{file.file_name}</FileName>
                                                    </FileBox>
                                                    <DownloadIconWrapper>
                                                        <DownloadPdfIcon className="fas fa-file-download"></DownloadPdfIcon>
                                                    </DownloadIconWrapper>
                                                </FileWrapper>
                                            ) }) :
                                        "Your invoices will be display here"
                                    }
                                </RightPanelTopBox>
                            }
                            <RightPanelBottomBox className="shadow">
                                <div>Pending</div>
                                <div>...</div>
                            </RightPanelBottomBox>
                            <ChatButton
                                className="shadow scale-on-hover"
                                onClick={this.toggleChat}
                            >Chat</ChatButton>
                        </RightPanel>
                </MainPage>
                { (this.props.chat.showChat || this.props.showBottomMenu) &&
                    <BottomProfileSection/>
                }
                {/*///////////// uploaders //////////////*/}
                { this.props.dimBackground.showLogoUploader &&
                    <LogoUploader
                        toggleShowLogoUploader={this.toggleShowLogoUploader}
                        setImage={this.setImage}
                    /> }
                { this.props.dimBackground.showFacilityImagesUploader &&
                    <FacilityImagesUploader
                        toggleShowFacilityImagesUploader={this.toggleShowFacilityImagesUploader}
                        setImage={this.setImage}
                    /> }
                { this.props.dimBackground.show && <DimBackground app/> }
            </div>
        )
    }
}

export default connect(mapStateToProps)(CompanyProfile)
