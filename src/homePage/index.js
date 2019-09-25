import React, {Component} from 'react'
import cookie from 'react-cookies'
import {HashRouter as Router, Redirect} from 'react-router-dom'
import './homePage.css'
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'


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
            project_select: null,
            result: null,
            error: null,
            iflogin_forward: false,
            language_type: [''],
            result_message: null,
            page: 0,
            languageinclude: null,
            ifMore: true,
            radioselect: [false, false, false]
            // result_message_error:null,
        };
        this.projectselect = this.projectselect.bind(this);
        this.changejectselect = this.changejectselect.bind(this);
        this.setloginforward = this.setloginforward.bind(this);
        this.change_language_select = this.change_language_select.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.LetMore = this.LetMore.bind(this);
        this.addresultmessage = this.addresultmessage.bind(this);
        this.setradio = this.setradio.bind(this);
    }

    changejectselect(event) {
        this.setState({project_select: event.target.value});
    }

    change_language_select(event) {
        let array = this.state.language_type;
        if (findlanguage(array, event.target.value)) {
            if (event.target.value === 'all') {
                this.setState({language_type: ['']})
            } else {
                if (array.includes('all')) {
                    removeByValue(array, 'all')
                }
                removeByValue(array, event.target.value);
                this.setState({language_type: array})
            }

        } else {
            if (event.target.value === 'all') {
                array.push('en');
                array.push('es');
                array.push('ko')
            }
            array.push(event.target.value);
            if (array.length === 4) {
                array.push('all')
            }
            this.setState({language_type: array});
        }
    }

    projectselect() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
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

    submitSearch() {
        const paramfrom = this.state.language_type;
        let languageinclude = [];
        if (paramfrom.includes('en')) {
            languageinclude.push('en')
        }
        if (paramfrom.includes('es')) {
            languageinclude.push('es')
        }
        if (paramfrom.includes('ko')) {
            languageinclude.push('ko')
        }
        this.setState({languageinclude: languageinclude, page: 1});
        let param = 'project_id';
        if (paramfrom.includes('all')) {
            param = "en" + " " + "es" + " " + "ko"
        } else if (paramfrom.length > 1) {
            param = "";
            for (let i = 0; i < paramfrom.length; i++) {
                param = param + " " + paramfrom[i]
            }
        }
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.query({
            query:
                gql`{
                            language(page: 0, pageSize:25, projectId:${this.state.project_select})
                            {
                                ${param}
                                
                            }
                        }`
        })
            .then(reponse => this.setState({result_message: [reponse.data.language], ifMore: true}))
            .catch(error => this.setState({error: error.message}))
    }

    LetMore() {
        const paramfrom = this.state.language_type;
        let param = 'project_id';
        if (paramfrom.includes('all')) {
            param = "en" + " " + "es" + " " + "ko"
        } else if (paramfrom.length > 1) {
            param = "";
            for (let i = 0; i < paramfrom.length; i++) {
                param = param + " " + paramfrom[i]
            }
        }
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.query({
            query:
                gql`{
                            language(page: ${this.state.page}, pageSize:25, projectId:${this.state.project_select})
                            {
                                ${param}
                                
                            }
                        }`
        })
            .then(reponse => this.addresultmessage(reponse))
            .catch(error => this.setState({error: error.message}))
    }

    addresultmessage(reponse) {
        if (reponse.data.language.length < 25) {
            this.setState({ifMore: false})
        }
        let old_result_message = this.state.result_message;
        // console.log({result_message: {...old_result_message, [this.state.page]:reponse.data.language}});
        let newlist = [...old_result_message, reponse.data.language];
        // newlist.map(item => item.map(item => console.log(item.en)));
        this.setState({result_message: newlist, page: this.state.page + 1})
    }

    setradio(radioselect) {
        console.log(radioselect);
        let radios = [false, false, false];
        radios[radioselect] = true;
        console.log(radios);
        this.setState({radioselect: radios, project_select: radioselect + 1})
    }

    render() {
        console.log(this.state.result_message && this.state.result_message[0][0].project_id);
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
                                        <div className='selectoneTop' onClick={() => this.setradio(item.id - 1)}>
                                            <div className='radiocircle'/>
                                        </div>
                                        <input type='radio' name='object'
                                               value={item.id}
                                               checked={this.state.radioselect[item.id - 1] ? 'checked' : null}
                                               onChange={e => this.changejectselect(e)}/><label>{item.name}</label>
                                    </div>)
                                : null}
                            <div className='languageUI'>
                                <div className='selectone'><label>language:</label></div>
                                <div className='selectone'><input type='checkbox' name='lanuage_all' value='all'
                                                                  onChange={e => this.change_language_select(e)}
                                                                  checked={this.state.language_type.length === 4 || this.state.language_type.includes('all') ? 'checked' : null}
                                /><label>All</label></div>
                                <div className='selectone'><input type='checkbox' name='lanuage_en' value='en'
                                                                  checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('en') ? 'checked' : null}
                                                                  onChange={e => this.change_language_select(e)}/><label>en</label>
                                </div>
                                <div className='selectone'><input type='checkbox' name='lanuage_es' value='es'
                                                                  checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('es') ? 'checked' : null}
                                                                  onChange={e => this.change_language_select(e)}/><label>es</label>
                                </div>
                                <div className='selectone'><input type='checkbox' name='lanuage_ko' value='ko'
                                                                  checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('ko') ? 'checked' : null}
                                                                  onChange={e => this.change_language_select(e)}/><label>ko</label>
                                </div>
                            </div>
                            <div className='searchclick'>
                                <button onClick={() => this.submitSearch()}>Search</button>
                            </div>
                        </div>
                    </div>
                    {this.state.result_message === null || this.state.result_message[0].length === 0 || this.state.result_message[0][0].project_id
                        ?
                        <div className='languagenodata'>no data</div>
                        :
                        <div className="contenttext">
                            <table className='contenttexttable'>
                                {this.state.languageinclude && this.state.languageinclude.includes('en')
                                    ?
                                    <th className='thstyle'><h1>en</h1></th> : null}
                                {this.state.languageinclude && this.state.languageinclude.includes('es')
                                    ?
                                    <th className='thstyle'><h1>es</h1></th> : null}
                                {this.state.languageinclude && this.state.languageinclude.includes('ko')
                                    ?
                                    <th className='thstyle'><h1>ko</h1></th> : null}
                                {
                                    this.state.result_message.map((item) =>
                                        item.map((item_content) =>
                                            <tr className='table_tr'>
                                                {this.state.languageinclude && this.state.languageinclude.includes('en') ?
                                                    <td className='width'> {item_content.en === null ? 'NULL' : item_content.en} </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('es') ?
                                                    <td className='width'> {item_content.es === null ? 'NULL' : item_content.es} </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('ko') ?
                                                    <td className='width'> {item_content.ko === null ? 'NULL' : item_content.ko} </td> : null}
                                            </tr>
                                        ))}
                            </table>
                            <div className='letmorebox'>
                                {this.state.ifMore
                                    ?
                                    <button className='letmore' onClick={this.LetMore}>Let More...</button>
                                    :
                                    <div className='letmore'><span>没有更多了....</span></div>
                                }
                            </div>
                        </div>
                    }
                </div>
        )
    }
}