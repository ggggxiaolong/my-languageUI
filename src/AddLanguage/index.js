import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {styled} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PopupWindow from '../Popup window'

const MySelect = styled(TextField)({
    margin: 0,
    padding: 0,
    '& label': {
        fontSize: '20px'
    },
    '& div': {width: '150px'}
});
const projectid = [{id: "1", name: "ToC"}, {id: "2", name: "ToB_Manager"}, {id: "3", name: "ToB_Staff"}];
const MyButton = styled(Button)({
    margin: "auto",
});
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditWindow({title, fun, projectfrom, seterror}) {
    const classes = useStyles();
    const [English, setEnglish] = useState(null);
    const [projectId, setprojectId] = useState(projectfrom);
    const [transResult, settransResult] = useState(null);
    const [tosubmit, settosubmit] = useState(false);
    const [result, setresult] = useState(null);

    function ChangeEnglish(value) {
        setEnglish(value.target.value);
    }

    function Changelanguage(value, type) {
        const transResultResult = JSON.parse(JSON.stringify(transResult));
        if (type === 'en') {
            setEnglish(value.target.value);
            transResultResult.data.trans.en = value.target.value

        }else if (type === 'es'){
            transResultResult.data.trans.es = value.target.value
        } else if (type === 'ja'){
            transResultResult.data.trans.ja = value.target.value
        } else if (type === 'ko'){
            transResultResult.data.trans.ko = value.target.value
        } else if (type === 'sk'){
            transResultResult.data.trans.sk = value.target.value
        } else if (type === 'cs'){
            transResultResult.data.trans.cs = value.target.value
        } else if (type === 'fr'){
            transResultResult.data.trans.fr = value.target.value
        }
        settransResult(transResultResult)
    }

    function settoSubmitResult(result) {
        settransResult(result);
        settosubmit(true)
    }

    function finallResult(result) {
        if (result.data.addLang.en === English) {
            setresult('submitted')
        }
    }

    function EnglishSubmit() {
        const client = new ApolloClient({
            uri: 'http://192.168.1.112:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.mutate({
            mutation: gql`
            mutation addLang{
            addLang(lang:{not_trans:0,project_id:
            ${projectId},
            en:"${English}",
            es:"${transResult.data.trans.es}",
            ja:"${transResult.data.trans.ja}",
            ko:"${transResult.data.trans.ko}",
            sk:"${transResult.data.trans.sk}",
            cs:"${transResult.data.trans.cs}",
            fr:"${transResult.data.trans.fr}"
            }){
            en
               }
             }
            `
        })
            .then(result => finallResult(result))
            .catch(error => seterror(error));
    }

    function EnglishOK() {
        const client = new ApolloClient({
            uri: 'http://192.168.1.112:4000/graphql',
            headers: {
                token: cookie.load('tokenaccessToken'),
                refreshToken: cookie.load('refreshToken'),
            },
        });
        client.query({
            query: gql`
           {
              trans(en:"${English}"){
              en es ja ko sk cs fr
              }
           }
            `
        })
            .then(result => settoSubmitResult(result))
            .catch(error => seterror(error));
    }

    return (
        <div>{result !== 'submitted'
            ?
            <Dialog
                fullWidth={true}
                TransitionComponent={Transition}
                maxWidth='md'
                open={true}
                onClose={() => fun(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <div>
                    <MySelect
                        select
                        label="ProjectId"
                        value={projectId}
                        onChange={(project) => setprojectId(project.target.value)}
                        margin="normal"
                    >
                        {projectid.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </MySelect>
                </div>
                {tosubmit ?
                    <div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>English:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'en')}
                                    value={English}
                                />
                            </FormControl>
                        </div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>Spanish:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'es')}
                                    value={transResult.data.trans.es}
                                />
                            </FormControl>
                        </div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>Korean:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'ko')}
                                    value={transResult.data.trans.ko}
                                />
                            </FormControl>
                        </div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>Japanese:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'ja')}
                                    value={transResult.data.trans.ja}
                                />
                            </FormControl>
                        </div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>French:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'sk')}
                                    value={transResult.data.trans.sk}
                                />
                            </FormControl>
                        </div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>Czech:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'cs')}
                                    value={transResult.data.trans.cs}
                                />
                            </FormControl>
                        </div>
                        <div className='editwindow_input'>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel>FrenchSearch:</InputLabel>
                                <Input
                                    onChange={value => Changelanguage(value, 'fr')}
                                    value={transResult.data.trans.fr}
                                />
                            </FormControl>
                        </div>
                    </div>
                    : <div className='editwindow_input'>
                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel>English:</InputLabel>
                            <Input
                                onChange={value => ChangeEnglish(value)}
                                value={English}
                            />
                        </FormControl>
                    </div>
                }
                {tosubmit ?
                    <DialogActions>
                        <MyButton onClick={() => settosubmit(false)} color="primary">
                            Cancel
                        </MyButton>
                        <MyButton onClick={() => EnglishSubmit()} color="primary">
                            Submit
                        </MyButton>
                    </DialogActions> :
                    <DialogActions>
                        <MyButton onClick={() => fun(false)} color="primary">
                            Cancel
                        </MyButton>
                        <MyButton onClick={() => EnglishOK()} color="primary">
                            OK
                        </MyButton>
                    </DialogActions>}
            </Dialog>
            : <PopupWindow title='successfull' content='Successful submission of information' oneselect={1}
                           surebutton='I know' fun={() => fun(false)}/>
        }
        </div>

    )
}
