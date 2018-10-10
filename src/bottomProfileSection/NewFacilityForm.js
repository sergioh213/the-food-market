import React, {Component} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import FacilitiesMap from './FacilitiesMap'
import NewFacilityPage2 from './NewFacilityPage2'
import NewFacilityPage3 from './NewFacilityPage3'
import axios from '../axios'

import {
    toggleShowBottomMenu,
    saveNewProductionFacilityPage1,
    saveNewProductionFacilityPage2
} from '../redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        facilitySaveInProgress: state.facilitySaveInProgress
    }
}

class NewFacilityForm extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.toggleShowBottom = this.toggleShowBottom.bind(this)
    }
    componentDidMount() {
        console.log("container mounted");
        if (this.props.chat.showChat && !this.props.chat.expanded) {
            this.lm.style.width = "70%"
        } else if (this.props.chat.showChat && this.props.chat.expanded) {
            this.lm.style.width = "30%"
        } else {
            this.lm.style.width = "100%"
        }
        if (this.props.chat.showChat) {
            this.lm.style.marginRight = "10px"
        } else {
            this.lm.style.marginRight = "none"
        }

        //////////// check form pages completeness //////////////
        if (this.props.facilitySaveInProgress &&
            this.props.facilitySaveInProgress.facility_name &&
            this.props.facilitySaveInProgress.how_to_arrive_text
        ) {
        } else if (localStorage.facility_name && localStorage.how_to_arrive_text) {
            this.setState({
                facility_name: localStorage.facility_name,
                how_to_arrive_text: localStorage.how_to_arrive_text
            }, () => {
                this.props.dispatch(saveNewProductionFacilityPage2(this.state))
            })
        }
        if (this.props.facilitySaveInProgress &&
            this.props.facilitySaveInProgress.formatted_address &&
            this.props.facilitySaveInProgress.latitude &&
            this.props.facilitySaveInProgress.longitude &&
            this.props.facilitySaveInProgress.google_maps_place_id
        ) {
        } else if (localStorage.formatted_address &&
            localStorage.latitude &&
            localStorage.longitude &&
            localStorage.google_maps_place_id
        ) {
            this.setState({
                address: localStorage.formatted_address,
                latitude: localStorage.latitude,
                longitude: localStorage.longitude,
                placeId: localStorage.google_maps_place_id
            }, () => {
                this.props.dispatch(saveNewProductionFacilityPage1(this.state))
            })
        }
    }
    toggleShowBottom() {
        localStorage.removeItem("formatted_address")
        localStorage.removeItem("latitude")
        localStorage.removeItem("longitude")
        localStorage.removeItem("google_maps_place_id")
        localStorage.removeItem("facility_name")
        localStorage.removeItem("how_to_arrive_text")
        this.props.dispatch(toggleShowBottomMenu())
    }
    componentDidUpdate() {
        console.log("container updated");
        if (this.props.facilitySaveInProgress &&
            this.props.facilitySaveInProgress.facility_name &&
            this.props.facilitySaveInProgress.how_to_arrive_text
        ) {
        } else if (localStorage.facility_name && localStorage.how_to_arrive_text) {
            if (!this.state.formPage3Check) {
                this.setState({ formPage3Check: true,
                    facility_name: localStorage.facility_name,
                    how_to_arrive_text: localStorage.how_to_arrive_text
                }, () => {
                    this.props.dispatch(saveNewProductionFacilityPage2(this.state))
                })
            }
        }
        if (this.props.facilitySaveInProgress &&
            this.props.facilitySaveInProgress.formatted_address &&
            this.props.facilitySaveInProgress.latitude &&
            this.props.facilitySaveInProgress.longitude &&
            this.props.facilitySaveInProgress.google_maps_place_id
        ) {
        } else if (localStorage.formatted_address &&
            localStorage.latitude &&
            localStorage.longitude &&
            localStorage.google_maps_place_id
        ) {
            if (!this.state.formPage2Check) {
                this.setState({ formPage2Check: true,
                    address: localStorage.formatted_address,
                    latitude: localStorage.latitude,
                    longitude: localStorage.longitude,
                    placeId: localStorage.google_maps_place_id
                }, () => {
                    this.props.dispatch(saveNewProductionFacilityPage1(this.state))
                })
            }
        }
    }
    render() {
        const SectionTitle = styled.div`
            position: relative;
            text-align: left;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            height: 40px;
            `
        const CloseX = styled.div`
            position: relative;
            font-size: 30px;
            font-weight: 400;
            color: darkgrey;
            display: inline-block;
            float: right;
            cursor: pointer;
            margin-right: 8px;
            padding: none;

            &:hover{
                color: black;
                transform: scale(1.2);
            }
            `
        const FormHeader = styled.div`
            position: relative;
            font-size: 24px;
            display: inline-block;
            color: #6ACC58;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            `
        return (
            <div id="facilities-map-main"
                className="shadow"
                ref={(lm) => this.lm = lm}
            >
                <SectionTitle>
                    <FormHeader>NEW PRODUCTION FACILITY FORM</FormHeader><CloseX onClick={this.toggleShowBottom}>x</CloseX>
                </SectionTitle>
                { (this.props.facilitySaveInProgress && this.props.facilitySaveInProgress.formPage == 1) && <FacilitiesMap /> }
                { (this.props.facilitySaveInProgress && this.props.facilitySaveInProgress.formPage == 2) && <NewFacilityPage2 /> }
                { (this.props.facilitySaveInProgress && this.props.facilitySaveInProgress.formPage == 3) && <NewFacilityPage3 /> }
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewFacilityForm)
