import React, {Component} from 'react'
import axios from './axios'
// import Uploader from './Uploader'

class Events extends Component {
    constructor(props) {
        super(props)

        this.state = {}

    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("data as the component mounts: ", data);
                this.setState(data)
            }
        )
    }
    render() {
        return (
            <div id="events">
                <div>Events page</div>
            </div>
        )
    }
}

export default Events
