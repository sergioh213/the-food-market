import React, {Component} from 'react'
import { connect } from 'react-redux';
import { toggleShowChat, toggleExpandChat } from './redux-socket/actions.js'
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu
    }
}

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.toggleChat = this.toggleChat.bind(this)
        this.expandChat = this.expandChat.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    toggleChat() {
        console.log("turning chat off from bottom section");
        this.props.dispatch(toggleShowChat());
    }
    expandChat() {
        console.log("expandChat happening");
        // this.lm.classList.add("chat-expanded")
        this.props.dispatch(toggleExpandChat())
    }
    render() {
        if (!this.state.mounted || !this.props) {
            return null
        }
        const Chat = styled.div`
            display: flex;
            flex-direction: column;
            width: ${() => {
                if (!this.props.showBottomMenu) {
                    console.log("chat 100%");
                    return "100%"
                } else if (this.props.showBottomMenu && this.props.chat.expanded) {
                    console.log("chat 70%");
                    return "70%"
                } else {
                    return "29%"
                }
            }};
            min-height: 200px;
            padding: 10px 8px 8px 8px;
            background-color: rgba(251, 251, 251, 1);
            transition: width 1s;
            -webkit-transition: width 2s;
            justify-content: space-between;
            `
        const SectionTitle = styled.div`
            position: relative;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 0 12px 0 12px;
            `
        const ChatHeader = styled.div`
            color: #5EB648;
            font-weight: 400;
            `
        const ExpandChatIcon = styled.i`
            position: relative;
            font-size: 30px;
            display: inline-block;
            float: left;
            color: #6ACC58;
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
        const ChatBody = styled.div`
            width: 100%;
            display: flex;
            height: 100%;
            flex-direction: column;
            `
        const MessagesField =  styled.div`
            flex-direction: column;
            width: 100%;
            background-color: rgba(228, 221, 214, 1);
            padding: 8px 12px 8px 12px;
            height: 100%;
            `
        const ChatBottom =  styled.div`
            width: 100%;
            background-color: #f2f2f2;
            height: 40px;
            padding: 3px 6px 3px 6px;
            display: flex;
            align-items: center;
            `
        const ChatInput = styled.input`
            width: 100%;
            height: 100%;
            border: none;
            background-color: white;
            border-radius: 15px 15px 15px 15px;
            `
        const SendButton = styled.button`
            width: 26px;
            height: 26px;
            color: white;
            margin-left: 5px;
            background-color: #5EB648;
            border: none;
            border-radius: 100%;
            cursor: pointer;

            &:hover{
                background-color: #6ACC58;
            }
            `
        return (
            <Chat
                ref={(lm) => this.lm = lm}
                >
                <SectionTitle>
                    { this.props.showBottomMenu &&
                        ( this.props.chat.expanded ?
                            <ExpandChatIcon
                                class="fas fa-compress contract-on-hover"
                                onClick={this.expandChat}
                            ></ExpandChatIcon> :
                            <ExpandChatIcon
                            className="fas fa-expand scale-on-hover-more"
                            onClick={this.expandChat}
                        ></ExpandChatIcon>
                        )
                    }
                    <ChatHeader>Chat</ChatHeader>
                    <CloseX onClick={this.toggleChat}>x</CloseX>
                </SectionTitle>
                <ChatBody>
                    <MessagesField>hello</MessagesField>
                    <ChatBottom>
                        <ChatInput type="text"/><SendButton>s</SendButton>
                    </ChatBottom>
                </ChatBody>
            </Chat>
        )
    }
}

export default connect(mapStateToProps)(Chat)
