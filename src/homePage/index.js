import React, {Component} from 'react'
import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom'

export default class Homepage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            !cookie.load('tokenaccessToken')
                ?
                <div>请重新登陆</div>
                :
                <div className='homepage'>

                </div>
        )
    }
}