import React, {Component} from 'react'
import cookie from 'react-cookies'
import {HashRouter as Router, Redirect} from 'react-router-dom'
import './homePage.css'
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import {array} from "prop-types";

function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function findlanguage(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return true
        }
    }
}

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_select: '',
            result: null,
            error: null,
            iflogin_forward: false,
            language_type: [],
        };
        this.projectselect = this.projectselect.bind(this);
        this.changejectselect = this.changejectselect.bind(this);
        this.setloginforward = this.setloginforward.bind(this);
        this.change_language_select = this.change_language_select.bind(this);
    }

    changejectselect(event) {
        this.setState({project_select: event.target.value});
    }

    change_language_select(event) {
        console.log(event.target.value,this.state.language_type);
        let array = this.state.language_type;
        if (findlanguage(this.state.language_type, event.target.value)) {
            this.setState({language_type: removeByValue(this.state.language_type, event.target.value)})
        } else {
            array.push(event.target.value)
            this.setState({language_type: array});
        }
    }

    projectselect() {
        let token = {
            token: cookie.load('tokenaccessToken'),
            refreshToken: cookie.load('refreshToken'),
        };
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
            headers: token,
        });
        client.query({
            query: gql`{
                           projects{
                           id
                           name
                           }
                       }`
        })
            .then(reponse => this.setState({result: reponse.data.projects}))
            .catch(error => this.setState({error: error.message}))
    }

    setloginforward() {
        this.setState({iflogin_forward: true})
    }

    componentDidMount() {
        this.projectselect()
    }

    render() {
        return (
            this.state.error !== null
                ?
                this.state.error.slice(15, 29) === 'you must login'
                    ?
                    !this.state.iflogin_forward
                        ?
                        <div className='loginouttime'>
                            <span className='outtimetitle'><b>过期提醒</b></span>
                            <div className='outtimecontext'>登陆已过期，请重新登陆</div>
                            <button className='outtimeclick' onClick={this.setloginforward}>确定
                            </button>
                        </div>
                        : <Router><Redirect to="/login"/></Router>
                    : alert(this.state.error)
                : <div className='homepage'>
                    <div className='homepageUI'>
                        <div className='object_location'>
                            {this.state.result ?
                                this.state.result.map(item =>
                                    <div className='selectone' key={item.id}>
                                        <input type='radio' name='object'
                                               value={item.id}
                                               onChange={e => this.changejectselect(e)}/><label>{item.name}</label>
                                    </div>)
                                : null}
                            <div className='languageUI'>
                                <div className='selectone'><label>language:</label></div>
                                <div className='selectone'><input type='checkbox' name='lanuage_all' value='all'
                                                                  onChange={e => this.change_language_select(e)}/><label>All</label>
                                </div>
                                <div className='selectone'><input type='checkbox' name='lanuage_en' value='en'
                                                                  checked={findlanguage(this.state.language_type, 'en') ? 'checked' : null}
                                                                  onChange={e => this.change_language_select(e)}/><label>en</label>
                                </div>
                                <div className='selectone'><input type='checkbox' name='lanuage_es' value='es'
                                                                  checked={findlanguage(this.state.language_type, 'es') ? 'checked' : null}
                                                                  onChange={e => this.change_language_select(e)}/><label>es</label>
                                </div>
                                <div className='selectone'><input type='checkbox' name='lanuage_ko' value='ko'
                                                                  checked={findlanguage(this.state.language_type, 'ko') ? 'checked' : null}
                                                                  onChange={e => this.change_language_select(e)}/><label>ko</label>
                                </div>
                            </div>
                            <div className='searchclick'>
                                <button onClick={() => {
                                }}>Search
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
        )
    }
}