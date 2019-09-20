import React, {Component, useState} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import {any} from "prop-types";
import {HashRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import cookie from 'react-cookies'

function Loginresult({className, loginsuccess, loginfail, loginsuccess_statu, loginsuccess_time}) {
    if (loginsuccess_statu) {
        return (<Router>
            <Redirect to="/homePage"/>
        </Router>)
    }
    if (loginsuccess) {
        cookie.save('tokenaccessToken', loginsuccess.data.login.accessToken);
        cookie.save('refreshToken', loginsuccess.data.login.refreshToken);
        return (
            <div className='loginresult_suc'>
                登陆成功 {loginsuccess_time}
            </div>)

    } else if (loginfail) {
        return (
            <div className='loginresult_fai'>
                登陆失败
            </div>
        )
    } else {
        return <label/>;
    }
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            message: 0,
            result: null,
            error: null,
            loginsuccess_statu: false,
            loginsuccess_time: 2,
        };
        this.loginsubmit = this.loginsubmit.bind(this)
    }

    loginsubmit() {
        this.setState({result: null, error: null});
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
        });
        client.query({
            query: gql`
            {
            login(mail:"${this.usernameinput.value}", password:"${this.passwordinput.value}"){
            accessToken
            refreshToken
            }}
            `
        })
            .then(result => this.setState({result: result}))
            .catch(error => this.setState({error: error}))
    }


    render() {
        if (this.state.result) {
            setTimeout(() => this.setState({loginsuccess_statu: true}), 2000);
            setInterval((timeout) => timeout = this.setState({loginsuccess_time: this.state.loginsuccess_time > 0 ? this.state.loginsuccess_time - 1 : clearInterval(timeout)}), 1000)
        }
        return (
            <div className='loginUi'>
                <Loginresult loginsuccess={this.state.result} loginfail={this.state.error}
                             loginsuccess_statu={this.state.loginsuccess_statu}
                             loginsuccess_time={this.state.loginsuccess_time}/>
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

export default Login;
// export function Loginresult({className}) {
//         return (
//             <div className={className}>
//                 登陆成功
//             </div>
//         )
//     }
// export default function Login() {
//
//     const [mail, setMail] = useState("");
//     const [password, setPassword] = useState("");
//     const [result, setResult] = useState("");
//
//     function loginSubmit() {
//         const client = new ApolloClient({
//             uri: 'http://localhost:4000/graphql',
//         });
//         client.query({
//             query: gql`
//             {
//             login(mail:"${mail}", password:"${password}"){
//             accessToken
//             refreshToken
//             }}
//             `
//         })
//             .then((result: any) => setResult(result))
//             .catch(error => setResult(error))
//     }
//
//
//     return (
//             <div className='loginUi'>
//                 <Loginresult className='loginresult'/>
//                 <input type='text' onChange={(mail) => setMail(mail.currentTarget.value)} className='usernameinput'
//                        placeholder='Username' value={mail}/>
//                 <br/>
//                 <input type='text' onChange={(pass) => setPassword(pass.currentTarget.value)} className='passwordinput'
//                        placeholder='Password' value={password}/>
//                 <br/>
//                 <button className='loginbutton' onClick={loginSubmit}>登录</button>
//                 <button className='registered'>注册</button>
//             </div>
//     )
//
// }
