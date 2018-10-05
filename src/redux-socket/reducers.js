function checkProfileCompleteness(profile) {
    if (
        profile.company_description &&
        profile.headquarter_google_maps_place_id &&
        profile.headquarter_formatted_address &&
        profile.headquarter_latitude &&
        profile.headquarter_longitude &&
        profile.payment_card_number &&
        profile.payment_card_expiration_month &&
        profile.payment_card_expiration_year &&
        profile.payment_card_ccv &&
        profile.bank_account_number &&
        profile.bank_iban
    ) {
        return true
    } else {
        return false
    }
}

export default function(state = {}, action) {
    if (action.type == 'GET_PROFILE') {
        state = {
            ...state,
            showChat: false,
            profile: action.profile,
            profileComplete: checkProfileCompleteness(action.profile)
        }
    }
    if (action.type == 'TOGGLE_CHAT') {
        console.log("showChat reducer happening: state.showChat: ", state.showChat, " !state.showChat: ", !state.showChat);
        state = {
            ...state,
            showChat: !state.showChat
        }
    }
    if (action.type == 'SAVE_COMPANY_DESCRIPTION') {
        var newProfile = {
            ...state.profile,
            company_description: action.company_description
        }
        state = {
            ...state,
            profile: newProfile,
            profileComplete: checkProfileCompleteness(newProfile)
        }
    }
    if (action.type == 'SAVE_NEW_ADDRESS') {
        var newProfile = {
            ...state.profile,
            headquarter_google_maps_place_id: action.data.headquarter_google_maps_place_id,
            headquarter_formatted_address: action.data.headquarter_formatted_address,
            headquarter_latitude: action.data.headquarter_latitude,
            headquarter_longitude: action.data.headquarter_longitude
        }
        state = {
            ...state,
            profile: newProfile,
            profileComplete: checkProfileCompleteness(newProfile)
        }
    }
    if (action.type == 'SAVE_PAYMENT_INFO') {
        var newProfile = {
            ...state.profile,
            payment_card_number: action.data.payment_card_number,
            payment_card_expiration_month: action.data.payment_card_expiration_month,
            payment_card_expiration_year: action.data.payment_card_expiration_year,
            payment_card_ccv: action.data.payment_card_ccv
        }
        state = {
            ...state,
            profile: newProfile,
            profileComplete: checkProfileCompleteness(newProfile)
        }
    }
    if (action.type == 'SAVE_BANK_INFO') {
        var newProfile = {
            ...state.profile,
            bank_account_number: action.data.bank_account_number,
            bank_iban: action.data.bank_iban
        }
        state = {
            ...state,
            profile: newProfile,
            profileComplete: checkProfileCompleteness(newProfile)
        }
    }
    if (action.type == 'SAVE_COMPANY_NAME') {
        var newProfile = {
            ...state.profile,
            company_legal_name: action.data
        }
        state = {
            ...state,
            profile: newProfile,
            profileComplete: checkProfileCompleteness(newProfile)
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
    return state;
}

// dispatch // action // reducer


// import React, {Component} from 'react'
// import axios from './axios'
// import BubbleOptions from './BubbleOptions'
// import CompanyDescriptionField from './CompanyDescriptionField'
// import Payment from './Payment'
// import BankInfo from './BankInfo'
// import styled from 'styled-components'
// import MapComponent from './MapComponent'
//
// class FinishProfile extends Component {
//     constructor(props) {
//         super(props)
//
//         this.state = {
//             showPayment: false,
//             showBank: false,
//             showBio: false,
//             showMap: false
//         }
//
//     }
//     componentDidMount() {
//         this.setState({ mounted: true })
//     }
//     render() {
//         const { showMap, showPayment, showBank, showBio } = this.state
//         if (!this.state.mounted) {
//             return null
//         }
//         const Message = styled.div`
//             font-size: 16px;
//             color: #6ACC58;
//             margin-top: 10px;
//             text-align: center;`
//         return (
//             <div>
//                 <Message>Please complete your profile</Message>
//                 <BubbleOptions />
//                 { showBio && <CompanyDescriptionField /> }
//                 { showMap && <MapComponent setNewAddress={this.props.setNewAddress} toggleShowMap={this.toggleShowMap}/> }
//                 { showPayment && <Payment toggleShowPayment={ this.toggleShowPayment } setPaymentInfo={ this.props.setPaymentInfo } /> }
//                 { showBank && <BankInfo toggleShowBank={ this.toggleShowBank } setBankInfo={ this.props.setBankInfo }/> }
//             </div>
//         )
//     }
// }
//
// export default FinishProfile
