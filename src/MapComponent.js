import React, {Component} from 'react'
import { connect } from 'react-redux';
import { saveNewAddress } from './redux-socket/actions.js'
import axios from './axios'
import styled from 'styled-components'
import GoogleMap from './GoogleMap'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class MapComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: "",
            displayPredictions: true,
            placeId: "ChIJhdqtz4aI7UYRefD8s-aZ73I" // europe
        }

        this.searchLocation = this.searchLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findMyPostion = this.findMyPostion.bind(this);
        this.processData = this.processData.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    handleChange(e) {
        this.setState({ inputValue: e.target.value, displayPredictions: true, addressNotFound: null }, () => {
            axios.get("/place-autocomplete", {
                params: { input: this.state.inputValue }
            }).then(resp => {
                if (!resp.data.error) {
                    this.setState({ predictions: resp.data })
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
            this.setState({ addressNotFound: "Address Not Found" })
        }
    }
    populateInput(e, itemId, itemDescription) {
        this.setState({ inputValue: itemDescription, displayPredictions: false }, () => {
            this.searchLocation()
        })
    }
    saveAddress() {
        if (this.state.save) {
            axios.post("/save-headquarters.json", this.state)
            .then(data => {
                if (data.data.success) {
                    this.setState({
                        savedAddress: data.data.headquarter_formatted_address,
                        successMessage: "Has succesfully been saved as the companies headquarters",
                        warningMessage: null
                    }, () => {
                        this.props.dispatch(saveNewAddress(data.data));
                    })
                    setTimeout(() => {
                        // this.props.setNewAddress(data.data)
                        if (this.props.toggleShowMap) {
                            this.props.toggleShowMap()
                        }
                    }, 1300)
                }
            })
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
        if (!this.state.mounted) {
            return null
        }
        const SearchBar = styled.input`
            width: 100%;`
        const Wrapper = styled.div`
            position: relative;
            width: 100%;`
        const SubmitButton = styled.button`
            margin-top: 10px;
            width: 20%;
            background-color: #6ACC58;
            cursor: pointer;
            height: 30px;
            padding: 4px 8px;
            font-size: 16px;
            color: white;
            font-weight: 400;
            border-radius: 4px;
            border: none;
            display: inline-block;`
        const CurrentLocationButton = styled.button`
            display: inline-block;
            width: 48.5%;
            height: 45px;
            background-color: #6ACC58;
            cursor: pointer;
            font-size: 16px;
            color: white;
            font-weight: 400;
            border-radius: 4px;
            border: none;
            margin-right: 1%;`
        const SaveButton = styled.button`
            display: inline-block;
            width: 48.5%;
            height: 45px;
            background-color: white;
            cursor: pointer;
            font-size: 16px;
            color: #6ACC58;
            font-weight: 400;
            border-radius: 4px;
            border: none;`
        const LocationButtonWrapper = styled.div`
            position: relative;
            text-align: center;
            margin-top: 10px;`
        const SmallerButtonWrapper = styled.div`
            position: relative;
            text-align: center;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;`
        const PredictionsBoxWrapper = styled.div`
            position: absolute;
            text-align: left;
            z-index: 2;
            width: 100%
            left: 0;
            padding-left: 20px;
            padding-right: 20px;`
        const PredictionsBox = styled.div`
            position: relative;
            background-color: white;
            text-align: left;
            padding-left: 10px;
            width: 100%;
            border-top: 1px solid lightgrey;
            left: 0;`
        const LeftBox = styled.div`
            position: relative;
            width: 79%;
            display: inline-block;
            text-align: left;`
        const InputLineWrapper = styled.div`
            position: relative;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);`
        const divStyle = { backgroundColor: 'blue'}
        const Message = styled.div`
            font-size: 16px;
            display: inline-block;
            color: lightgrey;
            line-height: 40px;
            text-align: center;`
        const SmallMessage = styled.div`
            font-size: 16px;
            color: lightgrey;
            margin-top: 5px;
            text-align: center;`
        const ErrorMessage = styled.div`
            font-size: 18px;
            color: red;
            font-weight: 400;
            margin-top: 5px;
            text-align: center;`
        const SuccessMessage = styled.div`
            font-size: 18px;
            color: #6ACC58;
            font-weight: 400;
            margin-top: 5px;
            text-align: center;`
        const SavedAddress = styled.div`
            font-size: 16px;
            color: black;
            font-weight: bold;
            margin-top: 10px;
            text-align: center;`
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
            }`
        const InstructionsWrapper = styled.div`
            position: relative;
            text-align: center;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 15px;
            height: 40px;`
        return (
            <div>
                <InstructionsWrapper>
                    <Message>Select an address for your headquarters</Message><CloseX onClick={this.props.toggleShowMap}>x</CloseX>
                </InstructionsWrapper>
                <div id="search-map-input-wrapper">
                    <div id="input-line-wrapper">
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="location"
                            placeholder="Search location"
                            type="text"
                            value={this.state.inputValue}
                            id="search-map-input"
                        />
                        <SubmitButton className="scale-on-hover" onClick={ this.searchLocation }>Search</SubmitButton>
                    </div>
                </div>
                { this.state.addressNotFound && <ErrorMessage>{ this.state.addressNotFound }</ErrorMessage> }
                { this.state.displayPredictions &&
                    <PredictionsBoxWrapper id="1">
                        <LeftBox className="shadow" id="2">
                            { this.state.predictions && this.state.predictions.map(item => {
                                return (
                                    <PredictionsBox  id="3"
                                        key={item.id}
                                        className="prediction-box"
                                        onClick={(e) => this.populateInput(e, item.id, item.description)}
                                    >
                                        { item.description }
                                    </PredictionsBox>
                                )
                            })}
                        </LeftBox>
                    </PredictionsBoxWrapper>
                }
                <Wrapper>
                </Wrapper>
                <GoogleMap placeId={ this.state.placeId } />
                { this.state.warningMessage && <SmallMessage>{ this.state.warningMessage }</SmallMessage> }
                { this.state.errorMessage && <ErrorMessage>{ this.state.errorMessage }</ErrorMessage> }
                { this.state.savedAddress && <SavedAddress>{ this.state.savedAddress }</SavedAddress> }
                { this.state.successMessage && <SuccessMessage>{ this.state.successMessage }</SuccessMessage> }
                <LocationButtonWrapper>
                    <SmallerButtonWrapper>
                        <CurrentLocationButton className="shadow scale-on-hover" onClick={ this.findMyPostion }>Find myself</CurrentLocationButton>
                        <SaveButton className="shadow scale-on-hover" onClick={ this.saveAddress }>Save Address</SaveButton>
                    </SmallerButtonWrapper>
                </LocationButtonWrapper>
            </div>
        )
    }
}

export default connect(mapStateToProps)(MapComponent)
