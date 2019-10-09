import React from 'react'
import {styled} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


export default function ComtoTop({top}) {
    const MyFab = styled(Fab)({
        position: "absolute",
        zIndex:99,
        right: "50px",
        bottom: 90 - top,
    });
    return (
        <div>
            <MyFab color="secondary" size="large" aria-label="scroll back to top" onClick={() => window.scrollTo(0, 0)}>
                <KeyboardArrowUpIcon/>
            </MyFab>
        </div>
    )
}