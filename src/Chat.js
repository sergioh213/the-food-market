import React, {Component} from 'react'
import { connect } from 'react-redux';
import { newChatMessage } from './redux-socket/socket'
import { toggleShowChat, toggleExpandChat, setChatMatches } from './redux-socket/actions.js'
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        messages: state.messages,
        otherCompanies: state.otherCompanies,
        chatSearchBarMatches: state.chatSearchBarMatches,
        otherUsers: state.otherUsers
    }
}

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            temporaryArrayOfMessages: [
                {
                    sender_id: 1,
                    receiverid: 2,
                    messageText: "hello there",
                    timeSent: "5:33"
                },
                {
                    sender_id: 2,
                    receiverid: 1,
                    messageText: "Well, hello",
                    timeSent: "5:35"
                },
                {
                    sender_id: 2,
                    receiverid: 1,
                    messageText: "How are you?",
                    timeSent: "5:35"
                },
                {
                    sender_id: 1,
                    receiverid: 2,
                    messageText: "I'm good",
                    timeSent: "5:40"
                },
                {
                    sender_id: 2,
                    receiverid: 1,
                    messageText: "glad to hear",
                    timeSent: "5:55"
                }
            ]
        }

        this.toggleChat = this.toggleChat.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.expandChat = this.expandChat.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
        if (!this.props.showBottomMenu) {
            this.bodyWrapperElem.style.flexDirection = "row"
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "100%"
        } else if (this.props.showBottomMenu && this.props.chat.expanded) {
            this.bodyWrapperElem.style.flexDirection = "row"
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "70%"
        } else {
            this.lm.style.width = "29%"
        }
    }
    componentDidUpdate() {
        console.log("chat updated");
        if (!this.props.showBottomMenu) {
            this.bodyWrapperElem.style.flexDirection = "row"
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "100%"
        } else if (this.props.showBottomMenu && this.props.chat.expanded) {
            this.bodyWrapperElem.style.flexDirection = "row"
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "70%"
        } else {
            this.lm.style.width = "29%"
        }
    }
    handleSearchChange(e) {
        var val = e.target.value
        var matches = [];
        const { otherCompanies } = this.props
        for (var i = 0; i < otherCompanies.length; i++) {
            if (
                otherCompanies[i].company_legal_name.toLowerCase().startsWith(val.toLowerCase()) &&
                val != ""
            ) {
                matches.push(otherCompanies[i]);
            }
            if (matches.length >= 5) {
                break;
            }
        }
        this.props.dispatch(setChatMatches(matches))
    }
    toggleChat() {
        console.log("turning chat off from bottom section");
        this.props.dispatch(toggleShowChat());
    }
    expandChat() {
        console.log("expandChat happening");
        this.bodyWrapperElem.style.flexDirection = "row"
        this.props.dispatch(toggleExpandChat())
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ] : e.target.value
        })
    }
    sendMessage() {
        console.log("this.state.message at send message: ", this.state.message);
        if (this.state.message && this.state.message != "" && this.state.message != null) {
            console.log("sendMessage happening");
            this.inputElem.value = ""
            newChatMessage(this.state.message)
        }
    }
    render() {
        if (!this.state.mounted && !this.props) {
            return null
        }
        const Chat = styled.div`
            display: flex;
            flex-direction: column;
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
            height: 40px;
            width: 100%;
            `
        const ChatHeader = styled.div`
            color: #5EB648;
            font-weight: 400;
            `
        const ExpandChatIcon = styled.i`
            position: relative;
            font-size: 20px;
            display: inline-block;
            float: left;
            color: #5EB648;
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
            }
            `
        const LeftHeader = styled.div`
            position: relative;
            width: 40%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 12px 0px 12px;
            `
        const RightHeader = styled.div`
            position: relative;
            height: 100%;
            width: 60%;
            `
        const ChatBody = styled.div`
            width: ${() => {
                if (this.props.chat.expanded || !this.props.showBottomMenu) {
                    return "60%"
                } else {
                    return "100%"
                }
            }};
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
            // max-height: 200px;
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
            padding-right: 8px;
            padding-left: 8px;
            font-size: 14px;
            `
        const SendButton = styled.button`
            width: 26px;
            height: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
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
        const SendArrow = styled.i`
            color: white;
            font-size: 18px;
            `
        const YourMessageWrapper = styled.div`
            width: 100%;
            display: flex;
            justify-content: flex-end;
            `
        const SomeoneElsesMessageWrapper = styled.div`
            width: 100%;
            display: flex;
            justify-content: start;
            `
        const YourMessageBox = styled.div`
            display: inline-block;
            background-color: rgb(225, 247, 202);
            padding: 3px 6px 3px 6px;
            border-radius: 4px;
            font-size: 14px;
            margin-bottom: 2px;
            `
        const SomeoneElsesMessageBox = styled.div`
            display: inline-block;
            background-color: rgba(251, 251, 251, 1);
            padding: 3px 6px 3px 6px;
            border-radius: 4px;
            font-size: 14px;
            margin-bottom: 2px;
            `
        ///////////////// left menu //////////////
        const LeftMenu = styled.div`
            display: flex;
            height: 100%;
            width: 40%;
            flex-direction: column;
            `
        const SearchBar = styled.div`
            width: 100%;
            background-color: #f2f2f2;
            height: 40px;
            padding: 3px 6px 3px 6px;
            display: flex;
            align-items: center;
            `
        const SearchButton = styled.i`
            color: white;
            font-size: 14px;
            `
        const SearchArea = styled.div`
            width: 100%;
            background-color: #f2f2f2;
            height: 100%;
            padding: 3px 6px 3px 6px;
            display: flex;
            flex-direction: column;
            border-top: 1px lightgrey solid;
            `
        const VerticalBar = styled.div`
            width: 42px;
            height: 100%;
            border-left: 1px lightgrey solid;
            `
        const ActiveChatBubble = styled.div`
            width: 45px;
            height: 100%;
            border-left: 1px lightgrey solid;
            `
        return (
            <div id="chat-main"
                ref={(lm) => this.lm = lm}
                className="shadow"
                >
                <SectionTitle>
                    <LeftHeader>
                        { this.props.showBottomMenu &&
                            ( this.props.chat.expanded ?
                                <ExpandChatIcon
                                    className="fas fa-angle-right scale-on-hover-more"
                                    onClick={this.expandChat}
                                    ></ExpandChatIcon> :
                                    <ExpandChatIcon
                                    className="fas fa-bars scale-on-hover-more"
                                    onClick={this.expandChat}
                                ></ExpandChatIcon>
                            )
                        }
                        <ChatHeader>Chat</ChatHeader>
                    </LeftHeader>
                    <ActiveChatBubble>
                    </ActiveChatBubble>
                    <RightHeader>
                        <CloseX onClick={this.toggleChat}>x</CloseX>
                    </RightHeader>
                </SectionTitle>
                <div id="chat-body-wrapper" ref={(bodyWrapperElem) => this.bodyWrapperElem = bodyWrapperElem}>
                    { (this.props.chat.expanded || !this.props.showBottomMenu) &&
                        <div id="chat-left-menu">
                            <div id="chat-search-bar">
                                <input
                                    id="chat-input"
                                    name="search_bar"
                                    type="text"
                                    placeholder='Search for someone'
                                    onChange={(e) => this.handleSearchChange(e)}
                                />
                                <SendButton>
                                    <SearchButton className="fas fa-search"></SearchButton>
                                </SendButton>
                            </div>
                            <SearchArea>
                                { this.props.chatSearchBarMatches &&
                                    this.props.chatSearchBarMatches.map(item => {
                                        return(
                                            <div key={item.id}>{item.company_legal_name}</div>
                                        )
                                    })
                                }
                            </SearchArea>
                        </div>
                    }
                    { (this.props.chat.expanded || !this.props.showBottomMenu) &&
                        <VerticalBar></VerticalBar>
                    }
                    <div id="chat-body" ref={(bodyElem) => this.bodyElem = bodyElem}>
                        <MessagesField>
                        { this.props.messages &&
                            this.props.messages.map(message => {
                                if (message.sender_id == this.props.profile.id) {
                                    return (
                                        <YourMessageWrapper>
                                            <YourMessageBox className="shadow">
                                                {message.message}
                                            </YourMessageBox>
                                        </YourMessageWrapper>
                                    )
                                } else {

                                }
                                return (
                                    <SomeoneElsesMessageWrapper>
                                        <SomeoneElsesMessageBox className="shadow">
                                            {message.message}
                                        </SomeoneElsesMessageBox>
                                    </SomeoneElsesMessageWrapper>
                                )
                            })
                        }
                        </MessagesField>
                        <div id="chat-bottom">
                            <input
                                id="chat-input"
                                name="message"
                                type="text"
                                placeholder='Type a message'
                                onChange={(e) => this.handleChange(e)}
                                ref={(inputElem) => this.inputElem = inputElem}
                            />
                            <SendButton onClick={() => this.sendMessage()}>
                                <SendArrow className="fas fa-arrow-right"></SendArrow>
                            </SendButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Chat)
