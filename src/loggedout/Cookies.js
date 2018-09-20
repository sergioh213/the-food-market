import React, {Component} from 'react'
import axios from '../axios'
import DimBackground from './DimBackground'
import styled from 'styled-components'

class Cookies extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    render() {
        if (!this.state.mounted) {
            return null
        }
        const CookiesModal = styled.div`
            position: relative;
            background-color: white;
            width: 500px;
            z-index: 4;
            padding: 30px
            text-align: center;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);`
        const SmallerText = styled.div`
            font-size: 10px;`
        const Title = styled.div`
            color: orange;
            fonr-weight: 400;
            font-size: 18px;
            margin-bottom: 8px;`
        const BoldText = styled.div`
            font-weight: bold;
            display: inline-block;`
        const CookiesText = styled.div`
            margin-bottom: 6px;
            margin-top: 30px;`
        return (
            <div id="cookies">
                <DimBackground top/>
                <CookiesModal><Title>BEWARE!</Title>
                    This is just a <BoldText>DEMO</BoldText>, not a real website.<br/>
                    <BoldText>PLEASE, DO NOT ADD</BoldText> any of your real <BoldText>information</BoldText>.
                    <CookiesText>Also... We use cookies.</CookiesText>
                    <SmallerText>If you agree, click below</SmallerText>
                    <button
                        id="submit-button-registration"
                        onClick={ this.props.acceptCookies }
                    >I Agree</button>
                </CookiesModal>
            </div>
        )
    }
}

export default Cookies
