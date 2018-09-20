import React, {Component} from 'react'
import axios from './axios'
import styled from 'styled-components'

class CompanyDescriptionField extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        axios.get("/producer.json").then(
            ({data}) => {
                if (data.company_description) {
                    this.setState({
                        ...data,
                        buttonText: 'Update'

                    })
                } else {
                    this.setState({
                        ...data,
                        buttonText: 'Submit'

                    })
                }
            }
        )
    }
    componentDidUpdate() {
        this.lm.focus()
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.setNewDescription(this.state.company_description)
    }
    render() {
        const DescriptionField = styled.textarea`
            resize: none;
            width: 510px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 15px;
            border: none;
            padding: 4px 8px;
            font-size: 14px;`
        const MainDiv = styled.div`
            position: relative;`
        const Wrapper = styled.div`
            position: relative;
            width: 100%;`
        const SubmitButton = styled.button`
            margin-top: 10px;
            width: 100%;
            height: 45px;
            background-color: #6ACC58;
            cursor: pointer;
            font-size: 16px;
            color: white;
            font-weight: 400;
            border-radius: 4px;
            border: none;`
        const Message = styled.div`
            font-size: 16px;
            color: lightgrey;
            margin-top: 30px;
            text-align: center;`
        return (
            <MainDiv>
                <Message>Describe what your company does in a few sentences</Message>
                <form onSubmit={ (e) => this.handleSubmit(e)  }>
                    <Wrapper>
                        <textarea id="description-textarea"
                            className="shadow"
                            ref={(lm) => this.lm = lm}
                            name="company_description"
                            defaultValue={this.state.company_description}
                            onChange={(e) => {this.handleChange(e)}}
                        ></textarea>
                    </Wrapper>
                    <Wrapper>
                        <SubmitButton id="company-description-button">{this.state.buttonText}</SubmitButton>
                    </Wrapper>
                </form>
            </MainDiv>
        )
    }
}

export default CompanyDescriptionField
