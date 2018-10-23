import React, {Component} from 'react'
import styled from 'styled-components'

class ChatHelp extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {}
    render() {
        const Main = styled.div`
        position: relative;
        `
        return (
            <Main>
                This is how the chat works
            </Main>
        )
    }
}

export default ChatHelp
