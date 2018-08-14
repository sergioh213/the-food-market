import React, {Component} from 'react'
import axios from './axios'
import Header from './Header'
// import Uploader from './Uploader'

class CurHostel extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("current hostel data as the component mounts: ", data);
                this.setState(data)
                console.log("this.state: ", this.state);
                if (this.state.checked_in == true) {
                    console.log("checked_in true 1");
                    this.setState({
                        checkinButton: "Check-Out"
                    })
                } else {
                    console.log("checked_in false 3");
                    this.setState({
                        checkinButton: "Check-In"
                    })
                }
            }
        )
    }
    handleSubmit() {
        // // this.setState({ checked_in: !this.state.checked_in})
        // if (this.state.checked_in == true) {
        //     console.log("checked_in true 2");
        //     this.setState({
        //         checkinButton: "Check-Out"
        //     })
        // } else {
        //     console.log("checked_in false 3");
        //     this.setState({
        //         checkinButton: "Check-In"
        //     })
        // }
        console.log("this.state.checked_in before sending: ", this.state.checked_in);
        axios.post("/check-in-out.json", this.state).then(({data}) => {
            console.log("data (before setting state after post): ", data);
            this.setState({
                checked_in: data.checked_in
            })
            console.log("state with checked_in: ", this.state.checked_in);
            if (this.state.checked_in == true) {
                console.log("checked_in true 3");
                this.setState({
                    checkinButton: "Check-Out"
                })
            } else {
                console.log("checked_in false 3");
                this.setState({
                    checkinButton: "Check-In"
                })
            }
        })
    }
    render() {
        if (!this.state.id) {
            return null
        }
        return (
            <div id="current-hostel">
                <Header text={`Your hostel`}/>
                <div id="current-hostel-subtitle"><div id="subtitle">A place to call </div><br/><div id="subtitle-keyword">HOME</div></div>
                <button onClick={ this.handleSubmit } className="button" id="check-in-button">{ this.state.checkinButton }</button>
            </div>
        )
    }
}

export default CurHostel
