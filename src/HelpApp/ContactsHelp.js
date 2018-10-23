import React, {Component} from 'react'
import styled from 'styled-components'

class ContactsHelp extends Component {
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
                Every location has at least one contact person.
            </Main>
        )
    }
}

export default ContactsHelp
