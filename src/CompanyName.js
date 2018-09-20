import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'
import CompanyNameInput from './CompanyNameInput'

class ExampleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showCompanyName: true
        }

        this.editCompanyName = this.editCompanyName.bind(this)
        this.toggleShowCompanyName = this.toggleShowCompanyName.bind(this)
        this.setNewCompanyName = this.setNewCompanyName.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    addShadow(e) {
        e.target.classList.add("shadow");
    }
    removeShadow(e) {
        e.target.classList.remove("shadow");
    }
    editCompanyName(e) {
        console.log("edit company name happening");
        this.setState({
            editable: true
        })
        var text = e.target.innerText
        console.log("text: ", text);
        // e.target.innerHTML
    }
    setNewCompanyName(e) {
        console.log("setNewCompanyName happening");
        var text = e.target.innerText
        console.log("final text to be sent: ", text);
        axios.post("/change-company-name.json", {new_company_name: text}).then(
            ({data}) => {
                this.setState({company_legal_name: data.company_legal_name}, () => console.log("this.state.company_legal_name: ", this.state.company_legal_name))
            })
    }
    toggleShowCompanyName() {
        console.log("toggle happening");
        this.setState({
            showCompanyName: true
        })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        }, () => console.log("state after change: ", this.state))
    }
    render() {
        if ( !this.state.id ) {
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
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            padding: 0 8px;`
        return (
            <div className="company-name-main">
                { this.state.showCompanyName &&
                    <div
                        onMouseEnter={(e) => {this.addShadow(e)}}
                        onMouseLeave={(e) => {this.removeShadow(e)}}
                        onClick={(e) => {this.editCompanyName(e)}}
                        className="scale-on-hover-and-center"
                        contentEditable={this.state.editable}
                        onBlur={(e) => this.setNewCompanyName(e) }
                    >{this.state.company_legal_name}</div>
                }
            </div>
        )
        // { !this.state.showCompanyName &&
        //     <CompanyNameInput
        //     setNewCompanyName={this.setNewCompanyName}
        //     toggleShowCompanyName={this.toggleShowCompanyName}
        //     />
        // }
    }
}

export default ExampleComponent
