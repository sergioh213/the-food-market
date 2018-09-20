import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class ExampleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {}
    render() {
        const AddressText = styled.div`
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            margin-top: 10px;`
        return (
            <div>
                <AddressText>{ this.state.headquarter_formatted_address }</AddressText>
            </div>
        )
    }
}

export default ExampleComponent
