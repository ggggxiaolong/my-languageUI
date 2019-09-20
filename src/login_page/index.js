import React, {Component} from 'react';
import './App.css';
import ApolloClient from 'apollo-client'
import {gql} from 'apollo-boost'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            message: 0,
        };
        this.loginsubmit = this.loginsubmit.bind(this)
    }

    loginsubmit() {
        // this.setState({message:event.target.value})
        console.log(this.usernameinput.value,this.passwordinput.value)
    }

    render() {
        console.log(this.state.message);
        return (
                <div className='loginUi'>
                    <input type='text' ref={input => this.usernameinput = input} className='usernameinput' placeholder='Username'/>
                    <br/>
                    <input type='text' ref={input => this.passwordinput = input} className='passwordinput' placeholder='Password'/>
                    <br/>
                    <button className='loginbutton' onClick={this.loginsubmit}>登录</button>
                    <button className='registered'>注册</button>
                </div>
        );
    }
}

export default Login;
