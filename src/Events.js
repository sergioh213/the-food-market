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
        this.renderAttendees = this.renderAttendees.bind(this)
        this.renderButtonText = this.renderButtonText.bind(this)
    }
    componentDidMount() {
        axios.get("/events-and-attendees.json").then( resp => {
            axios.get("/user").then( user => {
                console.log("user: ", user.data);
                this.setState({
                    events: resp.data.events,
                    attendees: resp.data.attendees,
                    user: user.data
                }, () => {
                    console.log("events as the component mounts: ", this.state.events);
                })
            })
        })
    }
    createNewEvent(dataFromCompoment){
        axios.post("/newEvent.json", dataFromCompoment)
            .then(({data}) => {
                if (data.success) {
                    console.log("EVENT CREATED!! data: ", data);
                    this.toggleCreateEvent()
                    const clone = [...this.state.events]
                    clone.unshift(data.data)
                    this.setState({
                        events: clone
                    })
                }
            })
    }
    toggleCreateEvent(){
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
                    this.setState({
                        data: data.data,
                        success: data.success,
                        buttonText: "You are attending",
                    })
                }
            })
    }
    renderAttendees(eventId) {
        // console.log("this.state.attendees in renderAttendees: ", this.state.attendees.length );
        // var thisEventAttendees = this.state.attendees.filter( attendee => eventId == attendee.event_id )
        // console.log("filtered list. All events should be ", eventId, ": ", thisEventAttendees.length);
        // return thisEventAttendees.map( eventAttendee => {
        //     console.log("eventAttendee.profile.first_name: ", eventAttendee.profile.first_name);
        //     return (<div key={ eventAttendee.profile.id }>{ eventAttendee.profile.first_name }</div>)
        // })
        return (
            <div className="attendees-inner-box">
                {/*<a className="attendees-box-link" href="/user/8">*/}
                    <a className="attendees-box-link" href="/user/8"><img className="attendees-box-profile-pic" src="/content/default_profile_picture.png" alt=""/></a>
                    <a className="attendees-box-link" href="/user/8"><div className="attendees-box-name">Sergio Herrero</div></a>
                {/*</a>*/}
            </div>
        )
    }
    renderButtonText(eventId) {
        var buttonText = "Attend"
        return buttonText
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
                            return (
                                <div key={item.id} id="events-grid">
                                    <div className="event-box effect1">
                                        <button onClick={ () => { this.attendEvent(item.id) } } className="button" id="attend-event-button">{ this.renderButtonText(item.id) }</button>
                                        <div className="payment-title">{ item.event_name }</div>
                                        <div className="num-attendees-left-box"><div className="num-attendees-left-text">Places left:</div><div className="num-attendees-left">{ item.num_attendees_left }</div></div>
                                        <div className="event-description">{ item.event_description }</div>
                                        <div className="event-location-wrapper"><div className="event-location-header">Location:</div><div className="event-address">{ item.location_id }</div></div>
                                        <div className="event-location-wrapper"><div className="event-location-header">On:</div><div className="event-address">{ item.event_time }</div></div>

                                    </div>
                                    <div className="attendees-box effect1">
                                        <div className="attendees-box-title">Attending the event:</div>
                                        {
                                            this.renderAttendees(item.id)
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
