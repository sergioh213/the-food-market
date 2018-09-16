import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class CompanyNameInput extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        this.setState({mounted: true})
        axios.get("/producer.json").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    componentDidUpdate() {
        // this.lm && this.lm.focus()
        // this.target.selectionStart.
    }
    // shouldComponentUpdate() {
    //     // return false
    // }
    handleChange(e) {
        console.log("handle input company name change happening");
        this.props.setNewCompanyName(e.target.value)
    }
    render() {
        // if (!this.state.mounted) {
        //     return null
        // }
        const NameInput = styled.input`
            position: relative;
            font-size: 25px;
            -webkit-appearance: none;
            -ms-appearance: none;
            margin-left: 50%;
            transform: translateX(-50%);
            cursor: text;
            border-width: 0;
            border-style: none;
            border-image: none;
            color: #949596;
            font-weight: 400;
            margin-top: 10px;
            background-color: white;
            display: inline-block;
            min-width: 200px;
            border-radius: 4px;
            text-align: center;
            height: 40px;`
        const SavingSign = styled.div`
            position: relative;
            color: grey;
            display: inline-block;
            left: -130px;`
        // console.log("this.state.company_legal_name in input: ", this.state.company_legal_name);
        return (
            <div>
                <input
                    id="companyname-edit"
                    className="shadow"
                    name="company_name_input"
                    onChange={ (e) => {this.handleChange(e)} }
                    onBlur={this.props.toggleShowCompanyName}
                />
                <SavingSign>Saving...</SavingSign>
            </div>
        )
        // ref={(lm) => this.lm = lm}
    }
}

export default CompanyNameInput
