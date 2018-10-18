import React, {Component} from 'react'
import axios from './axios'
import CompanyProfile from './CompanyProfile'
import MarketPlace from './MarketPlace'
import UserProfile from './UserProfile'
import styled from 'styled-components'
import Chat from './Chat'
import SearchBarMatchesBox from './SearchBarMatchesBox'
import Opp from './Opp/Opp'
import { BrowserRouter, Route, Link, HashRouter } from 'react-router-dom'
import { getProfile, getFacilities, getAllCompanies, getAllUsers, setMatches } from './redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        dimBackground: state.dimBackground,
        productionFacilities: state.productionFacilities,
        otherCompanies: state.otherCompanies,
        otherUsers: state.otherUsers
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChat: false,
            showSearchBar: false,
            multipleAccounts: true
        }

        this.deploySearchBar = this.deploySearchBar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.colapseSearchBar = this.colapseSearchBar.bind(this)
    }
    async componentDidMount() {
        await this.setState({ mounted: true })
        await this.props.dispatch(getProfile());
        await this.props.dispatch(getFacilities());
        await this.props.dispatch(getAllCompanies());
        await this.props.dispatch(getAllUsers());
    }
    deploySearchBar(e) {
        if (this.searchBarElem.className == "icon") {
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
        var userMatches = [];
        var CompanyMatches = [];
        const { allProfiles, otherCompanies, otherUsers } = this.props
        for (var i = 0; i < otherUsers.length; i++) {
            if (
                otherUsers[i].user_name.toLowerCase().startsWith(val.toLowerCase()) &&
                val != ""
            ) {
                userMatches.push(otherUsers[i]);
            }
            if (userMatches.length >= 6) {
                break;
            }
        }
        for (var i = 0; i < otherCompanies.length; i++) {
            if (
                otherCompanies[i].company_legal_name.toLowerCase().startsWith(val.toLowerCase()) &&
                val != ""
            ) {
                CompanyMatches.push(otherCompanies[i]);
            }
            if (CompanyMatches.length >= 5) {
                break;
            }
        }
        var matches = [...userMatches, ...CompanyMatches]
        this.props.dispatch(setMatches(matches))
    }
    colapseSearchBar(e) {
        if (e.target.value == "") {
            this.searchBarElem.style.width = "35px";
            this.searchBarElem.classList.add("icon")
        }
    }
    render() {
        if (
            !this.state.mounted ||
            !this.props.profile ||
            !this.props.dimBackground ||
            !this.props.productionFacilities ||
            !this.props.otherCompanies ||
            !this.props.otherUsers
        ) {
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
            ${() => {
                if (this.state.multipleAccounts) {
                    return "justify-content: space-between;"
                }
            }}
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
        const SwitchAccountWrapper = styled.div`
            height: 35px;
            position: relative;
            display: flex;
            align-items: center;
            background-color: #5EB648;
            border-radius: 17.5px;
            padding: 0 5px 0 8px;
            cursor: pointer;

            &:hover{
                transform: scale(1.1);
            }
            `
        const SwitchAccountIcon = styled.i`
            position: relative;
            color: white;
            margin-right: 3px;
            `
        return (
            <Main id="app">
                <TopStripe>
                    { this.state.multipleAccounts &&
                        <SwitchAccountWrapper>
                            <SwitchAccountIcon className="fas fa-user-circle"></SwitchAccountIcon>
                            <SwitchAccountIcon className="fas fa-arrows-alt-h"></SwitchAccountIcon>
                            <SwitchAccountIcon className="fas fa-user-circle"></SwitchAccountIcon>
                        </SwitchAccountWrapper>
                    }
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
                                    placeholder='Type a name'
                                />
                                <SearchIconWrapper onClick={(e) => this.deploySearchBar(e)}><i className="fas fa-search"></i></SearchIconWrapper>
                            </div>
                            <SearchBarMatchesBox />
                        </div>
                        <a href="/profile"><IconWrapper className="icon"><Icon className="fas fa-user"></Icon></IconWrapper></a>
                        <a href="/company"><IconWrapper className="icon"><Icon className="fas fa-building"></Icon></IconWrapper></a>
                        <a href="/marketplace"><IconWrapper className="icon"><Icon className="fas fa-shopping-cart"></Icon></IconWrapper></a>
                        <a href="/logout"><IconWrapper className="icon"><Icon className="fas fa-sign-out-alt"></Icon></IconWrapper></a>
                    </BubblesWrapper>
                </TopStripe>
                <BrowserRouter>
                    <div>
                        <Route exact path='/profile' component={UserProfile} />
                        <Route exact path='/company' component={CompanyProfile} />
                        <Route exact path='/marketplace' component={MarketPlace} />
                        <Route exact path='/user/:id' component={Opp} />
                    </div>
                </BrowserRouter>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(App)
