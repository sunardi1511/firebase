import React, { Component } from 'react'
import './Register.scss'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase  from '../../../config/firebase';
import Buttom from '../../../components/atoms/Buttom';
import { connect } from 'react-redux';
import { registerUseAPI } from '../../../config/redux/action';

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        // console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleRegisterSubmit = () => {
        const {email,password}=this.state
        console.log('email: ', email)
        console.log('password: ', password)
        this.props.registerUseAPI({email, password})

        // const auth = getAuth(firebase);
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         // ...
                
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // ..
        //         console.log(errorCode, errorMessage)
        //     });

    }


    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register page</p>
                    <input className="input" id='email' placeholder="Email" type="text" onChange={this.handleChangeText} />
                    <input className="input" id='password' placeholder="password" type="password" onChange={this.handleChangeText} />
                    <Buttom onClick={this.handleChangeText} title="Register"/>
                </div>
                {/* <button>Go to Dashboard</button> */}
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
