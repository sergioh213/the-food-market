import React, {Component} from 'react'
import axios from './axios'
// import Uploader from './Uploader'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.enlargeDots = this.enlargeDots.bind(this)
        this.shrinkDots = this.shrinkDots.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("data as the component mounts: ", data);
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
                    map_placement: {
                        right: 420,
                        top: 620
                    },
                    street: "Erkelenzdamm",
                    num: '35-21',
                    postal_code: "10999",
                    hostel_main_img: "/content/header-pic-1.jpg"
                },
                {
                    id: 2,
                    city_name: "Berlin",
                    area: 'EAST MITTE',
                    enlarged: false,
                    map_placement: {
                        right: 395,
                        top: 480
                    },
                    street: "Alexanderstraße",
                    num: '7',
                    postal_code: "10178",
                    hostel_main_img: "/content/header-pic-2.jpg"
                },
                {
                    id: 3,
                    city_name: "Berlin",
                    area: 'NORTH MITTE',
                    enlarged: false,
                    map_placement: {
                        right: 555,
                        top: 390
                    },
                    street: "Chausseestraße",
                    num: '61',
                    postal_code: "10115",
                    hostel_main_img: "/content/header-pic-3.jpg"
                }
            ]
        })
    }
    shrinkDots(id){
        setTimeout( () => {
            console.log("shrinking happening");
            const clone = this.state.locations.map(item => {
                if (item.id === id) {
                    item.enlarged = false
                }
                return item
            })

            this.setState({ locations: clone })
        }, 1000)
    }
    enlargeDots(id) {
        console.log("enlarging happening");
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
    render() {
        if (!this.state.locations) {
            return null
        }
        return (
            <div id="home">
                <div id="home-style-div">
                    <img id="map" src="/content/berlin-map-wide.png" alt=""/>
                    <div className="main-header-pane">
                        <div className="main-header-pane-gradiant"></div>
                    </div>
                    {/*<div className="main-header-pane"><img className="header-pane-image" src="/content/header-pic-1.jpg" alt=""/></div>*/}
                    {/*<div className="main-header-bottom">Home page</div>*/}
                    <div id="hostels-in-city">
                        {
                            this.state.locations.map(item => {
                                return (
                                    <div>
                                        <div onMouseEnter={ () => this.enlargeDots(item.id) } onMouseLeave={ () => this.shrinkDots(item.id) } className="hostel-div" id={`hostel-${ item.id }`}>
                                            <i id="location-icon" className="fas fa-map-marker-alt"></i>
                                            <div className="address">{ item.area }</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="main-header-top">Home page</div>
                    {
                        this.state.locations.map(item => {
                            return (
                                <div id="wrapper-box">
                                    { item.enlarged &&
                                        <div style={{ right: item.map_placement.right, top: item.map_placement.top - 10 }} onMouseEnter={ () => this.enlargeDots(item.id) } onMouseLeave={ () => this.shrinkDots(item.id) } className="dot-lable">
                                            <img className="map-label-img" src={`${ item.hostel_main_img }`} alt=""/>
                                            <div>{`${ item.street } ${ item.num }`}</div>
                                            <div>{`${ item.postal_code }, ${ item.city_name }`}</div>
                                        </div>
                                    }
                                    <div style={{ transform: item.enlarged && 'scale(1.5)', right: item.map_placement.right, top: item.map_placement.top }} onMouseEnter={ () => this.enlargeDots(item.id) } onMouseLeave={ () => this.shrinkDots(item.id) } className="map-dot" id={`map-dot-${ item.id }`}></div>
                                </div>
                            )
                        })
                    }
                    <div id="home-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </div>
            </div>
        )
    }
}

export default Home
