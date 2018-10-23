import React, {Component} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class TypeOfCompanyButton extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.toggleShowLable = this.toggleShowLable.bind(this)
        this.toggleHideLable = this.toggleHideLable.bind(this)
    }
    componentDidMount() {
        var text = "No company type detected, please, report this error"
        if (this.props.profile.company_type === 1) {
            text = "This is a producer account"
            name = "producer"
        } else if (this.props.profile.company_type === 2) {
            text = "This is a transporter account"
            name = "transporter"
        } else if (this.props.profile.company_type === 3) {
            text = "This is a wholesaler account"
            name = "wholesaler"
        } else if (this.props.profile.company_type === 4) {
            text = "This is a retailer account"
            name = "retailer"
        } else if (this.props.profile.company_type === 5) {
            text = "This is a re-buyer account"
            name = "re-buyer"
        }
        this.setState({ companyTypeText: text, companyTypeName: name })
    }
    toggleShowLable(){
        this.setState({ lableDisplay: true })
    }
    toggleHideLable(){
        this.setState({ lableDisplay: false })
    }
    render() {
        const Main = styled.div`
        text-align: left;
        margin-bottom: 10px;
        width: 100%;
        `
        const TextDiv = styled.a`
        position: relative;
        background-color: #5EB648;
        padding: 3px 6px 3px 6px;
        border-radius: 4px;
        display: inline-block;
        cursor: pointer;
        text-decoration: none;
        color: white;

        &:visited{
            color: white;
        }
        &:hover{
            background-color: #6ACC58;
        }
        `
        const Wrapper = styled.div`
        position: relative;
        display: inline-block;
        `
        const Label = styled.div`
        position: relative;
        background-color: #ededed;
        padding: 5px;
        color: #5b5b5b;
        border-radius: 4px;
        `
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
        transform: translateX(-50%);
        text-align: center;
        z-index: 1;
        `
        return (
            <Main>
                <Wrapper className="bubbles-wrapper">
                    <TextDiv href={`help/company-type/${this.state.companyTypeName}`}
                        onMouseEnter={() => {this.toggleShowLable()}}
                        onMouseLeave={() => {this.toggleHideLable()}}
                    >
                        {this.state.companyTypeText}
                    </TextDiv>
                    { this.state.lableDisplay &&
                        <LabelWrapper>
                            <ArrowUp></ArrowUp>
                            <Label>Learn more</Label>
                        </LabelWrapper> }
                </Wrapper>
            </Main>
        )
    }
}

export default connect(mapStateToProps)(TypeOfCompanyButton)
