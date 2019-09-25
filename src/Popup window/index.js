import React from 'react-dom'

export default function Popup_window({title,content,fun}) {
    return (
        <div className='questionquit'>
            <div className='questionquit_title'><b>Log out</b></div>
            <div className='quittext'>Are you sure you want to log out ?</div>
            <div className='quitbutton'>
                <button className='button_yes' onClick={() => this.quit('sure')}>Yes</button>
                <button className='button_no' onClick={() => this.quit(false)}>No</button>
            </div>
        </div>
    )
}