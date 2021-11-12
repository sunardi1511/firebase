import React, { Component } from 'react';
import { connect } from 'react-redux';
import Buttom from '../../../components/atoms/Buttom';
import { registerUseAPI } from '../../../config/redux/action';
import './Register.scss';

class Register extends Component {
    state = {
        email: '',
        password: '' 
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleRegisterSubmit = () => {
        const { email, password } = this.state;
        this.props.RegisterAPI({ email, password })
        this.setState({
            email: '',
            password: ''
        })
    }


    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register page</p>
                    <input
                        className="input"
                        id='email'
                        placeholder="Email"
                        type="text"
                        onChange={this.handleChangeText}
                        value={this.state.email} />
                    <input
                        className="input"
                        id='password'
                        placeholder="password"
                        type="password"
                        onChange={this.handleChangeText}
                        value={this.state.password} />
                    <Buttom
                        onClick={this.handleRegisterSubmit}
                        loading={this.props.isLoading}
                        title="Register" />
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispacth) => ({
    RegisterAPI: (data) => dispacth(registerUseAPI(data))
})


export default connect(reduxState, reduxDispatch)(Register)
