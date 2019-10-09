import React from 'react'
import './Popup window.css'

export default function Popup_window({title,content,fun,surebutton}) {
    return (
        <div className='questionquit'>
            <div className='questionquit_title'><b>{title}</b></div>
            <div className='quittext'>{content}</div>
            <div className='quitbutton'>
                {surebutton?<button className='button_yes_one' onClick={() => fun('sure')}>{surebutton || 'Yes'}</button>:<button className='button_yes' onClick={() => fun('sure')}>{surebutton || 'Yes'}</button>}
                {surebutton?null:<button className='button_no' onClick={() =>fun(false)}>No</button>}
            </div>
        </div>
    )
}