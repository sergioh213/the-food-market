import React, {Component} from 'react'
import axios from './axios'
import Uploader from './Uploader'
import YourReservations from './YourReservations'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showOnline: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.setBio = this.setBio.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
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
    render() {
        const { first_name, last_name, id, profile_image_url, bio, showBio, uploaderIsVisible } = this.state
        return (
            <div id="profile">
            <div id="profile-page-left-panel">
                <div id="mookup-top" className="effect1 mookup-left">mookup left</div>
                <div className="effect1 mookup-left">mookup left</div>
            </div>
                <div id="profile-style-div" className="effect1">
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
                <div id="profile-page-right-panel">
                    <YourReservations />
                    <div id="mookup-right" className="effect1">mookup right</div>
                </div>
                { uploaderIsVisible
                    ? <div className="dim-background" onClick={ this.hideUploader }></div>
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
