import React from 'react'
import './EditWindow.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {styled} from '@material-ui/core/styles';

const MyButton = styled(Button)({
    margin: "auto",
});
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
                maxWidth='md'
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
                                <span><b>en:</b>{item.en === null ? 'NULL' : item.en}</span>
                            </p>
                            <p>
                                 <span><b>es:</b>{item.es === null ? 'NULL' : item.es}</span>
                            </p>
                            <p>
                                 <span><b>ko:</b>{item.ko === null ? 'NULL' : item.ko}</span>
                            </p>
                            <p>
                                 <span><b>ja:</b>{item.ja === null ? 'NULL' : item.ja}</span>
                            </p>
                            <p>
                                 <span><b>sk:</b>{item.sk === null ? 'NULL' : item.sk}</span>
                            </p>
                            <p>
                                 <span><b>cs:</b>{item.cs === null ? 'NULL' : item.cs}</span>
                            </p>
                            <p>
                                 <span><b>fr:</b>{item.fr === null ? 'NULL' : item.fr}</span>
                            </p>
                        </div>
                    ))}
                </div>
                <DialogActions>
                    <MyButton onClick={() => fun(false)} color="primary">
                        Cancel
                    </MyButton>
                    <MyButton onClick={() => submit()} color="primary" autoFocus>
                        Submit
                    </MyButton>
                </DialogActions>
            </Dialog>
        </div>

    )
}
