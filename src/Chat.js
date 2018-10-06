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
            display: inline-block;
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
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            transition: width 1s;
            -webkit-transition: width 2s; /* Safari */
            `
        const SectionTitle = styled.div`
            position: relative;
            text-align: left;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            height: 40px;
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
                    <CloseX onClick={this.toggleChat}>x</CloseX>
                </SectionTitle>
                <FormHeader>Chat</FormHeader>
                <div>hello</div>
            </Chat>
        )
    }
}

export default connect(mapStateToProps)(Chat)
