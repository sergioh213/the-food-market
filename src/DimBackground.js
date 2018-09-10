import React from 'react'
import styled from 'styled-components'

function DimBackground(props) {
    const MainDiv = styled.div`
    position: absolute;
    width: 100vw;
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
