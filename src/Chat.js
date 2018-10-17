import React, {Component} from 'react'
import { connect } from 'react-redux';
import { newChatMessage } from './redux-socket/socket'
import { toggleShowChat, toggleExpandChat, setChatMatches, setActiveChat } from './redux-socket/actions.js'
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
        otherUsers: state.otherUsers,
        allProfiles: state.allProfiles,
        activeChat: state.activeChat
    }
}

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "",
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
        this.updateScroll = this.updateScroll.bind(this)
    }
    async componentDidMount() {
        await this.setState({ mounted: true })
        if (!this.props.showBottomMenu) {
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "100%"
        } else if (this.props.showBottomMenu && this.props.chat.expanded) {
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "70%"
        } else {
            this.lm.style.width = "29%"
        }
        // this.messageFieldElem.scrollTop = this.messageFieldElem.scrollHeight;
        // console.log("this.messageFieldElem: ", this.messageFieldElem);
        await this.updateScroll()
    }
    async componentDidUpdate() {
        console.log("chat updated");
        if (!this.props.showBottomMenu) {
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "100%"
        } else if (this.props.showBottomMenu && this.props.chat.expanded) {
            this.bodyElem.style.width = "60%"
            this.lm.style.width = "70%"
        } else {
            this.lm.style.width = "29%"
        }
        // this.messageFieldElem.scrollTop = this.messageFieldElem.scrollHeight;
        // console.log("this.messageFieldElem: ", this.messageFieldElem);
        await this.updateScroll()
    }
    updateScroll(){
        console.log("updateScroll happening");
        this.messageFieldElem.scrollTop = this.messageFieldElem.scrollHeight;
    }
    handleSearchChange(e) {
        var val = e.target.value
        var userMatches = [];
        var CompanyMatches = [];
        const { allProfiles, otherCompanies, otherUsers } = this.props
        for (var i = 0; i < otherUsers.length; i++) {
            if (
                otherUsers[i].user_name.toLowerCase().startsWith(val.toLowerCase()) &&
                val != ""
            ) {
                userMatches.push(otherUsers[i]);
            }
            if (userMatches.length >= 6) {
                break;
            }
        }
        for (var i = 0; i < otherCompanies.length; i++) {
            if (
                otherCompanies[i].company_legal_name.toLowerCase().startsWith(val.toLowerCase()) &&
                val != ""
            ) {
                CompanyMatches.push(otherCompanies[i]);
            }
            if (CompanyMatches.length >= 5) {
                break;
            }
        }
        var matches = [...userMatches, ...CompanyMatches]
        this.props.dispatch(setChatMatches(matches))
    }
    toggleChat() {
        // console.log("turning chat off from bottom section");
        this.props.dispatch(toggleShowChat());
    }
    expandChat() {
        console.log("expandChat happening");
        this.props.dispatch(toggleExpandChat())
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ] : e.target.value
        })
    }
    async sendMessage() {
        console.log("this.state.message at send message: ", this.state.message);
        if (this.state.message && this.state.message != "" && this.state.message != null) {
            console.log("sendMessage happening");
            var previousArrayOfMessages = this.props.messages
            // if (state.messages.length >= 16) {
            //     previousArrayOfMessages.shift()
            // }
            await previousArrayOfMessages.push(this.state.message)
            await newChatMessage(previousArrayOfMessages)
            await this.setState({ message: "" })
        }
    }
    selectUser(profile) {
        this.props.dispatch(setActiveChat(profile))
    }
    render() {
        if (!this.state.mounted && !this.props.messages) {
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
        const ActiveChatText = styled.div`
            display: inline-block;
            position: relative;
            height: 100%;
            `
            // align-items: center;
        const ActiveChatName = styled.div`
            position: relative;
            top: 50%;
            transform: translateY(-50%);
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
            overflow: scroll;
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
        const ActiveChatBubbleBox = styled.div`
            width: 44px;
            height: 100%;
            border-left: 1px lightgrey solid;
            display: flex;
            justify-content: center;
            align-items: center;
            `
        const ActiveChatBubble = styled.img`
            position: relative;
            width: 30px;
            height: 30px;
            border: 3px #5EB648 solid;
            background-color: lightgrey;
            border-radius: 100%;
            bottom: 3px;
            left: -1px;
            `
        const ResultBox = styled.div`
            position: relative;
            border-bottom: 1px lightgrey solid;
            display: flex;
            padding-top: 3px;
            padding-bottom: 3px;
            cursor: pointer;

            &:hover{
                background-color: rgb(206, 206, 206);
            }
            `
        const ProfileImage = styled.img`
            position: relative;
            width: 30px;
            height: 30px;
            background-color: lightgrey;
            border-radius: 100%;
            `
        const ProfileTextWrapper = styled.div`
            display: flex;
            padding: 0 4px 0 4px;
            width: 100%;
            justify-content: space-between;
            `
        const ProfileName = styled.div`
            font-size: 14px;
            display: inline-block;
            `
        const ProfileTypeLable = styled.div`
            color: grey;
            font-size: 12px;
            display: inline-block;
            `
        console.log("this.props.messages before render: ", this.props.messages);
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
                    { (this.props.activeChat && this.props.activeChat.company_legal_name) &&
                        <ActiveChatBubbleBox>
                            <ActiveChatBubble src={this.props.activeChat.company_image_url}></ActiveChatBubble>
                        </ActiveChatBubbleBox>
                    }
                    { (this.props.activeChat && this.props.activeChat.user_name) &&
                        <ActiveChatBubbleBox>
                        <ActiveChatBubble src={this.props.activeChat.profile_image_url}></ActiveChatBubble>
                        </ActiveChatBubbleBox>
                    }
                    <RightHeader>
                        <ActiveChatText>
                            { this.props.activeChat &&
                                ((this.props.activeChat.user_name && <ActiveChatName>{`${this.props.activeChat.user_name} ${this.props.activeChat.user_lastname}`}</ActiveChatName> ) || <ActiveChatName>{this.props.activeChat.company_legal_name}</ActiveChatName>)
                            }
                        </ActiveChatText>
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
                                        if (item.user_name) {
                                            return(
                                                <ResultBox key={item.id} onClick={() => this.selectUser(item)}>
                                                    <ProfileImage src={item.profile_image_url}></ProfileImage>
                                                    <ProfileTextWrapper>
                                                        <ProfileName>{`${item.user_name} ${item.user_lastname}`}</ProfileName>
                                                        <ProfileTypeLable>Person</ProfileTypeLable>
                                                    </ProfileTextWrapper>
                                                </ResultBox>
                                            )
                                        } else if (item.company_legal_name) {
                                            return(
                                                <ResultBox key={item.id} onClick={() => this.selectUser(item)}>
                                                    <ProfileImage src={item.company_image_url}></ProfileImage>
                                                    <ProfileTextWrapper>
                                                        <ProfileName>{item.company_legal_name}</ProfileName>
                                                        <ProfileTypeLable>Company</ProfileTypeLable>
                                                    </ProfileTextWrapper>
                                                </ResultBox>
                                            )
                                        }
                                    })
                                }
                            </SearchArea>
                        </div>
                    }
                    { (this.props.chat.expanded || !this.props.showBottomMenu) &&
                        <VerticalBar></VerticalBar>
                    }
                    <div id="chat-body" ref={(bodyElem) => this.bodyElem = bodyElem}>
                        <div id="messages-field" ref={(messageFieldElem) => this.messageFieldElem = messageFieldElem}>
                            { this.props.messages &&
                                this.props.messages.map(message => {
                                    if (message.sender_id == this.props.profile.id) {
                                        return (
                                            <YourMessageWrapper key={message.id}>
                                                <YourMessageBox className="shadow">
                                                    {message.message}
                                                </YourMessageBox>
                                            </YourMessageWrapper>
                                        )
                                    } else {
                                        return (
                                            <SomeoneElsesMessageWrapper key={message.id}>
                                                <SomeoneElsesMessageBox className="shadow">
                                                    {message.message}
                                                </SomeoneElsesMessageBox>
                                            </SomeoneElsesMessageWrapper>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div id="chat-bottom">
                            <input
                                id="chat-input"
                                name="message"
                                type="text"
                                placeholder='Type a message'
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.message}
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
