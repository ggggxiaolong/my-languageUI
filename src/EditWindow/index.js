import React, {useState} from 'react'
import './EditWindow.css'
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
export default function EditWindow({title, fun, submit, content, id}) {
    const contentold = [];
    const languageforid = content.map(item => item.filter(item_content => item_content.id === id));
    languageforid.map(item =>
        item.map(itemnew => contentold.push(itemnew))
    );
    let contentnew_one =  JSON.parse(JSON.stringify(contentold));
    const [ifModify, setifModify] = useState(false);
    const [languagetype, setlanguagetype] = useState(null);
    const [newlanguage, setnewlanguage] = useState(null);
    const [contentnew, setcontentnew] = useState(contentnew_one);
    function setModify(id, name) {
        setifModify(true);
        setlanguagetype(name);
        setnewlanguage(contentold[0]["new_" + name]);

    }

    function changenewlanguage(event) {
        setnewlanguage(event.target.value)
    }

    function enternewlanguage() {
        contentnew[0]["new_" + languagetype] = newlanguage;
        setifModify(false);
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
                {!ifModify ? <div>
                        {contentnew.map(item =>
                            <div className='contentlanguage'>
                                <p>
                                    <span><b>en: </b>{item.en === null ? 'NULL' : item.en}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'en')}>Modify</a>
                                </p>
                                {item.new_en ? <p>
                                    <span><b>new_en: </b>{item.new_en === null ? '' : item.new_en}</span>
                                </p>:null}
                                <p>
                                    <span><b>es: </b>{item.es === null ? 'NULL' : item.es}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'es')}>Modify</a>
                                </p>
                                {item.new_es ? <p>
                                    <span><b>new_es: </b>{item.new_es === null ? '' : item.new_es}</span>
                                </p>:null}
                                <p>
                                    <span><b>ko: </b>{item.ko === null ? 'NULL' : item.ko}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'ko')}>Modify</a>
                                </p>
                                {item.new_ko ? <p>
                                    <span><b>new_ko: </b>{item.new_ko === null ? '' : item.new_ko}</span>
                                </p>:null}
                                <p>
                                    <span><b>ja: </b>{item.ja === null ? 'NULL' : item.ja}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'ja')}>Modify</a>
                                </p>
                                {item.new_ja ? <p>
                                    <span><b>new_ja: </b>{item.new_ja === null ? '' : item.new_ja}</span>
                                </p>:null}
                                <p>
                                    <span><b>sk: </b>{item.sk === null ? 'NULL' : item.sk}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'sk')}>Modify</a>
                                </p>
                                {item.new_sk ? <p>
                                    <span><b>new_sk: </b>{item.new_sk === null ? '' : item.new_sk}</span>
                                </p>:null}
                                <p>
                                    <span><b>cs: </b>{item.cs === null ? 'NULL' : item.cs}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'cs')}>Modify</a>
                                </p>
                                {item.new_cs ? <p>
                                    <span><b>new_cs: </b>{item.new_cs === null ? '' : item.new_cs}</span>
                                </p>:null}
                                <p>
                                    <span><b>fr: </b>{item.fr === null ? 'NULL' : item.fr}</span>&nbsp;&nbsp;<a className='modify_button'
                                    onClick={() => setModify(item.id, 'fr')}>Modify</a>
                                </p>
                                {item.new_fr ? <p>
                                    <span><b>new_fr: </b>{item.new_fr === null ? '' : item.new_fr}</span>
                                </p>:null}
                            </div>
                        )}
                    </div>
                    : <div>
                        {languagetype === 'en' ? contentnew[0].en
                            : languagetype === 'es' ? contentnew[0].es
                                : languagetype === 'ko' ? contentnew[0].ko
                                    : languagetype === 'ja' ? contentnew[0].ja
                                        : languagetype === 'sk' ? contentnew[0].sk
                                            : languagetype === 'cs' ? contentnew[0].cs
                                                : languagetype === 'fr' ? contentnew[0].fr
                                                    : null}
                        <TextField
                            id="outlined-multiline-static"
                            label="Modify"
                            multiline
                            rows="4"
                            defaultValue={contentnew[0]["new_" + languagetype]}
                            margin="normal"
                            variant="outlined"
                            onChange={changenewlanguage}
                        />
                    </div>}
                <DialogActions>
                    {!ifModify ? <MyButton onClick={() => fun(false)} color="primary">
                            Cancel
                        </MyButton>
                        : <MyButton onClick={() => setifModify(false)} color="primary">
                            Cancel
                        </MyButton>}
                    {!ifModify ? <MyButton onClick={() => submit(contentold,contentnew)} color="primary" autoFocus>
                            Submit
                        </MyButton>
                        : <MyButton onClick={enternewlanguage} color="primary" autoFocus>
                            OK
                        </MyButton>
                    }
                </DialogActions>
            </Dialog>
        </div>

    )
}
