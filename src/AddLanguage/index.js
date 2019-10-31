import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {styled} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const MyButton = styled(Button)({
    margin: "auto",
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditWindow({title, fun, submit}) {

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
                    <div className="languagetype">en:</div>
                    <TextField
                        fullWidth={true}
                        id="outlined-multiline-static"
                        label="Add the new data..."
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <DialogActions>
                    <MyButton onClick={() => fun(false)} color="primary">
                        Cancel
                    </MyButton>
                    <MyButton onClick={() => submit()} color="primary">
                        Submit
                    </MyButton>
                </DialogActions>
            </Dialog>
        </div>

    )
}
