import React, {Component} from 'react'
import axios from './axios'
// import Uploader from './Uploader'

class CurHostel extends Component {
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
            <div id="current-hostel">
                <div>current hostel's page</div>
            </div>
        )
    }
}

export default CurHostel
