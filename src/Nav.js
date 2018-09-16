import React, {Component} from 'react'
import { Router, Link } from 'react-router-dom'
import axios from './axios'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMenu: false,
            showSearch: false
        }

        this.toggleShowMenu = this.toggleShowMenu.bind(this)
        this.toggleShowSearch = this.toggleShowSearch.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    toggleShowMenu() {
        console.log("toggleShowMenu happening!");
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    toggleShowSearch() {
        this.setState({
            showSearch: !this.state.showSearch
        })
    }
    render() {
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
                        {/*<Router>*/}
                        {/*<Link to="/"><i className="fas fa-search"></i></Link>*/}
                        <a onClick={ this.toggleShowSearch } id="nav-home-link" href="/"><i className="fas fa-search"></i></a>
                        { this.state.showSearch && <input id="search-bar" type="text"/> }
                        {/*</Router>*/}
                    </div>
                    {/*<div id="nav-home-box">
                    </div>*/}
                    <div id="nav-home-box">
                        <div id="city-name-nav">{ this.state.city_name }</div>
                    </div>
                    {/*<a id="nav-profile-pic-link"><img onClick={ this.toggleShowMenu } id="nav-profile-pic" src={ this.state.profile_image_url } alt=""></img></a>*/}
                    <img onClick={ this.toggleShowMenu } id="nav-profile-pic" src={ this.state.profile_image_url } alt=""></img>
                </div>
                { this.state.showMenu &&
                    <div id="nav-menu" className="effect1">
                        <a id="nav-menu-links" href="/profile"><div className="nav-menu-options">Profile</div></a>
                        <a id="nav-menu-links" href="/edit-profile"><div className="nav-menu-options">Edit profile</div></a>
                        <a id="nav-menu-links" href="/logout"><div className="nav-menu-options">Log Out</div></a>
                    </div>
                }
                { this.state.showMenu &&
                    <div id="profile-page-dim-background" onClick={ this.toggleShowMenu }></div>
                }
            </div>
        )
    }
}

export default Nav
