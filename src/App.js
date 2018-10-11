import React, {Component} from 'react'
import axios from './axios'
import Profile from './Profile'
import styled from 'styled-components'
import Chat from './Chat'
import SearchBarMatchesBox from './SearchBarMatchesBox'
import Opp from './Opp/Opp'
import { BrowserRouter, Route, Link, HashRouter } from 'react-router-dom'
import { getProfile, getFacilities, getAllCompanies, setMatches } from './redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        dimBackground: state.dimBackground,
        productionFacilities: state.productionFacilities
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChat: false,
            showSearchBar: false
        }

        this.deploySearchBar = this.deploySearchBar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.colapseSearchBar = this.colapseSearchBar.bind(this)
    }
    componentDidMount() {
        axios.get("/names.json").then(names => {
            this.setState({names: names.data, mounted: true})
        })
        this.props.dispatch(getProfile());
        this.props.dispatch(getFacilities());
        this.props.dispatch(getAllCompanies());
    }
    deploySearchBar(e) {
        if (this.searchBarElem.className == "icon") {
            console.log("has class icon");
            this.searchBarElem.style.width = "500px";
            this.searchBarElem.classList.remove("icon")
            this.searchBarElem.style.justifyContent = "flex-end"
            this.searchBarElem.style.padding = "3px 0 3px 3px"
            this.inputElem.style.display = "block"
            this.inputElem.style.width = "100%"
        } else {
            this.searchBarElem.style.width = "35px";
            this.searchBarElem.classList.add("icon")
            var matches = []
            this.props.dispatch(setMatches(matches))
        }
        this.searchBarElem.addEventListener("transitionend", () => {
            console.log("transition ended");
            if (this.searchBarElem.className == "icon") {
                this.inputElem.style.width = "0%"
                this.searchBarElem.style.padding = "0"
                this.inputElem.style.display = "none"
                this.searchBarElem.style.justifyContent = "center"
            }
        })
    }
    handleChange(e) {
        var val = e.target.value
        var matches = [];
        const { names } = this.state
        for (var i = 0; i < names.length; i++) {
            if (
                names[i].toLowerCase().startsWith(val.toLowerCase()) &&
                val != ""
            ) {
                matches.push(names[i]);
            }
            if (matches.length >= 5) {
                break;
            }
        }
        this.props.dispatch(setMatches(matches))
    }
    colapseSearchBar(e) {
        console.log("colapseSearchBar happening");
        if (e.target.value == "") {
            this.searchBarElem.style.width = "35px";
            this.searchBarElem.classList.add("icon")
        }
    }
    render() {
        if (!this.state.mounted || (!this.props.profile && this.props.dimBackground && this.props.productionFacilities)) {
            return null
        }
        const Main = styled.div`
            padding: 18px;
            padding-top: 0;
            max-width: 1076px;
            margin: 0 auto;
            `
        const IconWrapper = styled.div`
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            background-color: #5EB648;
            height: 35px;
            width: 35px;
            margin-right: 5px;
            `
        const Icon = styled.i`
            position: relative;
            color: white;
            `
        const BubblesWrapper = styled.div`
            position: relative;
            display: flex;
            right: 0;
            `
        const TopStripe = styled.div`
            position: relative;
            display: flex;
            justify-content: flex-end;
            margin-top: 8px;
            margin-bottom: 8px;
            `
        const SearchIconWrapper = styled.div`
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            background-color: #5EB648;
            height: 35px;
            z-index: 2;
            width: 35px;

            &:hover{
                background-color: #6ACC58;
            }
            `
        return (
            <Main id="app">
                <TopStripe>
                    <BubblesWrapper>
                        <div>
                            <div
                                className="icon"
                                id="search-bar"
                                ref={(searchBarElem) => this.searchBarElem = searchBarElem}
                            >
                                <input type="text"
                                    ref={(inputElem) => this.inputElem = inputElem}
                                    onChange={(e) => this.handleChange(e)}
                                    onBlur={(e) => this.colapseSearchBar(e)}
                                />
                                <SearchIconWrapper onClick={(e) => this.deploySearchBar(e)}><i className="fas fa-search"></i></SearchIconWrapper>
                            </div>
                            <SearchBarMatchesBox />
                        </div>
                        <a href="/"><IconWrapper className="icon"><Icon className="fas fa-users"></Icon></IconWrapper></a>
                        <a href="/logout"><IconWrapper className="icon"><Icon className="fas fa-sign-out-alt"></Icon></IconWrapper></a>
                    </BubblesWrapper>
                </TopStripe>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Profile} />
                        <Route exact path='/user/:id' component={Opp} />
                    </div>
                </BrowserRouter>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(App)
