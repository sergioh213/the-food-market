import React, {Component} from 'react'
import axios from '../axios'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { saveFacilityImages } from '../redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class FacilityImagesUploader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            submit: false,
            selectFile: true,
            selectedFiles: []
        }

        this.imageSelected = this.imageSelected.bind(this)
        this.upload = this.upload.bind(this)
        this.removeFile = this.removeFile.bind(this)
    }
    componentDidUpdate() {}
    imageSelected(e) {
        var selectedFilesClone = this.state.selectedFiles
        for (var i = 0; i < e.target.files.length; i++) {
            selectedFilesClone.push(e.target.files[i])
        }
        this.setState({
            submit: true,
            selectedFiles: selectedFilesClone
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
        var listOfFinalUrls = []
        if (!this.state.selectedFiles && this.state.selectedFiles.length) {
            this.setState({
                error: 'Please select a file in order to upload'
            })
        } else {
            var selectedFilesClone = this.state.selectedFiles
            selectedFilesClone.forEach(file => {
                formData.append('file', file);
            })
            axios.post('/upload-facility-images.json', formData)
            .then((res) => {
                if (res.data.success) {
                    listOfFinalUrls = res.data.imagesUrls
                    this.props.dispatch(saveFacilityImages(listOfFinalUrls))
                }
            })

        }
    }
    render() {
        const UploadButton = styled.div`
            width: 100px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            height: auto;
            background-color: #5EB648;
            cursor: pointer;
            font-size: 14px;
            color: white;
            font-weight: bold;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 20px;
            padding-right: 20px;
            border-radius: 4px;
            border: none;

            &:hover{
                background-color: #6ACC58;
                transform: scale(1.1) translateX(-50%);
            }
            `
        const UploadButtonWrapper = styled.div`
            position: relative;
            margin-bottom: 10px;
            margin-top: 10px;
            text-align: center;
            `
        return (
            <div className="effect1" id="multiple-image-uploader">
                facilities
                <p id="close-x" onClick={this.props.toggleShowFacilityImagesUploader}>x</p>
                <h3 id="profile-header">Select a new picture</h3>
                { this.state.selectFile && <label className="button" id="file-label" htmlFor="file-field">Select image</label> }
                <input id="file-field" type="file" onChange={(e) => this.imageSelected(e)} name="" value="" multiple></input>
                { this.state.submit &&
                    this.state.selectedFiles.map(file => {
                        return (
                            <div id="multiple-image-name" key={file.name}>
                                <div id="filename-div">{ file.name }</div>
                                <div id="remove-file-x" onClick={ this.removeFile } >x</div>
                            </div>
                        )
                    })
                }
                { this.state.submit &&
                    <UploadButtonWrapper>
                        <UploadButton onClick={ this.upload } name="button">Upload</UploadButton>
                    </UploadButtonWrapper>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(FacilityImagesUploader)
