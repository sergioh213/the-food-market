import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';
import { receiveFriendsWannabes,acceptFriendRequest, endFriendship } from './actions';
import FriendButton from './FriendButton'

const mapStateToProps = state => {
    return {
        wannabes: state.wannabes
    }
}

class Wannabes extends Component {
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
        if ( !this.props.wannabes ) {
            return null;
        }
        return (
            <div className="effect1 profile-panel-left">
                <div className="section-header">Pending connection requests</div>
                { !this.props.wannabes.length
                    ? <div className="panel-requests-subheader">No pending requests</div>
                    : <div>
                        { this.props.wannabes &&
                            this.props.wannabes.map(
                                wannabe => (
                                    <div className="wannabe" key={ wannabe.id }>
                                        <div>
                                            <a href={`/user/${wannabe.id}`}><img className="connection-profile-picture" src={ wannabe.profile_image_url } alt="User's profile picture" /></a>
                                        </div>
                                        <div className="connection-name-wrapper">
                                            <a className="connection-name" href={`/user/${wannabe.id}`}>{`${wannabe.first_name} ${wannabe.last_name}`}</a>
                                        </div>
                                        <div className="friendbutton-panel-wrapper">
                                            <FriendButton handleAccept={ this.handleAccept} id={ wannabe.id } />
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

export default connect(mapStateToProps)(Wannabes)
