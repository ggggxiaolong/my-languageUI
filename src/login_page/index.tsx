import React, { useState} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'

/*class Login1 extends Component {
    constructor() {
        super();
        this.state = {
            message: 0,
        };
        this.loginsubmit = this.loginsubmit.bind(this)
    }

    loginsubmit() {
        // this.setState({message:event.target.value})
        // console.log(this.usernameinput.value, this.passwordinput.value);
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
        });
        client.query({
            query: gql`
            {
            query login {
            login(mail:"${this.usernameinput.value}", password:"${this.passwordinput.value}"){
            accessToken
            refreshToken
            }}}
            `
        })
    }

    render() {
        console.log(this.state.message);
        return (
            <div className='loginUi'>
                <input type='text' ref={input => this.usernameinput = input} className='usernameinput'
                       placeholder='Username'/>
                <br/>
                <input type='text' ref={input => this.passwordinput = input} className='passwordinput'
                       placeholder='Password'/>
                <br/>
                <button className='loginbutton' onClick={this.loginsubmit}>登录</button>
                <button className='registered'>注册</button>
            </div>
        );
    }
}

export default Login1;*/

export default function Login() {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    function loginSubmit() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
        });
        client.query({
            query: gql`
            {
            query login {
            login(mail:"${mail}", password:"${password}"){
            accessToken
            refreshToken
            }}}
            `
        })
    }

    return(
          <div className='loginUi'>
                <input type='text' onChange={(mail) => setMail(mail.currentTarget.value)} className='usernameinput'
                       placeholder='Username' value={mail}/>
                <br/>
                <input type='text' onChange={(pass) => setPassword(pass.currentTarget.value)} className='passwordinput'
                       placeholder='Password' value={password}/>
                <br/>
                <button className='loginbutton' onClick={loginSubmit}>登录</button>
                <button className='registered'>注册</button>
            </div>
    )

}
