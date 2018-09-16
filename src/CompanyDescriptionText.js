import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class CompanyDescriptionText extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    render() {
        const MainDiv = styled.div`
            position: relative;`
        const TextDiv = styled.div`
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            margin-top: 15px;`
        return (
            <MainDiv><TextDiv>{this.state.company_description}</TextDiv></MainDiv>
        )
    }
}

export default CompanyDescriptionText
