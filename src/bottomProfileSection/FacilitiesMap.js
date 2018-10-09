import React, {Component} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import axios from '../axios'
import GoogleMap from '../GoogleMap'
import { saveNewProductionFacilityPage1 } from '../redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        facilitySaveInProgress: state.facilitySaveInProgress
    }
}

class FacilitiesMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: "",
            displayPredictions: false,
            placeId: "ChIJhdqtz4aI7UYRefD8s-aZ73I" // europe
        }

        this.searchLocation = this.searchLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findMyPostion = this.findMyPostion.bind(this);
        this.processData = this.processData.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }
    componentDidMount() {}
    handleChange(e) {
        this.setState({ inputValue: e.target.value, displayPredictions: true, addressNotFound: null }, () => {
            axios.get("/place-autocomplete", {
                params: { input: this.state.inputValue }
            }).then(resp => {
                if (!resp.data.error) {
                    this.setState({ predictions: resp.data }) // giving the current error
                }
            })
        })
    }
    searchLocation() {
        axios.get("/place", {
            params: { input: this.state.inputValue }
        }).then(resp => {
            this.processData(resp)
        })
    }
    findMyPostion() {
        this.setState({ inputValue: "", displayPredictions: false })
        navigator.geolocation.getCurrentPosition(position => {
            axios.get("/place-coordinates", {
                    params: {
                        input:
                            position.coords.latitude +
                            "," +
                            position.coords.longitude
                    }
                }).then(resp => {
                    if (!resp.data.error) {
                        this.setState({ placeId: resp.data[0] }, () => {
                            axios.get("/place-details", {
                                params: { input: this.state.placeId }
                            }).then(placeDetails => {
                                this.processData(placeDetails)
                            })
                        })
                    }
                });
        });
    }
    processData(info){
        if (info.data.types) {
            var data = info.data
            var otherTypes = ""
            for (var i = 0; i < data.types.length; i++) {
                if ((info.data.types[i] === "street_address") || (info.data.types[i] === "premise") || (info.data.types[i] === "subpremise")) {
                    this.setState({
                        ...data,
                        save: true,
                        warningMessage: "Valid address"
                    })
                    break
                } else if (i == 0) {
                    otherTypes += info.data.types[0]
                    this.setState({
                        ...data,
                        save: false,
                        warningMessage: "Invalid location. Please chose an address, not a " + otherTypes
                    }, () => {
                        otherTypes = null
                    })
                }
            }
        } else {
            this.setState({ errorMessage: "Address Not Found" })
        }
    }
    populateInput(e, itemId, itemDescription) {
        this.setState({ inputValue: itemDescription, displayPredictions: false }, () => {
            this.searchLocation()
        })
    }
    saveAddress() {
        if (this.state.save) {
            if (this.state.address && this.state.latitude && this.state.longitude && this.state.placeId) {
                localStorage.setItem("formatted_address", this.state.address)
                localStorage.setItem("latitude", this.state.latitude)
                localStorage.setItem("longitude", this.state.longitude)
                localStorage.setItem("google_maps_place_id", this.state.placeId)
                this.props.dispatch(saveNewProductionFacilityPage1(this.state))
            } else {
                this.setState({
                    save: false,
                    warningMessage:
                        `This address is the correct type, but some of the following information is missing:<br>
                        Address, latitude, longitude or an ID provided by the map<br>
                        PLEASE CHOOSE ANOTHER ADDRESS`
                })
            }
        } else {
            this.setState({
                errorMessage: "CHOOSE A VALID ADDRESS"
            }, () => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: null
                    })
                }, 3000)
            })
        }
    }
    render() {
        const FormHeader = styled.div`
            position: relative;
            font-size: 16px;
            display: inline-block;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            `
        const PredictionsBoxWrapper = styled.div`
            position: absolute;
            text-align: left;
            z-index: 2;
            width: 100%;
            left: 0;
            top: 30px;
            `
        const PredictionsBox = styled.div`
            position: relative;
            background-color: white;
            text-align: left;
            padding-left: 10px;
            width: 100%;
            border-top: 1px solid lightgrey;
            left: 0;
            `
        const LeftBox = styled.div`
            position: relative;
            width: 70%;
            display: inline-block;
            text-align: left;
            `
        const NestedSecondLeftBox = styled.div`
            position: relative;
            width: 79%;
            display: inline-block;
            text-align: left;
            `
        const SmallMessage = styled.div`
            position: relative;
            display: inline-block;
            font-size: 16px;
            color: lightgrey;
            margin-top: ${() => {
                if (this.state.errorMessage) {
                    return "5px"
                } else {
                    return "none"
                }
            }};
            text-align: left;
            `
        const ErrorMessage = styled.div`
            position: relative;
            display: inline-block;
            font-size: 18px;
            color: red;
            font-weight: 400;
            text-align: left;
            `
        const MessagesWrapper = styled.div`
            right: 0;
            position: absolute;
            display: inline-block;
            width: 29%;
            font-size: 18px;
            color: red;
            font-weight: 400;
            text-align: left;
            `
        return (
            <div>
                <FormHeader>Write the address</FormHeader>
                <div className="address-input-wrapper">
                    <div className="input-wrapper">
                        <input type="text"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="Search location"
                            type="text"
                            value={this.state.inputValue}
                        />
                        <button
                            className="submit-button scale-on-hover"
                            onClick={ this.saveAddress }
                        >Submit</button>
                    </div>
                    <MessagesWrapper>
                        { this.state.errorMessage && <ErrorMessage>{ this.state.errorMessage }</ErrorMessage> }
                        { this.state.warningMessage && <SmallMessage>{ this.state.warningMessage }</SmallMessage> }
                    </MessagesWrapper>
                    { this.state.displayPredictions &&
                        <PredictionsBoxWrapper id="1">
                        <LeftBox id="2">
                        <NestedSecondLeftBox className="shadow"  id="3">
                        { this.state.predictions && this.state.predictions.map(item => {
                            return (
                                <PredictionsBox id="4"
                                key={item.id}
                                className="prediction-box"
                                onClick={(e) => this.populateInput(e, item.id, item.description)}
                                >
                                { item.description }
                                </PredictionsBox>
                            )
                        })}
                        </NestedSecondLeftBox>
                        </LeftBox>
                        </PredictionsBoxWrapper>
                    }
                </div>
                <div>
                    <GoogleMap shallow inline
                    placeId={this.state.placeId}></GoogleMap>
                    <button
                        className="find_me_icon icon"
                        onClick={this.findMyPostion}
                    ><i className="fas fa-male"></i></button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(FacilitiesMap)
