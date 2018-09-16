import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import GoogleMap from './GoogleMap'

class MapComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: "",
            displayPredictions: true,
            placeId: "ChIJhdqtz4aI7UYRefD8s-aZ73I", // europe
            // placeId: "fedb05012f42e79f038a58eac44e1bbc61b7c7aa", // test
            // placeId: "ChIJkxgQV0pPYA0Rltdx8d7gj-o" // xativa
            // placeId: "ChIJAAAAAAAAAAARAAAAAAAAAAA" //my location? world?
        }

        this.searchLocation = this.searchLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findMyPostion = this.findMyPostion.bind(this);
        // this.changeLocation = this.changeLocation.bind(this);
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    handleChange(e) {
        this.setState({ inputValue: e.target.value, displayPredictions: true }, () => {
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
            if (!resp.data.error) {
                this.setState({
                    placeId: resp.data[0]
                })
            }
        })
    }
    findMyPostion() {
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
                        this.setState({ placeId: resp.data[0] })
                    }
                });
        });
    }
    ////////// function to move data from component to component /////////////
    // changeLocation({ placeId, placeDescription }) {
    //     this.setState({ placeId, placeDescription });
    // }
    populateInput(e, itemId, itemDescription) {
        this.setState({ inputValue: itemDescription, displayPredictions: false })
    }
    render() {
        if (!this.state.mounted) {
            return null
        }
        const SearchBar = styled.input`
            width: 505px;`
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
            width: 250px;
            height: 45px;
            background-color: #6ACC58;
            cursor: pointer;
            font-size: 16px;
            color: white;
            font-weight: 400;
            border-radius: 4px;
            border: none;`
        const LocationButtonWrapper = styled.div`
            position: relative;
            text-align: center;
            margin-top: 10px;`
        const PredictionsBoxWrapper = styled.div`
            position: absolute;
            text-align: left;
            z-index: 2;
            left: 50%;
            transform: translateX(-50%);`
        const PredictionsBox = styled.div`
            position: relative;
            background-color: white;
            text-align: left;
            padding-left: 10px;
            width: 79%;
            border-top: 1px solid lightgrey;
            left: 0;`
        const LeftBox = styled.div`
            position: relative;
            width: 505px;
            text-align: left;`
        const InputLineWrapper = styled.div`
            position: relative;
            width: 505px;
            left: 50%;
            transform: translateX(-50%);`
        const divStyle = {backgroundColor: 'blue'}
        return (
            <div>
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
                        <SubmitButton onClick={ this.searchLocation }>Search</SubmitButton>
                    </div>
                </div>
                { this.state.displayPredictions &&
                    <div>
                        <PredictionsBoxWrapper>
                            <LeftBox className="shadow">
                                { this.state.predictions && this.state.predictions.map(item => {
                                    return (
                                        <PredictionsBox
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
                    </div>
                }
                <Wrapper>
                </Wrapper>
                <GoogleMap placeId={ this.state.placeId } />
                <LocationButtonWrapper>
                    <CurrentLocationButton onClick={ this.findMyPostion }>Find myself</CurrentLocationButton>
                </LocationButtonWrapper>
            </div>
        )
        // <i class="fas map-marker"></i>
    }
}

export default MapComponent
