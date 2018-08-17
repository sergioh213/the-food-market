import React, {Component} from 'react'
import axios from './axios'
import CreateEvent from './CreateEvent'
import Header from './Header'
// import Uploader from './Uploader'

class Events extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showCreateEvent: false,
            events: [],
            attendees: [],
            buttonText: "Attend"
        }

        this.toggleCreateEvent = this.toggleCreateEvent.bind(this)
        this.createNewEvent = this.createNewEvent.bind(this)
        this.attendEvent = this.attendEvent.bind(this)
    }
    componentDidMount() {
        axios.get("/events-and-attendees.json").then( resp => {
            this.setState({
                events: resp.data.events
            }, () => {
                console.log("events as the component mounts: ", this.state.events)
            })
        })
    }
    createNewEvent(dataFromCompoment){
        axios.post("/newEvent.json", dataFromCompoment)
            .then(({data}) => {
                if (data.success) {
                    console.log("EVENT CREATED!! data: ", data);
                    this.toggleCreateEvent()
                    this.setState({
                        events: [data.data, ...this.state.events]
                    })
                }
            })
    }
    toggleCreateEvent() {
        this.setState({
            showCreateEvent: !this.state.showCreateEvent
        })
    }
    attendEvent(eventId) {
        console.log("attend event clicked. Event ID: ", eventId);
        axios.post("/attend-event.json", {event_id: eventId})
            .then( ({data}) => {
                console.log("attend event returned data: ", data.data);
                if (data.success) {
                    console.log("attend returned successfully");
                    const clone = this.state.events.map( event => {
                        if (event.id ==  data.data.event_id) {
                            console.log("we are here");
                            event.attending = true
                        }
                        return event
                    })
                    this.setState({
                        events: clone
                    }, () => console.log("this.state after clone: ", this.state))
                }
            })
    }
    render() {
        console.log("this.state.events at render: ", this.state.events);
        if (!this.state.events) {
            return null
        }
        return (
            <div id="events">
                <Header text={`Events in the city`}/>
                <div onClick={ this.toggleCreateEvent } className="effect1" id="new-event-button"><i id="plus-sign" className="fas fa-plus"></i></div>
                { this.state.showCreateEvent && <CreateEvent createNewEvent={ this.createNewEvent } toggleCreateEvent={ this.toggleCreateEvent } /> }
                <div id="event-list-wrapper">
                    {
                        this.state.events.map(item => {
                            console.log("item: ", item);
                            return (
                                <div key={item.id} id="events-grid">
                                    <div className="event-box effect1">
                                        <button onClick={ () => { this.attendEvent(item.id) } } className="button" id="attend-event-button">{ item.attending ? "You are attending" : "attend" }</button>
                                        <div className="payment-title">{ item.event_name }</div>
                                        <div className="num-attendees-left-box"><div className="num-attendees-left-text">Places left:</div><div className="num-attendees-left">{ item.num_attendees_left }</div></div>
                                        <div className="event-description">{ item.event_description }</div>
                                        <div className="event-location-wrapper"><div className="event-location-header">Location:</div><div className="event-address">{ item.location_id }</div></div>
                                        <div className="event-location-wrapper"><div className="event-location-header">On:</div><div className="event-address">{ item.event_time }</div></div>

                                    </div>
                                    <div className="attendees-box effect1">
                                        <div className="attendees-box-title">Attending the event:</div>
                                        { item.attendees &&
                                            item.attendees.map( attendee => {
                                                return (
                                                    <div key={attendee.id} className="attendees-inner-box">
                                                        <a className="attendees-box-link" href={`/user/${attendee.id}`}><img className="attendees-box-profile-pic" src={ attendee.profile_image_url } alt=""/></a>
                                                        <a className="attendees-box-link" href={`/user/${attendee.id}`}><div className="attendees-box-name">{`${attendee.first_name} ${attendee.last_name}`}</div></a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                { this.state.showCreateEvent
                    ? <div className="dim-background" onClick={ this.toggleCreateEvent }></div>
                    : null
                }
            </div>
        )
    }
}

export default Events
