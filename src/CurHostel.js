import React, {Component} from 'react'
import axios from './axios'
import Header from './Header'
// import Uploader from './Uploader'

class CurHostel extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("current hostel data as the component mounts: ", data);
                this.setState(data)
                console.log("this.state: ", this.state);
                if (this.state.checked_in == true) {
                    console.log("checked_in true 1");
                    this.setState({
                        checkinButton: "Check-Out"
                    })
                } else {
                    console.log("checked_in false 3");
                    this.setState({
                        checkinButton: "Check-In"
                    })
                }
            }
        )
        axios.get("/check-in").then( userProfiles => {
            console.log("userProfiles: ", userProfiles.data.checkedInUsers);
            this.setState({
                checked_in_users: userProfiles.data.checkedInUsers
            })
        })
    }
    handleSubmit() {
        console.log("this.state.checked_in before sending: ", this.state.checked_in);
        axios.post("/check-in-out.json", this.state).then(({data}) => {
            console.log("data (before setting state after post): ", data);
            this.setState({
                checked_in: data.checked_in
            })
            console.log("state with checked_in: ", this.state.checked_in);
            if (this.state.checked_in == true) {
                console.log("checked_in true 3");
                this.setState({
                    checkinButton: "Check-Out"
                })
            } else {
                console.log("checked_in false 3");
                this.setState({
                    checkinButton: "Check-In"
                })
            }
        })
    }
    render() {
        if (!this.state.id) {
            return null
        }
        return (
            <div id="current-hostel">
                <Header text={`Your hostel`}/>
                <img id="digital-key-image" src="/content/PhoneDigitalKeyPic2.png" alt=""/>
                <div id="current-hostel-subtitle">
                    <div id="subtitle">A place to call </div><br/>
                    <div id="subtitle-keyword">HOME</div>
                </div>
                <button onClick={ this.handleSubmit } className="button" id="check-in-button">{ this.state.checkinButton }</button>
                <div id="indication-text">Click <i className="fas fa-arrow-down"></i> to open the doors</div>
                <div id="indication-text-qr">Or scan the QR code on your screen</div>
                <div id="indication-text-app">Don't have the APP?</div>
                <img className="app-store-images" src="/content/App-Store-Badge.svg.png" alt=""/>
                <img id="app-store-images2" className="app-store-images" src="/content/google-play-badge.svg" alt=""/>
                <div id="current-hostel-content-box">
                    {/*<div id="current-hostel-left-panel">
                        <div id="profile-panel-top" className="effect1 profile-panel-left">Mookup left</div>
                        <div className="effect1 profile-panel-left">Mookup left</div>
                    </div>*/}
                    <div id="current-hostel-center-style-div" className="effect1">
                        <div className="current-hostel-title">These people are currently at the hostel</div>
                        <div>
                            {
                                this.state.checked_in_users.map( user => {
                                    return (
                                        <div key={user.id} className="attendees-inner-box">
                                                <a className="attendees-box-link" href={`/user/${user.id}`}><img className="attendees-box-profile-pic" src={user.profile_image_url} alt=""/></a>
                                                <a className="attendees-box-link" href={`/user/${user.id}`}><div className="attendees-box-name">{`${ user.first_name } ${ user.last_name }`}</div></a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/*<div id="current-hostel-right-panel">
                        <div id="profile-panel-top" className="effect1 profile-panel-right">Mookup right</div>
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default CurHostel
