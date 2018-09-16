const axios = require("axios");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; //
} else {
    secrets = require("./secrets"); //
}

const googleMapsApiKey = secrets.GOOGLE_MAPS_API_KEY;

exports.getPlaceId = async function(place) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
            params: {
                key: googleMapsApiKey,
                input: place,
                inputtype: "textquery"
            }
        }
    );

    const candidates = data.candidates;

    if (candidates) {
        return candidates.map(candidate => candidate.place_id);
    }
    return [];
};

exports.autoCompletePlace = async function(place) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
            params: {
                key: googleMapsApiKey,
                input: place
            }
        }
    );

    const predictions = data.predictions;
    return predictions
};

exports.getPlaceIdByCoords = async function(placeCoordinates) {
    // 40.714224,-73.961452 //example of coordinates formating
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${placeCoordinates}&key=${googleMapsApiKey}`,
        {
            params: {
                key: googleMapsApiKey,
                result_type: 'street_address'
            }
        }
    );

    const results = data.results;

    if (results) {
        return results.map(result => result.place_id);
    }
    return [];
};

exports.getPlaceDetails = async function(placeId) {
    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
            params: {
                key: googleMapsApiKey,
                placeid: placeId
            }
        }
    );

    console.log(data);
    return {
        longitude:
            data.result &&
            data.result.geometry &&
            data.result.geometry.location &&
            data.result.geometry.location.lng,
        latitude:
            data.result &&
            data.result.geometry &&
            data.result.geometry.location &&
            data.result.geometry.location.lat,
        address: data.result && data.result.formatted_address
    };
};
