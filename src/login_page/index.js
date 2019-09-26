import React, {Component, useState} from 'react';
// import './App.css';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import {any} from "prop-types";
import {HashRouter as Router, Redirect, Route} from 'react-router-dom'
import cookie from 'react-cookies'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
const useStyles = makeStyles(theme => ({
            '@global': {
                body: {
                    backgroundColor: theme.palette.common.white,
                },
            },
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <span color="inherit">
                Now Data
            </span>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
    constructor(props) {
        super(props);
        this.state = {
            message: 0,
            result: null,
            error: null,
            loginsuccess_statu: false,
            loginsuccess_time: 2,
            username: null,
            password: null,
        };
        this.loginsubmit = this.loginsubmit.bind(this);
        this.changeusername = this.changeusername.bind(this);
    }

    loginsubmit() {
        this.setState({result: null, error: null});
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
        });
        client.query({
            query: gql`
            {
            login(mail:"${this.state.username}", password:"${this.state.password}"){
            accessToken
            refreshToken
            }}
            `
        })
            .then(result => this.setState({result: result}))
            .catch(error => this.setState({error: error}))
    }

    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.loginsubmit()
        }
    };

    changeusername(type, event) {
        if (type === 'user') {
            this.setState({username: event.target.value})
        } else {
            this.setState({password: event.target.value})
        }
    }

    componentDidMount() {
        document.addEventListener("keypress", this.handleEnterKey)
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleEnterKey)
    }

    render() {
        if (this.state.result) {
            setTimeout(() => this.setState({loginsuccess_statu: true}), 2000);
            setInterval((timeout) => timeout = this.setState({loginsuccess_time: this.state.loginsuccess_time > 0 ? this.state.loginsuccess_time - 1 : clearInterval(timeout)}), 1000)
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Loginresult loginsuccess={this.state.result} loginfail={this.state.error}
                             loginsuccess_statu={this.state.loginsuccess_statu}
                             loginsuccess_time={this.state.loginsuccess_time}/>
                <div className={useStyles.paper}>
                    <Avatar className={useStyles.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <TextField variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               id="username"
                               label="Username"
                               name="Username"
                               autoFocus
                               onChange={(event) => this.changeusername('user', event)}
                               placeholder='Username'/>
                    <TextField variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               id="password"
                               label="Password"
                               name="Password"
                               autoFocus
                               onChange={(event) => this.changeusername('pwd', event)}
                               placeholder='Password'/>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={useStyles.submit}
                            onClick={this.loginsubmit}>Sign In</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
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
