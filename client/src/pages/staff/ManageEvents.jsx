import React, { useEffect, useState } from 'react';
import NavStaff from '../../components/NavStaff';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Button, Typography, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import config from "../../config";
import axios from "axios";
import AnnouncementForm from '../../components/AnnouncementForm';

const ManageEvents = () => {
    const [announcement, setAnnouncement] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

    useEffect(() => {
        const getAnnouncement = async () => {
            try {
                const res = await axios.get(`${config.API}/announcement/retrieve-all`);
                setAnnouncement(res.data);
            } catch (err) {
                console.error('error retrieving announcements', err);
            }
        }
        getAnnouncement();
    }, []);

    const handleFormOpen = (announcement) => {
        setCurrentAnnouncement(announcement);
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setCurrentAnnouncement(null);
    };

    const handleFormSave = async () => {
        handleFormClose();
        const res = await axios.get(`${config.API}/announcement/retrieve-all`);
        setAnnouncement(res.data);
    };

    return (
        <Box sx={{ display: 'flex', mx: { md: '30px' } }}>
            <NavStaff />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
                <Toolbar />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                    <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>Events & Announcements</Typography> 
                    <Button variant="contained" type="button" sx={{backgroundColor:"#355173"}} onClick={() => handleFormOpen()}>Add Announcement</Button>
                </Box>

                <Grid container spacing={2} sx={{ marginY: '2em', fontSize: '12px', textAlign: 'center'}}>
                    <Grid item xs={3}>TITLE</Grid>
                    <Grid item xs={5}>DESCRIPTION</Grid>
                    <Grid item xs={2}>PUBLISH DATE</Grid>
                    <Grid item xs={2}>ACTION</Grid>
                </Grid>
                {
                    announcement.map((anncmt) => (
                        <Paper className='py-8 mb-5' sx={{ backgroundColor: '#D9D9D9', borderRadius: '8px' }} key={anncmt.announcementID}>
                            <Grid container sx={{ textAlign: 'center' }}>
                                <Grid item xs={3} sx={{fontWeight: 'bold'}}>{anncmt.title}</Grid>
                                <Grid item xs={5}>{anncmt.description}</Grid>
                                <Grid item xs={2}>{anncmt.date_announced}</Grid>
                                <Grid item xs={2}><FontAwesomeIcon icon={faEllipsis} className='ml-3 cursor-pointer text-2xl' onClick={() => handleFormOpen(anncmt)}/></Grid>
                            </Grid>
                        </Paper>
                    ))
                }

                <Dialog open={openForm} onClose={handleFormClose} fullWidth maxWidth="md">
                    <DialogTitle>{currentAnnouncement ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
                    <DialogContent>
                        <AnnouncementForm announcementData={currentAnnouncement} onSave={handleFormSave} onCancel={handleFormClose} />
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    );
};

export default ManageEvents;
