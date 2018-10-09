import React, {Component} from 'react'
import axios from '../axios'
import NewFacilityForm from './NewFacilityForm'
import Chat from '../Chat'
import styled from 'styled-components'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu
    }
}

class BottomProfileSection extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    render() {
        if (!this.state.mounted || !this.props) {
            console.log("bottom section stuck");
            return null
        }
        const Main = styled.div`
            position: relative;
            display: flex;
            `
        return (
            <Main>
                {/*//////////////////////// LEFT section ///////////////////////////*/}
                {this.props.showBottomMenu && <NewFacilityForm /> }
                {/*//////////////////////// RIGHT section ///////////////////////////*/}
                { this.props.chat.showChat && <Chat /> }
            </Main>
        )
    }
}

export default connect(mapStateToProps)(BottomProfileSection)
