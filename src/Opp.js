import React, {Component} from 'react'
import axios from './axios'
import FriendButton from './FriendButton'

class Opp extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        console.log("OPP MOUNTING");
        axios.get('/user/' + this.props.match.params.id + '.json')
            .then(({data}) => {
                if (data.redirect) {
                    console.log("this is your own profile");
                    this.props.history.push("/profile")
                } else {
                    console.log("visited profile info: ", data);
                    this.setState(data)
                }
            })
    }
    render() {
        const { first_name, last_name, id, profile_image_url, bio, birth_city, birth_country } = this.state
        if (!id) {
            return null;
        }
        return (
            <div id="profile" >
                <div id="profile-page-left-panel">
                    <div id="profile-panel-top" className="effect1 profile-panel-left">
                        <div id="from-opp">From: </div><div id="opp-info-box">
                            { birth_city ? `${ birth_city }, ${ birth_country }` : "No info yet"}
                        </div>
                    </div>
                    <div className="effect1 profile-panel-left">No info</div>
                </div>
                <div id="profile-style-div" className="effect1">
                    <img id="profilepage-profileimage" src={ profile_image_url } alt=""/>
                    <div id="text-box">
                        <h1 id="profile-page-name" className="opp-profile-page-name">{ `${ first_name } ${ last_name }` }</h1>
                        <FriendButton id={ id } />
                        <div id="bio-section">
                            <p id="bio-text">{ bio }</p>
                        </div>
                    </div>
                </div>
                <div id="profile-page-right-panel">
                    <div id="profile-panel-top" className="effect1 profile-panel-right">
                        <div id="from-opp">Currently staying at: </div><div id="opp-info-box">EAST MITTE, Berlin</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Opp
