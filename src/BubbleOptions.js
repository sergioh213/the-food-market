import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from './axios'
import styled from 'styled-components'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class BubbleOptions extends Component {
    constructor() {
        super()

        this.state = {
            icons: [
                {
                    id: 1,
                    lableDisplay: false,
                    classes: "fas fa-home",
                    text: "Add your headquarters",
                    display: true
                },
                {
                    id: 2,
                    lableDisplay: false,
                    classes: "fas fa-credit-card",
                    text: "Add payment info",
                    display: true
                },
                {
                    id: 3,
                    lableDisplay: false,
                    classes: 'fas fa-piggy-bank',
                    text: "Add a deposit bank account",
                    display: true
                },
                {
                    id: 4,
                    lableDisplay: false,
                    classes: "fas fa-pencil-alt",
                    text: "Add a description for your company",
                    display: true
                }
            ]
        }

        this.toggleShowLable = this.toggleShowLable.bind(this)
        this.toggleHideLable = this.toggleHideLable.bind(this)
        this.setIcons = this.setIcons.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true})
        this.setIcons()
    }
    async setIcons() {
        const clone = this.state.icons
        if (this.props.profile.bank_account_number && this.props.profile.bank_iban) {
            clone.map(item => {
                if (item.id == 3) {
                    item.display = false
                }
            })
        }
        if (this.props.profile.company_description) {
            clone.map(item => {
                if (item.id == 4) {
                    item.display = false
                }
            })
        }
        if (
            this.props.profile.payment_card_number &&
            this.props.profile.payment_card_expiration_month &&
            this.props.profile.payment_card_expiration_year &&
            this.props.profile.payment_card_ccv
        ) {
            clone.map(item => {
                if (item.id == 2) {
                    item.display = false
                }
            })
        }
        if (
            this.props.profile.headquarter_google_maps_place_id &&
            this.props.profile.headquarter_formatted_address &&
            this.props.profile.headquarter_latitude &&
            this.props.profile.headquarter_longitude
        ) {
            clone.map(item => {
                if (item.id == 1) {
                    item.display = false
                }
            })
        }
        this.setState({ icons: clone })
    }
    toggleShowLable(itemId){
        const clone = this.state.icons.map(item => {
            if (item.id === itemId) {
                item.lableDisplay = true
            }
            return item
        })
        this.setState({ icons: this.state.icons }, () => {
            setTimeout(() => {
                const clone = this.state.icons.map(item => {
                    if (item.id === itemId) {
                        item.lableDisplay = false
                    }
                    return item
                })

                this.setState({ icons: clone })
            }, 3000)
        })
    }
    toggleHideLable(itemId){
        const clone = this.state.icons.map(item => {
            if (item.id === itemId) {
                item.lableDisplay = false
            }
            return item
        })

        this.setState({ icons: clone })
    }
    render() {
        if (!this.props) {
            return null
        }
        const EditsButtons = styled.div`
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            `
        const Bubble = styled.div`
            position: relative;
            border-radius: 100%;
            width: 50px;
            height: 50px;
            display: flex;
            margin-right: 10px;
            justify-content: center;
            align-items: center;
            background-color: #6ACC58;`
        const IconsTags = styled.i`
            position: relative;
            color: rgba(255, 255, 255, 1);
            top: 5px;
            right: 5px;
            font-size: 20px;`
        const Wrapper = styled.div`
            position: relative;
            `
        const Label = styled.div`
            position: relative;
            background-color: #ededed;
            padding: 5px;
            color: #5b5b5b;
            border-radius: 4px;`
        const ArrowUp = styled.div`
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #ededed;
            margin: 0 auto;`
        const LabelWrapper = styled.div`
            position absolute;
            width: 106px;
            left: 50%;
            top: 50px;
            transform: translateX(-50%);
            top: 55px;
            text-align: center;`
        const IconsPlusSigns = styled.i`
            position: relative;
            color: #6ACC58;
            font-size: 8px;`
        const PlusSignWrapper = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10px;
            height: 10px;
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: white;
            border-radius: 100%;`
        const lastStyle = { marginRight: "none" }
        return (
            <EditsButtons>
                {
                    this.state.icons.map(item => {
                        return (
                            <Wrapper key={item.id} className="bubbles-wrapper">
                                { item.display ?
                                    <Bubble
                                        className="icon"
                                        onMouseEnter={() => {this.toggleShowLable(item.id)}}
                                        onMouseLeave={() => {this.toggleHideLable(item.id)}}
                                        onClick={() => {this.props.toggleShowMenus(item.id)}}
                                    >
                                            <PlusSignWrapper><IconsPlusSigns className="fas fa-plus"></IconsPlusSigns></PlusSignWrapper>
                                            <IconsTags className={ item.classes }></IconsTags>
                                    </Bubble> :
                                    null }
                                { item.lableDisplay &&
                                    <LabelWrapper>
                                        <ArrowUp></ArrowUp>
                                        <Label>{item.text}</Label>
                                    </LabelWrapper> }
                            </Wrapper>
                        )
                    })
                }
            </EditsButtons>
        )
    }
}

export default connect(mapStateToProps)(BubbleOptions)
