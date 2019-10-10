import React from 'react'
import './EditWindow.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditWindow({title, fun, submit, content, id}) {
    const languageforid = content.map(item => item.filter(item_content => item_content.id === id));

    return (
        <div>
            <Dialog
                fullWidth={true}
                TransitionComponent={Transition}
                maxWidth='lg'
                open={true}
                onClose={() => fun(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <div>
                    {languageforid.map(item => item.map(item =>
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
                    ))}
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
