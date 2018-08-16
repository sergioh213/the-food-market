import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';
import { receiveFriendsWannabes,acceptFriendRequest, endFriendship } from './actions';
import FriendButton from './FriendButton'

const mapStateToProps = state => {
    return {
        wannabes: state.wannabes,
        friends: state.friends
    }
}

class Friends extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleAccept = this.handleAccept.bind(this)
        this.handleEndFriend = this.handleEndFriend.bind(this)
    }
    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabes())
    }

    handleAccept(wannabeId) {
        console.log("id of the accepted user: ", wannabeId);
        this.props.dispatch(acceptFriendRequest(wannabeId))
    }

    handleEndFriend(friendId) {
        this.props.dispatch(endFriendship(friendId))
    }

    render() {
        if ( !this.props.friends ) {
            return null;
        }
        console.log('this.props.friends: ', this.props.friends);
        return (
            <div id="profile-panel-top" className="effect1 profile-panel-right">
                <div className="section-header">Connections:</div>
                { !this.props.friends.length
                    ? <div className="panel-requests-subheader">You have no connections</div>
                    : <div>
                        { this.props.friends &&
                            this.props.friends.map(
                                friend => (
                                    <div className="wannabe" key={friend.id}>
                                        <div>
                                            <a href={`/user/${friend.id}`}><img className="connection-profile-picture" src={ friend.profile_image_url } alt="User's profile picture" /></a>
                                        </div>
                                        <div className="connection-name-wrapper">
                                            <a className="connection-name" href={`/user/${friend.id}`}>{`${friend.first_name} ${friend.last_name}`}</a>
                                        </div>
                                        <div className="friendbutton-panel-wrapper">
                                        <FriendButton handleEndFriend={ this.handleEndFriend } id={ friend.id } />
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                }
        </div>
        )
    }
}

export default connect(mapStateToProps)(Friends)
