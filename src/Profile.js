import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import Uploader from './Uploader'
import FinishProfile from './FinishProfile'
import CompanyName from './CompanyName'
import CompanyDescriptionText from './CompanyDescriptionText'

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            showDescription: false,
            showOnline: false,
            showPhotosSection: true,
            showCommentsSection: false,
            showOtherSection: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.setNewDescription = this.setNewDescription.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
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
    setNewDescription(companyDescription){
        axios.post("/company-description.json", {companyDescription: companyDescription})
            .then(({data}) => {
                this.setState({
                    company_description: data.companyDescription
                })
            })
    }
    render() {
        const {
            company_legal_name,
            id, company_image_url,
            company_description,
            showDescription,
            uploaderIsVisible,
            showPhotosSection,
            showCommentsSection,
            showOtherSection
        } = this.state
        if ( !this.state.id ) {
            return null;
        }
        const MainPage = styled.div`
            position: relative;
            width: 100vw;
            top: 100px;
            margin-bottom: 20px;`
            // text-align: center;`
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
                { this.state.company_description && <CompanyDescriptionText setNewDescription={ this.setNewDescription }/> }
                <FinishProfile setNewDescription={ this.setNewDescription } />
            </MainPage>
        )
    }
}

export default Profile
