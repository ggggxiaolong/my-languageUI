import React from 'react'
import {styled} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


export default function ComtoTop({top}) {
    console.log(top);
    const MyFab = styled(Fab)({
    position: "absolute",
    right: "50px",
    bottom: top
});
    return (
        <div>
            <MyFab color="secondary" size="large" aria-label="scroll back to top">
                <KeyboardArrowUpIcon/>
            </MyFab>
        </div>

    )
}