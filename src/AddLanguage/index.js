import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {styled} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ApolloClient from 'apollo-boost'
import {gql} from 'apollo-boost'
import cookie from 'react-cookies'
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

export default function EditWindow({title, fun, submit,projectid}) {
    const classes = useStyles();
    const [English,setEnglish] = useState(null);
    function ChangeEnglish(value) {
        setEnglish(value.target.value);
    }
     function EnglishOK() {
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
            addLang(lang:{not_trans:0,project_id:${projectid}}){
            en
               }
             }
            `
        })
            .then(result => console.log(result))
            // .catch(error)
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
