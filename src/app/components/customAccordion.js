import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import FuseLoading from '@fuse/core/FuseLoading';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
export default function CustomAccordion({ content, title, numberOfTracks, id, getContent, loading, onDeleteTrack, dispatch }) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        isExpanded && getContent()
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Accordion expanded={expanded === id} onChange={handleChange(id)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {loading ? (
                    <FuseLoading />
                ) : (
                    <List dense >
                        {content?.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AudiotrackIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${item.TrackTitle} (${item.Artist})`} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={(e) => {
                                            e.stopPropagation(); // stop event of onRowClick
                                            dispatch(
                                                openDialog({
                                                    children: (
                                                        <>
                                                            <DialogTitle id="alert-dialog-title">
                                                                Delete Track From PlayList ?
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Are you sure you want to delete this track from {title}?
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button
                                                                    onClick={() => dispatch(closeDialog())}
                                                                    color="primary"
                                                                >
                                                                    Disagree
                                                                </Button>
                                                                <Button
                                                                    onClick={() => {
                                                                        dispatch(closeDialog());
                                                                        onDeleteTrack(item.TrackID, id)
                                                                    }}

                                                                    color="primary"
                                                                    autoFocus
                                                                >
                                                                    Agree
                                                                </Button>
                                                            </DialogActions>
                                                        </>
                                                    )

                                                }))
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )
                }
            </AccordionDetails >
        </Accordion >
    )
}
