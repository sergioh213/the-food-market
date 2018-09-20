import React, {Component} from 'react'
import axios from './axios'
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
        const MainDiv = styled.div`
            position: relative;
            background-color: white;
            padding: 30px
            text-align: center;
            display: inline-block;
            z-index: 4;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);`
        return (
            <div id="cookies">
                <DimBackground top/>
                <MainDiv>Thank You</MainDiv>
            </div>
        )
    }
}

export default Cookies
