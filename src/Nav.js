import React, {Component} from 'react'
import axios from './axios'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                this.setState(data)
                // console.log("state in nav bar: ", this.state);
            }
        )
        // console.log("component mounts");
        // axios.get("/user-location").then( data => {
        //     console.log("data: ", data, " data: ", data);
        //     this.setState({
        //         data: data
        //     }, () => console.log("state in nav bar: ", this.state))
        // })
    }
    render() {
        // if (this.state.currently_at) {
        //     return null
        // }
        return (
            <div id="nav">
                <div id="navheader">
                    <div id="nav-home-box">
                        <a id="nav-home-link" href="/"><i className="fas fa-home"></i></a>
                    </div>
                    <div id="nav-home-box">
                        <a id="nav-home-link" href="/your-hostel"><i className="fas fa-bed"></i></a>
                    </div>
                    <div id="nav-home-box">
                        <a id="nav-home-link" href={`/events/berlin`}><i className="fas fa-exclamation"></i></a>
                    </div>
                    <div id="nav-home-box">
                        <a id="nav-home-link" href="/"><i className="fas fa-search"></i></a>
                    </div>
                    <div id="nav-home-box">
                        <div id="city-name-nav">{ this.state.city_name }</div>
                    </div>
                    <a id="nav-profile-pic-link" href="/profile"><img id="nav-profile-pic" src={ this.state.profile_image_url } alt=""></img></a>
                </div>
            </div>
        )
    }
}

export default Nav
