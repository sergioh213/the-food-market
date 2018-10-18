import React, {Component} from 'react'
import { connect } from 'react-redux';
import { getProfile } from './redux-socket/actions.js'
import { BrowserRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        searchBarMatches: state.searchBarMatches
    }
}

class SearchBarMatchesBox extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() { this.setState({ mounted: true }) }
    render() {
        if (!this.state.mounted || !this.props.profile) {
            return null
        }
        const Main = styled.div`
            position: absolute;
            top: 18px;
            z-index: 1;
            padding: 0 3px 3px 3px;
            background-color: #5EB648;
            border-radius: 0 0 17.5px 17.5px;
            width: ${()=>{
                if (this.props.searchBarMatches) {
                    return "470px"
                }
            }};
            `
        const BufferBox = styled.div`
            position: relative;
            height: 15px;
            background-color: white;
            border-bottom: lightgrey solid 1px;
            border-radius: 0 0 15px 15px;
            margin-bottom: 8px;
            `
        const BufferBoxAbsolute = styled.div`
            position: absolute;
            width: 464px;
            height: 15px;
            background-color: white;
            `
        const MatchesBox = styled.div`
            background-color: white;
            cursor: pointer;
            padding: 4px 10px 4px 10px;
            display: flex;

            &:hover{
                background-color: lightgrey;
            }
            `
        const Wrapper = styled.div`
            background-color: white;
            padding-bottom: 13px;
            border-radius: 0 0 15px 15px;
            `
        const ProfileImage = styled.img`
            position: relative;
            width: 30px;
            height: 30px;
            background-color: lightgrey;
            border-radius: 100%;
            `
        const ProfileTextWrapper = styled.div`
            display: flex;
            padding: 0 4px 0 4px;
            width: 100%;
            justify-content: space-between;
            `
        const ProfileName = styled.div`
            font-size: 14px;
            display: inline-block;
            display: flex;
            align-items: center;
            font-weight: 400;
            `
        const ProfileTypeLable = styled.div`
            color: grey;
            font-size: 12px;
            display: inline-block;
            `
        return (
            <div>
                { (this.props.searchBarMatches && this.props.searchBarMatches.length>=1) &&
                    <Main>
                        <Wrapper>
                            <BufferBoxAbsolute></BufferBoxAbsolute>
                            <BufferBox></BufferBox>
                            <BrowserRouter>
                                <div>
                                    { (this.props.searchBarMatches && this.props.searchBarMatches.length>=1) &&
                                        this.props.searchBarMatches.map(item => {
                                            if (item.user_name) {
                                                return(
                                                    <a href={`/user/${item.id}`} key={item.id}><MatchesBox>
                                                        <ProfileImage src={item.profile_image_url}></ProfileImage>
                                                        <ProfileTextWrapper>
                                                            <ProfileName>{`${item.user_name} ${item.user_lastname}`}</ProfileName>
                                                            <ProfileTypeLable>Person</ProfileTypeLable>
                                                        </ProfileTextWrapper>
                                                    </MatchesBox></a>
                                                )
                                            } else if (item.company_legal_name) {
                                                return(
                                                    <a href={`/user/${item.id}`} key={item.id}><MatchesBox>
                                                        <ProfileImage src={item.company_image_url}></ProfileImage>
                                                        <ProfileTextWrapper>
                                                            <ProfileName>{item.company_legal_name}</ProfileName>
                                                            <ProfileTypeLable>Company</ProfileTypeLable>
                                                        </ProfileTextWrapper>
                                                    </MatchesBox></a>
                                                )
                                            }
                                            // <Link to="/user/2" key={item}><MatchesBox>{item}</MatchesBox></Link>
                                        })
                                    }
                                </div>
                            </BrowserRouter>
                        </Wrapper>
                    </Main>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(SearchBarMatchesBox)
