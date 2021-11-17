import React, { Component } from 'react';
import { connect } from 'react-redux';
import Buttom from '../../../components/atoms/Buttom';
import { withRouter } from 'react-router-dom';
import { loginUseAPI } from '../../../config/redux/action';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state;
        const { history } = this.props
        const userCredential = await this.props.loginUserAPI({ email, password })
            .catch(err => err);
        if (userCredential) {
            console.log('login success')
            this.setState({
                email: '',
                password: ''
            })
            history.push('/') 
        } else {
            console.log(`login failed`)
        }

    }


    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login page</p>
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
                        onClick={this.handleLoginSubmit}
                        loading={this.props.isLoading}
                        title="Login" />
                </div>
            </div>
        )
    }
}



const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispacth) => ({
    loginUserAPI: (data) => dispacth(loginUseAPI(data))
})


export default withRouter(connect(reduxState, reduxDispatch)(Login));
