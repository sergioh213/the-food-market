import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class ExampleComponent extends Component {
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
            width: 505px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;`
        const AddressText = styled.div`
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
            display: inline-block;

            &:hover {
              color: darkgrey;
              transform: scale(1.1);
            }`
        const SearchIcon = styled.i`
            font-size: 12px;
            display: inline-block;
            margin-left: 15px;
            cursor: pointer;

            &:hover{
                transform: scale(2);
                color: darkgrey;
            }`
        return (
            <MainDiv>
                <AddressText onClick={this.props.toggleShowMap}>{ this.props.headquarter_formatted_address }</AddressText>
                <SearchIcon onClick={this.props.findOnMap} className="fas fa-search-location"></SearchIcon>
            </MainDiv>
        )
    }
}

export default ExampleComponent
