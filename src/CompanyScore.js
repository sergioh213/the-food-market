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

class CompanyScore extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        var fullBarWidth = this.lm.offsetWidth * (this.props.profile.company_score / 100)
        // var fullBarWidth = this.lm.offsetWidth * (90 / 100) // testing
        var distanceToTop = this.lm.offsetTop
        this.el.style.width = fullBarWidth + "px"
        this.el.style.top = distanceToTop + "px"
        this.bl.style.left = fullBarWidth + 20 + "px"
        this.bl.style.top = (distanceToTop - 2.5) + "px"
    }
    render() {
        const Main = styled.div`
            position: relative;
            margin-top: 10px;
            width: 100%;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            text-align: center;
        `
        const FilledBar = styled.div`
            position: relative;
            margin-top: 10px;
            width: 100%;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            text-align: center;
        `
        const Title = styled.div`
            position: relative;
            font-size: 10px;
            font-weight: 400;
            display: inline-block;
            top: 4px;
            `
            // float: left;
        const ScoreNumber = styled.div`
            position: relative;
            font-size: 14px;
            font-weight: Bold;
            display: inline-block;
            `
            // float: right;
        const ScoreTextWrapper = styled.div`
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            `
        const OutOF = styled.div`
            display: inline-block;
            color: grey;
            font-size: 12px;
            `
        return (
            <Main className="shadow">
                <ScoreTextWrapper>
                    <Title>Company trust score:</Title><div><ScoreNumber>{this.props.profile.company_score}</ScoreNumber><OutOF>/100</OutOF></div>
                </ScoreTextWrapper>
                <div id="company-score-bar" ref={(lm) => this.lm = lm}></div>
                <div id="company-score-filled-bar" ref={(el) => this.el = el}></div>
                <div id="company-score-ball" ref={(bl) => this.bl = bl}></div>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(CompanyScore)
