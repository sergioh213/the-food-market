import React, {Component} from 'react'
import axios from '../axios'
import { HashRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

class Accounts extends Component {
    constructor() {
        super()

        this.state = {}
    }
    render() {
        const IconWrapper = styled.div`
            position: relative;
            display: inline-block;
            border-radius: 100%;
            background-color: #5EB648;
            height: 35px;
            width: 35px;
            margin-right: 5px;`
        return (
            <div id="accounts">
            <HashRouter>
                <div>
                    <Link to="/producer"><img id="producer-icon" className="icon" src="/content/producer-icon.png" alt=""/></Link>
                    <Link to="/transporter"><IconWrapper className="icon"><i className="account-icon fas fa-truck-moving"></i></IconWrapper></Link>
                    <Link to="/wholeseller"><IconWrapper className="icon"><i id="retailer-icon" className="account-icon fas fa-warehouse"></i></IconWrapper></Link>
                    <Link to="/retailer"><IconWrapper className="icon"><i id="retailer-icon" className="account-icon fas fa-shopping-cart"></i></IconWrapper></Link>
                    <Link to="/re-buyer"><IconWrapper className="icon"><i className="account-icon fas fa-utensils"></i></IconWrapper></Link>
                </div>
            </HashRouter>
            </div>
        )
    }
}

export default Accounts
