import React, {Component} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import axios from '../axios'
import GoogleMap from '../GoogleMap'
import { toggleShowBottomMenu } from '../redux-socket/actions.js'

const mapStateToProps = state => {
    return {
        profile: state.profile,
        chat: state.chat,
        showBottomMenu: state.showBottomMenu,
        showFacility: state.showFacility
    }
}

class Facility extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMap: false,
            temporaryArrayOfUsers: [
                {
                    id: 1,
                    user_name: "Sergio",
                    user_lastname: "Herrero",
                    user_roll: "Facility Manager"
                },
                {
                    id: 2,
                    user_name: "Mario",
                    user_lastname: "Smith",
                    user_roll: "Operator"
                },
                {
                    id: 3,
                    user_name: "Meike",
                    user_lastname: "Pollakowski",
                    user_roll: "Recolector"
                }
            ],
            temporaryArrayOfProduction: [
                {
                    id: 1,
                    product_name: "carrots",
                    expected_output: "1000 kg",
                    available_from: "10-07-2019",
                    sold: false
                },
                {
                    id: 2,
                    product_name: "strawberries",
                    expected_output: "500 kg",
                    available_from: "28-02-2019",
                    sold: true
                },
                {
                    id: 3,
                    product_name: "carrots",
                    expected_output: "3000 kg",
                    available_from: "03-12-2018",
                    sold: true
                },
                {
                    id: 4,
                    product_name: "nuts",
                    expected_output: "2000 kg",
                    available_from: "20-07-2019",
                    sold: false
                },
                {
                    id: 5,
                    product_name: "bananas",
                    expected_output: "6000 kg",
                    available_from: "20-09-2019",
                    sold: true
                }
            ],
            temporaryArrayOfOffers: [
                {
                    id: 1,
                    product_name: "peas",
                    amount: "3000 kg",
                    available_until: "20-10-2018",
                    sold: false
                },
                {
                    id: 2,
                    product_name: "tomatos",
                    amount: "4000 kg",
                    available_until: "23-11-2018",
                    sold: true
                },
                {
                    id: 3,
                    product_name: "lettuce",
                    amount: "1000 kg",
                    available_until: "18-12-2018",
                    sold: true
                },
                {
                    id: 4,
                    product_name: "apples",
                    amount: "8000 kg",
                    available_until: "10-12-2018",
                    sold: false
                }
            ]
        }

        this.toggleShowBottom = this.toggleShowBottom.bind(this)
        this.toggleShowMap = this.toggleShowMap.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
        if (this.props.chat.showChat && !this.props.chat.expanded) {
            this.lm.style.width = "70%"
        } else if (this.props.chat.showChat && this.props.chat.expanded) {
            this.lm.style.width = "30%"
        } else {
            this.lm.style.width = "100%"
        }
        if (this.props.chat.showChat) {
            this.lm.style.marginRight = "10px"
        } else {
            this.lm.style.marginRight = "none"
        }
    }
    toggleShowBottom() {
        this.props.dispatch(toggleShowBottomMenu())
    }
    toggleShowMap() {
        this.setState({ showMap: !this.state.showMap })
    }
    render() {
        const {
            facility_name,
            google_maps_place_id,
            images_urls
        } = this.props.showFacility.facility
        const SectionTitle = styled.div`
            position: relative;
            text-align: left;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            height: 40px;
            `
        const CloseX = styled.div`
            position: relative;
            font-size: 30px;
            font-weight: 400;
            color: darkgrey;
            display: inline-block;
            float: right;
            cursor: pointer;
            margin-right: 8px;
            padding: none;

            &:hover{
                color: black;
                transform: scale(1.2);
            }
            `
        const FormHeader = styled.div`
            position: relative;
            font-size: 24px;
            display: inline-block;
            color: #6ACC58;
            font-weight: 400;
            line-height: 40px;
            text-align: center;
            `
        const ShowInMap = styled.button`
            margin-left: 20px;
            `
        const ContentBox = styled.div`
            position: relative;
            display: flex;
            margin-top: 10px;
            border-top: 1px solid lightgrey;
            padding-top: 20px;
            `
        const LeftSidePanel = styled.div`
            position: relative;
            display: inline-block;
            padding-right: 20px;
            width: 50%;
            border-right: 1px solid lightgrey;
            `
        const RightSidePanel = styled.div`
            position: relative;
            display: inline-block;
            width: 50%;
            padding-left: 20px;
            `
        const Header = styled.div`
            position: relative;
            font-size: 16px;
            display: inline-block;
            font-weight: 400;
            line-height: 40px;
            text-align: left;
            `
        const ImagesGrid = styled.div`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            grid-gap: 10px;
            `
        const UserName = styled.div`
            background-color: lightgrey;
            padding: 3px;
            padding-left: 5px;
            margin-bottom: 5px;
            `
        const Images = styled.img`
            width: 100px;
            height: 100px;
            cursor: pointer;
            object-fit: contain;
            object-position: center;
            `
        const ProductBox = styled.div`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 2px;
            margin-bottom: 15px;
            `
        const ProductBoxGridDiv = styled.div`
            background-color: lightgrey;
            padding-left: 5px;
            `
        return (
            <div id="facilities-map-main"
                className="shadow"
                ref={(lm) => this.lm = lm}
            >
                <SectionTitle>
                    <FormHeader>{facility_name}</FormHeader>
                    <ShowInMap className="button" onClick={this.toggleShowMap}>
                        { this.state.showMap ? "Close map" : "Show in map" }
                    </ShowInMap>
                    <CloseX onClick={this.toggleShowBottom}>x</CloseX>
                </SectionTitle>
                { this.state.showMap &&
                    <GoogleMap placeId={google_maps_place_id} />
                }
                { !this.state.showMap &&
                    <div>
                    <ContentBox>
                        <LeftSidePanel>
                            <Header>Facility pictures</Header>
                            <ImagesGrid>
                                { images_urls.map(image => {
                                    return (
                                        <Images key={image.id} src={image.image_url}></Images>
                                    )
                                }) }
                            </ImagesGrid>
                        </LeftSidePanel>
                        <RightSidePanel>
                            <Header>List of contacts for this facility</Header>
                            { this.state.temporaryArrayOfUsers.map(user => {
                                return (
                                    <UserName key={user.id}>{`${user.user_name} ${user.user_lastname}`}</UserName>
                                )
                            }) }
                        </RightSidePanel>
                    </ContentBox>
                    <ContentBox>
                        <LeftSidePanel>
                            <Header>Currently producing</Header>
                            { this.state.temporaryArrayOfProduction.map(product => {
                                return (
                                    <ProductBox key={product.id}>
                                        <ProductBoxGridDiv>{product.product_name}</ProductBoxGridDiv>
                                        <ProductBoxGridDiv>{product.available_from}</ProductBoxGridDiv>
                                        <ProductBoxGridDiv>{product.expected_output}</ProductBoxGridDiv>
                                    </ProductBox>
                                )
                            }) }
                        </LeftSidePanel>
                        <RightSidePanel>
                            <Header>Offers in Market</Header>
                            { this.state.temporaryArrayOfOffers.map(offer => {
                                return (
                                    <ProductBox key={offer.id}>
                                        <ProductBoxGridDiv>{offer.product_name}</ProductBoxGridDiv>
                                        <ProductBoxGridDiv>{offer.available_until}</ProductBoxGridDiv>
                                        <ProductBoxGridDiv>{offer.amount}</ProductBoxGridDiv>
                                    </ProductBox>
                                )
                            }) }
                        </RightSidePanel>
                    </ContentBox>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Facility)
