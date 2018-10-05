import React, {Component} from 'react'
import { connect } from 'react-redux';
import { saveCompanyDescription } from './redux-socket/actions.js'
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

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
        console.log("e.target.value: ", e.target.value);
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.dispatch(saveCompanyDescription(this.state.company_description));
        this.props.toggleShowDescriptionField()
    }
    render() {
        const DescriptionField = styled.textarea`
            resize: none;
            width: 100%;
            position: relative;
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
            position: relative;
            width: 100%;
            border-radius: 4px;
            border: none;`
        const Message = styled.div`
            font-size: 16px;
            display: inline-block;
            color: lightgrey;
            line-height: 40px;
            text-align: center;
            `
        const CloseX = styled.div`
            position: relative;
            font-size: 30px;
            font-weight: 400;
            color: darkgrey;
            display: inline-block;
            float: right;
            cursor: pointer;
            margin-right: 8px;
            padding: none;

            &:hover{
                color: black;
                transform: scale(1.2);
            }
            `
        const InstructionsWrapper = styled.div`
            position: relative;
            text-align: center;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 15px;
            height: 40px;
            `
        return (
            <div>
                <InstructionsWrapper>
                    <Message>Describe what your company does in a few sentences</Message><CloseX onClick={this.props.toggleShowDescriptionField}>x</CloseX>
                </InstructionsWrapper>
                <form onSubmit={ (e) => this.handleSubmit(e)  }>
                    <div>
                        <textarea id="description-textarea"
                            className="shadow"
                            ref={(lm) => this.lm = lm}
                            name="company_description"
                            defaultValue={this.props.profile.company_description}
                            onChange={(e) => {this.handleChange(e)}}
                        ></textarea>
                    </div>
                    <Wrapper>
                        <SubmitButton className="shadow scale-on-hover">{this.state.buttonText}</SubmitButton>
                    </Wrapper>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CompanyDescriptionField)
