import React, {Component} from 'react'
import cookie from 'react-cookies'
import {BrowserRouter as Router, Redirect, withRouter} from 'react-router-dom'
import './homePage.css'
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import PopupWindow from '../Popup window'
import EditWindow from '../EditWindow'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {styled} from '@material-ui/core/styles';
import AddLanguage from '../AddLanguage'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
// import {compose, spacing, palette} from '@material-ui/system';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import CometoTop from '../CometoTop'
import { Icon } from '@material-ui/core'

function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            arr.splice(i, 1);
            break;
        }
    }
}

const MyTextField = styled(TextField)(
    {
        // paddingTop:8,
        marginTop: -2,
        // '& input':{height:'0.1rem'}
    },
);
const MySelect = styled(TextField)({
    margin: 0,
    padding: 0,
    '& label': {
        fontSize: '20px'
    },
    '& div': {width: '250px'}
});

function findlanguage(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return true
        }
    }
}

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_select: 1,
            result: null,
            // error: null,
            iflogin_forward: false,
            language_type: ['', 'all', 'en', 'es', 'ja', 'cs', 'fr', 'sk', 'ko'],
            result_message: null,
            page: 0,
            languageinclude: null,
            ifMore: true,
            radioselect: [false, false, false],
            ifquit: false,
            quitsure: null,
            search: null,
            nosearch: false,
            scrollY: 0,
            editwindow: false,
            id: null,
            addlanguage: false,
            finallerror: null,
            // result_message_error:null,
        };
        this.projectselect = this.projectselect.bind(this);
        this.changejectselect = this.changejectselect.bind(this);
        this.setloginforward = this.setloginforward.bind(this);
        this.change_language_select = this.change_language_select.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.LetMore = this.LetMore.bind(this);
        this.addresultmessage = this.addresultmessage.bind(this);
        this.quit = this.quit.bind(this);
        this.selectedone = this.selectedone.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.editon = this.editon.bind(this);
        this.ifreponsesuccess = this.ifreponsesuccess.bind(this);
        this.addlanguage = this.addlanguage.bind(this);
        this.setfinallerror = this.setfinallerror.bind(this);
        this.refreceToken = this.refreceToken.bind(this);

    }

    changejectselect(event) {
        this.setState({project_select: event.target.value});
    }

    quit(iftrue) {
        if (iftrue === true) {
            this.setState({ifquit: true})
        } else if (iftrue === false) {
            this.setState({ifquit: false})
        } else {
            cookie.remove('tokenaccessToken');
            cookie.remove('refreshToken');
            this.setState({quitsure: iftrue});
            setTimeout(() => window.location.reload(), 100);
        }
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
                if (!findlanguage(array, 'en')) {
                    array.push('en');
                }
                if (!findlanguage(array, 'es')) {
                    array.push('es');
                }
                if (!findlanguage(array, 'ko')) {
                    array.push('ko');
                }
                if (!findlanguage(array, 'ja')) {
                    array.push('ja');
                }
                if (!findlanguage(array, 'sk')) {
                    array.push('sk');
                }
                if (!findlanguage(array, 'cs')) {
                    array.push('cs');
                }
                if (!findlanguage(array, 'fr')) {
                    array.push('fr');
                }

            }
            array.push(event.target.value);
            if (array.length === 8) {
                array.push('all')
            }
            this.setState({language_type: array});
        }
    }

    projectselect() {
        const client = new ApolloClient({
            uri: 'http://34.221.26.139:4000/graphql',
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
            .catch(error => this.refreceToken(this.projectselect, error))
    }

    setloginforward() {
        this.setState({iflogin_forward: true});
        setTimeout(() => window.location.reload(), 100);
    }

    handleScroll(event) {
        this.setState({scrollY: event.target.scrollingElement.scrollTop});
    }

    componentDidMount() {
        this.projectselect();
        window.addEventListener('scroll', this.handleScroll);
        this.submitSearch()
    }

    submitSearch() {
        if (this.state.language_type.length === 1 || this.state.project_select === null) {
            this.setState({nosearch: true})
        }
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
        if (paramfrom.includes('ja')) {
            languageinclude.push('ja')
        }
        if (paramfrom.includes('sk')) {
            languageinclude.push('sk')
        }
        if (paramfrom.includes('cs')) {
            languageinclude.push('cs')
        }
        if (paramfrom.includes('fr')) {
            languageinclude.push('fr')
        }
        this.setState({languageinclude: languageinclude, page: 1});
        let param = 'project_id';
        if (paramfrom.includes('all')) {
            param = "en es ko ja sk cs fr"
        } else if (paramfrom.length > 1) {
            param = "";
            for (let i = 0; i < paramfrom.length; i++) {
                param = param + " " + paramfrom[i]
            }
        }
        const client = new ApolloClient({
            uri: 'http://34.221.26.139:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.query({
            query:
                gql`{
                            language(page: 0, pageSize:25, projectId:${this.state.project_select}, search:${this.state.search})
                            {
                                ${param} new_en new_es new_ko new_ja new_sk new_cs new_fr id
                                
                            }
                        }`
        })
            .then(reponse => this.setState({
                result_message: [reponse.data.language],
                ifMore: reponse.data.language.length === 25
            }))
            .catch(error => this.refreceToken(this.submitSearch, error))
        // const content = this.state.result_message;
    }

    LetMore() {
        const paramfrom = this.state.language_type;
        let param = 'project_id';
        if (paramfrom.includes('all')) {
            param = "en es ko ja sk cs fr"
        } else if (paramfrom.length > 1) {
            param = "";
            for (let i = 0; i < paramfrom.length; i++) {
                param = param + " " + paramfrom[i]
            }
        }
        const client = new ApolloClient({
            uri: 'http://34.221.26.139:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.query({
            query:
                gql`{
                            language(page: ${this.state.page}, pageSize:25, projectId:${this.state.project_select},search:${this.state.search})
                            {
                                ${param} new_en new_es new_ko new_ja new_sk new_cs new_fr id
                                
                            }
                        }`
        })
            .then(reponse => this.addresultmessage(reponse))
            .catch(error => this.refreceToken(this.LetMore, error))
    }

    addresultmessage(reponse) {
        if (reponse.data.language.length < 25) {
            this.setState({ifMore: false})
        }
        let old_result_message = this.state.result_message;
        let newlist = [...old_result_message, reponse.data.language];
        this.setState({result_message: newlist, page: this.state.page + 1})
    }

    selectedone(selected) {
        if (selected === true) {
            this.setState({nosearch: false})
        }
    }

    changeSearch(search) {
        search = search.target.value;
        search = search.replace('\\', '\\\\');
        if (search === '') {
            this.setState({search: null})
        } else {
            this.setState({search: "\"" + search + "\""})
        }
    }

    editon(ifediton, id) {
        this.setState({id: id});
        if (ifediton === false) {
            this.setState({editwindow: false})
        } else {
            this.setState({editwindow: true})
        }
    }

    submit = (contentold, contentnew) => {
        const client = new ApolloClient({
            uri: 'http://34.221.26.139:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.mutate({
            mutation: gql`
            mutation test{
                   updateLang(lang:{id:${contentnew[0].id},
                    en:"${contentnew[0].new_en === null ? '' : contentnew[0].new_en}",
                    es:"${contentnew[0].new_es === null ? '' : contentnew[0].new_es}",
                    ko:"${contentnew[0].new_ko === null ? '' : contentnew[0].new_ko}",
                    ja:"${contentnew[0].new_ja === null ? '' : contentnew[0].new_ja}",
                    sk:"${contentnew[0].new_sk === null ? '' : contentnew[0].new_sk}",
                    cs:"${contentnew[0].new_cs === null ? '' : contentnew[0].new_cs}",
                    fr:"${contentnew[0].new_fr === null ? '' : contentnew[0].new_fr}"})
                    {
                         id
                    }
            }`
        })
            .then(reponse => this.ifreponsesuccess(reponse))
            .catch(error => this.refreceToken(this.submit, error));

        contentold[0].new_en = contentnew[0].new_en;
        contentold[0].new_es = contentnew[0].new_es;
        contentold[0].new_ko = contentnew[0].new_ko;
        contentold[0].new_ja = contentnew[0].new_ja;
        contentold[0].new_sk = contentnew[0].new_sk;
        contentold[0].new_cs = contentnew[0].new_cs;
        contentold[0].new_fr = contentnew[0].new_fr;
    };

    ifreponsesuccess(reponse) {
        if (reponse) {
            this.setState({editwindow: false})
        }
    }

    search(e) {
        if (e.keyCode === 13) {
            this.submitSearch()
        }
    }

    addlanguage(IF) {
        if (IF === false) {
            this.setState({addlanguage: false})
        } else if (IF === true) {
            this.setState({addlanguage: true})
        }
    }

    setfinallerror(result, error, action) {
        if (error) {
            this.setState({
                finallerror: error.message
            })
        }
        if (result) {
            cookie.remove('tokenaccessToken');
            cookie.remove('refreshToken');
            cookie.save('tokenaccessToken', result.data.refreshToken.accessToken);
            cookie.save('refreshToken', result.data.refreshToken.refreshToken);
            action()
        }
    }

    refreceToken(action, error) {
        if (error && error.message.slice(15, 29) === 'you must login') {
            const client = new ApolloClient({
                uri: 'http://34.221.26.139:4000/graphql',
            });
            client.query({
                query: gql`
            {
            refreshToken(token:"${cookie.load('refreshToken')}"){
            accessToken
            refreshToken
            }}
            `
            })
                .then(result => this.setfinallerror(result, false, action))
                .catch(error => this.setfinallerror(false, error, action))
        }
    }

    render() {
        return (
            this.state.finallerror !== null
                ?
                this.state.finallerror.slice(15, 32) === 'refres token fail'
                    ?
                    !this.state.iflogin_forward
                        ?
                        <PopupWindow top={this.state.scrollY} oneselect={1} surebutton='Login'
                                     title='Login timeout'
                                     content='Login has expired, please login again .' fun={this.setloginforward}/>
                        : <Router><Redirect to="/login"/></Router>
                    : alert(this.state.finallerror)
                : <div className='homepage'>
                    <div className='homepagetitle'>
                        <div className='homepagetitle_change'>
                            <div className='Logo'><span><b>TappLock</b></span></div>
                            <div className='personal'>
                                <div className='personalimage'><img src={require('./images/admin.png')}
                                                                    alt=""/>
                                </div>
                                <div className='username'> Admin</div>
                                <div className='shuxian'/>
                                <div className='loginquit'><span onClick={() => this.quit(true)}
                                                                 className='quitcontent'>退出</span></div>
                            </div>
                        </div>
                    </div>
                    {this.state.ifquit ?
                        this.state.quitsure === 'sure'
                            ?
                            <Router><Redirect to="/login"/></Router>
                            :
                            <PopupWindow title='Log out' content='Are you sure you want to log out ?' fun={this.quit}/>
                        : this.state.nosearch
                            ?
                            <PopupWindow oneselect={1} title='Selected' content='Please select project and language .'
                                         fun={() => {
                                             this.selectedone(true)
                                         }} surebutton='I konwn'/>
                            : null}
                    <div className='homepageUI'>
                        <div className='object_location'>
                            {this.state.result ?
                                <div className='radiolocation'>
                                    <MySelect
                                        id="standard-select-currency"
                                        select
                                        label="ProjectId"
                                        value={this.state.project_select || 'null'}
                                        onChange={this.changejectselect}
                                        margin="normal"
                                    >
                                        {this.state.result.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </MySelect>
                                </div>
                                : null}
                            <div className='languageUI'>
                                <div className='selectone'><label/></div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_all' value='all'
                                                                     onChange={e => this.change_language_select(e)}
                                                                     checked={this.state.language_type.includes('all')}
                                /><label>All</label></div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_en' value='en'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('en')}
                                                                     onChange={e => this.change_language_select(e)}/><label>English</label>
                                </div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_es' value='es'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('es')}
                                                                     onChange={e => this.change_language_select(e)}/><label>Spanish</label>
                                </div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_ko' value='ko'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('ko')}
                                                                     onChange={e => this.change_language_select(e)}/><label>Korean</label>
                                </div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_ko' value='ja'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('ja')}
                                                                     onChange={e => this.change_language_select(e)}/><label>Japanese</label>
                                </div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_ko' value='sk'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('sk')}
                                                                     onChange={e => this.change_language_select(e)}/><label>French</label>
                                </div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_ko' value='cs'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('cs')}
                                                                     onChange={e => this.change_language_select(e)}/><label>Czech</label>
                                </div>
                                <div className='selectone'><Checkbox type='checkbox' name='lanuage_ko' value='fr'
                                                                     checked={findlanguage(this.state.language_type, 'all') || this.state.language_type.includes('fr')}
                                                                     onChange={e => this.change_language_select(e)}/><label>French</label>
                                </div>
                            </div>
                            <div className='searchinput'>
                                <MyTextField
                                    onKeyUp={e => this.search(e)}
                                    id="outlined-search"
                                    label="Search field"
                                    type="search"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={(search) => this.changeSearch(search)}
                                />
                            </div>
                            <div className='searchclick'>
                                <Button fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.submitSearch()}>
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='selectlanguage'>
                        <div className="addlanguage">
                            <Button fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.addlanguage(true)}>
                                Add Language
                            </Button>
                        </div>
                    </div>
                    {this.state.result_message === null || this.state.result_message[0].length === 0 || (this.state.result_message[0][0] && this.state.result_message[0][0].project_id) || false
                        ?
                        <div className='languagenodata'>No data</div>
                        :
                        <div className="contenttext">
                            <table className='contenttexttable'>
                                <tbody>
                                <tr>
                                    {this.state.languageinclude && this.state.languageinclude.includes('en')
                                        ?
                                        <th className='thstyle'><h2>en</h2></th> : null}
                                    {this.state.languageinclude && this.state.languageinclude.includes('es')
                                        ?
                                        <th className='thstyle'><h2>es</h2></th> : null}
                                    {this.state.languageinclude && this.state.languageinclude.includes('ko')
                                        ?
                                        <th className='thstyle'><h2>ko</h2></th> : null}
                                    {this.state.languageinclude && this.state.languageinclude.includes('ja')
                                        ?
                                        <th className='thstyle'><h2>ja</h2></th> : null}
                                    {this.state.languageinclude && this.state.languageinclude.includes('sk')
                                        ?
                                        <th className='thstyle'><h2>sk</h2></th> : null}
                                    {this.state.languageinclude && this.state.languageinclude.includes('cs')
                                        ?
                                        <th className='thstyle'><h2>cs</h2></th> : null}
                                    {this.state.languageinclude && this.state.languageinclude.includes('fr')
                                        ?
                                        <th className='thstyle'><h2>fr</h2></th> : null}
                                    <th className='thstyle'><h2>Editor</h2></th>
                                </tr>
                                {
                                    this.state.result_message.map((item) =>
                                        item.map((item_content) =>
                                            <tr className='table_tr' key={item_content.id}>
                                                {this.state.languageinclude && this.state.languageinclude.includes('en') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p>{item_content.en === null ? 'No content' : item_content.en}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_en !== null ? item_content.new_en : null}</p>
                                                        </div>
                                                    </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('es') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p> {item_content.es === null ? 'No content' : item_content.es}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_es !== null ? item_content.new_es : null}</p>
                                                        </div>
                                                    </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('ko') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p> {item_content.ko === null ? 'No content' : item_content.ko}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_ko !== null ? item_content.new_ko : null}</p>
                                                        </div>
                                                    </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('ja') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p>{item_content.ja === null ? 'No content' : item_content.ja}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_ja !== null ? item_content.new_ja : null}</p>
                                                        </div>
                                                    </td>
                                                    : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('sk') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p>{item_content.sk === null ? 'No content' : item_content.sk}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_sk !== null ? item_content.new_sk : null}</p>
                                                        </div>
                                                    </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('cs') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p>{item_content.cs === null ? 'No content' : item_content.cs}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_cs !== null ? item_content.new_cs : null}</p>
                                                        </div>
                                                    </td> : null}
                                                {this.state.languageinclude && this.state.languageinclude.includes('fr') ?
                                                    <td className='width'>
                                                        <div>
                                                            <p>{item_content.fr === null ? 'No content' : item_content.fr}</p>
                                                        </div>
                                                        <div>
                                                            <p className='contentcolor'>{item_content.new_fr !== null ? item_content.new_fr : null}</p>
                                                        </div>
                                                    </td> : null}
                                                <td className='width_edit'>
                                                    <div className='edit'
                                                         onClick={() => this.editon(true, item_content.id)}><img
                                                        src={require('./images/edit.png')} alt="edit language"/></div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className='letmorebox'>
                                {this.state.ifMore
                                    ?
                                    <Button fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={this.LetMore}>
                                        Let More...</Button>
                                    :
                                    <div className='letmore'><span>No more message....</span></div>
                                }
                            </div>
                        </div>
                    }
                    {this.state.scrollY > 1000 ?
                        <CometoTop/> : null}
                    {this.state.editwindow ?
                        <EditWindow fun={this.editon} title='Edit language' language_type={this.state.language_type}
                                    submit={this.submit}
                                    content={this.state.result_message} id={this.state.id}/> : null}
                    {this.state.addlanguage ?
                        <AddLanguage projectfrom={this.state.project_select} fun={this.addlanguage} title='Add Language'
                                     top={this.state.scrollY}
                                     gologin={this.setloginforward} seterror={this.refreceToken}/> : null
                    }
                </div>
        )
    }
}

export default withRouter(Homepage)