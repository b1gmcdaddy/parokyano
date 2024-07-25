import React, { useEffect, useState } from 'react';
import NavStaff from '../../components/NavStaff';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { Button, Typography, Container, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChurch, faStamp, faHandsPraying } from '@fortawesome/free-solid-svg-icons';
import config from "../../config";
import axios from "axios";

const ManageEvents = () => {

    const [announcement, setAnnouncement] = useState([]);

    useEffect(() => {
        const getAnnouncement = async () => {
            try {
                const res = await axios.get(`${config.API}/announcement/retrieve-all`);
                setAnnouncement(res.data);
            } catch (err) {
                console.error('error retrieveing annoucnements', err);
            }
        }
        getAnnouncement();
    }, []);



  return (
   <Box sx={{ display: 'flex', mx: { md: '30px' } }}>
      <NavStaff />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
          <Toolbar />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>Events & Announcements</Typography> 
                <Button variant="contained" type="button" sx={{backgroundColor:"#355173"}}>Add Announcement</Button>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={3}>NAME</Grid>
                <Grid item xs={4}>PUBLISH DATE</Grid>
                <Grid item xs={3}>STATUS</Grid>
                <Grid item xs={2}>ACTION</Grid>
            </Grid>
        </Box>
    </Box>
)
};

export default ManageEvents;
