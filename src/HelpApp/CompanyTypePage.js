import React, {Component} from 'react'
import { BrowserRouter, Route, } from 'react-router-dom'
import styled from 'styled-components'
import AccountTypeInfoIcons from './AccountTypeInfoIcons'
import ProducerAccountInfoPage from './accounts/ProducerAccountInfoPage'
import TransporterAccountInfoPage from './accounts/TransporterAccountInfoPage'
import WholesalerAccountInfoPage from './accounts/WholesalerAccountInfoPage'
import RetailerAccountInfoPage from './accounts/RetailerAccountInfoPage'
import RebuyerAccountInfoPage from './accounts/RebuyerAccountInfoPage'

class CompanyTypePage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        if (this.props.match.params.companyType === "producer") {
            console.log("producer detected on url");
        } else {
            console.log("this.props.match.params.companyType: ", this.props.match.params.companyType);
        }
    }
    render() {
        const Main = styled.div`
        position: relative;
        margin-top: 50px;
        `
        const HeaderSection = styled.div`
        position: relative;
        padding: 20px;
        background-color: rgba(251, 251, 251, 1);
        `
        const MainHeader = styled.div`
        position: relative;
        font-weight: 400;
        font-size 30px;
        `
        const HeaderWrapper = styled.div`
        position: relative;
        text-align: center;
        `
        const Explanation = styled.div`
        position: relative;
        text-align: center;
        margin-top: 10px;
        color: grey;
        `
        return (
            <Main>
                <HeaderSection className="shadow">
                    <MainHeader>Types of accounts</MainHeader>
                        <HeaderWrapper>
                            <h2>This are the types of accounts that you can register your company with</h2>
                        </HeaderWrapper>
                    <AccountTypeInfoIcons />
                    <Explanation>Click on one for more information</Explanation>
                </HeaderSection>
                <BrowserRouter>
                    <div>
                        <Route exact path='/help/company-type/producer' component={ProducerAccountInfoPage} />
                        <Route exact path='/help/company-type/transporter' component={TransporterAccountInfoPage} />
                        <Route exact path='/help/company-type/wholesaler' component={WholesalerAccountInfoPage} />
                        <Route exact path='/help/company-type/retailer' component={RetailerAccountInfoPage} />
                        <Route exact path='/help/company-type/re-buyer' component={RebuyerAccountInfoPage} />
                    </div>
                </BrowserRouter>
            </Main>
        )
    }
}

export default CompanyTypePage
