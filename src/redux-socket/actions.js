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
        })
}
export async function getFacilities() {
    return axios.get("/production-facilities.json").then(
        ({data}) => {
            return {
                type: 'GET_FACILITIES',
                productionFacilities: data && data.productionFacilities
            }
        })
}
export async function getAllCompanies() {
    return axios.get("/all-companies.json").then(
        ({data}) => {
            console.log("THE ERROR WILL BE HERE data.producers: ", data.producers);
            return {
                type: 'GET_ALL_COMPANIES',
                producers: data.producers
            }
        })
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
export function toggleShowBottomMenu() {
    return {
        type: 'TOGGLE_BOTTOM_MENU'
    }
}
export function openFacilityForm() {
    return {
        type: 'OPEN_FACILITY_FORM'
    }
}
export function toggleExpandChat() {
    return {
        type: 'TOGGLE_EXPAND_CHAT'
    }
}
export function saveNewProductionFacilityPage1(data) {
    return {
        type: 'SAVE_PRODUCTION_FACILITY_PAGE1',
        data
    }
}
export function saveNewProductionFacilityPage2(data) {
    return {
        type: 'SAVE_PRODUCTION_FACILITY_PAGE2',
        data
    }
}
export function saveCompanyLogo(data) {
    return {
        type: 'SAVE_COMPANY_LOGO',
        data
    }
}
export function toggleShowLogoUploader() {
    return {
        type: 'TOGGLE_SHOW_LOGO_UPLOADER'
    }
}
export function toggleShowFacilityImagesUploader() {
    return {
        type: 'TOGGLE_SHOW_FACILITY_IMAGES_UPLOADER'
    }
}
export function saveFacilityImages(data) {
    return {
        type: 'SAVE_FACILITY_IMAGES',
        data
    }
}
export function setNewCompleteFacility(data) {
    return {
        type: 'SET_NEW_COMPLETE_FACILITY',
        data
    }
}
export function openFacility(facility) {
    console.log("openFacility action with: ", facility);
    return {
        type: 'OPEN_FACILITY',
        facility
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
