import React, { Component } from 'react'
import './Register.scss'

class Register extends Component {
    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-tittle">Register page</p>
                    <input className="input" placeholder="Email" type="text" />
                    <input className="input"  placeholder="password" type="password" />
                    <button className="btn">Register</button>
                </div>
                {/* <button>Go to Login</button> */}
            </div>
        )
    }
}

export default Register
