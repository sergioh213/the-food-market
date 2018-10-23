import React, {Component} from 'react'
import CompanyTypePage from './CompanyTypePage'
import WhatWeDo from './WhatWeDo'
import ContactsHelp from './ContactsHelp'
import ChatHelp from './ChatHelp'
import { BrowserRouter, Route } from 'react-router-dom'
import styled from 'styled-components'

class HelpApp extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        if (this.props.match.params.subpage === "company-type") {
            console.log("company-type detected on url");
        } else {
            console.log("this.props.match.params.subpage: ", this.props.match.params.subpage);
        }
    }
    render() {
        const Main = styled.div`
        position: relative;
        `
        const MainWrapper = styled.div`
        position: relative;
        margin-top: 20px;
        padding-top: 20px;
        background-color: rgba(251, 251, 251, 1);
        `
        const MainHeader = styled.div`
        position: relative;
        font-weight: 400;
        font-size 30px;
        padding-left: 20px;
        margin-bottom: 20px;
        background-color: #efefef;
        `
        const TopSection = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        `
        const BottomSection = styled.div`
        position: relative;
        display: flex;
        flex-direction: row;
        `
        const LeftSide = styled.div`
        position: relative;
        display: inline-block;
        `
        const RightSide = styled.div`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: grey;
        width: 100%;
        `
        const OptionDiv = styled.div`
        background-color: white;
        border: 1px solid lightgrey;
        width: 400px;
        padding: 3px 20px 3px 20px;
        cursor: pointer;

        &:hover{
            background-color: #5EB648;
            color: white;
            transform: scale(1.05);
        }
        `
        return (
            <Main>
                <MainWrapper className="shadow">
                    <TopSection>
                        <MainHeader>What do you need help with?</MainHeader>
                    </TopSection>
                    <BottomSection>
                        <LeftSide>
                            <a href="/help/what-we-do"><OptionDiv>What we do</OptionDiv></a>
                            <a href="/help/company-type"><OptionDiv>Types of accounts</OptionDiv></a>
                            <a href="/help/contacts"><OptionDiv>Designated contacts</OptionDiv></a>
                            <a href="/help/chat"><OptionDiv>Chat</OptionDiv></a>
                            <a href="/help/linking-accounts"><OptionDiv>Linking accounts</OptionDiv></a>
                            <a href="/help/employee-account"><OptionDiv>Creating and managing employee accounts</OptionDiv></a>
                        </LeftSide>
                        <RightSide>
                            Chose from the options on the left to learn about those topics
                        </RightSide>
                    </BottomSection>
                </MainWrapper>
                <BrowserRouter>
                    <div>
                        <Route exact path='/help/company-type' component={CompanyTypePage} />
                        <Route exact path='/help/company-type/:companyType' component={CompanyTypePage} />
                        <Route exact path='/help/what-we-do' component={WhatWeDo} />
                        <Route exact path='/help/contacts' component={ContactsHelp} />
                        <Route exact path='/help/chat' component={ChatHelp} />
                        <Route exact path='/help/linking-accounts' component={ChatHelp} />
                        <Route exact path='/help/employee-account' component={ChatHelp} />
                    </div>
                </BrowserRouter>
            </Main>
        )
    }
}

export default HelpApp
