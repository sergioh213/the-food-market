import React, {Component} from 'react'
import axios from './axios'
// import Uploader from './Uploader'

class CreateEvents extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get("/locations.json")
            .then( locations => {
                this.setState({
                    locations: locations.data
                })
            }
        )
    }
    handleSelectChange(e) {
        this.setState({
            [ e.target.name ]: e.target.options[e.target.selectedIndex].value
        })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        if (!this.state.location_id || this.state.location_id == "") {
            this.setState({
                error2: true
            })
        } else {
            this.props.createNewEvent(this.state)
        }
    }
    render() {
        if (!this.state.locations) {
            return null
        }
        return (
            <div id="create-events" className="effect1">
                <div onClick={ this.props.toggleCreateEvent } id="create-events-close-x">x</div>
                <div className="payment-title">Create a new event</div>
                <div className="payment-title" id="card-details">Event Details</div>
                { this.state.error && <div id="input-error">*Please, fill in all the fields</div> }
                <form id="create-events-form" onSubmit={ this.handleSubmit }>
                <div className="create-event-subtitle">Event name</div>
                    <div>
                        <input onChange={ this.handleChange } name="event_name" placeholder='Event name' type='text'/>
                    </div>
                    <div className="create-event-subtitle">Choose a location for the event</div>
                    { this.state.error2 && <div id="input-error">Please select a location</div> }
                    <div className="styled-select blue semi-square">
                        <select name="location_id" onChange={ this.handleSelectChange }>
                            <option></option>
                            {
                                this.state.locations.map(item => {
                                    return (
                                        <option key={item.id} value={ item.id } defaultValue="">{ item.area }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="create-event-subtitle" id="max-num-attendees-title">Choose a maximum number of attendees</div>
                    <div>
                        <input onChange={ this.handleChange } id="max-num-attendees-input" placeholder='Max' name="max_num_attendees" type='number' min="1" max="100"/>
                    </div>
                    <div className="create-event-subtitle">Pick a date</div>
                    <div>
                        <input onChange={ this.handleChange } name="event_time" className="date-input" type="date"/>
                    </div>
                    <div className="create-event-subtitle">Write an event description</div>
                    <div>
                        <textarea id="create-event-textarea" onChange={ this.handleChange } name="event_description" placeholder='Event Description' type='text'/>
                    </div>
                    <button className="button" id="submit-button-registration">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateEvents
