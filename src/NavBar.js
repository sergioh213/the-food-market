import React, {Component} from 'react'
import { connect } from 'react-redux';
import { getProfile, setMatches } from './redux-socket/actions.js'
import styled from 'styled-components'
import SearchBarMatchesBox from './SearchBarMatchesBox'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        otherCompanies: state.otherCompanies,
        otherUsers: state.otherUsers
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showSearchBar: false,
            multipleAccounts: true,
            navBarIcons: [
                {
                    id: 1,
                    link: "/profile",
                    lableDisplay: false,
                    classes: "fas fa-user",
                    text: "Your personal profile"
                },
                {
                    id: 2,
                    link: "/company",
                    lableDisplay: false,
                    classes: "fas fa-building",
                    text: "Your company's profile"
                },
                {
                    id: 3,
                    link: "/marketplace",
                    lableDisplay: false,
                    classes: "fas fa-shopping-cart",
                    text: "The marketplace. Here you can buy and sell"
                },
                {
                    id: 4,
                    link: "/help",
                    lableDisplay: false,
                    classes: "fas fa-question",
                    text: "Do you need help?"
                },
                {
                    id: 5,
                    link: "/logout",
                    lableDisplay: false,
                    classes: "fas fa-sign-out-alt",
                    text: "Logout"
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
        this.colapseSearchBar = this.colapseSearchBar.bind(this)
        this.deploySearchBar = this.deploySearchBar.bind(this)
        this.toggleShowSwitchAccountLable = this.toggleShowSwitchAccountLable.bind(this)
        this.toggleHideSwitchAccountLable = this.toggleHideSwitchAccountLable.bind(this)
        this.toggleHideSwitchAccountLable = this.toggleHideSwitchAccountLable.bind(this)
        this.toggleHideLable = this.toggleHideLable.bind(this)
    }
    componentDidMount() {
        // this.props.dispatch(getProfile());
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
    toggleShowSwitchAccountLable(){
        this.setState({ switchAccountLableDisplay: true })
    }
    toggleHideSwitchAccountLable(){
        this.setState({ switchAccountLableDisplay: false })
    }
    toggleShowLable(itemId){
        const clone = this.state.navBarIcons.map(item => {
            if (item.id === itemId) {
                item.lableDisplay = true
            }
            return item
        })
        this.setState({ navBarIcons: this.state.navBarIcons }, () => {
            setTimeout(() => {
                const clone = this.state.navBarIcons.map(item => {
                    if (item.id === itemId) {
                        item.lableDisplay = false
                    }
                    return item
                })

                this.setState({ navBarIcons: clone })
            }, 3000)
        })
    }
    toggleHideLable(itemId){
        const clone = this.state.navBarIcons.map(item => {
            if (item.id === itemId) {
                item.lableDisplay = false
            }
            return item
        })

        this.setState({ navBarIcons: clone })
    }
    render() {
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
        min-width: 50px;

        &:hover{
            transform: scale(1.1);
        }
        `
        const SwitchAccountIcon = styled.i`
        position: relative;
        color: white;
        margin-right: 3px;
        `
        /////////////// lable ///////////////
        const Wrapper = styled.div`
        position: relative;
        display: inline-block;
        `
        const Label = styled.div`
        position: relative;
        background-color: #ededed;
        padding: 5px;
        color: #5b5b5b;
        border-radius: 4px;
        `
        const ArrowUp = styled.div`
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #ededed;
        margin: 0 auto;`
        const LabelWrapper = styled.div`
        position absolute;
        width: 106px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        z-index: 1;
        `
        return (
            <TopStripe>
                { this.state.multipleAccounts &&
                    <Wrapper className="bubbles-wrapper">
                        <SwitchAccountWrapper
                            onMouseEnter={() => {this.toggleShowSwitchAccountLable()}}
                            onMouseLeave={() => {this.toggleHideSwitchAccountLable()}}
                        >
                            <SwitchAccountIcon className="fas fa-user-circle"></SwitchAccountIcon>
                            <SwitchAccountIcon className="fas fa-arrows-alt-h"></SwitchAccountIcon>
                            <SwitchAccountIcon className="fas fa-user-circle"></SwitchAccountIcon>
                        </SwitchAccountWrapper>
                        { this.state.switchAccountLableDisplay &&
                            <LabelWrapper>
                                <ArrowUp></ArrowUp>
                                <Label className="shadow">Switch between your linked accounts</Label>
                            </LabelWrapper> }
                    </Wrapper>
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
                    {this.state.navBarIcons && this.state.navBarIcons.map(item => {
                        return (
                            <Wrapper key={item.id} className="bubbles-wrapper">
                                    <a href={item.link}
                                        onMouseEnter={() => {this.toggleShowLable(item.id)}}
                                        onMouseLeave={() => {this.toggleHideLable(item.id)}}
                                    >
                                        <IconWrapper className="icon"><Icon className={ item.classes }></Icon></IconWrapper>
                                    </a>
                                { item.lableDisplay &&
                                    <LabelWrapper className="shadow">
                                        <ArrowUp></ArrowUp>
                                        <Label>{item.text}</Label>
                                    </LabelWrapper> }
                            </Wrapper>
                        )
                    })}
                </BubblesWrapper>
            </TopStripe>
        )
    }
}

export default connect(mapStateToProps)(NavBar)
