import React from 'react'
import './Popup window.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditWindow({title, fun,submit,content,id}) {
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
                {content.map((item) =>
                    item.map((item_content) =>
                        <div key={item_content.id}>{item_content.id}</div>
                    )
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
