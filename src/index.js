import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login_page';
import Homepage from './homePage'
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router,Link,Redirect,Route,Switch} from 'react-router-dom'
ReactDOM.render(
    <Router>
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/homePage" component={Homepage}/>
        <Redirect to="/login" />
        </Switch>
    </Router>,document.getElementById('login')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
