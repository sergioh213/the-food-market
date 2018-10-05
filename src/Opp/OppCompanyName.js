import React, {Component} from 'react'
import styled from 'styled-components'

class OppCompanyName extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {}
    addShadow(e) {
        e.target.classList.add("shadow");
    }
    removeShadow(e) {
        e.target.classList.remove("shadow");
    }
    render() {
        if ( !this.props ) {
            return null;
        }
        const CompanyNameMain = styled.div`
            position: relative;
            width: 100%;`
        const CompanyNameDiv = styled.div`
            position: relative;
            font-size: 30px;
            color: #949596;
            font-weight: 400;
            margin-top: 10px;
            background-color: white;
            display: inline-block;
            min-width: 200px;
            border-radius: 4px;
            height: 40px;
            text-align: center;
            padding: 0 8px;
            cursor: default;
            `
        return (
            <CompanyNameMain className="company-name-main">
                <CompanyNameDiv
                    onMouseEnter={(e) => {this.addShadow(e)}}
                    onMouseLeave={(e) => {this.removeShadow(e)}}
                    id="company-name-text"
                >{this.props.company_legal_name}</CompanyNameDiv>
            </CompanyNameMain>
        )
    }
}

export default OppCompanyName
