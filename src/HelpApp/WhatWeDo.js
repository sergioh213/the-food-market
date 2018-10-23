import React, {Component} from 'react'
import styled from 'styled-components'

class WhatWeDo extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        // this.props.dispatch(getProfile());
    }
    render() {
        const Main = styled.div`
        position: relative;
        `
        return (
            <Main>
                We connect food producers with stores.
                <br/>
                <br/>
                So you only have to worry about what you do best.
                <br/>
                <b>We take care of the rest.</b>
            </Main>
        )
    }
}

export default WhatWeDo
