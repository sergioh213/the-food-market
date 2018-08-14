import React, {Component} from 'react'
import axios from './axios'
import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showOnline: false,
            showPayment: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                // console.log("data as the component mounts: ", data);
                this.setState(data)
            }
        )
    }
    handleSubmit(e){
        e.preventDefault()
        if (!this.state.payment_info) {
            console.log("user doesn't have payment info");
            this.props.toggleShowPayment()
            this.props.toggleShowReservation()
        } else {
            console.log("payment info DETECTED doing post");
            axios.post("/reservation", this.state)
        }
    }
    render() {
        // console.log('this.props.hostelInfo: ', this.props.hostelInfo);
        const { hostel_main_img, street, num, postal_code, city_name, num_beds_left } = this.props.hostelInfo
        return (
            <div id="reservation">
                <p id="close-x" onClick={ this.props.toggleShowReservation }>x</p>
                <img className="map-label-img" id="reservation-img" src={`${ hostel_main_img }`} alt=""/>
                <div id="reservation-hostel-text-box">
                    <div>{`${ street } ${ num }`}</div>
                    <div>{`${ postal_code }, ${ city_name }`}</div>
                    <div id="beds-left-text">
                        There are
                        <div id="num-beds-left">{ num_beds_left }</div>
                        beds left
                    </div>
                </div>
                <div className="section-header">Chose your bed</div>
                <form id="reservation-form" onSubmit={ this.handleSubmit }>
                    <div className="date-subheader">Check-In date</div>
                    <div className="date-section">
                        {/*<DayPicker />*/}
                        {/*<div className="reservation-input-box">*/}
                        <input className="date-input" onChange={ this.handleChange } name="arrive-date" type='date' min="2018-08-13" max="2019-12-31"/>
                            {/*<input className="date-input" onChange={ this.handleChange } name="arrive-day" placeholder='Day' type='number'/>*/}
                        {/*</div>*/}
                        {/*<div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="arrive-month" placeholder='Month' type='number'/>
                        </div>
                        <div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="arrive-year" placeholder='Year' type='number'/>
                        </div>*/}
                    </div>
                    <div className="date-subheader">Check-Out date</div>
                    <div className="date-section">
                        {/*<div className="reservation-input-box">*/}
                            <input className="date-input" onChange={ this.handleChange } name="exit-day" type='date'/>
                        {/*</div>*/}
                        {/*<div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="exit-month" placeholder='Month' type='number'/>
                        </div>
                        <div className="reservation-input-box">
                            <input className="date-input" onChange={ this.handleChange } name="exit-year" placeholder='Year' type='number'/>
                        </div>*/}
                    </div>
                    <button className="button" id="submit-button-reservation">Reserve bed</button>
                </form>
            </div>
        )
    }
}

export default Reservation
