import React from "react";
import styled from 'styled-components'

// let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env; //
// } else {
//     secrets = require("./secrets");
//     import { GOOGLE_MAPS_API_KEY } from "./secrets"
// }
// const googleMapsApiKey = secrets.GOOGLE_MAPS_API_KEY;

var googleMapsApiKey = "AIzaSyBBtYjKj6CmulQ-UX6-VwIf7CieDLAu5XA"

function GoogleMap(props) {
    const CloseX = styled.div`
        position: relative;
        font-size: 30px;
        font-weight: 400;
        color: darkgrey;
        display: inline-block;
        float: right;
        cursor: pointer;
        margin-right: 8px;
        padding: none;

        &:hover{
            color: black;
            transform: scale(1.2);
        }`
    const InstructionsWrapper = styled.div`
        position: relative;
        text-align: center;
        width: 505px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 15px;
        height: 40px;`
    const Wrapper = styled.div`
        position: relative;
        display: ${() => {
            if (props.inline) {
                return "inline-block"
            } else {
                return "block"
            }
        }}
        width: ${() => {
            if (props.inline) {
                return "70%"
            } else {
                return "100%"
            }
        }}
        `
   return (
       <Wrapper>
            { props.toggleShowMap &&
                <InstructionsWrapper>
                    <CloseX onClick={props.toggleShowMap}>x</CloseX>
                </InstructionsWrapper>
            }
            <iframe id={ props.shallow ? "shallow-map" : "map-box"}
                src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=place_id:${encodeURIComponent(
                    props.placeId
            )}`}
           />
       </Wrapper>
   );
}

export default GoogleMap;
