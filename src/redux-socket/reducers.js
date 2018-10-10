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
            chat: {
                showChat: false,
                expanded: false
            },
            showBottomMenu: false,
            dimBackground: {
                show: false,
                showUploader: false,
                showFacilityImagesUploader: false
            },
            profile: action.profile,
            profileComplete: checkProfileCompleteness(action.profile)
        }
    }
    if (action.type == 'GET_FACILITIES') {
        state = {
            ...state,
            productionFacilities: action.productionFacilities
        }
    }
    if (action.type == 'GET_ALL_COMPANIES') {
        state = {
            ...state,
            otherCompanies: action.producers.filter(company => company.id != state.profile.id )
        }
    }
    if (action.type == 'TOGGLE_CHAT') {
        state = {
            ...state,
            chat: {
                ...state.chat,
                showChat: !state.chat.showChat
            }
        }
    }
    if (action.type == 'TOGGLE_EXPAND_CHAT') {
        state = {
            ...state,
            chat: {
                ...state.chat,
                expanded: !state.chat.expanded
            }
        }
    }
    if (action.type == 'TOGGLE_BOTTOM_MENU') {
        state = {
            ...state,
            showBottomMenu: !state.showBottomMenu,
            facilitySaveInProgress: false,
            showFacility: false
        }
    }
    if (action.type == 'OPEN_FACILITY_FORM') {
        state = {
            ...state,
            showBottomMenu: true,
            facilitySaveInProgress: {
                ...state.facilitySaveInProgress,
                formPage: 1
            }
        }
    }
    if (action.type == 'OPEN_FACILITY') {
        console.log("OPEN_FACILITY with action.facility: ", action.facility);
        state = {
            ...state,
            showBottomMenu: true,
            showFacility: {
                show: true,
                facility: action.facility
            }
        }
        console.log("state after setting facility: ", state);
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
    if (action.type == 'SAVE_PRODUCTION_FACILITY_PAGE1') {
        var facilitySaveInProgress = {
            ...state.facilitySaveInProgress,
            formatted_address: action.data.address,
            latitude: action.data.latitude,
            longitude: action.data.longitude,
            google_maps_place_id: action.data.placeId,
            formPage: 2
        }
        state = {
            ...state,
            facilitySaveInProgress: facilitySaveInProgress
        }
    }
    if (action.type == 'SAVE_PRODUCTION_FACILITY_PAGE2') {
        var facilitySaveInProgress = {
            ...state.facilitySaveInProgress,
            facility_name: action.data.facility_name,
            how_to_arrive_text: action.data.how_to_arrive_text,
            formPage: 3
        }
        state = {
            ...state,
            facilitySaveInProgress: facilitySaveInProgress
        }
    }
    if (action.type == 'SAVE_COMPANY_LOGO') {
        var newProfile = {
            ...state.profile,
            company_image_url: action.data
        }
        state = {
            ...state,
            profile: newProfile
        }
    }
    if (action.type == 'TOGGLE_SHOW_LOGO_UPLOADER') {
        state = {
            ...state,
            dimBackground: {
                ...state.dimBackground,
                show: !state.dimBackground.show,
                showLogoUploader: !state.dimBackground.showLogoUploader
            }
        }
    }
    if (action.type == 'TOGGLE_SHOW_FACILITY_IMAGES_UPLOADER') {
        state = {
            ...state,
            dimBackground: {
                ...state.dimBackground,
                show: !state.dimBackground.show,
                showFacilityImagesUploader: !state.dimBackground.showFacilityImagesUploader
            }
        }
    }
    if (action.type == 'SAVE_FACILITY_IMAGES') {
        state = {
            ...state,
            dimBackground: {
                ...state.dimBackground,
                show: !state.dimBackground.show,
                showFacilityImagesUploader: !state.dimBackground.showFacilityImagesUploader
            },
            facilityImages: action.data
        }
    }
    if (action.type == 'SET_NEW_COMPLETE_FACILITY') {
        localStorage.removeItem("facility_name")
        localStorage.removeItem("formatted_address")
        localStorage.removeItem("google_maps_place_id")
        localStorage.removeItem("how_to_arrive_text")
        localStorage.removeItem("latitude")
        localStorage.removeItem("longitude")
        state = {
            ...state,
            productionFacilities: [action.data, ...state.productionFacilities],
            facilitySaveInProgress: null
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
