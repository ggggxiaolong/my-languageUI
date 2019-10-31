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
export default function EditWindow({title, fun, language_type, submit, content, id}) {
    const languagetype_old = language_type;
    const contentold = [];
    const languageforid = content.map(item => item.filter(item_content => item_content.id === id));
    languageforid.map(item =>
        item.map(itemnew => contentold.push(itemnew))
    );
    let contentnew_one = JSON.parse(JSON.stringify(contentold));
    const [ifModify, setifModify] = useState(false);
    const [languagetype, setlanguagetype] = useState(null);
    const [newlanguage, setnewlanguage] = useState(null);
    const [contentnew] = useState(contentnew_one);

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

    function onKeyDown(e) {
        if (e.keyCode === 13) {
            enternewlanguage()
        }
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
                            <div key={item.id} className='contentlanguage'>
                                {languagetype_old.includes('en')
                                    ?
                                    <p>
                                        <span><b>en: </b>{item.en === null ? 'NULL' : item.en}</span>&nbsp;&nbsp;<button
                                        className='modify_button'
                                        onClick={() => setModify(item.id, 'en')}>Modify</button>
                                    </p>
                                    : null}
                                {languagetype_old.includes('en') ? item.new_en ? <p>
                                    <span><b>new_en: </b>{item.new_en === null ? '' : item.new_en}</span>
                                </p> : null : null}
                                {languagetype_old.includes('es') ? <p>
                                    <span><b>es: </b>{item.es === null ? 'NULL' : item.es}</span>&nbsp;&nbsp;<button
                                    className='modify_button'
                                    onClick={() => setModify(item.id, 'es')}>Modify</button>
                                </p> : null}
                                {languagetype_old.includes('es') ? item.new_es ? <p>
                                    <span><b>new_es: </b>{item.new_es === null ? '' : item.new_es}</span>
                                </p> : null : null}
                                {languagetype_old.includes('ko') ? <p>
                                    <span><b>ko: </b>{item.ko === null ? 'NULL' : item.ko}</span>&nbsp;&nbsp;<button
                                    className='modify_button'
                                    onClick={() => setModify(item.id, 'ko')}>Modify</button>
                                </p> : null}
                                {languagetype_old.includes('ko') ? item.new_ko ? <p>
                                    <span><b>new_ko: </b>{item.new_ko === null ? '' : item.new_ko}</span>
                                </p> : null : null}
                                {languagetype_old.includes('ja') ? <p>
                                    <span><b>ja: </b>{item.ja === null ? 'NULL' : item.ja}</span>&nbsp;&nbsp;<button
                                    className='modify_button'
                                    onClick={() => setModify(item.id, 'ja')}>Modify</button>
                                </p> : null}
                                {languagetype_old.includes('ja') ? item.new_ja ? <p>
                                    <span><b>new_ja: </b>{item.new_ja === null ? '' : item.new_ja}</span>
                                </p> : null : null}
                                {languagetype_old.includes('sk') ? <p>
                                    <span><b>sk: </b>{item.sk === null ? 'NULL' : item.sk}</span>&nbsp;&nbsp;<button
                                    className='modify_button'
                                    onClick={() => setModify(item.id, 'sk')}>Modify</button>
                                </p> : null}
                                {languagetype_old.includes('sk') ? item.new_sk ? <p>
                                    <span><b>new_sk: </b>{item.new_sk === null ? '' : item.new_sk}</span>
                                </p> : null : null}
                                {languagetype_old.includes('cs') ? <p>
                                    <span><b>cs: </b>{item.cs === null ? 'NULL' : item.cs}</span>&nbsp;&nbsp;<button
                                    className='modify_button'
                                    onClick={() => setModify(item.id, 'cs')}>Modify</button>
                                </p> : null}
                                {languagetype_old.includes('cs') ? item.new_cs ? <p>
                                    <span><b>new_cs: </b>{item.new_cs === null ? '' : item.new_cs}</span>
                                </p> : null : null}
                                {languagetype_old.includes('fr') ? <p>
                                    <span><b>fr: </b>{item.fr === null ? 'NULL' : item.fr}</span>&nbsp;&nbsp;<button
                                    className='modify_button'
                                    onClick={() => setModify(item.id, 'fr')}>Modify</button>
                                </p> : null}
                                {languagetype_old.includes('fr') ? item.new_fr ? <p>
                                    <span><b>new_fr: </b>{item.new_fr === null ? '' : item.new_fr}</span>
                                </p> : null : null}
                            </div>
                        )}
                    </div>
                    : <div>
                        <div className='editwindow_content'>
                            {languagetype === 'en' ? 'English: ' + contentnew[0].en
                                : languagetype === 'es' ? 'Spanish: ' + contentnew[0].es
                                    : languagetype === 'ko' ? 'Korean: ' + contentnew[0].ko
                                        : languagetype === 'ja' ? 'Japanese: ' + contentnew[0].ja
                                            : languagetype === 'sk' ? 'French: ' + contentnew[0].sk
                                                : languagetype === 'cs' ? 'Czech: ' + contentnew[0].cs
                                                    : languagetype === 'fr' ? 'FrenchSearch: ' + contentnew[0].fr
                                                        : null}
                        </div>
                        <div className='editwindow_input'>
                            <TextField
                                onKeyDown={(e) => onKeyDown(e)}
                                fullWidth={true}
                                id="outlined-multiline-static"
                                label="Edit and update this data..."
                                multiline
                                rows="4"
                                defaultValue={contentnew[0]["new_" + languagetype]}
                                margin="normal"
                                variant="outlined"
                                onChange={changenewlanguage}
                            />
                        </div>
                    </div>}
                <DialogActions>
                    {!ifModify ? <MyButton onClick={() => fun(false)} color="primary">
                            Cancel
                        </MyButton>
                        : <MyButton onClick={() => setifModify(false)} color="primary">
                            Cancel
                        </MyButton>}
                    {!ifModify ? <MyButton onClick={() => submit(contentold, contentnew)} color="primary" autoFocus>
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
