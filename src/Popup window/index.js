import React from 'react'
import './Popup window.css'

export default function Popup_window({title,content,fun}) {
    return (
        <div className='questionquit'>
            <div className='questionquit_title'><b>{title}</b></div>
            <div className='quittext'>{content}</div>
            <div className='quitbutton'>
                <button className='button_yes' onClick={() => fun('sure')}>Yes</button>
                <button className='button_no' onClick={() =>fun(false)}>No</button>
            </div>
        </div>
    )
}