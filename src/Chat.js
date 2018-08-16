import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';
import { newChatMessage } from './socket'
import { receiveFriendsWannabes, acceptFriendRequest, endFriendship } from './actions';

const mapStateToProps = state => {
    console.log("state.messages: ", state.messages);
    return {
        messages: state.messages
    }
}

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }
    componentDidMount() {
    }
    sendMessage() {
        newChatMessage(this.state.message)
        this.setState({
            message: null
        })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ] : e.target.value
        })
    }
    formatDate(dateValue) {
        if (!dateValue) {
            var newDate = new Date()
            // console.log("newDate: ", newDate);
            var date = new Date('' + newDate)
            var indexOfMonth = date.getMonth()
            var yearValue = date.getFullYear() // dateValue.slice(0, 4)
            var dayValue = date.getDate() // dateValue.slice(0, 4)
            var timeValue // dateValue.slice(0, 4)
            if (date.getHours() < 12) {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "am"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "am"
                }
            } else {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "pm"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "pm"
                }
            }
            // console.log("dateValue: ", dateValue, " indexOfMonth: ", indexOfMonth, " yearValue: ", yearValue, " dayValue: ", dayValue, " timeValue: ", timeValue);
            var listOfMonths = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]

            return {
                year: yearValue,
                month: listOfMonths[indexOfMonth],
                day: dayValue,
                time: timeValue
            }
            return {
                year: null,
                month: null,
                day: null,
                time: null
            }

        } else {
            var date = new Date('' + dateValue)
            var indexOfMonth = date.getMonth()
            var yearValue = date.getFullYear() // dateValue.slice(0, 4)
            var dayValue = date.getDate() // dateValue.slice(0, 4)
            var timeValue // dateValue.slice(0, 4)
            if (date.getHours() < 12) {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "am"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "am"
                }
            } else {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "pm"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "pm"
                }
            }
            // console.log("dateValue: ", dateValue, " indexOfMonth: ", indexOfMonth, " yearValue: ", yearValue, " dayValue: ", dayValue, " timeValue: ", timeValue);
            var listOfMonths = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]

            return {
                year: yearValue,
                month: listOfMonths[indexOfMonth],
                day: dayValue,
                time: timeValue
            }
        }
    }
    render() {
        return (
            <div id="chat" className="effect1">
                <div id="top-chat-bar">
                    <i id="chat-icon" className="far fa-comment"></i>
                    <div onClick={ this.props.toggleShowChat } id="chat-close-x">x</div>
                </div>
                <div>
                    { this.props.messages &&
                        this.props.messages.map(
                            message => (
                                <div className="chat-gridBox" key={ message.id } >
                                    <div className="chat-image-box">
                                        <a href={`/user/${message.sender_id}`}><img className="chat-profile-picture" src={ message.profile_image_url } alt="Profile picture"/></a>
                                    </div>
                                    <div className="chat-message-box-wrapper">
                                        <div className="chat-message-box">
                                            <div className="chat-name-div">
                                                <a className="chat-username-link" href={`/user/${message.sender_id}`}>{ `${message.first_name} ${message.last_name}` }</a>
                                            </div>
                                            <div className="chat-message-text">
                                                { message.message }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-date-box">
                                        <div className="chat-message-time">
                                            {`
                                                ${ this.formatDate(message.created_at).time }
                                            `}
                                        </div>
                                        <div className="chat-message-date">
                                            {`
                                                ${ this.formatDate(message.created_at).day }
                                                 of
                                                ${ this.formatDate(message.created_at).month }
                                            `}
                                            <br />
                                            {`
                                                ${ this.formatDate(message.created_at).year }
                                             `}
                                         </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <div id="chat-input-section">
                    <textarea id="messages-textarea" onChange={ e => this.handleChange(e) } name="message" defaultValue={ this.state.message } cols="30" rows="10"></textarea>
                    <button className="button" id="submit-chat-message-button" onClick={ () => this.sendMessage() }>Send</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Chat)
