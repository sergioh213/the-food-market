import React, {Component} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import axios from '../axios'
import GoogleMap from '../GoogleMap'
import { saveNewProductionFacilityPage2 } from '../redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        facilitySaveInProgress: state.facilitySaveInProgress
    }
}

class NewFacilityPage2 extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit() {
        localStorage.setItem("facility_name", this.state.facility_name)
        localStorage.setItem("how_to_arrive_text", this.state.how_to_arrive_text)
        this.props.dispatch(saveNewProductionFacilityPage2(this.state))
    }
    render() {
        if (!this.props || !this.state.mounted) {
            console.log("Page two stuck");
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
        const ButtonSeparator = styled.div`
            border-top: 1px solid lightgrey;
            margin-top: 5px;
            text-align: center;
            `
        return (
            <div id="facility-form-page2">
                <FormHeader>Address:</FormHeader>
                <div>{this.props.facilitySaveInProgress.formatted_address}</div>
                <div>
                    <FormHeader>Name:</FormHeader><Optional>(optional)</Optional>
                </div>
                <div className="facility-form-input-wrapper">
                    <input
                        onChange={(e) => this.handleChange(e)}
                        className="facility-page2-input"
                        type="text"
                        name="facility_name"
                    />
                    <Optional>A short memorable name so people can talk about this place by its name</Optional>
                </div>
                <div>
                    <FormHeader>How to get there:</FormHeader><Optional>(optional)</Optional>
                </div>
                <div className="facility-form-input-wrapper">
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        className="facility-page2-textarea"
                        type="text"
                        name="how_to_arrive_text"
                    />
                    <Optional>Explain to a potential driver how to get there</Optional>
                </div>
                <ButtonSeparator>
                    <SubmitButton onClick={this.handleSubmit}>Next</SubmitButton>
                </ButtonSeparator>
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewFacilityPage2)
