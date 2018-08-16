export default function(state = {}, action) {
    if (action.type == 'RECEIVE_LIST') {
        // state = Object.assign({}, state, {friendsWannabes: action.friendsWannabes})
        state = {
            ...state,
            // friendsWannabes: action.friendsWannabes,
            wannabes: action.friendsWannabes && action.friendsWannabes.filter(user => user.status == 1 ),
            friends: action.friendsWannabes && action.friendsWannabes.filter(user => user.status == 2 )
        }
    }
    if (action.type == 'ONLINE_USERS') {
        state = {
            ...state,
            users: action.users
        }
    }
    if (action.type == 'USER_JOINED') {
        state = {
            ...state,
            users: [action.user, ...state.users]
        }
    }
    if (action.type == 'USER_LEFT') {
        state = {
            ...state,
            users: state.users.filter(user => user.id != action.id )
        }
    }
    if (action.type == 'ACCEPT_FRIEND') {
        state = {
            ...state,
            friends: [action.data, ...state.friends],
            wannabes: state.wannabes.filter(user => user.id != action.data.id )
        }
    }
    if (action.type == 'END_FRIEND') {
        state = {
            ...state,
            friends: state.friends.filter(user => user.id != action.friendId )
        }
    }
    if (action.type == 'RECEIVE_MESSAGES') {
        state = {
            ...state,
            messages: action.messages
        }
    }
    if (action.type == 'NEW_MESSAGE') {
        state = {
            ...state,
            messages: [...state.messages, action.message]
        }
    }
    return state;
}

// dispatch // action // reducer
