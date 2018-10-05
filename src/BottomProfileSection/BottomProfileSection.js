import React, {Component} from 'react'
import axios from '../axios'
import styled from 'styled-components'
import GoogleMap from '../GoogleMap'
import { toggleShowChat } from '../redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        showChat: state.showChat
    }
}

class BottomProfileSection extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.toggleShowChat = this.toggleShowChat.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    toggleShowChat() {
        this.props.dispatch(toggleShowChat());
    }
    render() {
        if (!this.state.mounted || !this.props) {
            return null
        }
        const Main = styled.div`
            position: relative;
            display: flex;
            `
        const Bottom = styled.div`
            position: relative;
            width: ${() => {
                if (this.props.showChat) {
                    return "70%"
                } else {
                    return "100%"
                }
            }};
            display: inline-block;
            min-height: 200px;
            padding: 20px;
            margin-right: 10px;
            background-color: rgba(251, 251, 251, 1);
            `
        const Message = styled.div`
            display: inline-block;
            width: 29%;
            `
        const SectionTitle = styled.div`
            position: relative;
            text-align: left;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            height: 40px;
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
            }
            `
        const FormHeader = styled.div`
            font-size: 16px;
            display: inline-block;
            color: black;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            `
        const Chat = styled.div`
            display: inline-block;
            width: 29%;
            min-height: 200px;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            `
        return (
            <Main>
                <Bottom className="shadow">
                    <SectionTitle>
                        <FormHeader>Write the address</FormHeader><CloseX onClick={this.props.toggleShowBottom}>x</CloseX>
                    </SectionTitle>
                    <div className="input-wrapper">
                        <input type="text"/> <button className="submit-button scale-on-hover">Submit</button>
                    </div>
                    <Message>Valid Address</Message>
                    <div>
                        <GoogleMap shallow inline
                        placeId={"ChIJhdqtz4aI7UYRefD8s-aZ73I"}></GoogleMap>
                        <button className="find_me_icon icon"><i className="fas fa-male"></i></button>
                    </div>
                </Bottom>
                { this.props.showChat &&
                    <Chat>
                        <SectionTitle>
                            <FormHeader>Chat</FormHeader><CloseX onClick={this.toggleShowChat}>x</CloseX>
                        </SectionTitle>
                        hello
                    </Chat>
                }
            </Main>
        )
    }
}

export default connect(mapStateToProps)(BottomProfileSection)
