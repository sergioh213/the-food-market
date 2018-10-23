import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Link } from 'react-router-dom'

function AccountTypeInfoIcons() {
    const Wrapper = styled.div`
    position: relative;
    display: grid;
    text-align: center;
    width: 50%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    left: 50%;
    transform: translateX(-50%);
    `
    const ProducerImg = styled.img`
    position: relative;
    width: 40px;
    display: inline-block;

    &:hover{
        transform: scale(1.1);
    }
    `
    const LinkWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    `
    const LinkUrl = styled.a`
    text-align: center;
    display: flex;
    justify-content: center;
    `
    const IconWrapper = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 100%;
    background-color: #5EB648;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        transform: scale(1.1);
    }
    `
    const Icon = styled.i`
    position: relative;
    color: white;
    font-size: 20px;
    `
    const AccountTypeName = styled.div`
    margin-top: 10px;
    `
    const ProducerAccountTypeName = styled.div`
    margin-top: 6px;
    `
    return (
        <div id="registration-choice">
            <BrowserRouter>
                <Wrapper>
                    <LinkWrapper>
                        {/*<Link to="/producer"><img className="icon-image icon" src="/content/producer-icon.png" alt=""/></Link>*/}
                        <LinkUrl href="/help/company-type/producer"><div><ProducerImg src="/content/producer-icon.png" alt=""/></div></LinkUrl>
                        <ProducerAccountTypeName>Producer</ProducerAccountTypeName>
                    </LinkWrapper>
                    <LinkWrapper>
                        <LinkUrl href="/help/company-type/transporter"><IconWrapper><Icon className="fas fa-truck-moving"></Icon></IconWrapper></LinkUrl>
                        <AccountTypeName>Transporter</AccountTypeName>
                    </LinkWrapper>
                    <LinkWrapper>
                        <LinkUrl href="/help/company-type/wholesaler"><IconWrapper><Icon className="fas fa-warehouse"></Icon></IconWrapper></LinkUrl>
                        <AccountTypeName>Wholesaler</AccountTypeName>
                    </LinkWrapper>
                    <LinkWrapper>
                        <LinkUrl href="/help/company-type/retailer"><IconWrapper><Icon className="fas fa-shopping-cart"></Icon></IconWrapper></LinkUrl>
                        <AccountTypeName>Retailer</AccountTypeName>
                    </LinkWrapper>
                    <LinkWrapper>
                        <LinkUrl href="/help/company-type/re-buyer"><IconWrapper><Icon className="fas fa-utensils"></Icon></IconWrapper></LinkUrl>
                        <AccountTypeName>Re-Buyer</AccountTypeName>
                    </LinkWrapper>
                </Wrapper>
            </BrowserRouter>
        </div>
    )
}

export default AccountTypeInfoIcons
