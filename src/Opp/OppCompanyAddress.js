import React, {Component} from 'react'
import styled from 'styled-components'

class OppCompanyAddress extends Component {
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
            width: 100%;
            position: relative;
            text-align: center;

            ${() => {
                if (this.props.showSimpleMap) {
                    return null
                } else {
                    return (
                        `&:hover{
                            transform: scale(1.1);
                            color: darkgrey;
                        }`
                    )
                }
            }}
            `
        const AddressText = styled.div`
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
            display: inline-block;
            `
        const SearchIcon = styled.i`
            font-size: 12px;
            display: inline-block;
            margin-left: 15px;
            cursor: pointer;
            `
        const CloseX = styled.div`
            position: relative;
            font-size: 30px;
            font-weight: 400;
            color: darkgrey;
            display: inline-block;
            float: right;
            cursor: pointer;
            margin-right: 8px;
            padding: none;

            &:hover{
                color: black;
                transform: scale(1.2);
            }`
        return (
            <MainDiv onClick={ this.props.findOnMap }>
                <AddressText>{ this.props.headquarter_formatted_address }</AddressText>
                <SearchIcon className="fas fa-search-location"></SearchIcon>
                { this.props.showSimpleMap && <CloseX>x</CloseX> }
            </MainDiv>
        )
    }
}

export default OppCompanyAddress
