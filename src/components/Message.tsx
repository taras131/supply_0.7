import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getIsShowMessage, getMessage} from "../services/selectors/messageSelectors";
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {resetMessage} from "../services/reducers/message";


const Message = () => {
    const message = useAppSelector(state => getMessage(state))
    const isShowMessage = useAppSelector(state => getIsShowMessage(state))
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(resetMessage())
    }
    return (
        <Snackbar open={isShowMessage}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
            <Alert onClose={handleClose} severity={message.severity} sx={{width: '100%'}}>
                {message.text}
            </Alert>
        </Snackbar>
    );
};

export default Message;