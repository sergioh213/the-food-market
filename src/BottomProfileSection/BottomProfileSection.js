import React, {Component} from 'react'
import axios from '../axios'
import styled from 'styled-components'
import GoogleMap from '../GoogleMap'
import Chat from '../Chat'
import { toggleShowChat, toggleShowBottomMenu, toggleExpandChat } from '../redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu
    }
}

class BottomProfileSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayPredictions: true,
            placeId: "ChIJhdqtz4aI7UYRefD8s-aZ73I" // europe
        }

        this.toggleShowBottom = this.toggleShowBottom.bind(this)
        this.searchLocation = this.searchLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findMyPostion = this.findMyPostion.bind(this);
        this.processData = this.processData.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    toggleShowBottom() {
        this.props.dispatch(toggleShowBottomMenu())
    }
    handleChange(e) {
        console.log("handleChange happening with value: ", e.target.value);
        this.setState({ inputValue: e.target.value, displayPredictions: true, addressNotFound: null }, () => {
            axios.get("/place-autocomplete", {
                params: { input: this.state.inputValue }
            }).then(resp => {
                if (!resp.data.error) {
                    console.log("resp.data: ", resp.data);
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
                if (info.data.types[i] === "street_address") {
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
        if (!this.state.mounted || !this.props) {
            console.log("bottom section stuck");
            return null
        }
        const Main = styled.div`
            position: relative;
            display: flex;
            `
        const Bottom = styled.div`
            position: relative;
            width: ${() => {
                if (this.props.chat.showChat && !this.props.chat.expanded) {
                    console.log("bottom 70%");
                    return "70%"
                } else if (this.props.chat.showChat && this.props.chat.expanded) {
                    console.log("bottom 29%");
                    return "29%"
                } else {
                    return "100%"
                }
            }};
            display: inline-block;
            min-height: 200px;
            padding: 20px;
            margin-right: 10px;
            background-color: rgba(251, 251, 251, 1);
            `
        const Message = styled.div`
            display: inline-block;
            width: 29%;
            `
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
            font-size: 16px;
            display: inline-block;
            color: black;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            `
        return (
            <Main>
                {/*//////////////////////// LEFT section ///////////////////////////*/}
                {this.props.showBottomMenu &&
                    <Bottom className="shadow">
                        <SectionTitle>
                            <FormHeader>Write the address</FormHeader><CloseX onClick={this.toggleShowBottom}>x</CloseX>
                        </SectionTitle>
                        <div className="input-wrapper">
                            <input type="text"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <button
                                className="submit-button scale-on-hover"
                                onClick={this.searchLocation}
                            >Submit</button>
                        </div>
                        <Message>Valid Address</Message>
                        <div>
                            <GoogleMap shallow inline
                            placeId={this.state.placeId}></GoogleMap>
                            <button
                                className="find_me_icon icon"
                                onClick={this.findMyPostion}
                            ><i className="fas fa-male"></i></button>
                        </div>
                    </Bottom>
                }
                {/*//////////////////////// RIGHT section ///////////////////////////*/}
                { this.props.chat.showChat &&
                    <Chat />
                }
            </Main>
        )
    }
}

export default connect(mapStateToProps)(BottomProfileSection)
