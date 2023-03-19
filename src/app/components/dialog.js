import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { closeDialog } from 'app/store/fuse/dialogSlice'
import { showMessage } from 'app/store/fuse/messageSlice'
import React from 'react'

function dialog({ title, text, id, onAgree, dispatch, messageText }) {
    return (
        <React.Fragment>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                    Disagree
                </Button>
                <Button onClick={() => {
                    dispatch(closeDialog())
                    onAgree(id).then((data) => {
                        dispatch(
                            showMessage({
                                message: messageText ? messageText : `Record has been successfully deleted`,//text or html
                                autoHideDuration: 6000,//ms
                                anchorOrigin: {
                                    vertical: 'top',//top bottom
                                    horizontal: 'right'//left center right
                                },
                                variant: 'success'//success error info warning null
                            }))
                    })
                }} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

export default dialog