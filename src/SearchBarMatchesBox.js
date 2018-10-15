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
            console.log("matches stuck in null");
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

            &:hover{
                background-color: lightgrey;
            }
            `
        const Wrapper = styled.div`
            background-color: white;
            padding-bottom: 13px;
            border-radius: 0 0 15px 15px;
            `
        console.log("this.props.searchBarMatches: ", this.props.searchBarMatches);
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
                                            return(
                                                <a href={`/user/${item.id}`} key={item.id}><MatchesBox>{item.company_legal_name}</MatchesBox></a>
                                            )
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
