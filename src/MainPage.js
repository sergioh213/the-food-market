import React, {Component} from 'react'
import { connect } from 'react-redux';
import { getProfile } from './redux-socket/actions.js'
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        // this.props.dispatch(getProfile());
    }
    render() {
        const Main = styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        `
        const Header = styled.div`
        position: relative;
        color: grey;
        font-size: 40px;
        font-weight: 400;
        `
        const ProfileInfoBox = styled.div`
        position: relative;
        display: flex;
        justify-content: start;
        align-items: flex-end;
        width: 100%;
        `
        const Logo = styled.img`
        position: relative;
        border: 5px solid grey;
        width: 250px;
        height: 250px;
        object-fit: cover;
        object-position: center;
        `
        const CompanyName = styled.div`
        position: relative;
        display: flex;
        font-size: 30px;
        `
        return (
            <Main>
                <Header>Welcome</Header>
                <ProfileInfoBox>
                    <Logo src={this.props.profile.company_image_url}></Logo>
                    <CompanyName>{this.props.profile.company_legal_name}</CompanyName>
                </ProfileInfoBox>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(MainPage)
