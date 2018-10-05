import React, {Component} from 'react'
import styled from 'styled-components'

class OppCompanyDescriptionText extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {}
    render() {
        const MainDiv = styled.div`
            position: relative;
            text-align: center;
            `
        const TextDiv = styled.div`
            color: black;
            position: relative;
            display: inline-block;
            margin-top: 15px;
            `
        return (
            <MainDiv>
                <TextDiv>{this.props.company_description}</TextDiv>
            </MainDiv>
        )
    }
}

export default OppCompanyDescriptionText
