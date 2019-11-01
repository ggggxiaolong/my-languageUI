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
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function EditWindow({title, fun, submit, projectfrom}) {
    const classes = useStyles();
    const [error,seterror] = useState(null);
    const [English, setEnglish] = useState(null);
    const [projectId, setprojectId] = useState(projectfrom);
    const [transResult,settransResult] = useState(null);

    function ChangeEnglish(value) {
        setEnglish(value.target.value);
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
            .then(result => console.log(result))
        // .catch(error)
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
              trans(en:"translage"){
              en es ja ko sk cs fr
              }
           }
            `
        })
            .then(result => settransResult(result))
            .catch(error => seterror(error));
    }

    return (
        <div>
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
                <div className='editwindow_input'>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="standard-adornment-amount">English:</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            onChange={value => ChangeEnglish(value)}
                        />
                    </FormControl>
                </div>
                <DialogActions>
                    <MyButton onClick={() => fun(false)} color="primary">
                        Cancel
                    </MyButton>
                    <MyButton onClick={() => EnglishOK()} color="primary">
                        OK
                    </MyButton>
                </DialogActions>
            </Dialog>
        </div>

    )
}
