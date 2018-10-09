import React from 'react'
import styled from 'styled-components'

function DimBackground(props) {
    const MainDiv = styled.div`
        position: fixed;
        z-index: ${() => {
            if (props.top) {
                return "3"
            }
        }};
        width: 100vw;
        top: 0;
        left: ${() => {
            if (props.app) {
                return '0px'
            }
        }};
        height: 100vh;
        background-color: ${() => {
            if (props.darker) {
                return ('rgba(0, 0, 0, 0.8)')
            } else if (props.lighter) {
                return ('rgba(0, 0, 0, 0.4)')
            } else {
                return ('rgba(0, 0, 0, 0.6)')
            }
        }};`
    return (
        <MainDiv></MainDiv>
    )
}

export default DimBackground
