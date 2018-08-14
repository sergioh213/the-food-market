import React, {Component} from 'react'
import axios from './axios'
import Uploader from './Uploader'

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("data as the component mounts: ", data);
                this.setState(data)
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
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        }, () => {
            // console.log(this.state);
        })
        console.log('hey');
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log("running handleSubmit()", this.state);

        axios.post("/editprofile.json", this.state)
            .then(({data}) => {
                console.log("data returned from server: ", data);
                this.setState(data)
            })
    }
    render() {
        return (
            <div id="edit-profile">
                <div id="edit-profile-style-div" className="effect1">
                    <div className="section-header">Edit your profile</div>
                    <div id="profile-pic-wrapper">
                        <img id="edit-profile-profileimage" onClick={ this.showUploader } src={ this.state.profile_image_url } alt=""/>
                    </div>
                    { this.state.uploaderIsVisible
                        ? <Uploader hideUploader={ this.hideUploader } setImage={ this.setImage }/>
                        : null
                    }
                    <form id="profile-form" onSubmit={ this.handleSubmit }>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="first_name" placeholder='First name' defaultValue={ this.state.first_name } type='text'/>
                        </div>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="last_name" placeholder='Last name' defaultValue={ this.state.last_name } type='text'/>
                        </div>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="email" placeholder='Email' defaultValue={ this.state.email } type='text'/>
                        </div>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="password" placeholder='Password' type='text'/>
                        </div>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="birth_city" placeholder='City of Birth' defaultValue={ this.state.birth_city } type='text'/>
                        </div>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="birth_country" placeholder='Country of birth' defaultValue={ this.state.birth_country } type='text'/>
                        </div>
                        {/*<div className="profile-input-box">
                            <input onChange={ this.handleChange } name="age" placeholder='Your age'type="number"/>
                        </div>*/}
                        <div id="edit-profile-languages-title">List the lenguages that you speak</div>
                        <div className="profile-input-box">
                            <input onChange={ this.handleChange } name="lenguages" placeholder='E.g.: English, Spanish' type='text'/>
                        </div>
                        <button className="button" id="submit-button-edit-profile">Submit</button>
                    </form>
                </div>
                { this.state.uploaderIsVisible
                    ? <div id="dim-background" onClick={ this.hideUploader }></div>
                    : null
                }
            </div>
        )
    }
}

export default EditProfile
