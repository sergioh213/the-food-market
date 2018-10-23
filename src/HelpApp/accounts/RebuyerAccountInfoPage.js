import React, {Component} from 'react'
import styled from 'styled-components'

class RebuyerAccountInfoPage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        // this.props.dispatch(getProfile());
    }
    render() {
        const Main = styled.div`
        position: relative;
        color: black;
        margin-top: 50px;
        background-color: white;
        padding: 20px;
        overflow: hidden;
        `
        const MainHeaderWrapper = styled.div`
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        `
        const MainHeader = styled.div`
        position: relative;
        font-weight: 400;
        font-size 26px;
        color: grey;
        `
        const MainIconWrapper = styled.div`
        position: relative;
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px lightgrey solid;
        background-color: #5EB648;
        border-radius: 100%;
        `
        const MainIcon = styled.i`
        position: relative;
        color: white;
        font-size: 20px;
        `
        const Bold = styled.div`
        position: relative;
        display: inline-block;
        white-space: pre;
        font-weight: bold;
        `
        const IconWrapper = styled.div`
        position: relative;
        width: 25px;
        height: 25px;
        display: inline-block;
        border-radius: 100%;
        background-color: #5EB648;
        text-align: center;
        bottom: 5px;

        &:hover{
            transform: scale(1.1);
        }
        `
        const Icon = styled.i`
        position: relative;
        color: white;
        font-size: 14px;
        top: 50%;
        transform: translateY(-58%);
        `
        const SeactionHeaderWrapper = styled.div`
        position: relative;
        background-color: lightgrey;
        padding-left: 20px;
        margin-top: 30px;
        margin-bottom: 10px;
        `
        const SectionHeader = styled.div`
        position: relative;
        font-size: 18px;
        font-weight: 400;
        background-color: lightgrey;
        padding-right: 10px;
        display: inline-block;
        `
        const Paragraph = styled.div`
        position: relative;
        margin-bottom: 8px;
        white-space: pre;
        word-break: break-all;
        `
        const Explanation = styled.div`
        position: relative;
        display: inline-block;
        color: grey;
        white-space: pre;
        font-size: 14px;
        `
        const ATags = styled.a`
        position: relative;
        color: black;
        text-decoration: none;
        white-space: pre;

        &:visited{
            color: black;
        }
        `
        return (
            <Main className="shadow">
                <MainHeaderWrapper>
                    <MainHeader>Re-Buyer</MainHeader><MainIconWrapper><MainIcon className="fas fa-utensils"></MainIcon></MainIconWrapper>
                </MainHeaderWrapper>
                <Paragraph>
                    The producer account allows you to put what you produce for sale.
                </Paragraph>
                <Paragraph>
                    You can chose the price you want for each product and change it at will.
                </Paragraph>
                <Paragraph>
                    <ATags href="/help/company-type/retailer"><Bold>Retailers</Bold> <IconWrapper id="this-thing"><Icon className="fas fa-shopping-cart"></Icon></IconWrapper> </ATags>
                     or
                    <ATags href="/help/company-type/wholesaler"><Bold> wholesalers</Bold> <IconWrapper><Icon className="fas fa-warehouse"></Icon></IconWrapper> </ATags>
                     will then see your products on the
                     <ATags href="/help/marketplace"><Bold> marketplace</Bold> <IconWrapper><Icon className="fas fa-shopping-cart"></Icon></IconWrapper> </ATags>
                     and buy it directly.
                </Paragraph>
                <Paragraph>
                    Once someone buys your product, it will be available for a
                    <ATags href="/help/company-type/transporter"><Bold> delivery company</Bold> <IconWrapper><Icon className="fas fa-truck-moving"></Icon></IconWrapper> </ATags>
                     to do the route.<br/>
                    Taking it from your farm or facility to the buyer's location.
                </Paragraph>
                <Paragraph>
                    Everything is automated. So you don't have to speak with people. Even though we ensure that companies are trustworthy,<br/>
                    you can always
                    <ATags href="/help/chat"><Bold> message them</Bold> <IconWrapper><Icon className="far fa-comment"></Icon></IconWrapper> </ATags>
                    if you want.
                </Paragraph>
                <SeactionHeaderWrapper>
                    <ATags href="/help/contacts"><SectionHeader>Contacts</SectionHeader><Explanation>Learn more</Explanation></ATags>
                </SeactionHeaderWrapper>
                <Paragraph>
                    Each company with an account in <ATags href="/help/what-we-do"><Bold> The Food Market </Bold></ATags> can add employees, those employees can then be assigned as the contact for a certain location.<br/>
                    Every location has always at least one contact.
                </Paragraph>
                <SeactionHeaderWrapper>
                    <SectionHeader>Production Facilities</SectionHeader>
                </SeactionHeaderWrapper>
                <Paragraph>
                    As a producer company, you are expected to have/own or manage production facilities.<br/>
                    The places where you produce the goods that you will put for sale on the marketplace.
                </Paragraph>
                <Paragraph>
                    You can register as many production facilities as you wish.
                </Paragraph>
                <Paragraph>
                    To register a production facility, you will need:
                    <ul>
                        <li>A valid address <Explanation>(only complete street addresses or premises are accepted)</Explanation>.</li>
                        <li>A name for the location <Explanation>(OPTIONAL, so people can know which facility you are talking about)</Explanation>.</li>
                        <li>At least one <ATags href="/help/contacts"><Bold>contact person</Bold></ATags>.</li>
                        <li>Upload pictures <Explanation>(OPTIONAL)</Explanation>.</li>
                        <li>Add a description of how to arrive <Explanation>(OPTIONAL)</Explanation>.</li>
                    </ul>
                </Paragraph>
            </Main>
        )
    }
}

export default RebuyerAccountInfoPage
