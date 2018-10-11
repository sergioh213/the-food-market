import React, {Component} from 'react'
import styled from 'styled-components'
import axios from '../axios'
import OppCompanyName from './OppCompanyName'
import OppCompanyDescriptionText from './OppCompanyDescriptionText'
import OppCompanyAddress from './OppCompanyAddress'
import GoogleMap from '../GoogleMap'

class Opp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showDescription: true,
            showSimpleMap: false
        }

        this.toggleShowDescription = this.toggleShowDescription.bind(this)
        this.findOnMap = this.findOnMap.bind(this)
        this.getUser = this.getUser.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        console.log("OPP mounts");
        const id = this.props.match.params.id;
        this.getUser(id);
    }
    componentDidUpdate() {
        !this.state.id && this.getUser(this.props.match.params.id);
    }
    static getDerivedStateFromProps(nextProps, state) {
        console.log("getDerivedStateFromProps");
        if (
            nextProps.match &&
            nextProps.match.params &&
            nextProps.match.params.id != state.id
        ) {
            return {
                id: null
            };
        }
        return null;
    }
    getUser(id) {
        axios
            .get(`/user/${id}.json`)
            .then(({ data }) => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                }
            })
            .catch(err =>
                console.log("Error in axios.get('/user/:id.json') ", err)
            );
    }

    findOnMap() {
        this.setState({ showSimpleMap: !this.state.showSimpleMap, showDescription: !this.state.showDescription })
    }
    toggleShowDescription() {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }
    render() {
        const {
            id,
            company_image_url,
            company_legal_name,
            company_description,
            showDescription,
            headquarter_formatted_address,
            headquarter_google_maps_place_id,
            showSimpleMap
        } = this.state
        if (!id) {
            console.log("opp stuck");
            return null;
        }
        const MainPage = styled.div`
            position: relative;
            width: 100%;
            text-align: center;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            `
        const CentralPanel = styled.div`
            position: relative;
            width: 56%;
            text-align: center;
            height: 100%;
            padding: 20px;
            background-color: rgba(251, 251, 251, 1);
            `
        const CompanyLogo = styled.img`
            position: relative;
            width: 200px;
            height: 200px;
            object-fit: cover;
            object-position: center;
            border-radius: 4px;
            `
        const LeftPanel = styled.div`
            padding: 20px;
            width: 20%;
            height: 100%;
            margin-right: 10px;
            background-color: rgba(251, 251, 251, 1);
            `
        const RightPanel = styled.div`
            padding: 20px;
            width: 20%;
            height: 100%;
            margin-left: 10px;
            background-color: rgba(251, 251, 251, 1);
            `
        return (
            <div>
                <MainPage id="main-profile-page">
                    <LeftPanel className="shadow"
                    >Products for sale by this company</LeftPanel>
                    <CentralPanel className="shadow">
                        <CompanyLogo className="shadow" src={company_image_url}></CompanyLogo>
                        <OppCompanyName company_legal_name={company_legal_name}/>
                        { headquarter_formatted_address &&
                            <OppCompanyAddress
                                headquarter_formatted_address={headquarter_formatted_address}
                                findOnMap={this.findOnMap}
                                showSimpleMap={showSimpleMap}
                            /> }
                        { showSimpleMap &&
                            <GoogleMap
                                placeId={ headquarter_google_maps_place_id }
                                toggleShowMap={this.toggleShowMap}
                            /> }
                        { (company_description && showDescription) &&
                            <OppCompanyDescriptionText
                                company_description={company_description}
                            /> }
                    </CentralPanel>
                    <RightPanel className="shadow">dfdd</RightPanel>
                </MainPage>
            </div>
        )
    }
}

export default Opp
