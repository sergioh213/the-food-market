import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import { saveNewCompanyName } from './redux-socket/actions.js'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class CompanyName extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.setNewCompanyName = this.setNewCompanyName.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.setState({ mounted: true })
    }
    addShadow(e) {
        e.target.classList.add("shadow");
    }
    removeShadow(e) {
        e.target.classList.remove("shadow");
    }
    setNewCompanyName(e) {
        var text = e.target.innerText
        axios.post("/change-company-name.json", {new_company_name: text}).then(
            ({data}) => {
                this.lm.classList.add("company-name-text-offset-left");
                this.setState({ succesfullySaved: true }, () => {
                    setTimeout(() => {
                        this.setState({ succesfullySaved: true }, () => {
                            this.props.dispatch(saveNewCompanyName(data.company_legal_name))
                        })
                    }, 2000)
                })
            })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    render() {
        if ( !this.props && this.state.mounted ) {
            return null;
        }
        const SavedMessage = styled.div`
            position: relative;
            display: inline-block;
            color: green;
            font-size: 16px;
            left: 15px;
            `
        return (
            <div className="company-name-main">
                <div
                    onMouseEnter={(e) => {this.addShadow(e)}}
                    onMouseLeave={(e) => {this.removeShadow(e)}}
                    className="company-name-text scale-on-hover"
                    contentEditable={true}
                    ref={(lm) => this.lm = lm}
                    onBlur={(e) => this.setNewCompanyName(e) }
                >{this.props.profile.company_legal_name}</div>
                { this.state.succesfullySaved && <SavedMessage>Saved</SavedMessage>}
            </div>
        )
    }
}

export default connect(mapStateToProps)(CompanyName)
