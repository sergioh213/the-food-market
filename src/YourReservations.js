import React, {Component} from 'react'
import axios from './axios'

class YourReservations extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        axios.get("/reservations.json").then(
            ({data}) => {
                this.setState(data)
                console.log("data in Your reservations: ", data);
            }
        )
    }
    render() {
        if (!this.state.reservations) {
            return (
                <div>Loading</div>
            )
        }
        return (
            <div id="your-reservations" className="effect1">
                <div className="section-header" id="reservations-header">Your reservations</div>
                {
                    this.state.reservations.map(item => {
                        return (
                            <div className="reservation-info-box" key={item.id}>
                                <div className="date-wrapper">
                                    <div className="reservation-text">Arrival date</div>
                                    <div className="reservation-date">{ item.arrival_date }</div>
                                </div>
                                <div className="date-wrapper">
                                    <div className="reservation-text">Departure date</div>
                                    <div className="reservation-date">{ item.departure_date }</div>
                                </div>
                                <button className="button" id="see-hostel-button">See hostel</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default YourReservations
