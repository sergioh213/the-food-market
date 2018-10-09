import React, {Component} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import axios from '../axios'
import GoogleMap from '../GoogleMap'
import {
    saveNewProductionFacilityPage2,
    toggleShowFacilityImagesUploader,
    setNewCompleteFacility,
    toggleShowBottomMenu
} from '../redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        facilitySaveInProgress: state.facilitySaveInProgress,
        facilityImages: state.facilityImages
    }
}

class NewFacilityPage3 extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleUploader = this.toggleUploader.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    handleSubmit() {
        if ((!this.props.facilityImages || this.props.length <= 0) && !this.state.save) {
            this.setState({
                warningMessage: "Are you sure you want to submit without images?",
                save: true
            })
        } else {
            var objectToSend = {
                facility_name: this.props.facilitySaveInProgress.facility_name,
                how_to_arrive_text: this.props.facilitySaveInProgress.how_to_arrive_text,
                formatted_address: this.props.facilitySaveInProgress.formatted_address,
                latitude: this.props.facilitySaveInProgress.latitude,
                longitude: this.props.facilitySaveInProgress.longitude,
                google_maps_place_id: this.props.facilitySaveInProgress.google_maps_place_id,
                arrayOfImagesUrls: this.props.facilityImages
            }
            axios.post("/save-new-complete-facility.json", objectToSend).then(resp => {
                this.props.dispatch(setNewCompleteFacility(resp.data.newFacilityInfo))
                this.props.dispatch(toggleShowBottomMenu())
            })
        }
    }
    toggleUploader() {
        this.props.dispatch(toggleShowFacilityImagesUploader())
    }
    render() {
        if (!this.props || !this.state.mounted) {
            return null
        }
        const FormHeader = styled.div`
            position: relative;
            font-size: 16px;
            display: inline-block;
            font-weight: 400;
            line-height: 40px;
            text-align: left;
            `
        const Optional = styled.div`
            color: grey;
            display: inline-block;
            font-size: 16px;
            margin-left: 8px;
            `
        const SelectImagesButton = styled.button`
            width: 150px;
            border: none;
            color: white;
            font-size: 16px;
            background-color: #5EB648;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 5px;
            margin-left: 8px;

            &:hover{
                transform: scale(1.05);
                background-color: #6ACC58;
            }
            `
        const ButtonSeparator = styled.div`
            border-top: 1px solid lightgrey;
            margin-top: 20px;
            text-align: center;
            `
        const Grid = styled.div`
            border-top: 1px solid lightgrey;
            padding-top: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            grid-gap: 10px;
            `
            // grid-template-rows: repeat(2, 100px);
        const Item = styled.img`
            width: 100px;
            height: 100px;
            background-color: lightgrey;
            cursor: pointer;

            &:hover{
                transform: scale(1.05);
            }
            `
        const SubmitButton = styled.button`
            width: 40%;
            border: none;
            color: white;
            font-size: 18px;
            background-color: #5EB648;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 5px;

            &:hover{
                transform: scale(1.1);
                background-color: #6ACC58;
            }
            `
        const WarningMessage = styled.div`
            color: red;
            font-weigt: 400;
            display: inline-block;
            `
        const WarningMessageWrapper = styled.div`
            text-align: center;
            `
        return (
            <div id="facility-form-page3">
                <FormHeader>Select up-to 10 images to upload:</FormHeader><Optional>(optional)</Optional>
                <SelectImagesButton onClick={this.toggleUploader}>Select Images</SelectImagesButton>
                <Grid>
                    { this.props.facilityImages ?
                        this.props.facilityImages.map(image => {
                            return (
                                <img className="facility-preview-image" key={image} src={image} />
                            )
                        })
                        : "Selected images will be shown here"
                    }
                </Grid>
                <ButtonSeparator>
                    { this.state.warningMessage &&
                        <WarningMessageWrapper>
                            <WarningMessage>Are you sure you want to submit without images?</WarningMessage><Optional>(you can do this later)</Optional>
                        </WarningMessageWrapper>
                    }
                    <SubmitButton onClick={this.handleSubmit}>
                        { this.state.warningMessage ? "Yes, skip this step and finish" : "Submit and Finish" }
                    </SubmitButton>
                </ButtonSeparator>
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewFacilityPage3)
