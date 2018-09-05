import React, {Component} from 'react'
import axios from './axios'
import Uploader from './Uploader'
import YourReservations from './YourReservations'
import Friends from './Friends'
import Wannabes from './Wannabes'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showOnline: false,
            showPhotosSection: true,
            showCommentsSection: false,
            showOtherSection: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.setBio = this.setBio.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
        this.togglePhotosSection = this.togglePhotosSection.bind(this)
        this.toggleCommentsSection = this.toggleCommentsSection.bind(this)
        this.toggleOtherSection = this.toggleOtherSection.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("data as the component mounts: ", data);
                this.setState(data)
            }
        )
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    setBio(value) {
        // var processedBio = value.replace(/\n\r?/g, "<br />")
        // this.processedBio = processedBio
        axios.post("/bio", {bio : value}).then(
            ({data}) => {
                this.setState({bio: data.bio})
            }
        )
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
    setImage(profile_image_url) {
        this.setState({
            uploaderIsVisible: false,
            profile_image_url: profile_image_url
        })
    }
    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        })
    }
    togglePhotosSection(){
        this.setState({
            showPhotosSection: true,
            showCommentsSection: false,
            showOtherSection: false
        })
    }
    toggleCommentsSection(){
        this.setState({
            showPhotosSection: false,
            showCommentsSection: true,
            showOtherSection: false
        })
    }
    toggleOtherSection(){
        this.setState({
            showPhotosSection: false,
            showCommentsSection: false,
            showOtherSection: true
        })
    }
    render() {
        const { first_name, last_name, id, profile_image_url, bio, showBio, uploaderIsVisible, birth_city, birth_country, showPhotosSection, showCommentsSection, showOtherSection } = this.state
        if ( !this.state.id ) {
            return null;
        }
        return (
            <div id="profile">
            <div id="profile-page-left-panel">
                <div id="profile-panel-top" className="effect1 profile-panel-left">
                    <div id="from-opp">From: </div>
                    <div id="opp-info-box">
                        { birth_city ? `${ birth_city }, ${ birth_country }` : "No info yet"}
                    </div>
                </div>
                <Friends />
                <Wannabes />
            </div>
                <div id="profile-style-div">
                    <div id="profile-content-box" className="effect1">
                        <div className="section-header">This is what people see on your profile</div>
                        <img id="profilepage-profileimage" onClick={ this.showUploader } src={ profile_image_url } alt=""/>
                        <div id="text-box">
                        <div id="edit-profile-icon"><a href="/edit-profile"><i className="fas fa-pencil-alt"></i></a></div>
                        <h1 id="profile-page-name">{ `${ first_name } ${ last_name }` }</h1>
                        <div id="bio-section">
                        { bio
                            ? !showBio && <p id="bio-text">{ bio } <span id="edit-bio-button" onClick={ (e) => {
                                this.toggleShowBio()
                                console.log("bio on click", bio);
                            } }>Edit</span> </p>
                            : <div id="bio-default-text" onClick={ this.toggleShowBio }>{ !showBio && "Click here to write a bio" }</div>
                        }

                        { showBio && <textarea id="bio-textarea-input" onChange={ this.handleChange } name="bio" defaultValue={ bio }></textarea> }

                        { showBio && <button className="button" id="bio-button" onClick={ () => {
                            this.setBio(this.state.bio)
                            this.toggleShowBio()
                        } }>SAVE</button>
                    }
                    </div>
                    </div>
                    <a href="/logout">logout</a>
                    </div>
                    <div id="pictures-header" className="effect1">
                        <div className="pictures-header-option-wrapper" onClick={ this.togglePhotosSection }>
                            <div className="pictures-header-option">Photos</div>
                        </div>
                        <div className="pictures-header-option-wrapper">
                            <div className="pictures-header-option" onClick={ this.toggleCommentsSection }>Comments</div>
                        </div>
                        <div className="pictures-header-option-wrapper" id="pictures-header-option-wrapper-last" onClick={ this.toggleOtherSection }>
                            <div className="pictures-header-option">Other</div>
                        </div>
                    </div>
                    { this.state.showPhotosSection && <div className="after-section effect1" id="profile-photos-section">photos</div> }
                    { this.state.showCommentsSection && <div className="after-section effect1"  id="profile-pictures-section">Comments</div> }
                    { this.state.showOtherSection && <div className="after-section effect1"  id="profile-pictures-section">Other</div> }
                </div>
                <div id="profile-page-right-panel">
                    <YourReservations />
                    <div className="profile-panel-right effect1">

                    </div>
                </div>
                { uploaderIsVisible
                    ? <div id="profile-page-dim-background" onClick={ this.hideUploader }></div>
                    : null
                }
                { uploaderIsVisible
                    ? <Uploader hideUploader={ this.hideUploader } setImage={ this.setImage }/>
                    : null
                }
            </div>
        )
    }
}

export default Profile
