import React from 'react'
import Login from './Login'
import Accounts from './Accounts'
// import styled from 'styled-components'
import { HashRouter, Route, Link } from 'react-router-dom'

function RegistrationChoice() {
    const componentStyle = {
        backgroundColor: 'grey',
        // width: '100%',
        display: 'inline-block'
    }
    // const AccountType = styled.div`
    //     position: relative;
    //     font-size: 20px;
    //     color: red;
    //     display: "inline-block"
    // `
    const imageStyle = {
        position: 'relative',
        width: 100,
        display: "inline-block"
    }
    // const WrapperIcon = styled.div`
        // position: relative;
        // width: 100px;
        // height: 100px;
        // display: inline-block;
        // border-radius: 100%;
        // background-color: #5EB648;`
    const iStyle = {
        position: 'relative',
        color: 'white',
        left: '50%',
        top: '50%',
        fontSize: 50,
        transform: 'translate(50%, 50%)'
    }
    const wrapper = {
        position: 'relative',
        width: 100,
        height: 100,
        display: 'inline-block',
        borderRadius: '100%',
        backgroundColor: '#5EB648'
    }
    const linksWrapper = {
        display: 'inline-block'
    }
    const nameStyle = {
        color: 'red'
    }
    return (
        <div id="registration-choice">
            <HashRouter>
                <div id="choices-wrapper">
                    <div>
                        <Link to="/producer"><img className="icon-image icon" src="/content/producer-icon.png" alt=""/></Link>
                        <div className="choice-name" id="producer-choice-name">Producer</div>
                    </div>
                    <div>
                        <Link to="/transporter"><div className="icon-big icon"><i className="acount-type fas fa-truck-moving"></i></div></Link>
                        <div className="choice-name">Transporter</div>
                    </div>
                    <div>
                        <Link to="/wholeseller"><div className="icon-big icon"><i className="acount-type fas fa-warehouse"></i></div></Link>
                        <div className="choice-name">Wholesaler</div>
                    </div>
                    <div>
                        <Link to="/retailer"><div className="icon-big icon"><i className="acount-type fas fa-shopping-cart"></i></div></Link>
                        <div className="choice-name">Retailer</div>
                    </div>
                    <div>
                        <Link to="/re-buyer"><div className="icon-big icon"><i className="acount-type fas fa-utensils"></i></div></Link>
                        <div className="choice-name">Re-Buyer</div>
                    </div>
                </div>
            </HashRouter>
        </div>
    )
}

export default RegistrationChoice
