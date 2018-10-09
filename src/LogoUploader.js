import React, {Component} from 'react'
import axios from './axios'

class LogoUploader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            submit: false,
            selectFile: true,
        }

        this.imageSelected = this.imageSelected.bind(this)
        this.upload = this.upload.bind(this)
        this.removeFile = this.removeFile.bind(this)
    }
    imageSelected(e) {
        console.log("imageSelected happening");
        this.setState({
            imageFile : e.target.files[0],
            imageName : e.target.files[0].name,
            submit: true,
            selectFile: false
        })
    }
    removeFile() {
        this.setState({
            imageFile: null,
            submit: false,
            selectFile: true
        })
    }
    upload() {
        var self = this
        var formData = new FormData;
        if (this.state.imageFile == '') {
            this.setState({
                error: 'Please select a file in order to upload'
            })
        } else {
            console.log("file being appended to form data: ", this.state.imageFile);
            formData.append('file', this.state.imageFile);
            console.log("formData before being sent: ", formData);
            axios.post('/company-logo-upload.json', formData)
                .then((res) => {
                    if (res.data.success) {
                        this.props.setImage(res.data.company_image_url)
                    }
                })
        }
    }
    render() {
        return (
            <div className="effect1" id="uploader">
                <p id="close-x" onClick={this.props.toggleShowLogoUploader}>x</p>
                <h3 id="profile-header">Select a new picture</h3>
                { this.state.selectFile && <label className="button" id="file-label" htmlFor="file-field">Select image</label> }
                <input id="file-field" type="file" onChange={(e) => this.imageSelected(e) } name="" value=""></input>
                { this.state.submit &&
                    <div id="imageName">
                        <div id="filename-div">{ this.state.imageName }</div>
                        <div id="remove-file-x" onClick={ this.removeFile } >x</div>
                    </div>
                }
                { this.state.submit &&
                    <div>
                        <button className="button" id="upload-button" onClick={ this.upload } name="button">Upload</button>
                    </div>
                }
            </div>
        )
    }
}

export default LogoUploader
