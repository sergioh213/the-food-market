import React from "react";

// let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env; //
// } else {
//     secrets = require("./secrets");
//     import { GOOGLE_MAPS_API_KEY } from "./secrets"
// }
// const googleMapsApiKey = secrets.GOOGLE_MAPS_API_KEY;

var googleMapsApiKey = "AIzaSyBBtYjKj6CmulQ-UX6-VwIf7CieDLAu5XA"

function GoogleMap({ placeId }) {
   return (
       <iframe id="map-box"
           src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=place_id:${encodeURIComponent(
               placeId
           )}`}
       />
   );
}

export default GoogleMap;
