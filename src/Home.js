import React, {Component} from 'react'
import axios from './axios'
import Header from './Header'
import Reservation from './Reservation'
import Payment from './Payment'
// import Reservation from './Reservation'
// import Uploader from './Uploader'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showReservation: false,
            showPopUp: false,
            showPayment: false,
            showMessage: false
        }

        this.enlargeDots = this.enlargeDots.bind(this)
        this.shrinkDots = this.shrinkDots.bind(this)
        this.toggleShowReservation = this.toggleShowReservation.bind(this)
        this.toggleShowPayment = this.toggleShowPayment.bind(this)
        this.makeReservation = this.makeReservation.bind(this)
        this.toggleShowMessage = this.toggleShowMessage.bind(this)
    }
    componentDidMount() {
        console.log("showPayment starts. Show: ", this.state.showPayment);
        console.log("showReservation starts. Show: ", this.state.showReservation);
        axios.get("/user").then(
            ({data}) => {
                // console.log("data as the component mounts: ", data);
                this.setState(data)
            }
        )
        this.setState({
            locations: [
                {
                    id: 1,
                    city_name: "Berlin",
                    area: 'KREUZBERG',
                    enlarged: false,
                    coordinates: {
                        right: 420,
                        top: 620
                    },
                    street: "Erkelenzdamm",
                    num: '35-21',
                    postal_code: "10999",
                    hostel_main_img: "/content/header-pic-1.jpg",
                    num_beds_left: 8
                },
                {
                    id: 2,
                    city_name: "Berlin",
                    area: 'EAST MITTE',
                    enlarged: false,
                    coordinates: {
                        right: 395,
                        top: 480
                    },
                    street: "Alexanderstraße",
                    num: '7',
                    postal_code: "10178",
                    hostel_main_img: "/content/header-pic-2.jpg",
                    num_beds_left: 3
                },
                {
                    id: 3,
                    city_name: "Berlin",
                    area: 'NORTH MITTE',
                    enlarged: false,
                    coordinates: {
                        right: 555,
                        top: 390
                    },
                    street: "Chausseestraße",
                    num: '61',
                    postal_code: "10115",
                    hostel_main_img: "/content/header-pic-3.jpg",
                    num_beds_left: 14
                }
            ]
        })
    }
    shrinkDots(id){
        // if (this.state.showPopUp) {
        //     const clone = this.state.locations.map(item => {
        //         item.enlarged = false
        //         return item
        //     })
        //     this.setState({
        //         showPopUp: false,
        //         locations: clone
        //     })
        // }
        this.timer = setTimeout( () => {
            // console.log("shrinking happening");
            const clone = this.state.locations.map(item => {
                if (item.id === id) {
                    item.enlarged = false
                }
                return item
            })
            this.setState({
                // showPopUp: true,
                locations: clone
            })
        }, 200)
    }
    enlargeDots(id) {
        // console.log("enlarging happening");
        clearTimeout(this.timer)
        const clone = this.state.locations.map(item => {
            if (item.id === id) {
                item.enlarged = true
            }
            return item
        })

        this.setState({ locations: clone })

        // var currentHostelId = e.target.id
        // console.log('current hostel Id: ', currentHostelId);
    }
    // growDots(e) {
    //     e.target.style.transform = 'scale(1.5)'
    // }
    toggleShowReservation() {
        // if (id) {
        //     console.log("toggle reservation with id");
        //     const clone = this.state.locations.map(item => {
        //         if (item.id === id) {
        //             item.enlarged = false
        //         }
        //         return item
        //     })
        //     this.setState({
        //         showReservation: false,
        //         locations: clone
        //     })
        // } else {
            // console.log("toggle reservation with no id");
            this.setState({
                showReservation: !this.state.showReservation
            })
        // }
    }
    toggleShowPayment() {
        this.setState({
            showPayment: !this.state.showPayment
        })
    }
    toggleShowMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        })
    }
    makeReservation(stateFromComponent) {
        console.log('stateFromComponent: ', stateFromComponent);
        axios.post("/newReservation.json", stateFromComponent)
            .then(({data}) => {
                this.setState({
                    data
                }, () => {
                    if (this.state.data.success) {
                        this.toggleShowReservation()
                        this.toggleShowMessage()
                    }
                })
            })
    }
    render() {
        if (!this.state.locations) {
            return null
        }
        return (
            <div id="home">
                <div id="home-style-div">
                    <img id="map" src="/content/berlin-map-wide.png" alt=""/>
                    <Header text={`Home page`}/>
                    {
                        this.state.showMessage && <div id="successful-reservation">Your reservation was <div id="successful-message">SUCCESFULLY</div> made<div onClick={ this.toggleShowMessage } id="close-x">x</div></div>
                    }
                    <div id="hostels-in-city">
                        {
                            this.state.locations.map(item => {
                                return (
                                    <div key={item.id}>
                                        <div onMouseEnter={ () => this.enlargeDots(item.id) } onMouseLeave={ () => this.shrinkDots(item.id) } className="hostel-div" id={`hostel-${ item.id }`}>
                                            <i id="location-icon" className="fas fa-map-marker-alt"></i>
                                            <div className="address">{ item.area }</div>
                                        </div>
                                        { this.state.showReservation &&
                                            <Reservation
                                                hostelInfo={ item }
                                                toggleShowReservation={ this.toggleShowReservation }
                                                toggleShowPayment={ this.toggleShowPayment }
                                                showPayment={ this.state.showPayment }
                                                showReservation={ this.state.showReservation }
                                                makeReservation={ this.makeReservation }
                                            />
                                        }
                                        { this.state.showPayment &&
                                            <Payment
                                                toggleShowPayment={ this.toggleShowPayment }
                                                toggleShowReservation={ this.toggleShowReservation }
                                                showPayment={ this.state.showPayment }
                                                showReservation={ this.state.showReservation }
                                            />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        this.state.locations.map(item => {
                            return (
                                <div key={item.id}>
                                    { item.enlarged &&
                                        <div style={{ right: item.coordinates.right, top: item.coordinates.top - 10 }} onMouseEnter={ () => this.enlargeDots(item.id) } onMouseLeave={ () => this.shrinkDots(item.id) } className="dot-lable effect1">
                                            <img className="map-label-img" src={`${ item.hostel_main_img }`} alt=""/>
                                            <div>{`${ item.street } ${ item.num }`}</div>
                                            <div>{`${ item.postal_code }, ${ item.city_name }`}</div>
                                            <button onClick={ this.toggleShowReservation } className="button" id="reserve-bed-button">Reserve a bed</button>
                                            <div id="beds-left-text">
                                                There are
                                                <div id="num-beds-left">{ item.num_beds_left }</div>
                                                beds left
                                            </div>
                                        </div>
                                    }
                                    <div style={{ transform: item.enlarged && 'scale(1.5)', right: item.coordinates.right, top: item.coordinates.top }} onMouseEnter={ () => this.enlargeDots(item.id) } onMouseLeave={ () => this.shrinkDots(item.id) } className="map-dot" id={`map-dot-${ item.id }`}></div>
                                </div>
                            )
                        })
                    }
                    <div id="home-paragraph" className="effect1">At our co-living spaces, each location has one special amenity.<br />Reserve a bed and use it in any location (including other countries!!).<br /><br />If you are currently staying with us, you can use any location's amenity, share our comunity of amazing people and attend our events.<br /><br />You are free to stay for as long as you want!</div>
                    {/*<div id="home-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>*/}
                </div>
                { this.state.showMessage
                    ? <div className="dim-background" id="darker" onClick={ this.toggleShowMessage }></div>
                    : null
                }
                { this.state.showPayment
                    ? <div className="dim-background" id="darker" onClick={ this.toggleShowPayment }></div>
                    : null
                }
                { this.state.showReservation
                    ? <div className="dim-background" id="darker" onClick={ this.toggleShowReservation }></div>
                    : null
                }
                <div id="home-background"></div>
            </div>
        )
    }
}

export default Home
