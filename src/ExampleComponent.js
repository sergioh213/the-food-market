import React, {Component} from 'react'
import { connect } from 'react-redux';
import { getProfile } from './redux-socket/actions.js'
import styled from 'styled-components'
import axios from './axios'

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}

class ExampleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        // this.props.dispatch(getProfile());
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default connect(mapStateToProps)(ExampleComponent)
