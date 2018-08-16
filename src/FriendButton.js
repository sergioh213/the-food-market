import React, {Component} from 'react'
import axios from './axios'

class FriendButton extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.sendRequest = this.sendRequest.bind(this)
        this.updateButton = this.updateButton.bind(this)
        this.inviteFriend = this.inviteFriend.bind(this)
        this.terminateFriend = this.terminateFriend.bind(this)
        this.acceptFriend = this.acceptFriend.bind(this)
    }
    componentDidMount() {
        console.log("button mounted. ID = ", this.props.id);
        this.updateButton()
    }
    updateButton() {
        // console.log("getting in to the update");
        axios.get('/friend/' + this.props.id + '.json')
            .then(({data}) => {
                // console.log("status returned from db: ", data.status);
                // console.log("between sender: ", data.senderId, " & receiver: ", data.receiverId);
                // console.log("logged user ID is: ", data.sessionUserId);
                if ( !data || !data.status ) {
                    // console.log("there is NO data!");
                    this.setState({
                        buttonText: 'Send connection request',
                        status: null,
                    })
                } else {
                    // console.log("there is data! ", data);
                    this.setState({
                        sessionUserId: data.sessionUserId,
                        receiverId: data.receiverId,
                        senderId: data.senderId
                    })
                    if ( data.status == 1 ) {
                        if ( this.state.sessionUserId == this.state.senderId ) {
                            console.log("if im the sender (Cancel Invitation)");
                            this.setState({
                                buttonText: 'Cancel connection request',
                                status: 1
                            })
                        } else if ( this.state.sessionUserId == this.state.receiverId ) {
                            console.log("if im the receiver (Accept Invitation)");
                            this.setState({
                                buttonText: 'Accept connection request',
                                status: 1
                            })
                        }
                    } else if ( data.status == 2 ) {
                        this.setState({
                            buttonText: 'End connection',
                            status: 2
                        })
                    }
                }
            })
    }
    sendRequest() {
        // console.log("current status is: ", this.state.status);
        if (!this.state.status || this.state.status==null ) {
            this.inviteFriend()
        } else if (this.state.status == 1) {
            if (this.state.sessionUserId == this.state.senderId) {
                this.terminateFriend()
            } else if (this.state.sessionUserId == this.state.receiverId) {
                if (this.props.handleAccept) {
                    this.props.handleAccept(this.props.id)
                }
                this.acceptFriend()
            }
        } else if (this.state.status == 2) {
            if (this.props.handleEndFriend) {
                this.props.handleEndFriend(this.props.id)
            }
            this.terminateFriend()
        }
    }
    inviteFriend() {
        console.log("invite happening");
        axios.post('/friend/' + this.props.id + '.json')
            .then(({data}) => {
                this.setState({
                    status: 1,
                    sessionUserId: data.sessionUserId,
                    receiverId: data.receiverId,
                    senderId: data.senderId
                })
                // console.log("after invite return of data");
                // console.log("this.state.sessionUserId: ", this.state.sessionUserId);
                // console.log("this.state.senderId: ", this.state.senderId);
                if ( this.state.sessionUserId == this.state.senderId ) {
                    console.log("if im the sender (Cancel Invitation)");
                    this.setState({
                        buttonText: 'Cancel connection request'
                    })
                } else if ( this.state.sessionUserId == this.state.receiverId ) {
                    console.log("if im the receiver (Accept Invitation)");
                    this.setState({
                        buttonText: 'Accept connection request'
                    })
                }
            })
    }
    terminateFriend() {
        console.log("terminate happening");
        this.setState({
            buttonText: 'Send connection request',
            status: null,
        })
        axios.post('/terminate/' + this.props.id + '.json')
            .then(({data}) => {
                // console.log("inside returned data of terminate");
                this.setState({
                    sessionUserId: data.sessionUserId,
                    receiverId: data.receiverId,
                    senderId: data.senderId
                })
            })
    }
    acceptFriend() {
        console.log("accept happening");
        this.setState({
            buttonText: 'End connection',
            status: 2,
        })
        axios.post('/accept/' + this.props.id + '.json')
            .then(({data}) => {
                // console.log("Axios post of accept friend in button");
                this.setState({
                    sessionUserId: data.sessionUserId,
                    receiverId: data.receiverId,
                    senderId: data.senderId
                })
            })
    }
    render() {
        const { buttonText } = this.state
        if (!this.props.id) {
            return null;
        }
        return (
            <div id="friend-button">
                <button className="button" onClick={ this.sendRequest }>{ buttonText }</button>
            </div>
        )
    }
}

export default FriendButton
