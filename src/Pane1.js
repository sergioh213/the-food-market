import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

function Pane1() {
    return (
        <div id="pane1">
            <div id="pane1-style-div">
                <div id="pane1-header">
                    <div id="pane1-keyword-text">Discover</div>
                    <div id="pane1-logo-text">CO-LIVING</div>
                </div>
                <div id="pane1-paragraph">
                    <div id="pane1-paragraph-header">A new type of hostel...</div>
                    <div id="pane1-paragraph-text">A place to live permanently without attachments<br />
                        <br />
                        Affordable prices thanks to our fully automated hostels where you can do anything you need from us through the app or web
                    </div>
                </div>
                <div id="diagonal-pane"><img id="pane1-image" src="/content/berlin-skyline.jpg" alt=""/></div>
            </div>
        </div>
    )
}

export default Pane1
