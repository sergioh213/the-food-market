import axios from '../axios'

export function userJoined(user) {
    return {
        type: 'USER_JOINED',
        user
    }
}

export function onlineUsers(users) {
    return {
        type: 'ONLINE_USERS',
        users
    }
}

export function userLeft(id) {
    return {
        type: 'USER_LEFT',
        id
    }
}

export async function getProfile() {
    return await axios.get("/producer.json").then(
        ({data}) => {
            return {
                type: 'GET_PROFILE',
                profile: data
            }
        }
    )
}

export function saveCompanyDescription(newDescription) {
    var description = newDescription
    if ( description == "" ){
        description = null
    }
    return axios.post("/company-description.json", {companyDescription: description})
        .then(({data}) => {
            return {
                type: 'SAVE_COMPANY_DESCRIPTION',
                company_description: data.companyDescription
            }
        })
}

export function saveNewAddress(data) {
    return {
        type: 'SAVE_NEW_ADDRESS',
        data
    }
}

export function savePaymentInfo(data) {
    return {
        type: 'SAVE_PAYMENT_INFO',
        data
    }
}

export function saveBankInfo(data) {
    return {
        type: 'SAVE_BANK_INFO',
        data
    }
}

export function saveNewCompanyName(data) {
    return {
        type: 'SAVE_COMPANY_NAME',
        data
    }
}

export function toggleShowChat() {
    return {
        type: 'TOGGLE_CHAT'
    }
}

// export function receiveFriendsWannabes() {
//     return axios.get("/friendsWannabes.json").then(({ data }) => {
//         return {
//             type: 'RECEIVE_LIST',
//             friendsWannabes: data.friendsWannabes
//         }
//     })
// }

// export function acceptFriendRequest(wannabeId) {
//     return axios.get("/user/" + wannabeId + ".json").then( ({data})  => {
//         return {
//             type: 'ACCEPT_FRIEND',
//             data
//         }
//     })
// }

// export function endFriendship(friendId) {
//     return {
//         type: 'END_FRIEND',
//         friendId
//     }
// }

// export function receiveMessages(messages) {
//     return {
//         type: 'RECEIVE_MESSAGES',
//         messages
//     }
// }

// export function newMessage(message) {
//     return {
//         type: 'NEW_MESSAGE',
//         message
//     }
// }
