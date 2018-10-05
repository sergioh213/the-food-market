import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class CompanyDescriptionText extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPencil: false,
            textColor: 'black'
        }

        this.toggleShowPencil = this.toggleShowPencil.bind(this)
        this.toggleHidePencil = this.toggleHidePencil.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    toggleShowPencil(){
        this.setState({ showPencil: true, textColor: 'darkgrey' })
    }
    toggleHidePencil(){
        this.setState({ showPencil: false, textColor: 'black' })
    }
    render() {
        if (!this.state.mounted || !this.props) {
            return null
        }
        const MainDiv = styled.div`
            position: relative;
            cursor: pointer;
            text-align: center;
            `
        const TextDiv = styled.div`
            color: ${this.state.textColor};
            position: relative;
            display: inline-block;
            margin-top: 15px;
            `
        return (
            <MainDiv
                className="scale-on-hover-more"
                onMouseEnter={this.toggleShowPencil}
                onMouseLeave={this.toggleHidePencil}
                onClick={ this.props.toggleShowDescriptionField }
            >
                <TextDiv>{this.props.profile.company_description}</TextDiv>
                { this.state.showPencil && <i className="fas fa-pencil-alt desciption_edit_icon"></i> }
            </MainDiv>
        )
    }
}

export default connect(mapStateToProps)(CompanyDescriptionText)
