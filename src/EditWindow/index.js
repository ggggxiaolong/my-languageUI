import React from 'react'
import './Popup window.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditWindow({title, fun, submit, content, id}) {
    const languageforid = content.map(item => item.filter(item_content => item_content.id === id));
    console.log(languageforid[0]);
    return (
        <div>
            <Dialog
                open={true}
                onClose={() => fun(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <div>
                {languageforid[0].map(item =>
                    <div className='contentlanguage'>
                    <p>
                        {item.en}
                    </p>
                    <p>
                        {item.es}
                    </p>
                    <p>
                        {item.ko}
                    </p>
                    <p>
                        {item.ja}
                    </p>
                    <p>
                        {item.sk}
                    </p>
                    <p>
                        {item.cs}
                    </p>
                    <p>
                        {item.fr}
                    </p>
                    </div>
                )}
                </div>
                <DialogActions>
                    <Button onClick={() => fun(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => submit()} color="primary" autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
