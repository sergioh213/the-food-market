import React, {Component} from 'react'
import axios from './axios'
import { HashRouter, Link } from 'react-router-dom'


class Accounts extends Component {
    constructor() {
        super()

        this.state = {
            error: null
        }

        // this.handleChange = this.handleChange.bind(this)
    }

    render() {
        return (
            <div id="accounts">
            <HashRouter>
                <div>
                    <Link to="/producer"><img id="producer-icon" className="icon" src="/content/producer-icon.png" alt=""/></Link>
                    <Link to="/transporter"><div className="account-icon-box icon"><i className="account-icon fas fa-truck-moving"></i></div></Link>
                    <Link to="/wholeseller"><div className="account-icon-box icon"><i id="retailer-icon" className="account-icon fas fa-warehouse"></i></div></Link>
                    <Link to="/retailer"><div className="account-icon-box icon"><i id="retailer-icon" className="account-icon fas fa-shopping-cart"></i></div></Link>
                    <Link to="/re-buyer"><div className="account-icon-box icon"><i className="account-icon fas fa-utensils"></i></div></Link>
                </div>
            </HashRouter>
            </div>
        )
    }
}

export default Accounts
